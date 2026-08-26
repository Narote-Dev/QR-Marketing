using QrMarketing.Api.Contracts;

namespace QrMarketing.Api.Services;

public interface IDynamicQrService
{
    Task<CreateDynamicQrResponse> CreateAsync(CreateDynamicQrRequest request, CancellationToken cancellationToken);
    Task<string?> ResolveRedirectUrlAsync(string shortCode, string? userAgent, string? country, string? referrer, CancellationToken cancellationToken);
    Task<DynamicQrDetailsResponse?> GetAsync(string shortCode, string rawOwnerToken, CancellationToken cancellationToken);
    Task<DynamicQrDetailsResponse?> UpdateAsync(string shortCode, string rawOwnerToken, UpdateDynamicQrRequest request, CancellationToken cancellationToken);
    Task<DynamicQrStatsResponse?> GetStatsAsync(string shortCode, string rawOwnerToken, CancellationToken cancellationToken);
}
