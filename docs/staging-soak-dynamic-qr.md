# Dynamic QR — Staging soak (local or remote staging)

Isolation: never point printed production QR codes at incomplete infra.  
Branch: `feature/dynamic-qr` only until explicit go-live.

## Environment matrix

| Setting | Local staging | Production (until go-live) |
|---------|---------------|----------------------------|
| API `DynamicQr:Enabled` | `true` | `false` |
| API `DynamicQr:PublicBaseUrl` | staging/API origin (e.g. `http://localhost:8080`) | prod origin only after Phase 5 |
| `NEXT_PUBLIC_ENABLE_DYNAMIC_QR` | `true` | `false` |
| `NEXT_PUBLIC_API_BASE_URL` | staging/API origin | unused for static |

## Soak checklist (manual, ~15–30 min)

1. [ ] Static generator still works with Dynamic flag **off** (no mode toggle).
2. [ ] With flags **on**: create Dynamic QR → preview encodes short URL → download PNG.
3. [ ] Open short URL in browser → **302** to destination.
4. [ ] Manage page: load code → change destination → short URL hits **new** destination.
5. [ ] Pause code (`is_active=false`) → short URL returns **410**.
6. [ ] Activate again → redirect works.
7. [ ] Scan count increases after successful redirects.
8. [ ] Wrong manage token cannot PATCH.
9. [ ] `javascript:` / non-http destination rejected on create.
10. [ ] Manage route is `noindex` (check response meta / robots).

## Automated verify (API loop)

After Postgres is up:

```powershell
.\scripts\verify-dynamic-qr.ps1
```

Or full local staging (DB + migrate + API smoke):

```powershell
.\scripts\staging-soak.ps1
```

## Soak results (local staging — 2026-08-26)

Environment: PostgreSQL 16 (winget) + API `:8080` + Next `:3000` with flags on.  
Docker Desktop: **not installed** on this machine; local Postgres used instead of Compose.

| Check | Result |
|-------|--------|
| Create → 302 → destination | Pass |
| Patch destination → same short URL new target | Pass |
| Pause → 410; reactivate → 302 | Pass |
| Reject `javascript:` URL (400) | Pass |
| Wrong owner token (404) | Pass |
| Scan count increments | Pass |
| Manage page `/en/dynamic-qr/manage` with flag on | Pass (200) |
| Generator shows Dynamic mode with flag on | Pass |
| Production flags remain default off in repo | Pass |

Automated: `scripts/staging-soak.ps1` → `STAGING_SOAK_API_PASS`  
Manual UI browser scan of printed PNG: still recommended once before go-live.
