using Xunit;
using QrMarketing.Api.Services;

namespace QrMarketing.Api.Tests;

public class ShortCodeGeneratorTests
{
    [Fact]
    public void Create_returns_requested_length_from_safe_alphabet()
    {
        var code = ShortCodeGenerator.Create(8);
        Assert.Equal(8, code.Length);
        Assert.Matches("^[A-Za-z2-9]+$", code);
        Assert.DoesNotContain("0", code);
        Assert.DoesNotContain("1", code);
        Assert.DoesNotContain("O", code);
        Assert.DoesNotContain("l", code);
        Assert.DoesNotContain("I", code);
    }

    [Theory]
    [InlineData(5)]
    [InlineData(11)]
    public void Create_rejects_out_of_range_length(int length)
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => ShortCodeGenerator.Create(length));
    }
}
