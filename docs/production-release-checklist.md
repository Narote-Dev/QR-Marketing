# Production release checklist — existing Railway / Vercel

ใช้คู่มือนี้เมื่อจะปล่อยแพตช์ไป **Railway Production เดิม** และ/หรือ **Vercel Production** ที่ Phase 5 ขึ้นแล้ว (`genmyqrcode.com` + `qr-api-production-fb1c.up.railway.app`)

ไม่ใช่คู่มือสร้างโปรเจกต์ใหม่ — อย่าสร้าง Railway project ใหม่ และอย่าเปลี่ยน DNS โดยไม่จำเป็น

อ้างอิงเสริม: [`request-protection.md`](./request-protection.md) · [`phase-5-go-live-status-2026-08-29.md`](./phase-5-go-live-status-2026-08-29.md) · [`development-handoff.md`](./development-handoff.md)

---

## หลักการสั้นๆ

1. Production **live อยู่แล้ว** — งานนี้คือปล่อยแพตช์ ไม่ใช่ go-live ครั้งแรก
2. ปล่อยทีละชั้น: **test/CI → preview/Clerk → proxy verify → อนุมัติเจ้าของ → deploy → smoke → rollback พร้อม**
3. Backend (Railway) และ Frontend (Vercel) ปล่อยแยกได้ — อย่าแก้ env/DNS/secret โดยไม่มีข้อความอนุมัติชัดเจน
4. Config ที่ผิด (โดยเฉพาะ `RequestProtection__*`) ทำให้ API ไม่ขึ้นหรือ rate-limit พังได้ — ตรวจบน preview/staging ก่อน
5. Agent ห้ามกด deploy production จนกว่าเจ้าของจะพิมพ์อนุมัติรอบนั้น

---

## Gate 0 — ยืนยันเป้าหมายก่อนเริ่ม

บันทึกใน handoff ก่อนทำอะไร:

| ตรวจ | ค่าที่ต้องรู้ |
|---|---|
| Branch / commit ที่จะปล่อย | เช่น `feature/dynamic-qr` @ `<sha>` |
| Surface ที่จะแตะ | Railway API เท่านั้น / Vercel เท่านั้น / ทั้งคู่ |
| มี schema migration ใหม่ไหม | ถ้ามี ต้องมี rollback/backup โน้ตแยก — แพตช์ ก.ย. ปัจจุบัน **ไม่มี** migration ใหม่ |
| Artifact production ปัจจุบัน | Railway ยังอยู่ที่ commit เก่าจนกว่าจะปล่อย (เช่น `efcbb75`) |
| Config source ของ Railway | ใช้ `railway.toml` (root `backend`, `backend/Dockerfile`) — **อย่า** สลับไป `railway.json` ระหว่างปล่อย |

หยุดทันทีถ้า: สร้าง project ใหม่, ชี้ไป Dockerfile คนละตัวโดยไม่ตั้งใจ, หรือจะหมุน secret ในรอบเดียวกันกับ deploy แอปโดยไม่จำเป็น

---

## Gate A — โค้ดและ CI (ทำก่อนขอ preview)

รันหรือยืนยันผลล่าสุดของ commit ที่จะปล่อย:

```powershell
npm test --prefix .\frontend
npm run build --prefix .\frontend
dotnet test .\backend\QrMarketing.Api.Tests\QrMarketing.Api.Tests.csproj
```

| ตรวจ | ผ่านเมื่อ |
|---|---|
| Frontend tests | ผ่านทั้งหมด |
| Frontend production build | ผ่าน (lint/typecheck รวม) |
| Backend tests รวม PostgreSQL integration | ผ่านทั้งหมด (หรือผ่านบน GitHub Actions ถ้าเครื่อง local ไม่มี .NET 8) |
| GitHub Actions บน commit นั้น | frontend + backend/Postgres + Docker builds เขียว |
| Diff review | ไม่มี blocker เรื่อง quota/auth/ownership/rollback |

ถ้าเช็คไหนรันไม่ได้เพราะ runtime/credential — บันทึกเป็น environment limitation อย่าปั้นว่าโค้ดพัง

---

## Gate B — Vercel Preview + Clerk (ต้องผ่านก่อน production)

ตอนนี้ branch preview ที่ไม่มี Clerk/Dynamic env จะให้หน้า public 200 แต่ sign-in / account / API rewrite เป็น **404** — นั่นไม่ใช่ gate ที่ใช้ปล่อยได้

### B1. ตั้ง Preview env (เจ้าของ Vercel)

บน Vercel **Preview** (ไม่ใช่ Production ก่อน):

- `NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true`
- `NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE=true`
- `DYNAMIC_QR_API_ORIGIN=` URL ของ API ที่ preview จะยิง (staging Railway ถ้ามี หรือ temporary verified API — **อย่าชี้ preview ไปทำลายข้อมูล production โดยไม่ตั้งใจ**)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` (instance ที่ตั้งใจใช้กับ preview)
- `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_API_BASE_URL` ให้ตรง preview origin ถ้าโปรเจกต์ต้องการ

Redeploy preview หลังใส่ env

### B2. Smoke บน Preview URL

ใช้ผู้ใช้ทดสอบ **อย่างน้อย 2 คน** (Clerk):

| # | ตรวจ | ผลที่ต้องได้ |
|---|---|---|
| 1 | หน้า generator / static QR | สร้างและดาวน์โหลดได้ — static ไม่พัง |
| 2 | Sign-in / sign-up | เข้าได้ ไม่ 404 |
| 3 | Dynamic tab → สร้าง QR | ได้ short URL + ขึ้นรายการ + quota |
| 4 | `/my/dynamic-qr` และ manage/edit | อ่าน/แก้ destination ได้ |
| 5 | Pause แล้วสร้างใหม่ แล้วพยายาม reactivate เกินโควต้า | ได้ 403 ตามที่แพตช์ตั้งใจ |
| 6 | ผู้ใช้ A ห้ามอ่าน/แก้ของ B | 404/forbid ตามเดิม |
| 7 | สแกน `/r/{code}` จาก preview rewrite path | ไปปลายทางถูกต้อง |
| 8 | Sign-out / session หมด | ไม่ค้างสิทธิ์ผิดคน |

ถ้ายังไม่มี Railway staging แยก: บอกความเสี่ยงชัดว่า preview ยิง API ชุดไหน และขออนุมัติเจ้าของก่อนใช้ production API เป็นเป้าหมายชั่วคราว

---

## Gate C — Proxy / RequestProtection

รายละเอียดค่า: [`request-protection.md`](./request-protection.md)

Production ปัจจุบัน **ยังไม่มี** `RequestProtection__*` — ค่า default จะไม่เชื่อ forwarded headers (ปลอดภัยกว่าเปิดมั่ว แต่ rate-limit redirect อาจรวมที่ IP ของ proxy)

### C1. ก่อนใส่ค่าบน production

1. วาดเส้นทางจริง: client → (Cloudflare?) → Vercel rewrite → Railway และ client → Railway โดยตรง
2. ดูว่า Railway/Vercel เขียนทับ `X-Forwarded-For` / proto / country อย่างไร
3. ใส่เฉพาะ IP/CIDR ที่พิสูจน์แล้ว — ห้าม `0.0.0.0/0`
4. ทดสอบบน preview/staging ก่อนคัดลอกไป production

### C2. ตรวจบังคับ

| # | ตรวจ | ผลที่ต้องได้ |
|---|---|---|
| 1 | สอง user คนละบัญชี | write limit แยกคน (POST+PATCH กินโควต้าร่วมของ user นั้น) |
| 2 | สอง client จริงหลัง proxy | redirect rate-limit ไม่ยุบเป็น partition เดียวโดยไม่ตั้งใจ |
| 3 | ส่ง header IP/country ปลอมทั้งทาง Vercel rewrite และตรงเข้า API | ห้ามยึดค่าปลอมถ้ายังไม่ trust |
| 4 | เปิด trust แล้ว | ค่าที่ถูกต้องผ่านได้ตามที่ออกแบบ |
| 5 | `X-Owner-Token` นอก Development | สร้าง/อ่าน/แก้ไม่ได้ |
| 6 | ใส่ `RequestProtection` ผิดรูป | API ต้อง fail startup ชัดเจน — อย่าปล่อยค่าที่ parse ไม่ได้ขึ้น production |

**ลำดับปล่อยที่ปลอดภัย:** deploy แอปแพตช์ด้วย trust ว่างก่อน (พฤติกรรมใกล้ของเดิม) → ตรวจ health/smoke → ค่อยใส่ `RequestProtection__*` ในรอบถัดไปหลังวัด proxy จริง แล้วค่อย smoke ซ้ำ

---

## Gate D — อนุมัติเจ้าของ (บังคับ)

Agent ขออนุมัติเป็นข้อความชัด เช่น:

> ขออนุมัติปล่อย commit `<sha>` ไป Railway Production เดิม (`qr-api-production-fb1c`) [และ/หรือ Vercel Production] โดยไม่สร้างโปรเจกต์ใหม่ ไม่หมุน secret ในรอบนี้ และมี rollback ตาม checklist

ห้าม deploy ถ้าอนุมัติคลุมเครือหรืออนุมัติแค่ “ไปต่องาน preview”

---

## Gate E — ลำดับ deploy production (หลังอนุมัติ)

### E1. เตรียม rollback ก่อนกด

| ชิ้น | วิธีกลับ |
|---|---|
| Railway app | redeploy artifact / commit ก่อนหน้า (`efcbb75` หรือ deployment ก่อนหน้าใน dashboard) |
| Dynamic QR kill-switch | Railway `DynamicQr__Enabled=false` แล้ว redeploy/reload |
| Vercel UI flag | `NEXT_PUBLIC_ENABLE_DYNAMIC_QR=false` แล้ว redeploy |
| Static QR | ต้องใช้ได้แม้ Dynamic ปิด — นี่คือ safety net หลัก |
| DB | แพตช์ที่ไม่มี migration ใหม่ → ไม่ต้อง downgrade schema; rollback แอปอย่างเดียวพอด |

บันทึกเวลาเริ่มปล่อยและผู้กดใน `docs/development-handoff.md`

### E2. ปล่อย Backend (Railway) ก่อนเมื่อแพตช์เป็น API

1. ยืนยัน service ชี้ `railway.toml` / `backend/Dockerfile`
2. Deploy commit ที่อนุมัติแล้วไป **environment Production เดิม**
3. รอ healthcheck `/health` ผ่าน
4. ตรวจทันที:

```text
GET https://qr-api-production-fb1c.up.railway.app/health        → 200
GET https://qr-api-production-fb1c.up.railway.app/health/ready  → 200
```

5. ยังไม่ใส่ `RequestProtection__*` ในรอบแรกถ้ายังไม่ผ่าน Gate C บน staging/preview

### E3. ปล่อย Frontend (Vercel) เมื่อแพตช์มี UI/rewrite/SEO

1. Deploy commit เดียวกัน (หรือคู่ที่เข้ากัน) ไป Production
2. อย่าเปลี่ยน `DYNAMIC_QR_API_ORIGIN` ออกจาก Railway production URL โดยไม่ตั้งใจ
3. คง `NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE=true` ตามของที่ใช้อยู่ถ้ายังพึ่ง rewrite

ถ้าแพตช์เป็น API อย่างเดียว — ปล่อย Railway พอในรอบนั้นได้ แล้วค่อยปล่อย frontend แยกเมื่อพร้อม

---

## Gate F — Production smoke หลัง deploy (ภายใน ~15 นาที)

### F1. อัตโนมัติ / ไม่ต้องล็อกอิน

| ตรวจ | คาดหวัง |
|---|---|
| `https://genmyqrcode.com/` | 200 |
| Railway `/health` + `/health/ready` | 200 Healthy |
| `https://genmyqrcode.com/api/me/quota` | 401 โดยไม่มี auth (พิสูจน์ rewrite ยังชี้ API) |
| `POST` dynamic-qr โดยไม่มี auth | 401 |
| หน้า SEO สำคัญที่แตะในแพตช์ | 200, canonical/robots ตามที่ออกแบบ |

### F2. ด้วยบัญชีจริง (เจ้าของหรือ tester)

| Journey | คาดหวัง |
|---|---|
| J0 Static | สร้าง/ดาวน์โหลด/สแกนได้เหมือนเดิม |
| J1 Sign-in + สร้าง Dynamic | ได้รายการ + quota |
| J2 แก้ destination + สแกนมือถือ | ปลายทางใหม่ |
| โควต้าเต็ม / reactivate เกินลิมิต | 403 ไม่ทะลุ |
| Pause / reactivate ในลิมิต | ทำงาน |
| Cross-user | ห้ามเห็นของคนอื่น |

ถ้าข้อใดใน F1/F2 พัง → **rollback ทันที** ตาม Gate E1 อย่าไล่แก้สดบน production เป็นชุดใหญ่

---

## Gate G — หลังเสถียร

1. อัปเดต `docs/development-handoff.md`: commit ที่ live, เวลา, ผล smoke, env ที่แตะ (ชื่อคีย์เท่านั้น ห้ามใส่ค่าลับ)
2. เฝ้า 24–48 ชม.: Railway logs, Vercel errors, สมัครใหม่, สแกนผิดปกติ
3. งานแยก (ต้องอนุมัติต่างหาก): หมุน Clerk จาก test keys, สร้าง Railway staging, รวม `railway.json`/`railway.toml`, ใส่ `RequestProtection__*` หลังวัด proxy จริง

---

## สิ่งที่ห้ามทำในรอบปล่อย

- สร้าง Railway/Vercel project ใหม่แทนของเดิม
- Merge/push/`railway up` / เปลี่ยน production env โดยไม่มีอนุมัติรอบนั้น
- เปิด `Auth__AllowDevUserHeader` หรือ legacy owner token บน Production
- ใส่ `RequestProtection` กว้างเกินหรือค่าที่ parse ไม่ได้
- ลบ/rename ตาราง หรือ migration ทำลายข้อมูลโดยนัย
- รวมการหมุน secret กับการปล่อยแอปในคำสั่งเดียวถ้าเลี่ยงได้
- สรุปว่า “deploy แล้ว” โดยยังไม่ทำ Gate F

---

## Checklist แบบติ๊ก (คัดลอกใส่ handoff ได้)

```text
[ ] Gate A — tests/build/CI/review ผ่านบน commit ที่จะปล่อย
[ ] Gate B — Preview มี Clerk + Dynamic; smoke 2 users ผ่าน
[ ] Gate C — proxy plan ชัด (หรือเลื่อน RequestProtection ไปรอบถัดไปโดยตั้งใจ)
[ ] Gate D — เจ้าของอนุมัติ commit + surface ชัดเจน
[ ] Gate E — rollback พร้อม; deploy Railway/Vercel ตามลำดับ
[ ] Gate F — health + rewrite + J0–J2/quota smoke ผ่าน
[ ] Gate G — อัปเดต handoff + เฝ้าระวัง
```
