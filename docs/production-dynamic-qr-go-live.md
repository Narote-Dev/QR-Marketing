# Production go-live: Dynamic QR

## Current production map

| Piece | Where |
|-------|--------|
| Frontend | Vercel project `build-your-qr` → https://genmyqrcode.com |
| DNS | Cloudflare zone `genmyqrcode.com` (CNAME → Vercel, not proxied) |
| API + Postgres | **Not deployed yet** (required for create/redirect) |

## Enable sequence

1. Create Railway project from this repo (Dockerfile: `backend/Dockerfile`).
2. Add Railway Postgres plugin (or Neon) and set:
   - `ConnectionStrings__DefaultConnection` **or** `DATABASE_URL`
   - `DynamicQr__Enabled=true`
   - `DynamicQr__PublicBaseUrl=https://genmyqrcode.com`
   - `Cors__AllowedOrigins__0=https://genmyqrcode.com`
   - `Cors__AllowedOrigins__1=https://www.genmyqrcode.com`
   - `ASPNETCORE_ENVIRONMENT=Production`
3. Attach a public Railway domain (e.g. `https://qrmarketing-api.up.railway.app`).
4. In Vercel project env (Production):
   - `DYNAMIC_QR_API_ORIGIN=https://qrmarketing-api.up.railway.app`
   - `NEXT_PUBLIC_API_BASE_URL=https://genmyqrcode.com`
   - `NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true`
   - `NEXT_PUBLIC_SITE_URL=https://genmyqrcode.com`
5. Redeploy Vercel so `next.config.mjs` rewrites `/r/*` and `/api/dynamic-qr/*` to the API.
6. Smoke: create Dynamic QR on site → short URL on `genmyqrcode.com/r/...` → 302 → destination.

API applies EF migrations on startup outside Development.
