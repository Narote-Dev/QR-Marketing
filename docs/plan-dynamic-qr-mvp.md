# Plan: Dynamic QR MVP (isolated from production)

Status: **in progress on `feature/dynamic-qr` only**  
Production: **static QR unchanged** until explicit merge + layered enable  
Isolation rule: [`.cursor/rules/dynamic-qr-isolation.mdc`](../.cursor/rules/dynamic-qr-isolation.mdc)

---

## Goals

1. QR encodes `https://{origin}/r/{shortCode}`.
2. Server redirects to current `destination_url` (HTTP/HTTPS only).
3. Owner can edit destination and toggle `is_active` without reprinting.
4. Append-only scan log for basic counts over time.
5. No login in MVP — ownership via client token; store **hash only** in DB.

Non-goals (MVP): WiFi/vCard/SMS as redirect payloads, ads on interstitial, link-in-bio, paid tiers, full auth, hard delete of codes.

---

## Production isolation

| Control | Rule |
|---------|------|
| Branch | All feature work on `feature/dynamic-qr` |
| Deploy | Do not deploy to production until user approves |
| Flag | `NEXT_PUBLIC_ENABLE_DYNAMIC_QR` / `EnableDynamicQr` default **false** |
| Staging short links | Staging origin only |
| Schema | New tables only; no destructive unrelated migrations |
| Go-live order | Migrations + API → `/r/{code}` → UI flag on |

Static generator must keep working when the flag is off.

---

## Schema (locked for MVP)

```sql
CREATE TABLE dynamic_qr (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    short_code       VARCHAR(10)   NOT NULL UNIQUE,
    owner_token_hash CHAR(64)      NOT NULL,  -- SHA-256 hex of client token
    destination_url  VARCHAR(2048) NOT NULL,
    label            VARCHAR(100),
    is_active        BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_dynamic_qr_owner_token_hash ON dynamic_qr(owner_token_hash);

CREATE TABLE scan_events (
    id          BIGSERIAL PRIMARY KEY,
    qr_id       UUID        NOT NULL REFERENCES dynamic_qr(id),
    scanned_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    device_type VARCHAR(20),
    country     CHAR(2),
    referrer    VARCHAR(255)
);

CREATE INDEX idx_scan_events_qr_id_time ON scan_events(qr_id, scanned_at DESC);
```

Notes:

- No `qr_type` in MVP — destination is always a URL.
- No raw IP; `country` optional from edge headers when present.
- Prefer `is_active = false` over hard delete; avoid `ON DELETE CASCADE` unless product later allows delete.

---

## API contract (MVP)

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/dynamic-qr` | Create code; returns `shortCode`, `shortUrl`, `manageToken` (raw, once) |
| `GET` | `/r/{shortCode}` | Log scan (best-effort) + `302` to destination; `410` if inactive/missing |
| `GET` | `/api/dynamic-qr/{shortCode}` | Owner read (requires owner token header) |
| `PATCH` | `/api/dynamic-qr/{shortCode}` | Update destination / label / `isActive` |
| `GET` | `/api/dynamic-qr/{shortCode}/stats` | Scan counts (owner only) |

Owner auth: header e.g. `X-Owner-Token: {raw}` → hash → compare to `owner_token_hash`.

Validation: destination must be `http`/`https` only; reject javascript/data/etc.

---

## Frontend (behind flag)

When `NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true` (local/staging):

1. Optional “Dynamic” mode: create via API → encode returned `shortUrl` with existing `qr-code-styling` pipeline.
2. Simple manage view: paste/manage with stored token → edit destination, see scan count.
3. When flag is false: no Dynamic UI; static flow identical to production today.

---

## Phased delivery

### Phase 0 — Isolation

- [x] Cursor rule `dynamic-qr-isolation`
- [x] This plan
- [x] Branch `feature/dynamic-qr`

### Phase 1 — Persistence + redirect + owner APIs

- [x] EF entities + migration for `dynamic_qr`, `scan_events`
- [x] Create + redirect + GET/PATCH/stats endpoints
- [x] Feature flags: `DynamicQr:Enabled` (API, default false) / `NEXT_PUBLIC_ENABLE_DYNAMIC_QR` (frontend, default false)
- [x] Local DB verification (PostgreSQL 16 local; Docker not available on this machine) — create → redirect → patch → pause/activate
- [x] Focused tests for URL validation / inactive codes / owner token (`backend/QrMarketing.Api.Tests`, 24 passing)

### Phase 2 — Frontend manage UX (still flagged)

- [x] Manage token storage in localStorage
- [x] Minimal manage page wired to GET/PATCH/stats (`/[locale]/dynamic-qr/manage`, flag-gated)

### Phase 3 — Frontend create wire-up (flagged)

- [x] Flag plumbing in generator (Static/Dynamic toggle only when flag on)
- [x] Create Dynamic → encode `shortUrl` with existing QR pipeline
- [x] i18n en/th/zh for new copy only

### Phase 4 — Staging soak

- [x] Local staging soak with flags on (Postgres + API + Next) — see [`staging-soak-dynamic-qr.md`](./staging-soak-dynamic-qr.md)
- [x] Automated API loop: `scripts/staging-soak.ps1` → `STAGING_SOAK_API_PASS`
- [ ] Optional: phone camera scan of downloaded PNG against local short URL
- [ ] Remote hosted staging deploy (when infra ready)
- [ ] Confirm static pages unchanged with flag off (repo defaults remain false)

### Phase 5 — Production go-live (explicit approval only)

1. [x] Merge `feature/dynamic-qr` into `main` + `cursor/static-qr-types-svg-seo` (flags remain **off**)
2. [ ] Run migrations on prod DB (requires hosted Postgres)
3. [ ] Deploy API with redirect on production origin
4. [x] Frontend can deploy with Dynamic flags still false; static + SEO Dynamic page live
5. [ ] Enable flags after API is healthy; confirm Privacy/Terms already updated
6. [ ] Monitor redirect errors / DB

---

## Success criteria

- Static production behavior unchanged until Phase 5 step 5
- Create → `/r/{code}` → 302 → destination works
- Edit destination → same printed QR hits new URL
- Inactive code does not redirect to destination
- Owner without token cannot PATCH
- Scan count increases on successful redirect path

---

## Risks

| Risk | Mitigation |
|------|------------|
| Cold start / free-tier sleep | Do not print at scale until always-on host |
| Lost owner token | Show manage token once; later auth migrates ownership |
| Open redirects | Strict http(s) allowlist + optional blocklist |
| Accidental prod merge | Isolation rule + no deploy without approval |

---

## Relation to backlog

Replaces the “defer P3 indefinitely” stance in [`plan-future-features.md`](./plan-future-features.md) for execution tracking: P3 is active **only** on `feature/dynamic-qr`, not on production.
