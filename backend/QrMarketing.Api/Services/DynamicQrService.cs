using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using QrMarketing.Api.Contracts;
using QrMarketing.Api.Data;
using QrMarketing.Api.Data.Entities;
using QrMarketing.Api.Options;

namespace QrMarketing.Api.Services;

public sealed class DynamicQrService(
    QrMarketingDbContext dbContext,
    IOptions<DynamicQrOptions> options) : IDynamicQrService
{
    private readonly DynamicQrOptions _options = options.Value;

    public async Task<CreateDynamicQrResponse> CreateAsync(CreateDynamicQrRequest request, CancellationToken cancellationToken)
    {
        // Step 1: Validate and normalize destination URL (http/https only).
        if (!DestinationUrlValidator.TryNormalize(request.DestinationUrl, out var destinationUrl, out var error))
        {
            throw new ArgumentException(error);
        }

        var label = NormalizeLabel(request.Label);
        var rawToken = OwnerTokenHasher.CreateRawToken();
        var tokenHash = OwnerTokenHasher.Hash(rawToken);
        var now = DateTimeOffset.UtcNow;

        // Step 2: Allocate a unique short code (retry on rare collisions).
        string shortCode;
        for (var attempt = 0; ; attempt++)
        {
            shortCode = ShortCodeGenerator.Create(_options.ShortCodeLength);
            var exists = await dbContext.DynamicQrs.AnyAsync(x => x.ShortCode == shortCode, cancellationToken);
            if (!exists)
            {
                break;
            }

            if (attempt >= 7)
            {
                throw new InvalidOperationException("Unable to allocate a unique short code.");
            }
        }

        // Step 3: Persist master record with hashed owner token only.
        var entity = new DynamicQr
        {
            Id = Guid.NewGuid(),
            ShortCode = shortCode,
            OwnerTokenHash = tokenHash,
            DestinationUrl = destinationUrl,
            Label = label,
            IsActive = true,
            CreatedAt = now,
            UpdatedAt = now,
        };
        dbContext.DynamicQrs.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return new CreateDynamicQrResponse
        {
            ShortCode = entity.ShortCode,
            ShortUrl = BuildShortUrl(entity.ShortCode),
            ManageToken = rawToken,
            DestinationUrl = entity.DestinationUrl,
            Label = entity.Label,
            CreatedAt = entity.CreatedAt,
        };
    }

    public async Task<string?> ResolveRedirectUrlAsync(
        string shortCode,
        string? userAgent,
        string? country,
        string? referrer,
        CancellationToken cancellationToken)
    {
        // Step 1: Lookup active code by short_code.
        var entity = await dbContext.DynamicQrs
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.ShortCode == shortCode, cancellationToken);

        if (entity is null || !entity.IsActive)
        {
            return null;
        }

        // Step 2: Append scan event (best-effort logging; redirect still uses current destination).
        var scan = new ScanEvent
        {
            QrId = entity.Id,
            ScannedAt = DateTimeOffset.UtcNow,
            DeviceType = DeviceTypeParser.FromUserAgent(userAgent),
            Country = NormalizeCountry(country),
            Referrer = Truncate(referrer, 255),
        };
        dbContext.ScanEvents.Add(scan);
        await dbContext.SaveChangesAsync(cancellationToken);

        return entity.DestinationUrl;
    }

    public async Task<DynamicQrDetailsResponse?> GetAsync(string shortCode, string rawOwnerToken, CancellationToken cancellationToken)
    {
        var entity = await FindOwnedAsync(shortCode, rawOwnerToken, cancellationToken);
        return entity is null ? null : ToDetails(entity);
    }

    public async Task<DynamicQrDetailsResponse?> UpdateAsync(
        string shortCode,
        string rawOwnerToken,
        UpdateDynamicQrRequest request,
        CancellationToken cancellationToken)
    {
        // Step 1: Authorize by owner token hash.
        var entity = await FindOwnedAsync(shortCode, rawOwnerToken, cancellationToken);
        if (entity is null)
        {
            return null;
        }

        // Step 2: Apply allowed field updates.
        if (request.DestinationUrl is not null)
        {
            if (!DestinationUrlValidator.TryNormalize(request.DestinationUrl, out var destinationUrl, out var error))
            {
                throw new ArgumentException(error);
            }

            entity.DestinationUrl = destinationUrl;
        }

        if (request.Label is not null)
        {
            entity.Label = NormalizeLabel(request.Label);
        }

        if (request.IsActive is not null)
        {
            entity.IsActive = request.IsActive.Value;
        }

        entity.UpdatedAt = DateTimeOffset.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);
        return ToDetails(entity);
    }

    public async Task<DynamicQrStatsResponse?> GetStatsAsync(string shortCode, string rawOwnerToken, CancellationToken cancellationToken)
    {
        var entity = await FindOwnedAsync(shortCode, rawOwnerToken, cancellationToken);
        if (entity is null)
        {
            return null;
        }

        var total = await dbContext.ScanEvents.LongCountAsync(x => x.QrId == entity.Id, cancellationToken);
        return new DynamicQrStatsResponse
        {
            ShortCode = entity.ShortCode,
            TotalScans = total,
        };
    }

    private async Task<DynamicQr?> FindOwnedAsync(string shortCode, string rawOwnerToken, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(rawOwnerToken))
        {
            return null;
        }

        var hash = OwnerTokenHasher.Hash(rawOwnerToken.Trim());
        return await dbContext.DynamicQrs
            .FirstOrDefaultAsync(x => x.ShortCode == shortCode && x.OwnerTokenHash == hash, cancellationToken);
    }

    private DynamicQrDetailsResponse ToDetails(DynamicQr entity) => new()
    {
        ShortCode = entity.ShortCode,
        ShortUrl = BuildShortUrl(entity.ShortCode),
        DestinationUrl = entity.DestinationUrl,
        Label = entity.Label,
        IsActive = entity.IsActive,
        CreatedAt = entity.CreatedAt,
        UpdatedAt = entity.UpdatedAt,
    };

    private string BuildShortUrl(string shortCode)
    {
        var baseUrl = _options.PublicBaseUrl.TrimEnd('/');
        return $"{baseUrl}/r/{shortCode}";
    }

    private static string? NormalizeLabel(string? label)
    {
        if (string.IsNullOrWhiteSpace(label))
        {
            return null;
        }

        var trimmed = label.Trim();
        return trimmed.Length <= 100 ? trimmed : trimmed[..100];
    }

    private static string? NormalizeCountry(string? country)
    {
        if (string.IsNullOrWhiteSpace(country) || country.Length != 2)
        {
            return null;
        }

        return country.ToUpperInvariant();
    }

    private static string? Truncate(string? value, int max)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var trimmed = value.Trim();
        return trimmed.Length <= max ? trimmed : trimmed[..max];
    }
}
