using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using QrMarketing.Api.Contracts;
using QrMarketing.Api.Data;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services;

namespace QrMarketing.Api.Tests;

public class DynamicQrServiceTests
{
    private static DynamicQrService CreateService(QrMarketingDbContext db) =>
        new(db, Microsoft.Extensions.Options.Options.Create(new DynamicQrOptions
        {
            Enabled = true,
            PublicBaseUrl = "http://localhost:8080",
            ShortCodeLength = 8,
        }));

    private static QrMarketingDbContext CreateDb()
    {
        var options = new DbContextOptionsBuilder<QrMarketingDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new QrMarketingDbContext(options);
    }

    [Fact]
    public async Task Create_then_redirect_logs_scan_and_returns_destination()
    {
        await using var db = CreateDb();
        var service = CreateService(db);

        var created = await service.CreateAsync(new CreateDynamicQrRequest
        {
            DestinationUrl = "https://example.com/menu",
            Label = "Table 5",
        }, CancellationToken.None);

        Assert.False(string.IsNullOrWhiteSpace(created.ShortCode));
        Assert.Equal($"http://localhost:8080/r/{created.ShortCode}", created.ShortUrl);
        Assert.Equal(64, created.ManageToken.Length);

        var destination = await service.ResolveRedirectUrlAsync(
            created.ShortCode,
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
            "TH",
            null,
            CancellationToken.None);

        Assert.Equal("https://example.com/menu", destination);
        Assert.Equal(1, await db.ScanEvents.CountAsync());
    }

    [Fact]
    public async Task ResolveRedirect_returns_null_when_inactive()
    {
        await using var db = CreateDb();
        var service = CreateService(db);
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

        var destination = await service.ResolveRedirectUrlAsync(
            created.ShortCode, null, null, null, CancellationToken.None);
        Assert.Null(destination);
        Assert.Equal(0, await db.ScanEvents.CountAsync());
    }

    [Fact]
    public async Task Update_rejects_wrong_owner_token()
    {
        await using var db = CreateDb();
        var service = CreateService(db);
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
}
