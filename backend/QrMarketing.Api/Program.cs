using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QrMarketing.Api.Auth;
using QrMarketing.Api.Data;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services;
using QrMarketing.Api.Services.Entitlements;
using QrMarketing.Api.Services.Users;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Step 1: Bind to platform PORT when present (Railway/Render/Fly).
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(port))
{
    builder.WebHost.UseUrls($"http://+:{port}");
}

var connectionString =
    Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
    ?? Environment.GetEnvironmentVariable("DATABASE_URL")
    ?? builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' (or DATABASE_URL) is required.");

// Step 2: Normalize Neon/Railway postgres URL schemes for Npgsql when needed.
if (connectionString.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase)
    || connectionString.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase))
{
    connectionString = ConvertPostgresUriToNpgsql(connectionString);
}

builder.Services.AddDbContext<QrMarketingDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.Configure<DynamicQrOptions>(builder.Configuration.GetSection(DynamicQrOptions.SectionName));
builder.Services.Configure<AuthOptions>(builder.Configuration.GetSection(AuthOptions.SectionName));
builder.Services.Configure<DatabaseOptions>(builder.Configuration.GetSection(DatabaseOptions.SectionName));
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks()
    .AddDbContextCheck<QrMarketingDbContext>("database", tags: ["ready"]);
builder.Services.AddScoped<IPlatformHealthService, PlatformHealthService>();
builder.Services.AddScoped<IDynamicQrService, DynamicQrService>();
builder.Services.AddScoped<IEntitlementService, EntitlementService>();
builder.Services.AddScoped<IQuotaCounterService, QuotaCounterService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICurrentUserAccessor, CurrentUserAccessor>();

// Step 3: Basic rate limits for write/create and public redirect.
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("api-write", httpContext =>
    {
        var userId = httpContext.Items[CurrentUserAccessor.UserIdItemKey]?.ToString() ?? "anon";
        return RateLimitPartition.GetFixedWindowLimiter(
            userId,
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 30,
                Window = TimeSpan.FromHours(1),
                QueueLimit = 0,
            });
    });
    options.AddPolicy("redirect", httpContext =>
    {
        var ip = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(
            ip,
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 120,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0,
            });
    });
});

var authOptions = builder.Configuration.GetSection(AuthOptions.SectionName).Get<AuthOptions>() ?? new AuthOptions();
if (!string.IsNullOrWhiteSpace(authOptions.ClerkAuthority))
{
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.Authority = authOptions.ClerkAuthority;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = !string.IsNullOrWhiteSpace(authOptions.ClerkAudience),
                ValidAudience = authOptions.ClerkAudience,
            };
        });
    builder.Services.AddAuthorization();
}

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? ["http://localhost:3000", "https://genmyqrcode.com", "https://www.genmyqrcode.com"];
builder.Services.AddCors(options => options.AddPolicy("Frontend", policy => policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));
var app = builder.Build();

// Step 4: Apply EF migrations on startup when enabled (local Docker / Railway).
var databaseOptions = app.Configuration.GetSection(DatabaseOptions.SectionName).Get<DatabaseOptions>() ?? new DatabaseOptions();
if (databaseOptions.MigrateOnStartup)
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<QrMarketingDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
app.UseCors("Frontend");
app.UseRateLimiter();
if (!string.IsNullOrWhiteSpace(authOptions.ClerkAuthority))
{
    app.UseAuthentication();
    app.UseAuthorization();
}
app.UseCurrentUser();
app.MapHealthChecks("/health", new HealthCheckOptions { Predicate = _ => false });
app.MapHealthChecks("/health/ready", new HealthCheckOptions { Predicate = check => check.Tags.Contains("ready") });
app.MapControllers();
app.Run();

static string ConvertPostgresUriToNpgsql(string uri)
{
    var parsed = new Uri(uri);
    var userInfo = parsed.UserInfo.Split(':', 2);
    var username = Uri.UnescapeDataString(userInfo[0]);
    var password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : string.Empty;
    var database = parsed.AbsolutePath.Trim('/');
    var sslMode = parsed.Query.Contains("sslmode=", StringComparison.OrdinalIgnoreCase) ? "" : ";SSL Mode=Require;Trust Server Certificate=true";
    return $"Host={parsed.Host};Port={(parsed.IsDefaultPort ? 5432 : parsed.Port)};Database={database};Username={username};Password={password}{sslMode}";
}

public partial class Program;
