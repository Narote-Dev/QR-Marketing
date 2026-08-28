namespace QrMarketing.Api.Options;

public sealed class AuthOptions
{
    public const string SectionName = "Auth";

    /// <summary>Clerk issuer URL, e.g. https://clerk.example.com</summary>
    public string? ClerkAuthority { get; set; }

    /// <summary>JWT audience (Clerk frontend API or custom).</summary>
    public string? ClerkAudience { get; set; }

    /// <summary>Allow X-Dev-User-Id header in Development for local testing without Clerk.</summary>
    public bool AllowDevUserHeader { get; set; }

    public string DevUserHeaderName { get; set; } = "X-Dev-User-Id";
}
