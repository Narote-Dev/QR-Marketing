# Checkpoint — Cloud handoff (2026-08-29)

**Use this file first** when resuming work from another machine or Cursor Cloud Agent.

| Field | Value |
|-------|--------|
| Branch | `feature/dynamic-qr` |
| Latest commit | `fcc38d6` — docs: Phase 5 go-live status and manual J1/J2 checklist |
| GitHub | `Narote-Dev/QR-Marketing` |
| Remote | `origin/feature/dynamic-qr` (synced) |

---

## Production map (live now)

| Piece | URL / ID |
|-------|----------|
| Frontend | https://genmyqrcode.com (Vercel project `build-your-qr`) |
| API | https://qr-api-production-fb1c.up.railway.app |
| Railway project | `qr-marketing-api` — deploy branch **`feature/dynamic-qr`** |
| Clerk (test) | `https://assuring-camel-2125.clerk.accounts.dev` |

Dynamic QR is **enabled on production** (UI + API + redirect rewrite).

---

## Phase status

| Phase | Status |
|-------|--------|
| 0–4 | Code complete |
| **5** | **Complete** (2026-08-31) — infra + J0–J5 signed off; see `docs/phase-5-go-live-status-2026-08-29.md` |
| 6–8 | Not started — Phase 6 deferred until roadmap trigger |

---

## Hard rules (do not break prod static)

1. All Dynamic QR work stays on **`feature/dynamic-qr`** unless user explicitly asks to merge `main`.
2. Do **not** disable static generator when fixing Dynamic issues.
3. Do **not** commit `.env.local`, `.next`, or secrets.
4. Short URLs on staging/local must not bind permanently to prod domain for test codes.
5. Enable order if re-deploying: API + redirect smoke **before** UI flag.

---

## Current priority (post Phase 5)

1. **Growth** — SEO/use-case pages, GSC monitoring (parallel to Phase 0)
2. **Ops** — 48h+ stability watch; rotate Clerk test keys before ads/marketing
3. **Phase 6** — when trigger: pricing page + Stripe Pro (not started)

---

## Prompt template for Cloud Agent / new chat

```
Read docs/checkpoint-2026-08-29-cloud-handoff.md and docs/phase-5-go-live-status-2026-08-29.md.

Repo: Narote-Dev/QR-Marketing, branch feature/dynamic-qr.

Continue Dynamic QR work. Do not merge to main unless I ask.
Current priority: [describe task — e.g. fix bug, J1 help, Phase 6 planning].
```

---

## Key commits (recent)

| Commit | Summary |
|--------|---------|
| `fcc38d6` | Phase 5 go-live status doc |
| `da9a210` | Fix middleware 404 on account pages |
| `3449d51` | Dashboard layout, API rewrite, sticky nav |
| `0c5f527` | Accounts, quota, Clerk UI, Phase 5 scripts |

---

## Local dev (optional)

```powershell
cd frontend
npm run dev
# http://localhost:3000/en/my/dynamic-qr
```

Create `frontend/.env.local` (not in git):

```
NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true
NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE=true
NEXT_PUBLIC_DYNAMIC_QR_DEV_AUTH=false
DYNAMIC_QR_API_ORIGIN=https://qr-api-production-fb1c.up.railway.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Pull Vercel env: `cd frontend && npx vercel env pull`

---

## Smoke commands (no local API required)

```powershell
.\scripts\railway-staging-smoke.ps1
# genmyqrcode.com/r/zzzzzz → 410
# genmyqrcode.com/api/me/quota → 401
# genmyqrcode.com/en/my/dynamic-qr → 200
```

---

## Production env (already set — reference only)

**Vercel production:** `NEXT_PUBLIC_ENABLE_DYNAMIC_QR`, `NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE`, `DYNAMIC_QR_API_ORIGIN`, Clerk keys.

**Railway production:** `DynamicQr__Enabled=true`, `DynamicQr__PublicBaseUrl=https://genmyqrcode.com`, `Auth__ClerkAuthority`, CORS for genmyqrcode.com.

---

## Known issues / notes

- Railway once redeployed from `main` (old API) — fixed by reconnecting `feature/dynamic-qr`. **Keep Railway on this branch.**
- Clerk uses **test** keys — rotate secret before public marketing push.
- Manage token UI removed; auth is Clerk JWT only.
- `main` branch is behind `feature/dynamic-qr`; prod deploys from feature branch on Vercel/Railway.

---

## Related docs

- `docs/phase-5-go-live-status-2026-08-29.md` — launch checklist + manual J1/J2
- `docs/phase-completeness-audit-2026-08-28.md` — phase audit (pre-launch)
- `docs/production-dynamic-qr-go-live.md` — rollback + enable sequence
- `docs/checkpoint-2026-08-29-pre-phase5.md` — earlier checkpoint (superseded by this file)

---

## Session handoff (2026-08-29)

User continues this chat from **another machine** via Cursor cloud. All code through Phase 5 infra is **committed and pushed** to `origin/feature/dynamic-qr`. Next work: manual J1/J2 sign-off or follow-up fixes on same branch.
