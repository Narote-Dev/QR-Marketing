# Dynamic QR — saved design JSON (MVP)

Branch: `feature/dynamic-qr`  
Status: **implemented** — download again from dashboard/manage; edit design deferred.

## What we store

- Column `dynamic_qr.design_json` (Postgres **jsonb**, nullable)
- Snapshot of frontend `QrDesign` at **create** time (colors, frame, preset paths, optional logo)
- **Not** stored: PNG/SVG files (re-rendered in the browser via `renderQrBlob`)

## Cost model (early launch &lt; $6/mo)

| Item | Estimate |
|------|----------|
| Per QR (preset logo/bg) | ~0.5–2 KB |
| Per QR (custom uploaded logo as base64) | ~20–100 KB |
| Free plan cap | 6 QRs / user |
| Worst case / active user | ~600 KB (6 × 100 KB) |
| 1,000 users worst case | ~600 MB on Neon — still small vs free/low tiers |

**Guardrails**

- API max **32 KiB** UTF-8 per `design` JSON (`QrDesignValidator`)
- Frontend strips oversized custom logo before reject; shows `designTooLarge` if still too big

## User flow

1. Create Dynamic QR on generator (design from step 2 customize panel is snapshotted)
2. Later: **My dynamic QRs** or **Manage** → **Download PNG/SVG again**
3. Legacy codes (no `design_json`): default style + hint text

## Out of scope (next phase)

- PATCH design from manage page
- Server-side PNG generation or Blob storage
- Per-user design library / templates sync

## Deploy order

1. Railway: run migration `AddDynamicQrDesignJson`
2. Vercel: deploy frontend (same branch)
3. Smoke: create with template → list → download again
