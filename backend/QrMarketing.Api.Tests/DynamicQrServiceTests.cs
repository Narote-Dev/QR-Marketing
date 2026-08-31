using Microsoft.EntityFrameworkCore;
using QrMarketing.Api.Contracts;
using QrMarketing.Api.Data;
using QrMarketing.Api.Services;
using QrMarketing.Api.Services.Entitlements;
using QrMarketing.Api.Services.Users;
using Xunit;

namespace QrMarketing.Api.Tests;

public class DynamicQrServiceTests
{
    private static QrMarketingDbContext CreateDb()
    {
        var options = new DbContextOptionsBuilder<QrMarketingDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        var db = new QrMarketingDbContext(options);
        db.Database.EnsureCreated();
        return db;
    }

    [Fact]
    public async Task Create_then_redirect_logs_scan_and_returns_destination()
    {
        await using var db = CreateDb();
        var service = TestServiceFactory.CreateDynamicQrService(db);

        var created = await service.CreateAsync(new CreateDynamicQrRequest
        {
            DestinationUrl = "https://example.com/menu",
            Label = "Table 5",
        }, CancellationToken.None);

        Assert.False(string.IsNullOrWhiteSpace(created.ShortCode));
        Assert.Equal($"http://localhost:8080/r/{created.ShortCode}", created.ShortUrl);
        Assert.Equal(64, created.ManageToken.Length);

        var resolution = await service.ResolveRedirectAsync(
            created.ShortCode,
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
            "TH",
            null,
            CancellationToken.None);

        Assert.NotNull(resolution);
        Assert.Equal("https://example.com/menu", resolution!.Resolution!.DestinationUrl);
        Assert.True(resolution.Resolution.ScanLogged);
        Assert.Equal(1, await db.ScanEvents.CountAsync());
    }

    [Fact]
    public async Task ResolveRedirect_returns_inactive_when_paused()
    {
        await using var db = CreateDb();
        var service = TestServiceFactory.CreateDynamicQrService(db);
        var created = await service.CreateAsync(new CreateDynamicQrRequest
        {
            DestinationUrl = "https://example.com",
        }, CancellationToken.None);

        var updated = await service.UpdateAsync(
            created.ShortCode,
            created.ManageToken,
            new UpdateDynamicQrRequest { IsActive = false },
            CancellationToken.None);

        Assert.NotNull(updated);
        Assert.False(updated!.IsActive);

        var lookup = await service.ResolveRedirectAsync(
            created.ShortCode, null, null, null, CancellationToken.None);
        Assert.Equal(RedirectLookupStatus.Inactive, lookup.Status);
        Assert.Null(lookup.Resolution);
        Assert.Equal(0, await db.ScanEvents.CountAsync());
    }

    [Fact]
    public async Task Update_rejects_wrong_owner_token()
    {
        await using var db = CreateDb();
        var service = TestServiceFactory.CreateDynamicQrService(db);
        var created = await service.CreateAsync(new CreateDynamicQrRequest
        {
            DestinationUrl = "https://example.com",
        }, CancellationToken.None);

        var result = await service.UpdateAsync(
            created.ShortCode,
            "deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
            new UpdateDynamicQrRequest { DestinationUrl = "https://evil.example" },
            CancellationToken.None);

        Assert.Null(result);
        var details = await service.GetAsync(created.ShortCode, created.ManageToken, CancellationToken.None);
        Assert.Equal("https://example.com/", details!.DestinationUrl);
    }

    [Fact]
    public async Task CreateForUser_enforces_dynamic_qr_limit()
    {
        await using var db = CreateDb();
        var userService = new UserService(db);
        var user = await userService.GetOrCreateDevUserAsync(Guid.NewGuid(), CancellationToken.None);
        var entitlementService = new EntitlementService(db, new QuotaCounterService(db));
        var service = new DynamicQrService(
            db,
            Microsoft.Extensions.Options.Options.Create(new QrMarketing.Api.Options.DynamicQrOptions
            {
                Enabled = true,
                PublicBaseUrl = "http://localhost:8080",
                ShortCodeLength = 8,
            }),
            entitlementService,
            new QuotaCounterService(db),
            Microsoft.Extensions.Logging.Abstractions.NullLogger<DynamicQrService>.Instance);

        for (var i = 0; i < 6; i++)
        {
            await service.CreateForUserAsync(new CreateDynamicQrRequest
            {
                DestinationUrl = $"https://example.com/{i}",
            }, user.Id, CancellationToken.None);
        }

        await Assert.ThrowsAsync<QuotaExceededException>(() => service.CreateForUserAsync(
            new CreateDynamicQrRequest { DestinationUrl = "https://example.com/7" },
            user.Id,
            CancellationToken.None));
    }

    [Fact]
    public async Task ResolveRedirect_still_works_when_scan_quota_exceeded()
    {
        await using var db = CreateDb();
        var userService = new UserService(db);
        var user = await userService.GetOrCreateDevUserAsync(Guid.NewGuid(), CancellationToken.None);
        var quotaCounter = new QuotaCounterService(db);
        var entitlementService = new EntitlementService(db, quotaCounter);
        var service = new DynamicQrService(
            db,
            Microsoft.Extensions.Options.Options.Create(new QrMarketing.Api.Options.DynamicQrOptions
            {
                Enabled = true,
                PublicBaseUrl = "http://localhost:8080",
                ShortCodeLength = 8,
            }),
            entitlementService,
            quotaCounter,
            Microsoft.Extensions.Logging.Abstractions.NullLogger<DynamicQrService>.Instance);

        var created = await service.CreateForUserAsync(new CreateDynamicQrRequest
        {
            DestinationUrl = "https://example.com/quota",
        }, user.Id, CancellationToken.None);

        var subscription = await db.UserSubscriptions.FirstAsync(x => x.UserId == user.Id);
        var usage = new QrMarketing.Api.Data.Entities.UserQuotaUsage
        {
            UserId = user.Id,
            QuotaKey = QuotaKeys.ScanLogged,
            PeriodStart = subscription.CurrentPeriodStart,
            PeriodEnd = subscription.CurrentPeriodEnd ?? subscription.CurrentPeriodStart.AddYears(1),
            UsedAmount = 7000,
            UpdatedAt = DateTimeOffset.UtcNow,
        };
        db.UserQuotaUsages.Add(usage);
        await db.SaveChangesAsync();

        var before = await db.ScanEvents.CountAsync();
        var resolution = await service.ResolveRedirectAsync(created.ShortCode, null, null, null, CancellationToken.None);

        Assert.NotNull(resolution);
        Assert.Equal("https://example.com/quota", resolution!.Resolution!.DestinationUrl);
        Assert.False(resolution.Resolution.ScanLogged);
        Assert.True(resolution.Resolution.QuotaExceeded);
        Assert.Equal(before, await db.ScanEvents.CountAsync());
    }
}
