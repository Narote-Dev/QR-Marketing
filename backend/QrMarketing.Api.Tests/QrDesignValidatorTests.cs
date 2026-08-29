using System.Text;
using System.Text.Json;
using Xunit;

namespace QrMarketing.Api.Tests;

public class QrDesignValidatorTests
{
    [Fact]
    public void TryNormalize_accepts_null_design()
    {
        var ok = QrMarketing.Api.Services.QrDesignValidator.TryNormalize(null, out var json, out var error);
        Assert.True(ok);
        Assert.Null(json);
        Assert.Null(error);
    }

    [Fact]
    public void TryNormalize_rejects_non_object()
    {
        using var doc = JsonDocument.Parse("\"not-an-object\"");
        var ok = QrMarketing.Api.Services.QrDesignValidator.TryNormalize(doc.RootElement, out _, out var error);
        Assert.False(ok);
        Assert.Equal("design.invalid", error);
    }

    [Fact]
    public void TryNormalize_rejects_oversized_payload()
    {
        var big = new string('x', QrMarketing.Api.Services.QrDesignValidator.MaxUtf8Bytes + 1);
        using var doc = JsonDocument.Parse($"{{\"logo\":\"{big}\"}}");
        var ok = QrMarketing.Api.Services.QrDesignValidator.TryNormalize(doc.RootElement, out _, out var error);
        Assert.False(ok);
        Assert.Equal("design.too_large", error);
    }

    [Fact]
    public void TryNormalize_accepts_compact_design()
    {
        using var doc = JsonDocument.Parse("{\"foregroundColor\":\"#000\",\"backgroundColor\":\"#fff\",\"size\":280}");
        var ok = QrMarketing.Api.Services.QrDesignValidator.TryNormalize(doc.RootElement, out var json, out var error);
        Assert.True(ok);
        Assert.NotNull(json);
        Assert.Null(error);
        Assert.True(Encoding.UTF8.GetByteCount(json!) <= QrMarketing.Api.Services.QrDesignValidator.MaxUtf8Bytes);
    }
}
