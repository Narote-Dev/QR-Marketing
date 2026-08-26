namespace QrMarketing.Api.Options;

public sealed class DynamicQrOptions
{
    public const string SectionName = "DynamicQr";

    /// <summary>Master kill-switch. When false, create/manage APIs return 404.</summary>
    public bool Enabled { get; set; }

    /// <summary>Public origin used to build short URLs (staging or local, not prod until go-live).</summary>
    public string PublicBaseUrl { get; set; } = "http://localhost:8080";

    public int ShortCodeLength { get; set; } = 8;
}
