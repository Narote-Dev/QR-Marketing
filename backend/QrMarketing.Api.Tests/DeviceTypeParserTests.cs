using Xunit;
using QrMarketing.Api.Services;

namespace QrMarketing.Api.Tests;

public class DeviceTypeParserTests
{
    [Theory]
    [InlineData("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)", "mobile")]
    [InlineData("Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 Mobile", "mobile")]
    [InlineData("Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X)", "tablet")]
    [InlineData("Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "desktop")]
    [InlineData(null, null)]
    [InlineData("", null)]
    public void FromUserAgent_classifies_devices(string? ua, string? expected)
    {
        Assert.Equal(expected, DeviceTypeParser.FromUserAgent(ua));
    }
}
