using Microsoft.EntityFrameworkCore;
using QrMarketing.Api.Data;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' is required.");
builder.Services.AddDbContext<QrMarketingDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.Configure<DynamicQrOptions>(builder.Configuration.GetSection(DynamicQrOptions.SectionName));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks().AddDbContextCheck<QrMarketingDbContext>("database");
builder.Services.AddScoped<IPlatformHealthService, PlatformHealthService>();
builder.Services.AddScoped<IDynamicQrService, DynamicQrService>();
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? ["http://localhost:3000"];
builder.Services.AddCors(options => options.AddPolicy("Frontend", policy => policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));
var app = builder.Build();
if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
app.UseHttpsRedirection();
app.UseCors("Frontend");
app.MapHealthChecks("/health");
app.MapControllers();
app.Run();
public partial class Program;
