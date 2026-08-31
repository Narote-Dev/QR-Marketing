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

## Manual sign-off — COMPLETE (2026-08-31)

Owner confirmed **J0–J5** pass on production (browser + phone). Dynamic QR MVP is live for real use.

| Journey | Status | Verified |
|---------|--------|----------|
| **J0** Static unchanged | ✅ | Static QR create → download → scan |
| **J1** Sign-up + create | ✅ | Clerk → Dynamic tab → dashboard list + quota |
| **J2** Phone scan + edit | ✅ | PNG scan → destination → manage PATCH → rescan |
| **J3** Quota at limit | ✅ | (per owner sign-off) |
| **J4** 7th create rejected | ✅ | (per owner sign-off) |
| **J5** Rollback drill | ✅ | (per owner sign-off) |

---

## Manual sign-off checklist (reference)

These cannot be done by AI alone:

### Cloud Agent verification (2026-08-29)

Automated checks run on production without Clerk sign-in:

| Check | Result |
|-------|--------|
| `GET /en/my/dynamic-qr` | 200 — auth gate (not 404) |
| `GET /en/qr-code-generator` | 200 — Static + Dynamic tabs visible |
| `GET /r/zzzzzz` | 410 — rewrite to Railway OK |
| `GET /api/me/quota` | 401 — proxy auth OK |
| Railway `/health` + `/health/ready` | 200 |
| Railway unauthenticated `POST /api/dynamic-qr` | 401 |
| Frontend unit tests (76) | pass |

**Fix on branch `cursor/j1-j2-gate-verify-0acd`:** Manage page now auto-loads QR when opened via dashboard link (`/dynamic-qr/manage?code=...`) — removes extra **Load** click for J2 edit step.

**Known / not blocking J1–J2:**
- Clerk still uses **test** instance keys (documented; rotate before marketing push).
- React hydration warnings + AdSense `no_div` on generator page (pre-existing static surface).

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

**Phase 5: COMPLETE** (2026-08-31) — infra + J0–J5 product gate signed off by owner.

**Post-launch (ongoing):**
- Monitor 48h+ — Railway logs, Vercel errors, sign-ups (baseline started 2026-08-31)
- Rotate Clerk from **test** keys before marketing push
- Phase 6 (Stripe / pricing) — start only when roadmap trigger met (≥200 Dynamic users, ≥5 upgrade requests, or 90 days post Phase 5)
