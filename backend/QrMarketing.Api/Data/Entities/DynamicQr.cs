namespace QrMarketing.Api.Data.Entities;

public sealed class DynamicQr
{
    public Guid Id { get; set; }
    public string ShortCode { get; set; } = string.Empty;
    public string OwnerTokenHash { get; set; } = string.Empty;
    public string DestinationUrl { get; set; } = string.Empty;
    public string? Label { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    public ICollection<ScanEvent> ScanEvents { get; set; } = new List<ScanEvent>();
}
