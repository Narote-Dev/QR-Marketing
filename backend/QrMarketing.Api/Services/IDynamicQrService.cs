using QrMarketing.Api.Contracts;

namespace QrMarketing.Api.Services;

public enum RedirectLookupStatus
{
    Found,
    Inactive,
    NotFound,
}

public sealed class RedirectResolution
{
    public required string DestinationUrl { get; init; }
    public bool ScanLogged { get; init; }
    public bool QuotaExceeded { get; init; }
}

public sealed class RedirectLookupResult
{
    public RedirectLookupStatus Status { get; init; }
    public RedirectResolution? Resolution { get; init; }

    public static RedirectLookupResult Found(RedirectResolution resolution) =>
        new() { Status = RedirectLookupStatus.Found, Resolution = resolution };

    public static RedirectLookupResult Inactive() =>
        new() { Status = RedirectLookupStatus.Inactive };

    public static RedirectLookupResult NotFound() =>
        new() { Status = RedirectLookupStatus.NotFound };
}

public interface IDynamicQrService
{
    Task<CreateDynamicQrResponse> CreateAsync(CreateDynamicQrRequest request, CancellationToken cancellationToken);
    Task<CreateDynamicQrResponse> CreateForUserAsync(CreateDynamicQrRequest request, Guid userId, CancellationToken cancellationToken);
    Task<RedirectLookupResult> ResolveRedirectAsync(
        string shortCode,
        string? userAgent,
        string? country,
        string? referrer,
        CancellationToken cancellationToken);
    Task<string?> ResolveRedirectUrlAsync(
        string shortCode,
        string? userAgent,
        string? country,
        string? referrer,
        CancellationToken cancellationToken);
    Task<DynamicQrDetailsResponse?> GetAsync(string shortCode, string rawOwnerToken, CancellationToken cancellationToken);
    Task<DynamicQrDetailsResponse?> GetForUserAsync(string shortCode, Guid userId, CancellationToken cancellationToken);
    Task<DynamicQrDetailsResponse?> UpdateAsync(
        string shortCode,
        string rawOwnerToken,
        UpdateDynamicQrRequest request,
        CancellationToken cancellationToken);
    Task<DynamicQrDetailsResponse?> UpdateForUserAsync(
        string shortCode,
        Guid userId,
        UpdateDynamicQrRequest request,
        CancellationToken cancellationToken);
    Task<DynamicQrStatsResponse?> GetStatsAsync(string shortCode, string rawOwnerToken, CancellationToken cancellationToken);
    Task<DynamicQrStatsResponse?> GetStatsForUserAsync(string shortCode, Guid userId, CancellationToken cancellationToken);
    Task<IReadOnlyList<DynamicQrListItemResponse>> ListForUserAsync(Guid userId, CancellationToken cancellationToken);
}
