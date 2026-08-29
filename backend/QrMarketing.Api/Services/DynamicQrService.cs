using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using QrMarketing.Api.Contracts;
using QrMarketing.Api.Data;
using QrMarketing.Api.Data.Entities;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services.Entitlements;

namespace QrMarketing.Api.Services;

public sealed class DynamicQrService(
    QrMarketingDbContext dbContext,
    IOptions<DynamicQrOptions> options,
    IEntitlementService entitlementService,
    IQuotaCounterService quotaCounterService,
    ILogger<DynamicQrService> logger) : IDynamicQrService
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
        if (!QrDesignValidator.TryNormalize(request.Design, out var designJson, out var designError))
        {
            throw new ArgumentException(designError);
        }

        var rawToken = OwnerTokenHasher.CreateRawToken();
        var tokenHash = OwnerTokenHasher.Hash(rawToken);
        var now = DateTimeOffset.UtcNow;

        // Step 2: Allocate a unique short code (retry on rare collisions).
        var shortCode = await AllocateShortCodeAsync(cancellationToken);

        // Step 3: Persist master record with hashed owner token only (legacy local flow).
        var entity = new DynamicQr
        {
            Id = Guid.NewGuid(),
            ShortCode = shortCode,
            OwnerTokenHash = tokenHash,
            DestinationUrl = destinationUrl,
            Label = label,
            DesignJson = designJson,
            IsActive = true,
            CreatedAt = now,
            UpdatedAt = now,
        };
        dbContext.DynamicQrs.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return ToCreateResponse(entity, rawToken);
    }

    public async Task<CreateDynamicQrResponse> CreateForUserAsync(
        CreateDynamicQrRequest request,
        Guid userId,
        CancellationToken cancellationToken)
    {
        // Step 1: Enforce plan quota before create.
        var entitlement = await entitlementService.CanCreateDynamicQrAsync(userId, cancellationToken);
        if (!entitlement.Allowed)
        {
            throw new QuotaExceededException(entitlement);
        }

        if (!DestinationUrlValidator.TryNormalize(request.DestinationUrl, out var destinationUrl, out var error))
        {
            throw new ArgumentException(error);
        }

        var label = NormalizeLabel(request.Label);
        if (!QrDesignValidator.TryNormalize(request.Design, out var designJson, out var designError))
        {
            throw new ArgumentException(designError);
        }

        var now = DateTimeOffset.UtcNow;
        var shortCode = await AllocateShortCodeAsync(cancellationToken);

        // Step 2: Persist user-owned QR without legacy owner token.
        var entity = new DynamicQr
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ShortCode = shortCode,
            DestinationUrl = destinationUrl,
            Label = label,
            DesignJson = designJson,
            IsActive = true,
            CreatedAt = now,
            UpdatedAt = now,
        };
        dbContext.DynamicQrs.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return ToCreateResponse(entity, manageToken: string.Empty);
    }

    public async Task<string?> ResolveRedirectUrlAsync(
        string shortCode,
        string? userAgent,
        string? country,
        string? referrer,
        CancellationToken cancellationToken)
    {
        var resolution = await ResolveRedirectAsync(shortCode, userAgent, country, referrer, cancellationToken);
        return resolution?.DestinationUrl;
    }

    public async Task<RedirectResolution?> ResolveRedirectAsync(
        string shortCode,
        string? userAgent,
        string? country,
        string? referrer,
        CancellationToken cancellationToken)
    {
        // Step 1: Lookup active code by short_code (read path must stay fast).
        var entity = await dbContext.DynamicQrs
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.ShortCode == shortCode, cancellationToken);

        if (entity is null || !entity.IsActive)
        {
            return null;
        }

        // Step 2: Decide whether scan logging is allowed (legacy rows without user always log).
        var shouldLog = true;
        var quotaExceeded = false;
        if (entity.UserId is Guid userId)
        {
            var entitlement = await entitlementService.CanLogScanAsync(userId, cancellationToken);
            shouldLog = entitlement.Allowed;
            quotaExceeded = !entitlement.Allowed;
        }

        if (shouldLog)
        {
            // Step 3: Best-effort logging — redirect must not fail if DB write fails.
            try
            {
                await LogScanAsync(entity, userAgent, country, referrer, cancellationToken);
            }
            catch (Exception ex)
            {
                logger.LogWarning(ex, "Scan logging failed for short code {ShortCode}", shortCode);
            }
        }

        return new RedirectResolution
        {
            DestinationUrl = entity.DestinationUrl,
            ScanLogged = shouldLog,
            QuotaExceeded = quotaExceeded,
        };
    }

    public async Task<DynamicQrDetailsResponse?> GetAsync(string shortCode, string rawOwnerToken, CancellationToken cancellationToken)
    {
        var entity = await FindOwnedByTokenAsync(shortCode, rawOwnerToken, cancellationToken);
        return entity is null ? null : ToDetails(entity);
    }

    public async Task<DynamicQrDetailsResponse?> GetForUserAsync(string shortCode, Guid userId, CancellationToken cancellationToken)
    {
        var entity = await FindOwnedByUserAsync(shortCode, userId, cancellationToken);
        return entity is null ? null : ToDetails(entity);
    }

    public async Task<DynamicQrDetailsResponse?> UpdateAsync(
        string shortCode,
        string rawOwnerToken,
        UpdateDynamicQrRequest request,
        CancellationToken cancellationToken)
    {
        var entity = await FindOwnedByTokenAsync(shortCode, rawOwnerToken, cancellationToken);
        if (entity is null)
        {
            return null;
        }

        ApplyUpdates(entity, request);
        await dbContext.SaveChangesAsync(cancellationToken);
        return ToDetails(entity);
    }

    public async Task<DynamicQrDetailsResponse?> UpdateForUserAsync(
        string shortCode,
        Guid userId,
        UpdateDynamicQrRequest request,
        CancellationToken cancellationToken)
    {
        var entity = await FindOwnedByUserAsync(shortCode, userId, cancellationToken);
        if (entity is null)
        {
            return null;
        }

        ApplyUpdates(entity, request);
        await dbContext.SaveChangesAsync(cancellationToken);
        return ToDetails(entity);
    }

    public async Task<DynamicQrStatsResponse?> GetStatsAsync(string shortCode, string rawOwnerToken, CancellationToken cancellationToken)
    {
        var entity = await FindOwnedByTokenAsync(shortCode, rawOwnerToken, cancellationToken);
        return entity is null ? null : await ToStatsAsync(entity, cancellationToken);
    }

    public async Task<DynamicQrStatsResponse?> GetStatsForUserAsync(
        string shortCode,
        Guid userId,
        CancellationToken cancellationToken)
    {
        var entity = await FindOwnedByUserAsync(shortCode, userId, cancellationToken);
        return entity is null ? null : await ToStatsAsync(entity, cancellationToken);
    }

    public async Task<IReadOnlyList<DynamicQrListItemResponse>> ListForUserAsync(
        Guid userId,
        CancellationToken cancellationToken)
    {
        // Step 1: List user-owned codes newest first.
        var rows = await dbContext.DynamicQrs
            .AsNoTracking()
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);

        return rows.Select(x => new DynamicQrListItemResponse
        {
            ShortCode = x.ShortCode,
            ShortUrl = BuildShortUrl(x.ShortCode),
            DestinationUrl = x.DestinationUrl,
            Label = x.Label,
            Design = ParseDesignJson(x.DesignJson),
            IsActive = x.IsActive,
            TotalScans = x.ScanCountCached,
            CreatedAt = x.CreatedAt,
            UpdatedAt = x.UpdatedAt,
        }).ToList();
    }

    private async Task LogScanAsync(
        DynamicQr entity,
        string? userAgent,
        string? country,
        string? referrer,
        CancellationToken cancellationToken)
    {
        // Step 1: Track attached entity for counter updates.
        var tracked = await dbContext.DynamicQrs.FirstAsync(x => x.Id == entity.Id, cancellationToken);
        var scan = new ScanEvent
        {
            QrId = tracked.Id,
            ScannedAt = DateTimeOffset.UtcNow,
            DeviceType = DeviceTypeParser.FromUserAgent(userAgent),
            Country = NormalizeCountry(country),
            Referrer = Truncate(referrer, 255),
        };
        dbContext.ScanEvents.Add(scan);
        tracked.ScanCountCached += 1;
        tracked.UpdatedAt = DateTimeOffset.UtcNow;

        // Step 2: Increment user quota meter when owned by an account.
        if (tracked.UserId is Guid userId)
        {
            await quotaCounterService.IncrementScanLoggedAsync(userId, cancellationToken);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task<string> AllocateShortCodeAsync(CancellationToken cancellationToken)
    {
        for (var attempt = 0; ; attempt++)
        {
            var shortCode = ShortCodeGenerator.Create(_options.ShortCodeLength);
            var exists = await dbContext.DynamicQrs.AnyAsync(x => x.ShortCode == shortCode, cancellationToken);
            if (!exists)
            {
                return shortCode;
            }

            if (attempt >= 7)
            {
                throw new InvalidOperationException("Unable to allocate a unique short code.");
            }
        }
    }

    private async Task<DynamicQr?> FindOwnedByTokenAsync(
        string shortCode,
        string rawOwnerToken,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(rawOwnerToken))
        {
            return null;
        }

        var hash = OwnerTokenHasher.Hash(rawOwnerToken.Trim());
        return await dbContext.DynamicQrs
            .FirstOrDefaultAsync(x => x.ShortCode == shortCode && x.OwnerTokenHash == hash, cancellationToken);
    }

    private async Task<DynamicQr?> FindOwnedByUserAsync(
        string shortCode,
        Guid userId,
        CancellationToken cancellationToken) =>
        await dbContext.DynamicQrs
            .FirstOrDefaultAsync(x => x.ShortCode == shortCode && x.UserId == userId, cancellationToken);

    private void ApplyUpdates(DynamicQr entity, UpdateDynamicQrRequest request)
    {
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
    }

    private CreateDynamicQrResponse ToCreateResponse(DynamicQr entity, string manageToken) => new()
    {
        ShortCode = entity.ShortCode,
        ShortUrl = BuildShortUrl(entity.ShortCode),
        ManageToken = manageToken,
        DestinationUrl = entity.DestinationUrl,
        Label = entity.Label,
        CreatedAt = entity.CreatedAt,
    };

    private DynamicQrDetailsResponse ToDetails(DynamicQr entity) => new()
    {
        ShortCode = entity.ShortCode,
        ShortUrl = BuildShortUrl(entity.ShortCode),
        DestinationUrl = entity.DestinationUrl,
        Label = entity.Label,
        Design = ParseDesignJson(entity.DesignJson),
        IsActive = entity.IsActive,
        CreatedAt = entity.CreatedAt,
        UpdatedAt = entity.UpdatedAt,
    };

    private static JsonElement? ParseDesignJson(string? designJson)
    {
        if (string.IsNullOrWhiteSpace(designJson))
        {
            return null;
        }

        using var doc = JsonDocument.Parse(designJson);
        return doc.RootElement.Clone();
    }

    private async Task<DynamicQrStatsResponse> ToStatsAsync(DynamicQr entity, CancellationToken cancellationToken)
    {
        var total = await dbContext.ScanEvents.LongCountAsync(x => x.QrId == entity.Id, cancellationToken);
        return new DynamicQrStatsResponse
        {
            ShortCode = entity.ShortCode,
            TotalScans = total,
        };
    }

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

public sealed class QuotaExceededException(EntitlementResult result) : Exception(result.Message ?? "Quota exceeded.")
{
    public EntitlementResult Result { get; } = result;
}
