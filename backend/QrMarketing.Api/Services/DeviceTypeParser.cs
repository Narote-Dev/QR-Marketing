namespace QrMarketing.Api.Services;

public static class DeviceTypeParser
{
    public static string? FromUserAgent(string? userAgent)
    {
        if (string.IsNullOrWhiteSpace(userAgent))
        {
            return null;
        }

        var ua = userAgent.ToLowerInvariant();
        if (ua.Contains("ipad") || ua.Contains("tablet") || (ua.Contains("android") && !ua.Contains("mobile")))
        {
            return "tablet";
        }

        if (ua.Contains("mobi") || ua.Contains("iphone") || ua.Contains("android"))
        {
            return "mobile";
        }

        return "desktop";
    }
}
