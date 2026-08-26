using Xunit;
using QrMarketing.Api.Services;

namespace QrMarketing.Api.Tests;

public class OwnerTokenHasherTests
{
    [Fact]
    public void Hash_is_stable_64_hex_chars()
    {
        var raw = OwnerTokenHasher.CreateRawToken();
        var hash1 = OwnerTokenHasher.Hash(raw);
        var hash2 = OwnerTokenHasher.Hash(raw);
        Assert.Equal(64, hash1.Length);
        Assert.Equal(hash1, hash2);
        Assert.NotEqual(raw, hash1);
    }

    [Fact]
    public void CreateRawToken_is_unique()
    {
        var a = OwnerTokenHasher.CreateRawToken();
        var b = OwnerTokenHasher.CreateRawToken();
        Assert.NotEqual(a, b);
        Assert.Equal(64, a.Length);
    }
}
