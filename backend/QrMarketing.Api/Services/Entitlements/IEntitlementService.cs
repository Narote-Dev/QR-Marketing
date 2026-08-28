namespace QrMarketing.Api.Services.Entitlements;

public sealed class EntitlementResult
{
    public bool Allowed { get; init; }
    public string? ErrorCode { get; init; }
    public string? Message { get; init; }
    public long? Limit { get; init; }
    public long? Used { get; init; }
    public string? UpgradePlan { get; init; }

    public static EntitlementResult Allow() => new() { Allowed = true };

    public static EntitlementResult Deny(
        string errorCode,
        string message,
        long? limit = null,
        long? used = null,
        string? upgradePlan = null) =>
        new()
        {
            Allowed = false,
            ErrorCode = errorCode,
            Message = message,
            Limit = limit,
            Used = used,
            UpgradePlan = upgradePlan,
        };
}

public sealed class QuotaSummaryDto
{
    public string PlanCode { get; set; } = "free";
    public DynamicQrQuotaDto DynamicQr { get; set; } = new();
    public ScanQuotaDto Scans { get; set; } = new();
    public ApiQuotaDto Api { get; set; } = new();
}

public sealed class DynamicQrQuotaDto
{
    public long Used { get; set; }
    public long? Limit { get; set; }
    public bool Unlimited { get; set; }
}

public sealed class ScanQuotaDto
{
    public long Used { get; set; }
    public long? Limit { get; set; }
    public bool Unlimited { get; set; }
    public string PeriodUnit { get; set; } = "year";
    public ScanOverQuotaBehaviorDto OverQuotaBehavior { get; set; } = new();
}

public sealed class ScanOverQuotaBehaviorDto
{
    public string Redirect { get; set; } = "allow";
    public string Log { get; set; } = "deny";
}

public sealed class ApiQuotaDto
{
    public bool Enabled { get; set; }
    public long KeysLimit { get; set; }
}

public interface IEntitlementService
{
    Task<EntitlementResult> CanCreateDynamicQrAsync(Guid userId, CancellationToken cancellationToken);
    Task<EntitlementResult> CanLogScanAsync(Guid userId, CancellationToken cancellationToken);
    Task<QuotaSummaryDto> GetQuotaSummaryAsync(Guid userId, CancellationToken cancellationToken);
}

public interface IQuotaCounterService
{
    Task IncrementScanLoggedAsync(Guid userId, CancellationToken cancellationToken);
    Task<long> GetUsedAmountAsync(Guid userId, string quotaKey, DateTimeOffset periodStart, CancellationToken cancellationToken);
}
