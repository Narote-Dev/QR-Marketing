# Phase completeness audit (2026-08-28)

Branch: `feature/dynamic-qr`  
Purpose: Gate readiness before **Phase 5 production launch**.

Legend: **Done** | **Partial** | **Missing** | **N/A local**

---

## Phase 0 — Foundation

| Item | Status | Notes |
|------|--------|-------|
| Static + bulk generator on prod | **Done** | Unchanged |
| SEO en/th/zh | **Done** | Live |
| MVP API + EF migrations | **Done** | On feature branch |
| Local soak script | **Done** | `staging-soak.ps1` |

**Verdict:** Complete. Token-only flow must not ship to prod.

---

## Phase 1 — Infra + redirect

| Item | Status | Notes |
|------|--------|-------|
| `/health` liveness | **Done** | No DB hammer |
| `/health/ready` DB check | **Done** | |
| Redirect `/r/{code}` 302 | **Done** | Local gate pass |
| Neon + Railway prod | **Missing** | Operator task (Phase 5) |
| Vercel `DYNAMIC_QR_API_ORIGIN` staging | **Missing** | Operator task |
| Prod flags off | **Done** | Defaults false |
| `.env.example` | **Partial** | Updated; Clerk vars added in Phase 5 prep |

**Verdict:** Code complete locally; **cloud infra not provisioned**.

---

## Phase 2 — Auth + users

| Item | Status | Notes |
|------|--------|-------|
| `users` table + provisioning | **Done** | Lazy create on first API call |
| JWT middleware (Clerk JWKS) | **Done** | When `Auth__ClerkAuthority` set |
| Dev header `X-Dev-User-Id` | **Done** | Development only |
| Clerk sign-in/up pages | **Partial** | Routes exist; **404 without Clerk keys** |
| Next.js middleware protect Dynamic routes | **Partial** | Added in Phase 5 prep (Clerk + no dev auth) |
| Header login / logout | **Partial** | UserButton added in Phase 5 prep |
| Turnstile on sign-up | **N/A** | Deferred |
| JWT unit tests | **Missing** | Mock JWKS not added |

**Verdict:** Backend auth ready; **real Clerk login not configured** (keys required).

---

## Phase 3 — API + quota

| Item | Status | Notes |
|------|--------|-------|
| CRUD + list + stats with user_id | **Done** | |
| Quota 6 QR / 7000 scans year | **Done** | Gate pass |
| Cross-user isolation | **Done** | 404 |
| Redirect soft-degrade over quota | **Done** | Header `X-QR-Quota-Exceeded` |
| Rate limits write + redirect | **Done** | |
| Inactive → 410 | **Done** | Soak pass |
| Extended unit tests | **Partial** | Quota tests exist; CI needs .NET 8 runtime locally |

**Verdict:** Complete for launch scope.

---

## Phase 4 — Product UI

| Item | Status | Notes |
|------|--------|-------|
| Dynamic tab + auth gate | **Done** | Dev auth or Clerk |
| Dashboard `/my/dynamic-qr` | **Done** | List + quota bar |
| Manage form (account-based) | **Done** | No token-primary UI |
| Generator → shortUrl → design pipeline | **Done** | |
| i18n en/th/zh account copy | **Partial** | SEO `dynamic` page updated in Phase 5 prep |
| Nav “My dynamic QRs” | **Done** | Flag-gated |
| Privacy/Terms draft | **Missing** | Not blocking MVP; draft before prod UI flag |
| **J1** full staging + phone | **Missing** | Manual; needs Clerk or dev auth |
| **J2** phone scan PNG | **Missing** | Manual |
| Logged-out cannot create | **Partial** | True with Clerk; dev auth bypasses locally |

**Verdict:** UI code complete; **manual E2E + staging not signed off**.

---

## E2E journey readiness (Phase 5 gate)

| Journey | Status | Blocker |
|---------|--------|---------|
| **J0** Static | **Done** | Prod unchanged |
| **J1** Sign-up + create | **Partial** | Clerk keys + staging deploy |
| **J2** Scan + edit | **Partial** | Phone scan on staging/prod origin |
| **J3** Quota 7001 | **Partial** | API logic done; no automated 7k soak |
| **J4** 7th create rejected | **Done** | Phase 3 gate |
| **J5** Rollback | **Partial** | `phase5-rollback-drill.ps1` documents drill |
| **J6** D365 | **N/A** | Phase 8 |

---

## Go / no-go for Phase 5 enable

**Can start Phase 5 operator work when:**

1. Neon + Railway staging exist and migrate cleanly.
2. Clerk app created; keys on Vercel + Railway.
3. Staging J1–J2 pass (including phone scan).
4. Rollback drill rehearsed on staging.

**Do not enable prod UI flag until:** redirect smoke on `https://genmyqrcode.com/r/{code}` succeeds (see `production-dynamic-qr-go-live.md`).

---

## Phase 5 deliverables (this branch)

| Deliverable | File |
|-------------|------|
| Account-auth soak | `scripts/staging-soak.ps1` |
| Phase 5 gate | `scripts/test-phase-gate.ps1 -Phase 5` |
| Rollback drill | `scripts/phase5-rollback-drill.ps1` |
| Auth chrome | `frontend/components/dynamic-qr-auth-chrome.tsx` |
| Clerk middleware | `frontend/middleware.ts` |
| SEO copy aligned | `frontend/lib/i18n/dictionaries/*` |
