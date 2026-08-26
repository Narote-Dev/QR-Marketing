using Xunit;
using QrMarketing.Api.Services;

namespace QrMarketing.Api.Tests;

public class DestinationUrlValidatorTests
{
    [Theory]
    [InlineData("https://example.com/menu", "https://example.com/menu")]
    [InlineData(" http://example.com ", "http://example.com/")]
    public void TryNormalize_accepts_http_https(string input, string expected)
    {
        var ok = DestinationUrlValidator.TryNormalize(input, out var normalized, out var error);
        Assert.True(ok);
        Assert.Null(error);
        Assert.Equal(expected, normalized);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData("javascript:alert(1)")]
    [InlineData("ftp://files.example.com")]
    [InlineData("not-a-url")]
    [InlineData("example.com")]
    public void TryNormalize_rejects_unsafe_or_invalid(string? input)
    {
        var ok = DestinationUrlValidator.TryNormalize(input, out _, out var error);
        Assert.False(ok);
        Assert.False(string.IsNullOrWhiteSpace(error));
    }

    [Fact]
    public void TryNormalize_rejects_overlong_urls()
    {
        var input = "https://example.com/" + new string('a', 2100);
        var ok = DestinationUrlValidator.TryNormalize(input, out _, out var error);
        Assert.False(ok);
        Assert.Contains("2048", error);
    }
}
