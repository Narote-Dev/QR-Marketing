namespace QrMarketing.Api.Contracts;

public sealed class CreateDynamicQrRequest
{
    public string DestinationUrl { get; set; } = string.Empty;
    public string? Label { get; set; }
}

public sealed class CreateDynamicQrResponse
{
    public string ShortCode { get; set; } = string.Empty;
    public string ShortUrl { get; set; } = string.Empty;
    public string ManageToken { get; set; } = string.Empty;
    public string DestinationUrl { get; set; } = string.Empty;
    public string? Label { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}

public sealed class UpdateDynamicQrRequest
{
    public string? DestinationUrl { get; set; }
    public string? Label { get; set; }
    public bool? IsActive { get; set; }
}

public sealed class DynamicQrDetailsResponse
{
    public string ShortCode { get; set; } = string.Empty;
    public string ShortUrl { get; set; } = string.Empty;
    public string DestinationUrl { get; set; } = string.Empty;
    public string? Label { get; set; }
    public bool IsActive { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}

public sealed class DynamicQrStatsResponse
{
    public string ShortCode { get; set; } = string.Empty;
    public long TotalScans { get; set; }
}
