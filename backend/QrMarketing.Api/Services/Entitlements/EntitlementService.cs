using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using QrMarketing.Api.Data;
using QrMarketing.Api.Data.Entities;

namespace QrMarketing.Api.Services.Entitlements;

public sealed class EntitlementService(
    QrMarketingDbContext dbContext,
    IQuotaCounterService quotaCounterService) : IEntitlementService
{
    private static readonly JsonSerializerOptions JsonOptions = new() { PropertyNameCaseInsensitive = true };

    public async Task<EntitlementResult> CanCreateDynamicQrAsync(Guid userId, CancellationToken cancellationToken)
    {
        // Step 1: Resolve active subscription and plan entitlements.
        var planCode = await ResolveEffectivePlanCodeAsync(userId, cancellationToken);
        var maxActive = await GetIntEntitlementAsync(planCode, EntitlementKeys.DynamicQrMaxActive, cancellationToken);
        if (maxActive is null)
        {
            return EntitlementResult.Deny("entitlement.missing", "Plan configuration is incomplete.");
        }

        if (maxActive.Value < 0)
        {
            return EntitlementResult.Allow();
        }

        // Step 2: Count active Dynamic QRs owned by user.
        var used = await dbContext.DynamicQrs.LongCountAsync(
            x => x.UserId == userId && x.IsActive,
            cancellationToken);

        if (used >= maxActive.Value)
        {
            return EntitlementResult.Deny(
                "quota.dynamic_qr.max_active",
                "Active Dynamic QR limit reached for current plan.",
                maxActive.Value,
                used,
                SuggestUpgrade(planCode));
        }

        return EntitlementResult.Allow();
    }

    public async Task<EntitlementResult> CanLogScanAsync(Guid userId, CancellationToken cancellationToken)
    {
        // Step 1: Load scan quota limit from plan.
        var planCode = await ResolveEffectivePlanCodeAsync(userId, cancellationToken);
        var limit = await GetIntEntitlementAsync(planCode, EntitlementKeys.ScanQuotaLimit, cancellationToken);
        if (limit is null)
        {
            return EntitlementResult.Deny("entitlement.missing", "Scan quota is not configured.");
        }

        if (limit.Value < 0)
        {
            return EntitlementResult.Allow();
        }

        // Step 2: Compare current period usage.
        var period = await GetScanPeriodAsync(userId, planCode, cancellationToken);
        var used = await quotaCounterService.GetUsedAmountAsync(
            userId,
            QuotaKeys.ScanLogged,
            period.Start,
            cancellationToken);

        if (used >= limit.Value)
        {
            return EntitlementResult.Deny(
                "quota.scan.exceeded",
                "Scan quota exceeded for current period.",
                limit.Value,
                used,
                SuggestUpgrade(planCode));
        }

        return EntitlementResult.Allow();
    }

    public async Task<QuotaSummaryDto> GetQuotaSummaryAsync(Guid userId, CancellationToken cancellationToken)
    {
        // Step 1: Resolve plan and entitlement values.
        var planCode = await ResolveEffectivePlanCodeAsync(userId, cancellationToken);
        var maxActive = await GetIntEntitlementAsync(planCode, EntitlementKeys.DynamicQrMaxActive, cancellationToken) ?? 0;
        var scanLimit = await GetIntEntitlementAsync(planCode, EntitlementKeys.ScanQuotaLimit, cancellationToken) ?? 0;
        var periodJson = await GetJsonEntitlementAsync(planCode, EntitlementKeys.ScanQuotaPeriod, cancellationToken);
        var behaviorJson = await GetJsonEntitlementAsync(planCode, EntitlementKeys.ScanOverQuotaBehavior, cancellationToken);
        var apiEnabled = await GetBoolEntitlementAsync(planCode, EntitlementKeys.ApiEnabled, cancellationToken) ?? false;

        // Step 2: Load usage counters.
        var activeQrCount = await dbContext.DynamicQrs.LongCountAsync(
            x => x.UserId == userId && x.IsActive,
            cancellationToken);
        var scanPeriod = await GetScanPeriodAsync(userId, planCode, cancellationToken);
        var scansUsed = await quotaCounterService.GetUsedAmountAsync(
            userId,
            QuotaKeys.ScanLogged,
            scanPeriod.Start,
            cancellationToken);

        var periodUnit = "year";
        if (!string.IsNullOrWhiteSpace(periodJson)
            && JsonSerializer.Deserialize<ScanQuotaPeriodConfig>(periodJson, JsonOptions) is { } periodConfig)
        {
            periodUnit = periodConfig.Unit ?? periodUnit;
        }

        var behavior = new ScanOverQuotaBehaviorDto();
        if (!string.IsNullOrWhiteSpace(behaviorJson)
            && JsonSerializer.Deserialize<ScanOverQuotaBehaviorDto>(behaviorJson, JsonOptions) is { } parsedBehavior)
        {
            behavior = parsedBehavior;
        }

        return new QuotaSummaryDto
        {
            PlanCode = planCode,
            DynamicQr = new DynamicQrQuotaDto
            {
                Used = activeQrCount,
                Limit = maxActive < 0 ? null : maxActive,
                Unlimited = maxActive < 0,
            },
            Scans = new ScanQuotaDto
            {
                Used = scansUsed,
                Limit = scanLimit < 0 ? null : scanLimit,
                Unlimited = scanLimit < 0,
                PeriodUnit = periodUnit,
                OverQuotaBehavior = behavior,
            },
            Api = new ApiQuotaDto
            {
                Enabled = apiEnabled,
                KeysLimit = 0,
            },
        };
    }

    private async Task<string> ResolveEffectivePlanCodeAsync(Guid userId, CancellationToken cancellationToken)
    {
        var subscription = await dbContext.UserSubscriptions
            .AsNoTracking()
            .Where(x => x.UserId == userId
                && (x.Status == SubscriptionStatuses.Active
                    || x.Status == SubscriptionStatuses.Trialing
                    || x.Status == SubscriptionStatuses.PastDue
                    || x.Status == SubscriptionStatuses.Grace))
            .OrderByDescending(x => x.StartedAt)
            .FirstOrDefaultAsync(cancellationToken);

        if (subscription is not null)
        {
            return subscription.PlanCode;
        }

        var user = await dbContext.Users.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == userId, cancellationToken);
        return user?.PlanCode ?? "free";
    }

    private async Task<long?> GetIntEntitlementAsync(string planCode, string key, CancellationToken cancellationToken)
    {
        var row = await dbContext.PlanEntitlements.AsNoTracking()
            .FirstOrDefaultAsync(x => x.PlanCode == planCode && x.EntitlementKey == key, cancellationToken);
        return row?.ValueInt;
    }

    private async Task<bool?> GetBoolEntitlementAsync(string planCode, string key, CancellationToken cancellationToken)
    {
        var row = await dbContext.PlanEntitlements.AsNoTracking()
            .FirstOrDefaultAsync(x => x.PlanCode == planCode && x.EntitlementKey == key, cancellationToken);
        return row?.ValueBool;
    }

    private async Task<string?> GetJsonEntitlementAsync(string planCode, string key, CancellationToken cancellationToken)
    {
        var row = await dbContext.PlanEntitlements.AsNoTracking()
            .FirstOrDefaultAsync(x => x.PlanCode == planCode && x.EntitlementKey == key, cancellationToken);
        return row?.ValueJson;
    }

    private async Task<(DateTimeOffset Start, DateTimeOffset End)> GetScanPeriodAsync(
        Guid userId,
        string planCode,
        CancellationToken cancellationToken)
    {
        var subscription = await dbContext.UserSubscriptions
            .AsNoTracking()
            .Where(x => x.UserId == userId
                && (x.Status == SubscriptionStatuses.Active
                    || x.Status == SubscriptionStatuses.Trialing
                    || x.Status == SubscriptionStatuses.PastDue
                    || x.Status == SubscriptionStatuses.Grace))
            .OrderByDescending(x => x.StartedAt)
            .FirstOrDefaultAsync(cancellationToken);

        if (subscription is not null)
        {
            var end = subscription.CurrentPeriodEnd ?? subscription.CurrentPeriodStart.AddYears(1);
            return (subscription.CurrentPeriodStart, end);
        }

        var periodJson = await GetJsonEntitlementAsync(planCode, EntitlementKeys.ScanQuotaPeriod, cancellationToken);
        var unit = "year";
        var length = 1;
        if (!string.IsNullOrWhiteSpace(periodJson)
            && JsonSerializer.Deserialize<ScanQuotaPeriodConfig>(periodJson, JsonOptions) is { } config)
        {
            unit = config.Unit ?? unit;
            length = config.Length <= 0 ? 1 : config.Length;
        }

        var now = DateTimeOffset.UtcNow;
        var start = unit switch
        {
            "month" => new DateTimeOffset(now.Year, now.Month, 1, 0, 0, 0, TimeSpan.Zero),
            _ => new DateTimeOffset(now.Year, 1, 1, 0, 0, 0, TimeSpan.Zero),
        };
        var endFallback = unit switch
        {
            "month" => start.AddMonths(length),
            _ => start.AddYears(length),
        };
        return (start, endFallback);
    }

    private static string? SuggestUpgrade(string planCode) => planCode switch
    {
        "free" => "pro",
        "pro" => "business",
        "business" => "enterprise",
        _ => null,
    };

    private sealed class ScanQuotaPeriodConfig
    {
        public string? Unit { get; set; }
        public int Length { get; set; } = 1;
    }
}

public sealed class QuotaCounterService(QrMarketingDbContext dbContext) : IQuotaCounterService
{
    public async Task IncrementScanLoggedAsync(Guid userId, CancellationToken cancellationToken)
    {
        // Step 1: Resolve billing period from active subscription.
        var subscription = await dbContext.UserSubscriptions
            .Where(x => x.UserId == userId
                && (x.Status == SubscriptionStatuses.Active
                    || x.Status == SubscriptionStatuses.Trialing
                    || x.Status == SubscriptionStatuses.PastDue
                    || x.Status == SubscriptionStatuses.Grace))
            .OrderByDescending(x => x.StartedAt)
            .FirstOrDefaultAsync(cancellationToken);

        var periodStart = subscription?.CurrentPeriodStart
            ?? new DateTimeOffset(DateTimeOffset.UtcNow.Year, 1, 1, 0, 0, 0, TimeSpan.Zero);
        var periodEnd = subscription?.CurrentPeriodEnd ?? periodStart.AddYears(1);

        // Step 2: Upsert usage counter for scan.logged.
        var usage = await dbContext.UserQuotaUsages
            .FirstOrDefaultAsync(
                x => x.UserId == userId
                    && x.QuotaKey == QuotaKeys.ScanLogged
                    && x.PeriodStart == periodStart,
                cancellationToken);

        var now = DateTimeOffset.UtcNow;
        if (usage is null)
        {
            usage = new UserQuotaUsage
            {
                UserId = userId,
                QuotaKey = QuotaKeys.ScanLogged,
                PeriodStart = periodStart,
                PeriodEnd = periodEnd,
                UsedAmount = 1,
                UpdatedAt = now,
            };
            dbContext.UserQuotaUsages.Add(usage);
        }
        else
        {
            usage.UsedAmount += 1;
            usage.UpdatedAt = now;
        }
    }

    public async Task<long> GetUsedAmountAsync(
        Guid userId,
        string quotaKey,
        DateTimeOffset periodStart,
        CancellationToken cancellationToken)
    {
        var usage = await dbContext.UserQuotaUsages.AsNoTracking()
            .FirstOrDefaultAsync(
                x => x.UserId == userId && x.QuotaKey == quotaKey && x.PeriodStart == periodStart,
                cancellationToken);
        return usage?.UsedAmount ?? 0;
    }
}
