using Microsoft.EntityFrameworkCore;
using QrMarketing.Api.Data;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Step 1: Bind to platform PORT when present (Railway/Render/Fly).
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(port))
{
    builder.WebHost.UseUrls($"http://+:{port}");
}

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? Environment.GetEnvironmentVariable("DATABASE_URL")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' (or DATABASE_URL) is required.");

// Step 2: Normalize Neon/Railway postgres URL schemes for Npgsql when needed.
if (connectionString.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase)
    || connectionString.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase))
{
    connectionString = ConvertPostgresUriToNpgsql(connectionString);
}

builder.Services.AddDbContext<QrMarketingDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.Configure<DynamicQrOptions>(builder.Configuration.GetSection(DynamicQrOptions.SectionName));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks().AddDbContextCheck<QrMarketingDbContext>("database");
builder.Services.AddScoped<IPlatformHealthService, PlatformHealthService>();
builder.Services.AddScoped<IDynamicQrService, DynamicQrService>();
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? ["http://localhost:3000", "https://genmyqrcode.com", "https://www.genmyqrcode.com"];
builder.Services.AddCors(options => options.AddPolicy("Frontend", policy => policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));
var app = builder.Build();

// Step 3: Apply EF migrations on startup in non-Development so first deploy creates tables.
if (!app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<QrMarketingDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
app.UseCors("Frontend");
app.MapHealthChecks("/health");
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
