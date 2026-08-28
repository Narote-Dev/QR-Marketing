# Phase 5 go-live status — 2026-08-29

Branch: **`feature/dynamic-qr`** (commit `da9a210`)  
Production site: **https://genmyqrcode.com**  
API: **https://qr-api-production-fb1c.up.railway.app**

---

## Automated / operator steps completed

| Step | Status | Notes |
|------|--------|-------|
| Commit + push UI/CORS/layout | ✅ | `3449d51`, `da9a210` |
| Frontend tests (76) | ✅ | `npm test` |
| Railway smoke | ✅ | `railway-staging-smoke.ps1` |
| Railway env (Dynamic + Clerk + CORS) | ✅ | `DynamicQr__Enabled=true`, Clerk authority, genmyqrcode.com origins |
| Railway branch | ✅ | Reconnected to `feature/dynamic-qr` after accidental main deploy |
| Vercel prod env | ✅ | Added `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE` |
| Vercel prod deploy | ✅ | `3449d51` + middleware fix `da9a210` |
| Redirect smoke `/r/*` | ✅ | `genmyqrcode.com/r/{code}` → 410/302 via rewrite |
| API proxy smoke | ✅ | `genmyqrcode.com/api/me/quota` → 401 without auth |
| Middleware 404 fix | ✅ | Account pages no longer blocked before AuthGate |

---

## Manual sign-off still required (you)

These cannot be done by AI alone:

### J1 — Sign-up + create
1. Open https://genmyqrcode.com/en/qr-code-generator
2. Sign in / sign up (Clerk)
3. Switch to **Dynamic** tab → create QR with destination URL
4. Open https://genmyqrcode.com/en/my/dynamic-qr → see code + quota

### J2 — Phone scan
1. Download PNG of the dynamic short URL QR
2. Scan with phone camera → lands on destination
3. Change destination in **Manage** → scan again → new destination

### J0 — Static unchanged
1. Create static URL QR (no Dynamic tab required) → download → scan once

### J5 — Rollback drill (optional rehearsal)
```powershell
# On Railway: set DynamicQr__Enabled=false, redeploy
# On Vercel: set NEXT_PUBLIC_ENABLE_DYNAMIC_QR=false, redeploy
# Confirm static generator still works; /r/* returns 404
.\scripts\phase5-rollback-drill.ps1  # local API variant
```

### Post-launch
- Monitor 48h: Railway logs, Vercel errors, sign-ups
- Rotate Clerk secret (was pasted in chat during setup)

---

## Production env reference

**Vercel (production)** — key vars:
- `NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true`
- `NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE=true`
- `DYNAMIC_QR_API_ORIGIN=https://qr-api-production-fb1c.up.railway.app`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (Clerk test instance)
- `CLERK_SECRET_KEY` (secret)

**Railway (production)** — key vars:
- `DynamicQr__Enabled=true`
- `DynamicQr__PublicBaseUrl=https://genmyqrcode.com`
- `Auth__ClerkAuthority=https://assuring-camel-2125.clerk.accounts.dev`
- `Auth__AllowDevUserHeader=false`
- `DynamicQr__AllowLegacyOwnerToken=false`

---

## Verdict

**Phase 5 automated + operator infra: DONE.**  
**Phase 5 product gate: PENDING manual J1/J2/J0** (~15 min on phone + browser).

After J1/J2 pass, mark Phase 5 complete and start Phase 6 only when triggers in roadmap are met.
