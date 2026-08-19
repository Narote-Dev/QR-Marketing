using QrMarketing.Api.Contracts;
namespace QrMarketing.Api.Services;
public interface IPlatformHealthService { Task<PlatformHealthResponse> GetHealthAsync(CancellationToken cancellationToken); }
