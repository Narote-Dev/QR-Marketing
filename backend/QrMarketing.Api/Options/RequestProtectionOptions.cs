namespace QrMarketing.Api.Options;

public sealed class RequestProtectionOptions
{
    public const string SectionName = "RequestProtection";
    public string[] KnownProxies { get; set; } = [];
    public string[] KnownNetworks { get; set; } = [];
    public int ForwardLimit { get; set; } = 1;

    // Enable only when this peer overwrites the header, including on direct API requests.
    public string? CountryHeaderName { get; set; }
    public string[] CountryHeaderKnownProxies { get; set; } = [];
}
