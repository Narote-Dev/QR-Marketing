namespace QrMarketing.Api.Data.Entities;

public sealed class DynamicQr
{
    public Guid Id { get; set; }
    public Guid? UserId { get; set; }
    public string ShortCode { get; set; } = string.Empty;
    public string? OwnerTokenHash { get; set; }
    public string DestinationUrl { get; set; } = string.Empty;
    public string? Label { get; set; }
    /// <summary>Serialized QrDesign JSON snapshot at create time (client re-renders PNG/SVG).</summary>
    public string? DesignJson { get; set; }
    public bool IsActive { get; set; } = true;
    public long ScanCountCached { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    public User? User { get; set; }
    public ICollection<ScanEvent> ScanEvents { get; set; } = new List<ScanEvent>();
}
