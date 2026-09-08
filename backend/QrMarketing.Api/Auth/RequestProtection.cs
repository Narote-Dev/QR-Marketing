using System.Net;
using Microsoft.AspNetCore.HttpOverrides;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services.Users;

namespace QrMarketing.Api.Auth;

public static class RequestProtection
{
    private const string CountryItemKey = "TrustedScanCountry";

    public static void ConfigureForwarding(ForwardedHeadersOptions target, RequestProtectionOptions source)
    {
        if (source.ForwardLimit < 1) throw new InvalidOperationException("RequestProtection:ForwardLimit must be positive.");
        target.KnownProxies.Clear();
        target.KnownNetworks.Clear();
        foreach (var proxy in source.KnownProxies) target.KnownProxies.Add(IPAddress.Parse(proxy));
        foreach (var network in source.KnownNetworks)
        {
            var parts = network.Split('/');
            if (parts.Length != 2) throw new InvalidOperationException("KnownNetworks must use CIDR notation.");
            target.KnownNetworks.Add(new Microsoft.AspNetCore.HttpOverrides.IPNetwork(IPAddress.Parse(parts[0]), int.Parse(parts[1])));
        }
        target.ForwardLimit = source.ForwardLimit;
        // Empty trust lists in ASP.NET mean trust all; disable processing instead.
        target.ForwardedHeaders = target.KnownProxies.Count + target.KnownNetworks.Count == 0
            ? ForwardedHeaders.None
            : ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    }

    public static IPAddress[] ParseCountryHeaderKnownProxies(RequestProtectionOptions source) =>
        source.CountryHeaderKnownProxies.Select(value =>
            IPAddress.TryParse(value, out var address)
                ? address.MapToIPv6()
                : throw new InvalidOperationException($"RequestProtection:CountryHeaderKnownProxies contains invalid IP address '{value}'."))
        .ToArray();

    public static string WritePartition(HttpContext context) =>
        context.Items[CurrentUserAccessor.UserIdItemKey] is Guid userId
            ? $"user:{userId}"
            : $"ip:{context.Connection.RemoteIpAddress}";

    // Called before forwarded headers change RemoteIpAddress: trust the transport peer.
    public static void CaptureCountry(HttpContext context, RequestProtectionOptions options, IReadOnlyCollection<IPAddress> trustedPeers)
    {
        context.Items.Remove(CountryItemKey);
        if (string.IsNullOrWhiteSpace(options.CountryHeaderName) || context.Connection.RemoteIpAddress is not { } peer) return;
        if (!trustedPeers.Contains(peer.MapToIPv6())) return;
        var values = context.Request.Headers[options.CountryHeaderName];
        if (values.Count != 1) return;
        var value = values[0];
        if (value is not { Length: 2 } || !value.All(char.IsAsciiLetter)) return;
        context.Items[CountryItemKey] = value.ToUpperInvariant();
    }

    public static string? GetCountry(HttpContext context) => context.Items[CountryItemKey] as string;
}
