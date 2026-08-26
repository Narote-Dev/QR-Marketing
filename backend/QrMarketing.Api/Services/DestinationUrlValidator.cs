namespace QrMarketing.Api.Services;

public static class DestinationUrlValidator
{
    public static bool TryNormalize(string? input, out string normalized, out string? error)
    {
        normalized = string.Empty;
        error = null;

        if (string.IsNullOrWhiteSpace(input))
        {
            error = "Destination URL is required.";
            return false;
        }

        var trimmed = input.Trim();
        if (trimmed.Length > 2048)
        {
            error = "Destination URL must be at most 2048 characters.";
            return false;
        }

        if (!Uri.TryCreate(trimmed, UriKind.Absolute, out var uri))
        {
            error = "Destination URL must be an absolute URL.";
            return false;
        }

        if (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps)
        {
            error = "Destination URL must use http or https.";
            return false;
        }

        normalized = uri.AbsoluteUri;
        return true;
    }
}
