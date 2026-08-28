# Checkpoint — 2026-08-29 (superseded)

**→ ใช้ไฟล์นี้แทน:** [`checkpoint-2026-08-29-cloud-handoff.md`](./checkpoint-2026-08-29-cloud-handoff.md)

ไฟล์นี้เก็บไว้เป็นประวัติก่อน Phase 5 go-live — สถานะล่าสุดอยู่ใน cloud handoff + `phase-5-go-live-status-2026-08-29.md`.

Branch: **`feature/dynamic-qr`** @ `fcc38d6` (pushed to GitHub)

---

## สิ่งที่ทำเสร็จแล้ว (session ล่าสุด)

### Backend
- Users, subscriptions, entitlements, quota (6 QR / 7k scans/year FREE)
- Clerk JWT + dev `X-Dev-User-Id` (dev only)
- API: `/api/me/quota`, CRUD/list/stats `/api/dynamic-qr`, redirect `/r/{code}`
- Migration: `20260828100000_AddUsersAndEntitlements.cs`
- Commit หลัก: `0c5f527` — Phase 5 launch tooling (74 files)

### Frontend
- Dynamic tab, dashboard `/[locale]/my/dynamic-qr`, manage `/[locale]/dynamic-qr/manage`
- Clerk sign-in/up, middleware protect, auth chrome ใน header
- **CORS fix:** `NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE=true` + `DYNAMIC_QR_API_ORIGIN` → proxy ผ่าน Next.js
- **Layout:** full-width account shell, sticky navbar, dashboard grid responsive
- Manage token UI **ถูกถอดแล้ว** — ใช้ Clerk login แทน (legacy token ใน i18n/owner-token.ts ยังค้างแต่ไม่แสดง)

### Railway (staging API)
- URL: `https://qr-api-production-fb1c.up.railway.app`
- Branch deploy: `feature/dynamic-qr`
- Env ตั้งแล้ว: `Auth__ClerkAuthority`, `DynamicQr__PublicBaseUrl`, `AllowLegacyOwnerToken=false`, `AllowDevUserHeader=false`, `MigrateOnStartup=true`
- Smoke: `/health/ready` 200, unauthenticated → 401

### Clerk (local `.env.local` — ไม่ commit)
- Instance: `https://assuring-camel-2125.clerk.accounts.dev`
- Login ใช้ได้ locally; dashboard fetch ผ่าน rewrite แล้ว

### Scripts / docs
- `scripts/test-phase-gate.ps1` (Phases 1–5)
- `scripts/staging-soak.ps1`, `setup-clerk-env.ps1`, `railway-staging-smoke.ps1`, `phase5-rollback-drill.ps1`
- `docs/phase-completeness-audit-2026-08-28.md`
- `docs/production-dynamic-qr-go-live.md`

---

## Phase status (สั้น ๆ)

| Phase | Code | Operator / manual |
|-------|------|-------------------|
| 0 | ✅ | — |
| 1 | ✅ | Railway มีแล้ว; Vercel prod `DYNAMIC_QR_API_ORIGIN` + redirect smoke บน genmyqrcode.com ยังไม่ |
| 2 | ✅ | Clerk local OK; Vercel **prod** keys + JWT tests ยังไม่ |
| 3 | ✅ | — |
| 4 | ✅ UI | **J1/J2** manual, Privacy/Terms draft |
| **5** | scripts/docs ✅ | **go-live prod ทั้งชุดยังไม่ทำ** |
| 6–8 | ไม่เริ่ม | ตั้งใจเลื่อน |

---

## Uncommitted / local-only (ตรวจก่อน push ครั้งถัดไป)

- `frontend/lib/dynamic-qr/config.ts` — rewrite mode
- `frontend/tests/dynamic-qr-config.test.ts`
- `.env.example` — rewrite vars
- Layout/UI: `dynamic-qr-account-layout.tsx`, `dynamic-qr-dashboard.tsx`, `site-header.tsx`, pages, i18n keys
- `frontend/.env.local` — secrets (ห้าม commit)

---

## Phase 5 ที่เหลือ (ลำดับ go-live)

1. Commit + push งานค้างบน `feature/dynamic-qr`
2. Neon prod migrate (ถ้ายังไม่รันบน prod DB)
3. Railway prod: `DynamicQr__Enabled=true` (หลังพร้อม)
4. Vercel prod env: `DYNAMIC_QR_API_ORIGIN`, Clerk keys, ทีหลัง `NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true`
5. Smoke `/r/{code}` บน `https://genmyqrcode.com` **ก่อน** เปิด UI flag
6. Manual **J1–J2** (มือถือสแกน PNG)
7. Rollback drill + monitor 48h

---

## วิธีรัน local (เมื่อกลับมาใช้เครื่อง)

```powershell
# Terminal 1 — API (ถ้าต้องการ local API)
.\scripts\start-local-dynamic-api.ps1

# Terminal 2 — Frontend
cd frontend
npm run dev
# http://localhost:3000/en/my/dynamic-qr
```

`.env.local` ต้องมีอย่างน้อย:
- `NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true`
- `NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE=true`
- `DYNAMIC_QR_API_ORIGIN=https://qr-api-production-fb1c.up.railway.app`
- Clerk keys

---

## หมายเหตุความปลอดภัย

- Clerk secret เคย paste ในแชท — **ควร rotate** ใน Clerk Dashboard ก่อน prod
- ห้าม commit `.env.local` / `.next`

---

## คำถามที่ checkpoint นี้ (2026-08-29)

ผู้ใช้จะไม่ใช้เครื่อง dev จนถึง ~30 (token reset) — ต้องการทางทำ Phase 5 ต่อโดยสั่ง AI หรือใช้แชทนี้ต่อ

ดูคำตอบในแชท session เดียวกัน (สรุป options: Cloud Agent, มือถือ/เครื่องอื่น, operator-only tasks, ข้อจำกัด J1/J2 ต้องคน)
