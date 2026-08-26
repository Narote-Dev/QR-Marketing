namespace QrMarketing.Api.Data.Entities;

public sealed class ScanEvent
{
    public long Id { get; set; }
    public Guid QrId { get; set; }
    public DateTimeOffset ScannedAt { get; set; }
    public string? DeviceType { get; set; }
    public string? Country { get; set; }
    public string? Referrer { get; set; }

    public DynamicQr Qr { get; set; } = null!;
}
