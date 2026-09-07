# QR Marketing - Agent Operating Guide

This file is the shared operating guide for Codex, Cursor, and any other coding agent working in this repository.

## Start every session here

1. Read `Rule.md`.
2. Read `docs/development-handoff.md` for the latest verified state, open risks, and work log.
3. Read the relevant architecture or roadmap document before changing a subsystem.
4. Run `git status --short --branch` and preserve unrelated or user-owned changes.
5. Do not assume that a historical deployment document describes the current live environment. Verify external state before making production claims.

## Product and architecture

- Product: Build Your QR / `genmyqrcode.com`.
- Frontend: Next.js + TypeScript + Tailwind CSS under `frontend/`.
- Backend: ASP.NET Core .NET 8 REST API under `backend/QrMarketing.Api/`.
- Database: PostgreSQL through EF Core migrations.
- Authentication: Clerk JWT when configured; development-header and legacy owner-token paths are local-only compatibility mechanisms.
- Hosting recorded by the repository: Vercel frontend and Railway API. Treat this as historical context until live state is verified.
- Static QR generation stays browser-only. Dynamic QR uses the API, database, and redirect path.

Keep frontend and backend independently deployable. Do not move business logic into controllers or replace the technology stack unless the user explicitly requests it.

## Team roles

The lead agent owns scope, integration, final verification, and the user-facing handoff. When parallel work is useful, divide it into non-overlapping roles:

- Backend/database: API, EF Core, PostgreSQL, authentication, entitlements, quotas, and migrations.
- Frontend/SEO: Next.js, QR editor, accessibility, localization, metadata, AdSense, and performance.
- QA/security reviewer: independent diff review, integration tests, authorization boundaries, secrets, deployment regressions, and rollback readiness.

Only one agent may own a file at a time. Subagents must not deploy, merge, force-push, rotate credentials, or change production configuration.

## Production safety

- The product is already deployed. Prefer small, reversible changes.
- Never deploy or change production environment variables without explicit user approval for that release.
- Use preview/staging before production for behavioral, authentication, redirect, or database changes.
- Every migration requires compatibility review, a backup/rollback plan, and testing against PostgreSQL, not only EF InMemory.
- Keep Dynamic QR feature flags and the static generator rollback path operational.
- Do not expose `.env*`, tokens, connection strings, Clerk secrets, or deployment credentials in output or committed files.
- Do not commit directly to `main`, rewrite shared history, or force-push without explicit user instruction.
- Release sequence: tests, build, independent review, preview/staging smoke, user approval, deploy, production smoke.

## Verification baseline

Use checks proportional to the change. The standard full gate is:

```powershell
npm test --prefix .\frontend
npm run build --prefix .\frontend
dotnet test .\backend\QrMarketing.Api.Tests\QrMarketing.Api.Tests.csproj
docker compose build
```

For backend persistence or concurrency changes, add PostgreSQL integration tests. For user journeys, verify static QR, sign-in, Dynamic QR create/edit/pause/reactivate, phone redirect, quota behavior, and rollback flags.

Do not report a test as failed when the runner is blocked by a missing SDK/runtime, unavailable service, sandbox restriction, or missing credential. Record it as an environment limitation with the exact command and error.

## Continuity protocol

After every meaningful work session, update `docs/development-handoff.md` before stopping:

- date and agent/tool;
- branch and commit or uncommitted file list;
- objective and completed changes;
- commands run and exact outcomes;
- external state actually verified;
- decisions and assumptions;
- remaining work in priority order;
- next safe action and any approval required.

Do not overwrite unresolved work silently. Move completed items to the work log and keep the current-state sections concise. If documentation conflicts, use this precedence:

1. Current code, migrations, tests, and deployment configuration.
2. `docs/development-handoff.md` entries backed by current-session evidence.
3. Latest dated status/checkpoint document.
4. Plans and older architecture proposals.
5. README overview.

## Current priorities

The authoritative queue is in `docs/development-handoff.md`. At the 2026-09-07 takeover baseline, the leading risks are quota reactivation/concurrency, rate-limiter ordering and proxy IP handling, atomic scan counters, backend PostgreSQL integration coverage, credential rotation verification, CI, and deployment-document cleanup.
