# Development handoff - QR Marketing

Last updated: **2026-09-07**
Maintainers: project owner, Codex, Cursor, and explicitly assigned agents

This is the current cross-tool handoff ledger. Read it with `AGENTS.md` and `Rule.md` at the start of every development session. Historical checkpoint files remain useful evidence but do not override this document or current code.

## Current repository state

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
- Activated Codex heartbeat automation `QR Revenue Monitor` (`qr-revenue-monitor`) for 09:00 Asia/Bangkok daily. It runs read-only, compares the prior local report, stays quiet when unchanged, and notifies only on actionable GSC/AdSense changes or failures.

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
