using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Npgsql;
using System.Security.Claims;
using QrMarketing.Api.Contracts;
using QrMarketing.Api.Data;
using QrMarketing.Api.Data.Entities;
using QrMarketing.Api.Services;
using QrMarketing.Api.Services.Entitlements;
using QrMarketing.Api.Services.Users;
using Xunit;

namespace QrMarketing.Api.Tests;

// Opt in with QR_TEST_POSTGRES pointing at a disposable PostgreSQL server.
// The login needs CREATEDB. Each test migrates and drops only its own random database.
public sealed class PostgresFactAttribute : FactAttribute
{
    public PostgresFactAttribute()
    {
        if (string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("QR_TEST_POSTGRES")))
            Skip = "Set QR_TEST_POSTGRES to run PostgreSQL integration tests.";
    }
}

public sealed class PostgresConcurrencyTests : IAsyncLifetime
{
    private readonly string _databaseName = $"qr_test_{Guid.NewGuid():N}";
    private string? _adminConnection;
    private string? _testConnection;
    private readonly Guid _userId = Guid.NewGuid();

    public async Task InitializeAsync()
    {
        var configured = Environment.GetEnvironmentVariable("QR_TEST_POSTGRES");
        if (string.IsNullOrWhiteSpace(configured)) return;

        var builder = new NpgsqlConnectionStringBuilder(configured) { Database = "postgres", Pooling = false };
        _adminConnection = builder.ConnectionString;
        await ExecuteAdminAsync($"CREATE DATABASE \"{_databaseName}\"");
        builder.Database = _databaseName;
        _testConnection = builder.ConnectionString;
        await using var db = CreateDb();
        await db.Database.MigrateAsync();
        db.Users.Add(new User
        {
            Id = _userId, AuthProviderId = $"test_{_userId:N}", PlanCode = "free",
            CreatedAt = DateTimeOffset.UtcNow, UpdatedAt = DateTimeOffset.UtcNow,
        });
        await db.SaveChangesAsync();
    }

    public async Task DisposeAsync()
    {
        if (_adminConnection is not null)
            await ExecuteAdminAsync($"DROP DATABASE IF EXISTS \"{_databaseName}\" WITH (FORCE)");
    }

    [PostgresFact]
    public async Task Parallel_creates_do_not_exceed_active_limit()
    {
        await SetLimitAsync(EntitlementKeys.DynamicQrMaxActive, 3);
        var results = await RaceAsync(12, async (_, service) => await TryQuotaWriteAsync(async () =>
            await service.CreateForUserAsync(Request(), _userId, default)));
        Assert.Equal(3, results.Count(allowed => allowed));
        await using var db = CreateDb();
        Assert.Equal(3, await db.DynamicQrs.CountAsync(q => q.UserId == _userId && q.IsActive));
    }

    [PostgresFact]
    public async Task Parallel_reactivations_and_creates_share_active_limit()
    {
        await SetLimitAsync(EntitlementKeys.DynamicQrMaxActive, 3);
        var paused = await SeedQrAsync(false);
        var anotherPaused = await SeedQrAsync(false);
        await SeedQrAsync(true);
        var results = await RaceAsync(12, async (index, service) => await TryQuotaWriteAsync(async () =>
        {
            if (index < 2)
                await service.UpdateForUserAsync(index == 0 ? paused : anotherPaused, _userId,
                    new UpdateDynamicQrRequest { IsActive = true }, default);
            else
                await service.CreateForUserAsync(Request(), _userId, default);
        }));
        Assert.Equal(2, results.Count(allowed => allowed));
        await using var db = CreateDb();
        Assert.Equal(3, await db.DynamicQrs.CountAsync(q => q.UserId == _userId && q.IsActive));
    }

    [PostgresFact]
    public async Task Reactivation_at_limit_is_rejected_but_active_edit_is_allowed()
    {
        await SetLimitAsync(EntitlementKeys.DynamicQrMaxActive, 1);
        var paused = await SeedQrAsync(false);
        var active = await SeedQrAsync(true);
        await using var db = CreateDb();
        var service = CreateService(db);
        await Assert.ThrowsAsync<QuotaExceededException>(() => service.UpdateForUserAsync(paused,
            _userId, new UpdateDynamicQrRequest { IsActive = true }, default));
        var edited = await service.UpdateForUserAsync(active, _userId,
            new UpdateDynamicQrRequest { IsActive = true, Label = "updated" }, default);
        Assert.Equal("updated", edited!.Label);
        Assert.False((await service.GetForUserAsync(paused, _userId, default))!.IsActive);
    }

    [PostgresFact]
    public async Task Parallel_scans_preserve_events_cached_count_and_single_usage_row()
    {
        var code = await SeedQrAsync(true);
        var results = await RaceAsync(24, (_, service) =>
            service.ResolveRedirectAsync(code, "test", null, null, default));
        Assert.All(results, result => Assert.True(result.Resolution!.ScanLogged));
        await AssertCountersAsync(24);
    }

    [PostgresFact]
    public async Task Parallel_scans_stop_logging_at_quota_but_keep_redirecting()
    {
        await SetLimitAsync(EntitlementKeys.ScanQuotaLimit, 5);
        var code = await SeedQrAsync(true);
        var results = await RaceAsync(16, (_, service) =>
            service.ResolveRedirectAsync(code, "test", null, null, default));
        Assert.All(results, result =>
        {
            Assert.Equal(RedirectLookupStatus.Found, result.Status);
            Assert.Equal("https://example.com/", result.Resolution!.DestinationUrl);
        });
        Assert.Equal(5, results.Count(result => result.Resolution!.ScanLogged));
        Assert.Equal(11, results.Count(result => result.Resolution!.QuotaExceeded));
        await AssertCountersAsync(5);
    }

    [PostgresFact]
    public async Task Monthly_fallback_plan_checks_and_counts_the_same_period()
    {
        await using (var setup = CreateDb())
        {
            (await setup.Users.SingleAsync()).PlanCode = "pro";
            (await setup.PlanEntitlements.SingleAsync(e => e.PlanCode == "pro"
                && e.EntitlementKey == EntitlementKeys.ScanQuotaLimit)).ValueInt = 1;
            await setup.SaveChangesAsync();
        }
        var code = await SeedQrAsync(true);
        await using var db = CreateDb();
        var service = CreateService(db);
        Assert.True((await service.ResolveRedirectAsync(code, null, null, null, default)).Resolution!.ScanLogged);
        var next = await service.ResolveRedirectAsync(code, null, null, null, default);
        Assert.False(next.Resolution!.ScanLogged);
        Assert.True(next.Resolution.QuotaExceeded);
        var usage = await db.UserQuotaUsages.SingleAsync();
        var now = DateTimeOffset.UtcNow;
        Assert.Equal(new DateTimeOffset(now.Year, now.Month, 1, 0, 0, 0, TimeSpan.Zero), usage.PeriodStart);
        Assert.Equal(usage.PeriodStart.AddMonths(1), usage.PeriodEnd);
    }

    [PostgresFact]
    public async Task Failed_scan_insert_rolls_back_both_counters_and_redirects()
    {
        var code = await SeedQrAsync(true);
        await using (var db = CreateDb())
        {
            await db.Database.ExecuteSqlRawAsync("ALTER TABLE scan_events ADD CONSTRAINT reject_test_scan CHECK (false)");
            var result = await CreateService(db).ResolveRedirectAsync(code, null, null, null, default);
            Assert.Equal(RedirectLookupStatus.Found, result.Status);
            Assert.False(result.Resolution!.ScanLogged);
            Assert.False(result.Resolution.QuotaExceeded);
        }
        await using var verify = CreateDb();
        Assert.Empty(await verify.ScanEvents.ToListAsync());
        Assert.Empty(await verify.UserQuotaUsages.ToListAsync());
        Assert.Equal(0, (await verify.DynamicQrs.SingleAsync()).ScanCountCached);
    }

    [PostgresFact]
    public async Task Parallel_first_login_returns_one_user_and_subscription()
    {
        var subject = $"concurrent_{Guid.NewGuid():N}";
        var principal = new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim("sub", subject) }, "test"));
        var start = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        var tasks = Enumerable.Range(0, 12).Select(async _ =>
        {
            await using var db = CreateDb();
            await start.Task;
            return await new UserService(db).GetOrCreateFromClaimsAsync(principal, default);
        }).ToArray();
        start.SetResult();
        var users = await Task.WhenAll(tasks);
        var userId = users[0].Id;
        Assert.All(users, user => Assert.Equal(userId, user.Id));
        await using var verify = CreateDb();
        Assert.Equal(1, await verify.Users.CountAsync(user => user.AuthProviderId == subject));
        Assert.Equal(1, await verify.UserSubscriptions.CountAsync(subscription => subscription.UserId == userId));
    }

    private async Task AssertCountersAsync(long expected)
    {
        await using var db = CreateDb();
        Assert.Equal(expected, await db.ScanEvents.LongCountAsync());
        Assert.Equal(expected, await db.DynamicQrs.SumAsync(q => q.ScanCountCached));
        var usage = Assert.Single(await db.UserQuotaUsages.ToListAsync());
        Assert.Equal(expected, usage.UsedAmount);
        Assert.Equal(_userId, usage.UserId);
        Assert.Equal(QuotaKeys.ScanLogged, usage.QuotaKey);
    }

    private async Task<T[]> RaceAsync<T>(int count, Func<int, DynamicQrService, Task<T>> action)
    {
        var start = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        var tasks = Enumerable.Range(0, count).Select(async index =>
        {
            await using var db = CreateDb();
            await start.Task;
            return await action(index, CreateService(db));
        }).ToArray();
        start.SetResult();
        return await Task.WhenAll(tasks);
    }

    private static async Task<bool> TryQuotaWriteAsync(Func<Task> action)
    {
        try { await action(); return true; }
        catch (QuotaExceededException) { return false; }
    }

    private async Task<string> SeedQrAsync(bool active)
    {
        await using var db = CreateDb();
        var code = Guid.NewGuid().ToString("N")[..8];
        db.DynamicQrs.Add(new DynamicQr
        {
            Id = Guid.NewGuid(), UserId = _userId, ShortCode = code,
            DestinationUrl = "https://example.com/", IsActive = active,
            CreatedAt = DateTimeOffset.UtcNow, UpdatedAt = DateTimeOffset.UtcNow,
        });
        await db.SaveChangesAsync();
        return code;
    }

    private async Task SetLimitAsync(string key, long value)
    {
        await using var db = CreateDb();
        var entitlement = await db.PlanEntitlements.SingleAsync(e => e.PlanCode == "free" && e.EntitlementKey == key);
        entitlement.ValueInt = value;
        await db.SaveChangesAsync();
    }

    private QrMarketingDbContext CreateDb() => new(new DbContextOptionsBuilder<QrMarketingDbContext>()
        .UseNpgsql(_testConnection ?? throw new InvalidOperationException("PostgreSQL test database is not initialized."))
        .Options);

    private static DynamicQrService CreateService(QrMarketingDbContext db)
    {
        var quota = new QuotaCounterService(db);
        return new DynamicQrService(db,
            Microsoft.Extensions.Options.Options.Create(new QrMarketing.Api.Options.DynamicQrOptions
            { Enabled = true, PublicBaseUrl = "https://qr.example.test", ShortCodeLength = 8 }),
            new EntitlementService(db, quota), quota, NullLogger<DynamicQrService>.Instance);
    }

    private static CreateDynamicQrRequest Request() => new() { DestinationUrl = "https://example.com/" };

    private async Task ExecuteAdminAsync(string sql)
    {
        await using var connection = new NpgsqlConnection(_adminConnection);
        await connection.OpenAsync();
        await using var command = new NpgsqlCommand(sql, connection);
        await command.ExecuteNonQueryAsync();
    }
}
