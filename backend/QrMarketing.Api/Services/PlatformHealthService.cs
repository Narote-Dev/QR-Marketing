using QrMarketing.Api.Contracts;
using QrMarketing.Api.Data;
namespace QrMarketing.Api.Services;
public sealed class PlatformHealthService(QrMarketingDbContext databaseContext) : IPlatformHealthService
{
    public async Task<PlatformHealthResponse> GetHealthAsync(CancellationToken cancellationToken)
    {
        var databaseAvailable = await databaseContext.Database.CanConnectAsync(cancellationToken);
        return new PlatformHealthResponse(databaseAvailable ? "healthy" : "degraded", DateTimeOffset.UtcNow);
    }
}
