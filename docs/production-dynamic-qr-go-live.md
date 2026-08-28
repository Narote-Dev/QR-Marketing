# Production go-live: Dynamic QR (Phase 5)

Requires **Phase 1–4 complete** on staging. See [`plan-dynamic-qr-integrated-roadmap.md`](./plan-dynamic-qr-integrated-roadmap.md) and [`spec-dynamic-qr-v1-accounts-scale.md`](./spec-dynamic-qr-v1-accounts-scale.md).

## Current production map

| Piece | Where |
|-------|--------|
| Frontend | Vercel `build-your-qr` → https://genmyqrcode.com |
| DNS | Cloudflare `genmyqrcode.com` → Vercel |
| Auth | Clerk (Phase 2+) |
| API + Postgres | Neon + Railway (Phase 1+) — **not live until Phase 5** |

---

## Phase 1 — Infra only (flags off on prod)

1. Create Neon project; copy `DATABASE_URL`.
2. Railway project from `backend/Dockerfile`; set:
   - `ConnectionStrings__DefaultConnection` or `DATABASE_URL`
   - `DynamicQr__Enabled=true` (**staging** only first)
   - `DynamicQr__PublicBaseUrl=https://genmyqrcode.com` (or staging origin for tests)
   - `Cors__AllowedOrigins__0=https://genmyqrcode.com`
   - `Cors__AllowedOrigins__1=https://www.genmyqrcode.com`
   - `ASPNETCORE_ENVIRONMENT=Production`
3. Public Railway URL (e.g. `https://qrmarketing-api.up.railway.app`).
4. Vercel preview/staging: `DYNAMIC_QR_API_ORIGIN=<Railway URL>`.
5. Smoke: `GET /health`; manual create + `GET /r/{code}` → 302 on **staging**.
6. **Production:** keep `DynamicQr__Enabled=false` and `NEXT_PUBLIC_ENABLE_DYNAMIC_QR` unset/false.

---

## Phase 2 — Clerk

1. Create Clerk application; enable sign-in methods (email + Google recommended).
2. Vercel env:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
3. Railway API: configure JWT validation (Clerk issuer / JWKS — see spec §17).
4. Smoke: sign-up → authenticated call to `GET /api/me/quota`.

---

## Phase 5 — Enable sequence (order fixed)

**Never enable UI before redirect works on production origin.**

See also: [`phase-completeness-audit-2026-08-28.md`](./phase-completeness-audit-2026-08-28.md)

### Automated local/staging regression

```powershell
# API running with DynamicQr__Enabled=true
.\scripts\test-phase-gate.ps1 -Phase 5

# Rollback drill (API must run with DynamicQr__Enabled=false)
.\scripts\phase5-rollback-drill.ps1
```

| Step | Action | Verify |
|------|--------|--------|
| 1 | Migrations on prod Neon | Tables exist |
| 2 | Railway prod: `DynamicQr__Enabled=true` | `/health` OK |
| 3 | Vercel prod: `DYNAMIC_QR_API_ORIGIN=<Railway>` | Redeploy |
| 4 | Smoke **without UI flag**: curl or staging user creates QR; open `https://genmyqrcode.com/r/{code}` | 302 |
| 5 | Run J0 static smoke on prod | Unchanged |
| 6 | Vercel prod: `NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true` | Redeploy |
| 7 | Run J1–J2 on prod incl. phone scan | Full path |
| 8 | Monitor 48h: 5xx, sign-ups, scans/day | No P0 |

### Vercel production env (final)

```
DYNAMIC_QR_API_ORIGIN=https://<railway-host>
NEXT_PUBLIC_API_BASE_URL=https://genmyqrcode.com
NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true
NEXT_PUBLIC_SITE_URL=https://genmyqrcode.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

---

## Rollback (< 5 minutes)

1. Railway: `DynamicQr__Enabled=false` → redeploy or env reload.
2. Vercel: `NEXT_PUBLIC_ENABLE_DYNAMIC_QR=false` → redeploy (hides Dynamic UI).
3. Confirm static generator works.
4. Investigate; do not re-enable until J2 passes on staging again.

---

## Post-launch (Phase 6+)

- Paid tier, Developer API, D365 — separate phases; do not bundle with Phase 5.

API applies EF migrations on startup outside Development.
