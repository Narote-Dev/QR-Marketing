using Microsoft.Extensions.Logging.Abstractions;
using QrMarketing.Api.Data;
using QrMarketing.Api.Services;
using QrMarketing.Api.Services.Entitlements;
using DynamicQrOptions = QrMarketing.Api.Options.DynamicQrOptions;

namespace QrMarketing.Api.Tests;

internal sealed class TestEntitlementService : IEntitlementService
{
    public Task<EntitlementResult> CanCreateDynamicQrAsync(Guid userId, CancellationToken cancellationToken) =>
        Task.FromResult(EntitlementResult.Allow());

    public Task<EntitlementResult> CanLogScanAsync(Guid userId, CancellationToken cancellationToken) =>
        Task.FromResult(EntitlementResult.Allow());

    public Task<QuotaSummaryDto> GetQuotaSummaryAsync(Guid userId, CancellationToken cancellationToken) =>
        Task.FromResult(new QuotaSummaryDto { PlanCode = "free" });
}

internal sealed class TestQuotaCounterService : IQuotaCounterService
{
    private readonly Dictionary<(Guid UserId, DateTimeOffset PeriodStart), long> _usage = new();

    public Task IncrementScanLoggedAsync(Guid userId, CancellationToken cancellationToken)
    {
        var key = (userId, new DateTimeOffset(DateTimeOffset.UtcNow.Year, 1, 1, 0, 0, 0, TimeSpan.Zero));
        _usage.TryGetValue(key, out var current);
        _usage[key] = current + 1;
        return Task.CompletedTask;
    }

    public Task<long> GetUsedAmountAsync(Guid userId, string quotaKey, DateTimeOffset periodStart, CancellationToken cancellationToken)
    {
        _usage.TryGetValue((userId, periodStart), out var current);
        return Task.FromResult(current);
    }
}

internal static class TestServiceFactory
{
    public static DynamicQrService CreateDynamicQrService(QrMarketingDbContext db) =>
        new(
            db,
            Microsoft.Extensions.Options.Options.Create(new DynamicQrOptions
            {
                Enabled = true,
                PublicBaseUrl = "http://localhost:8080",
                ShortCodeLength = 8,
            }),
            new TestEntitlementService(),
            new TestQuotaCounterService(),
            NullLogger<DynamicQrService>.Instance);
}
