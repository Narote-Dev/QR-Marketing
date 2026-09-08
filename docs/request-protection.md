# Request protection configuration

The API runs forwarded-header processing before authentication, current-user resolution, and endpoint rate limiting. POST and PATCH share 30 writes/hour per resolved user. Unauthenticated writes fall back to the transport/client IP. Redirects allow 120/minute per IP. These in-memory limits apply per API instance.

## Trusted proxies

By default the API ignores forwarded IP/protocol and country headers. Configure `RequestProtection` through ASP.NET configuration only after verifying the actual deployment route. This session did not verify Railway/Vercel proxy addresses or their header rewriting behavior.

| Setting | Default | Meaning |
| --- | --- | --- |
| `KnownProxies` | `[]` | Explicit proxy IP addresses allowed to forward client IP/protocol |
| `KnownNetworks` | `[]` | Trusted proxy CIDR networks; keep scope narrow |
| `ForwardLimit` | `1` | Maximum trusted hops processed from right to left |
| `CountryHeaderName` | unset | Single country header to consume; unset disables collection |
| `CountryHeaderKnownProxies` | `[]` | Immediate transport peer IPs trusted to supply that header |

Array environment variables use indexed keys, such as `RequestProtection__KnownProxies__0`. Never clear trust checks or configure all-address networks to make forwarding work. Empty trust lists disable forwarding rather than accepting arbitrary headers.

For a Vercel → Railway route, inspect the complete actual chain and whether Railway preserves or overwrites incoming forwarding values. Add only verified proxy addresses/networks and choose a hop limit matching that chain. Check both frontend-proxied and direct API requests; the public API can otherwise provide a bypass. Without configured IP trust, users behind one proxy share a redirect limiter partition.

Country collection is separately opt-in. The immediate peer must overwrite/remove client-supplied values on every ingress path before its IP can enter `CountryHeaderKnownProxies`. Merely forwarding `CF-IPCountry` or `X-Country-Code` is insufficient. The API captures country before forwarded headers replace the peer IP, accepts one two-letter ASCII value, and uppercases it. Unknown or untrusted country stays null.

## Preview checks before release

1. Confirm two authenticated users have independent write limits, and POST plus PATCH consume the same user's allowance.
2. Confirm two real clients behind the deployment route obtain distinct redirect partitions.
3. Send spoofed forwarded IP/country headers through both entry points; they must not override verified client identity/country.
4. Confirm legitimate forwarding and country metadata only after enabling the verified configuration.
5. Confirm `X-Owner-Token` cannot create/read/update/stats outside Development, even if `DynamicQr__AllowLegacyOwnerToken=true`.

Legacy owner-token operations require both Development and their explicit flag. Development user-header authentication also requires Development and its separate flag. Production deployment and environment changes require release approval. Roll back the release/config together if preview or production smoke checks reveal an incorrect proxy chain; disabling country collection is safe, while disabling forwarded-IP trust again shares rate limits at the proxy address.
