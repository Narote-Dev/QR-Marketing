using System.Text;
using System.Text.Json;

namespace QrMarketing.Api.Services;

/// <summary>
/// Validates optional QR design JSON stored on dynamic_qr rows (client-rendered PNG/SVG).
/// </summary>
public static class QrDesignValidator
{
    /// <summary>Keep Neon storage small during early launch (&lt; $6/mo budget).</summary>
    public const int MaxUtf8Bytes = 32 * 1024;

    public static bool TryNormalize(JsonElement? design, out string? normalizedJson, out string? error)
    {
        normalizedJson = null;
        error = null;

        if (design is null || design.Value.ValueKind is JsonValueKind.Null or JsonValueKind.Undefined)
        {
            return true;
        }

        if (design.Value.ValueKind is not JsonValueKind.Object)
        {
            error = "design.invalid";
            return false;
        }

        var raw = design.Value.GetRawText();
        var byteCount = Encoding.UTF8.GetByteCount(raw);
        if (byteCount > MaxUtf8Bytes)
        {
            error = "design.too_large";
            return false;
        }

        normalizedJson = raw;
        return true;
    }
}
