# Development handoff - QR Marketing

Last updated: **2026-09-08**
Maintainers: project owner, Codex, Cursor, and explicitly assigned agents

This is the current cross-tool handoff ledger. Read it with `AGENTS.md` and `Rule.md` at the start of every development session. Historical checkpoint files remain useful evidence but do not override this document or current code.

## Current repository state

Current 2026-09-08 patch status: `feature/dynamic-qr` at `8eaa13b`, synchronized with origin. Backend correctness/request-protection, SEO and CI changes are committed and GitHub CI is green; production remains on its older artifact. Only user-owned `.cursor/skills/` and the stale `docs/SESSION_HANDOFF.md` remain untracked. See the newest work-log entry below. Historical tables and backlog descriptions below describe original findings; they do not mean fixes remain absent.

Recorded on 2026-09-07 by Codex:

| Item | State |
|---|---|
| Repository | `QR-Marketing` |
| Branch | `feature/dynamic-qr` |
| Upstream relation | Ahead of `origin/feature/dynamic-qr` by 2 commits |
| Ahead commits | `954b0da` Phase C SEO hubs; `386a2f6` Phase D trust pages |
| Untracked content | `.cursor/skills/` - pre-existing/user-owned; do not add, remove, or commit without review |
| Source modifications by Codex baseline analysis | None before continuity documentation was added |

The repository records the production frontend as `https://genmyqrcode.com` and the Railway API as `https://qr-api-production-fb1c.up.railway.app`. Phase 5 documentation says Dynamic QR was live and J0-J5 were signed off on 2026-08-31. These endpoints and environment settings were **not re-verified live during the 2026-09-07 takeover**, so check them before relying on their current state.

## Verified baseline

### Frontend

Verified 2026-09-07:

- `npm test` passed: **95/95 tests**.
- `npm run build` passed, including TypeScript and Next.js lint validation.
- Next.js generated 149 static pages.
- Generator-related routes reported about 235 kB first-load JavaScript; treat optimization as an opportunity pending a real performance audit.

The first sandboxed test attempt failed in Node/tsx with `uv_os_get_passwd ... ENOMEM`; rerunning outside that sandbox passed. This was an execution-environment failure, not a code failure.

### Backend

Backend tests could not run on the takeover machine. The project targets .NET 8, while the machine had .NET 10 SDK/runtime only. `dotnet test --no-restore --no-build` aborted because `Microsoft.NETCore.App 8.0.0` was unavailable. Install/use the .NET 8 runtime or run tests in Docker/CI before treating the backend baseline as green.

Existing backend tests cover core Dynamic QR service behavior, URL/design validation, short-code generation, token hashing, and device parsing. They do not yet provide sufficient controller/auth/rate-limit/PostgreSQL concurrency coverage.

## Production safety status

- Dynamic QR is described as live by `docs/phase-5-go-live-status-2026-08-29.md`; do not follow older instructions that call production "static only."
- The same status document says Clerk test keys were still used and that a secret had been pasted in chat. It is unknown whether production keys and rotation were completed afterward.
- `.env.local` exists and is ignored by Git. It was deliberately not opened during takeover analysis.
- There are two Railway configuration files pointing at different Dockerfiles: `railway.toml` and `railway.json`. Deployment worked according to historical documents, but the source of truth should be confirmed and consolidated.
- `Database:MigrateOnStartup` defaults to true. Review this before scaling the API to multiple replicas.

## Prioritized engineering backlog

2026-09-08 update: active-quota serialization/reactivation checks, atomic scan counters, scan-period consistency, request middleware ordering/PATCH limits, explicit proxy/country trust configuration, and PostgreSQL tests are implemented locally. CI is authored but not yet run on GitHub. Production proxy configuration, credential/ownership verification, staging/release checks and Railway configuration consolidation remain open. Original findings below are retained for traceability until release verification.

### P1 - correctness and revenue protection

1. **Prevent active-QR quota bypass.** `DynamicQrService.ApplyUpdates` can reactivate a QR without checking the active limit. A user can pause one code, create another, then reactivate the first.
2. **Make quota enforcement concurrency-safe.** Create currently counts active rows and inserts afterward. Concurrent creates can pass the same check.
3. **Make scan and usage counters atomic.** `ScanCountCached` and `UserQuotaUsage.UsedAmount` use read-modify-write operations. Concurrent scans can lose increments or race while creating a unique quota row.

Acceptance criteria:

- Reactivation cannot exceed the plan limit.
- Concurrent creates cannot exceed the plan limit.
- Concurrent redirects preserve accurate scan and usage counts.
- PostgreSQL integration tests demonstrate all three behaviors.

### P1 - request protection

1. Move/configure rate limiting so authenticated writes are partitioned by authenticated identity. `UseRateLimiter` currently executes before authentication and `UseCurrentUser`, so the `api-write` policy may see every request as `anon`.
2. Apply write rate limiting to PATCH as well as POST.
3. Configure trusted forwarded headers/proxies before partitioning redirect traffic by `RemoteIpAddress`; otherwise Railway proxy traffic may collapse into one partition.
4. Decide whether country headers are trusted only from the deployment edge and document that trust boundary.

### P1 - operational security

1. Verify Clerk production instance usage.
2. Rotate any Clerk secret exposed during earlier setup and record only the completion, not the value.
3. Confirm Vercel/Railway environment ownership and least-privilege access.

These actions change external state and require explicit owner authorization.

### P2 - delivery confidence

1. Add CI for frontend test/build, backend .NET 8 build/test, PostgreSQL integration tests, and Docker image builds.
2. Add API integration coverage for JWT authentication, cross-user ownership, quota responses, middleware ordering, rate limiting, and redirect behavior.
3. Establish preview/staging smoke tests and a human-approved production release gate.
4. Add post-deploy smoke and rollback verification.

### P2 - documentation and deployment cleanup

1. Update `README.md`; its known-limitations section incorrectly says no migrations/domain tables exist.
2. Confirm whether `railway.json`, `railway.toml`, or the Railway dashboard is authoritative; consolidate without disrupting the active deployment.
3. Reconcile older architecture proposals with the implemented schema before using them as implementation instructions.
4. After correctness work, perform a real Core Web Vitals/bundle audit before optimizing the reported 235 kB generator payload.

## Working agreement

- Lead agent owns task decomposition, integration, verification, and final handoff.
- Backend/database agent owns only its assigned API/schema/test files.
- Frontend/SEO agent owns only its assigned Next.js/UI/content files.
- QA/security reviewer reviews independently and does not rewrite the implementation unless reassigned.
- One writer per file at a time.
- No agent deploys, merges, pushes, changes DNS/env, or rotates credentials without the owner's explicit authorization.
- Production-changing work uses preview/staging and includes rollback instructions.

## Resume instructions for Cursor or Codex

Use this prompt when resuming in another tool:

> Read `AGENTS.md`, `Rule.md`, and `docs/development-handoff.md`. Inspect current Git status and recent commits without changing user-owned files. Confirm which backlog item I want to start. Keep production changes behind explicit approval, run change-appropriate tests, and update the handoff ledger before stopping.

Before starting work, confirm whether the two local commits should be pushed and whether `.cursor/skills/` is intentionally untracked. Do not decide either point automatically.

## Work log

### 2026-09-08 - Codex with independent reviewers - Release-gate continuation

- Authorization: owner approved continuing Docker/CI, independent review, Clerk preview, proxy and credential gates. No production deployment or environment change performed.
- Independent review: no blocker found in quota correctness, ownership, transaction rollback or legacy-token isolation. Fixed one medium finding by parsing and validating trusted country-proxy IPs once at startup instead of parsing per request; invalid configuration now fails startup with a clear error. Added regression coverage.
- CI/Docker audit: workflow YAML is structurally valid. Added a root `Dockerfile` build because Compose only covers `backend/Dockerfile`. Initial remote frontend CI exposed a Node 20-incompatible glob; replaced it with a cross-platform file-enumerating runner and verified Node 20 plus Node 24 locally. GitHub CI run `34212248885` then passed frontend, backend/PostgreSQL and both Compose/root container builds on commit `8eaa13b`.
- Verification: frontend tests passed 96/96; production build passed with 149 generated pages. Backend passed 50/50 on .NET 8.0.30 with an isolated PostgreSQL 16 cluster, including eight PostgreSQL integration cases and the new configuration test. `git diff --check` passed. The isolated cluster was stopped after testing; existing PostgreSQL service/databases were untouched.
- Review follow-ups: in-memory rate limits are per replica/restart, and scan accounting serializes each user's scans on one user-row lock. Neither is a current correctness blocker; confirm replica assumptions and load-test redirect latency in preview. Add full-pipeline rate-limit integration coverage when a test host is available.
- External verification: pushed commits `7ebe73f`, `87814f4`, `e5f92f2` and CI fix `8eaa13b`. Vercel deployed the branch preview successfully; public/static routes return 200, but sign-in, Dynamic QR account and API rewrite routes return 404, proving the preview is not configured for Clerk/Dynamic QR. Vercel deployment details require owner login. Railway CLI confirms production uses `railway.toml`, root directory `backend`, one replica and the older `efcbb75` artifact from 2026-08-31; pushes did not deploy production. Only a production Railway environment exists. Production has Clerk authority, Dynamic QR enabled, development header and legacy token disabled, but no `RequestProtection__*` keys. No values were recorded.
- Remaining gates: owner-approved creation of a separate Railway staging environment/database; Vercel owner login and Preview env setup; Clerk-enabled preview with two test users; direct-API and Vercel-rewrite proxy/spoof/country checks; Clerk rotation and Vercel/Railway ownership evidence; then explicit production release approval.
- Production remains unchanged.

### 2026-09-08 - Codex with scoped reviewers - Correctness, protection and SEO patch

- Authorization: owner requested analysis and implementation of outstanding problems. No deployment, environment change, credential rotation, commit or push performed.
- Branch/commit: `feature/dynamic-qr` at `a359886`; changes remain uncommitted. Existing documentation changes and `.cursor/skills/` preserved.
- Backend: PostgreSQL user-row transactions serialize create/reactivate quota checks and scan accounting across API instances. Cached scan counts increment atomically; quota rows use atomic upsert; event and counters commit/rollback together. Failed logging reports `ScanLogged=false` while preserving redirect. Shared billing-period resolution fixes monthly fallback check/meter mismatch. Concurrent first login recovers the existing user after a unique-key race.
- Protection: authentication/current-user resolution precede write limiting; PATCH uses the same policy as POST; anonymous partition uses IP. Forwarded headers require configured trusted peers/networks; country headers require an explicitly trusted transport peer. Legacy token management now requires Development plus the feature flag. PATCH quota failure returns the same structured 403 as create.
- SEO: removed unsupported sitemap `lastModified`; extended existing tests for all curated URLs, reciprocal hreflang and noindex exclusions. Source audit found existing links to all 16 priority pages; no duplicate links were added. Noindex/AdSense gating unchanged.
- Delivery/docs: added GitHub Actions frontend test/build, .NET 8 tests with PostgreSQL 16, and Docker Compose build jobs; added eight real PostgreSQL cases and request-protection tests. Corrected README migration/local-database statements. New configuration/release guidance: `docs/request-protection.md`.
- Verification: frontend tests passed 96/96; production build passed (149 generated pages, lint/typecheck clean). Backend suite passed 49/49 with zero skips on .NET 8.0.30 and an isolated PostgreSQL 16 cluster, including eight integration cases. No schema migration added; tests apply existing migrations to disposable databases.
- Environment: sandbox Node `uv_os_get_passwd ... ENOMEM` required an escalated test run. Downloaded temporary .NET 8 runtimes from Microsoft and verified SHA512; system runtimes unchanged. Used installed PostgreSQL binaries to initialize a separate temporary cluster on loopback port 55439; existing PostgreSQL service/databases untouched. Docker command unavailable, so Docker builds remain unverified locally. CI workflow has not been pushed/executed remotely.
- Remaining release work: preview/staging journeys with real Clerk and deployment proxy chain; verified proxy configuration; Docker/remote CI gates; explicit production release approval; production smoke; then authorized GSC resubmission/indexing. AdSense payment/site connection, Clerk rotation and Vercel/Railway ownership need account-level verification/action. Do not consolidate Railway files until the active build source is verified.
- Compatibility/rollback: no migrations or stack changes. Release backend/frontend independently through preview. Rollback can restore the previous application artifact without a database downgrade; it reintroduces fixed quota/protection defects. Review proxy/country configuration together with the release; defaults ignore untrusted headers.
- Final verification: backend suite rerun after the final scan timestamp adjustment passed 49/49, zero skips. Real local API HTTP smoke passed create/pause, reactivation quota 403, edit at quota, cross-user GET/PATCH 404, redirect 302, shared POST/PATCH 30-write limit/429 and another user's independent allowance. `git diff --check` passed.
- Frontend HTTP smoke: initial normal-config page request timed out after 15 seconds although sitemap responded. Rebuilt/restarted with Clerk keys empty only in the test processes (no env file edits): all 16 priority pages returned 200 with indexable robots, self-canonical and en/th/zh-CN/x-default hreflang; sitemap contained 90 URLs and no lastmod. This isolates a Clerk-enabled local-path dependency but does not prove its precise cause or verify sign-in. The final ignored `.next` build is this Clerk-disabled test build; rebuild with the intended configuration for preview/release. Missing prerender HTML artifacts did not prevent runtime rendering.
- Cleanup: stopped own API/Next test servers and temporary PostgreSQL cluster; dropped own named smoke database. Integration cases each dropped their random test database. Temporary runtime/cluster directories retained outside the repo; existing PostgreSQL service untouched.
- Review: scoped backend/protection and frontend changes reviewed during implementation; final independent cross-subsystem review did not complete because reviewer agents reached their usage limit. Lead inspected final diffs and performed the HTTP smoke above; independent release review remains a gate.
- Next safe action: obtain independent release review, run Docker/remote CI and real-Clerk preview/staging smoke, verify the actual proxy chain, then seek explicit production release approval. Production remains unchanged.

### 2026-09-08 - Codex - Session handoff repository verification

- Branch/commit: `feature/dynamic-qr`, HEAD `a359886`; local upstream comparison `0 / 0`. The repository-state table above is a historical baseline, not current status.
- Existing changes preserved: `docs/development-handoff.md`, `docs/google-readonly-monitoring.md`, untracked `docs/SESSION_HANDOFF.md` and user-owned `.cursor/skills/`. This session only appended this ledger entry; no application source changed.
- Read `AGENTS.md`, `Rule.md`, and both handoffs. Confirmed Next.js 14 / .NET 8 / EF Core PostgreSQL configuration, sitemap runtime `lastModified`, 42 intentional noindex SEO URLs, existing SEO tests and localized related links, quota/reactivation/counter risks, rate-limiter ordering, missing PATCH limiter, and conflicting Railway Dockerfile paths. README still incorrectly says migrations/tables do not exist; no `.github` directory exists.
- `npm test --prefix .\frontend`: sandbox blocked with `uv_os_get_passwd returned ENOMEM`; rerun outside sandbox passed 95/95, exit 0. Build was not rerun; prior successful build remains historical evidence.
- `dotnet --list-runtimes`: only .NET 10 runtimes installed; backend tests not rerun and not classified as failed.
- `git rev-list --left-right --count HEAD...origin/feature/dynamic-qr`: `0 0`. `git ls-remote origin refs/heads/feature/dynamic-qr`: blocked with `SEC_E_NO_CREDENTIALS`; current GitHub HEAD not independently verified.
- `git check-ignore` confirmed credentials/report paths are ignored; credential contents were not opened.
- Inspected local `qr-revenue-monitor` automation configuration: ACTIVE, daily 10:00, prompt requests a Thai report on every run. The older work-log statement saying to stay quiet when unchanged is superseded by this configuration. No automation change made.
- External state: no fresh GSC/AdSense, production HTTP, deployment, or credential-rotation verification. Coverage counts and live canonical assertions in SESSION_HANDOFF remain dated evidence, not findings from this session.
- Next safe action: present findings before implementation as requested. Proposed small SEO patch: remove unsupported sitemap timestamps, audit existing links to the 16 priority pages before adding links, extend existing regression tests where needed, then test/build and preview. Preserve noindex/ads gating. Backend P1 issues remain unresolved. Implementation scope awaits the user's next instruction; production deployment requires explicit release approval.

### 2026-09-07 - Codex - Google read-only monitoring foundation

- Added OAuth authorization-code setup for Search Console and AdSense read-only scopes.
- Added API monitor for GSC analytics, sitemaps, rotating URL Inspection, AdSense account/site state, alerts, and policy issues.
- Added setup/runbook at `docs/google-readonly-monitoring.md`.
- Added `.secrets/` and generated report paths to `.gitignore`.
- Enabled Search Console API and AdSense Management API in the owner's Google Cloud project.
- Created a Web OAuth client with both read-only scopes and completed one-time browser consent. Local credentials exist under `.secrets/`; values were not logged or committed.
- Corrected the configured GSC property from the unavailable domain property to the owned URL-prefix property `https://genmyqrcode.com/`.
- Manual live monitor passed both APIs. Baseline: GSC siteOwner, 90 sitemap URLs, sitemap errors/warnings 0, 200 impressions and 0 clicks over the current 28-day window; AdSense account READY, site NEEDS_ATTENTION, 2 alerts, 0 policy issues.
- AdSense onboarding alert says payment information and site connection are incomplete. Owner action is required in AdSense.
- One sampled URL showed a stale 2026-09-04 noindex inspection. A live production check returned HTTP 200 with no X-Robots-Tag or meta noindex; wait for recrawl and monitor.
- Added 20-second API request timeouts and parallel URL Inspection so scheduled runs cannot hang indefinitely on one endpoint.
- Owner completed the missing OAuth branding fields and published the external OAuth app to Production. A post-publish monitor passed both APIs.
- Activated Codex heartbeat automation `QR Revenue Monitor` (`qr-revenue-monitor`) for 10:00 Asia/Bangkok daily. It runs read-only, compares the prior local report, stays quiet when unchanged, and notifies only on actionable GSC/AdSense changes or failures.

### 2026-09-08 - Codex heartbeat - Daily GSC and AdSense monitor

- Generated ignored local report `reports/google-monitor/2026-09-08.json`.
- Search Console and AdSense API calls passed. Traffic stayed at 0 clicks and 200 impressions; AdSense remained READY with site NEEDS_ATTENTION, no new alerts, and no policy issues.
- Sitemap remained healthy with 0 errors and 0 warnings.
- URL Inspection sampled 25 URLs and found 3 non-PASS results: Thai cafe-menu duplicate without selected canonical, Chinese Google Review page discovered but not indexed, and English LINE contact excluded by an older noindex crawl.
- Live checks for all 3 URLs returned HTTP 200, self-canonical URLs, and no X-Robots-Tag or meta noindex. GSC recrawl/request indexing is the next action; no production code change is justified by the current evidence.

### 2026-09-07 - Codex takeover baseline

- Inspected repository structure, architecture, configuration, tests, deployment documents, Git state, and key Dynamic QR/auth/quota paths.
- Verified frontend tests 95/95 and a successful production build.
- Backend execution was blocked by the missing .NET 8 runtime; no backend failure was inferred.
- Identified the prioritized risks documented above.
- Established the shared agent operating guide and cross-tool handoff ledger.
- Did not inspect secrets, push commits, deploy, modify cloud configuration, or change application source.

### Entry template

Copy this block for future sessions:

```markdown
### YYYY-MM-DD - Agent/tool - short objective

- Branch/commit:
- Files changed:
- Completed:
- Tests and outcomes:
- External state verified:
- Decisions/assumptions:
- Remaining work:
- Next safe action:
- Approval required:
```
