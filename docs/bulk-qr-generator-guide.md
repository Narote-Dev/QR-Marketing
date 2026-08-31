# Bulk QR Generator — User Guide (Phase B1)

**Live tool:** https://genmyqrcode.com/en/bulk-qr-generator  
**In-app guide:** scroll to “Bulk QR code guide” on the same page.

Create up to **50 static QR codes per batch** from a CSV file. Everything runs in the browser — no upload to our servers, no account required.

---

## Supported types (Phase B1)

| `type` | Use for | Required fields |
|--------|---------|-----------------|
| `url` | Menu, landing page, campaign link | `url` (http/https) |
| `wifi` | Guest WiFi card, room tent | `wifiSsid`; `wifiPassword` unless encryption is `nopass` |
| `line` | LINE Official Account / ID | `lineId` (@handle or line.me URL) |
| `whatsapp` | Order / support chat | `whatsappPhone` (international format); `whatsappMessage` optional |
| `vcard` | Digital business card | `vcardFirstName` and/or `vcardLastName`; phone/email/website optional |

**Not in bulk yet:** email, phone, SMS, Google Review, social, payment, Dynamic QR (single generator only).

---

## CSV format

### Mixed batch (recommended)

One header row with all columns. Leave unused cells empty.

```csv
type,filename,label,url,wifiSsid,wifiPassword,wifiEncryption,lineId,whatsappPhone,whatsappMessage,vcardFirstName,vcardLastName,vcardPhone,vcardEmail
url,table-01,Scan menu,https://example.com/menu,,,,,,,,,
wifi,lobby-wifi,Guest WiFi,,GuestNet,welcome123,WPA,,,,,,
line,counter-line,Add LINE,,,,,@myshop,,,,,
whatsapp,order-desk,Order here,,,,,,+66812345678,Hello,,,,
vcard,owner-card,Contact,Somchai,Shop,,,,,+66812345678,hi@shop.com
```

### Legacy URL-only CSV (still supported)

```csv
url,filename,label
https://example.com/menu,table-01,Scan for menu
https://example.com/promo,table-02,Today's special
```

Or headerless two columns: `https://example.com/menu,table-01`

### Column reference

| Column | Notes |
|--------|--------|
| `type` | Required for mixed batches: `url`, `wifi`, `line`, `whatsapp`, `vcard` |
| `filename` | PNG name inside ZIP (no `.png` extension). Auto `qr-1`, `qr-2` if empty |
| `label` | Optional frame text when design uses a label frame |
| `wifiEncryption` | `WPA`, `WEP`, or `nopass` (defaults to WPA if omitted) |

**Aliases:** `link`/`destination` → url; `ssid` → wifiSsid; `phone` → vcardPhone (see parser in `frontend/lib/qr/batch/schema.ts`).

---

## Step-by-step

1. **Prepare CSV** in Excel, Google Sheets, or a text editor. Export as **CSV UTF-8**.
2. Open **Bulk QR generator** → **Upload CSV** (or download the sample first).
3. Check the preview table: **Type**, **Content**, **Filename**, **Status** (Ready / Invalid).
4. Pick a **template** or customize colors, logo, frame, and size (one design for the whole batch).
5. **Download ZIP** — PNGs render one at a time to stay light on memory (~4 GB RAM friendly).
6. **Scan test** a few PNGs at print size before a large print run.

---

## Common use cases

- **Restaurant:** URL per table + WiFi row + LINE row in one ZIP  
- **Hotel:** WiFi per room + vCard at reception  
- **Retail:** URL per SKU with matching filename (`sku-1001`)  
- **Events:** WhatsApp support line + URL registration links  

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Row **Invalid** | Check required fields for that `type`; phone numbers need `+` country code; URLs need `https://` |
| ZIP has fewer files than rows | Invalid rows are skipped; only **Ready** rows export |
| More than 50 rows | Only first 50 load — split into multiple batches |
| Excel breaks CSV | Export UTF-8 CSV; avoid semicolon locales; wrap comma cells in `"quotes"` |
| Unsupported `type` | Use one of the five B1 types above |
| vCard hard to scan | Shorter contact data scans better; use error correction Q/H with logos |

---

## Privacy

CSV parsing, QR rendering, and ZIP creation run **entirely in your browser**. We do not store your spreadsheet or exported images on our servers.

---

# คู่มือสร้างคิวอาร์โค้ดเป็นชุด (Phase B1)

**หน้าเครื่องมือ:** https://genmyqrcode.com/th/bulk-qr-generator  
**คู่มือบนหน้าเว็บ:** เลื่อนไปที่ “คู่มือสร้างคิวอาร์โค้ดเป็นชุด”

สร้างคิวอาร์โค้ด static ได้สูงสุด **50 โค้ดต่อชุด** จากไฟล์ CSV ทำงานในเบราว์เซอร์ ไม่อัปโหลดขึ้นเซิร์ฟเวอร์ ไม่ต้องสมัครสมาชิก

---

## ประเภทที่รองรับ

| `type` | ใช้เมื่อ | ข้อมูลที่ต้องมี |
|--------|----------|----------------|
| `url` | เมนู, หน้า landing, แคมเปญ | `url` ขึ้นต้น http/https |
| `wifi` | WiFi แขก, การ์ดห้องพัก | `wifiSsid`; รหัสผ่าน (ยกเว้น `nopass`) |
| `line` | LINE ร้าน | `lineId` (@ หรือ URL line.me) |
| `whatsapp` | สั่งของ / สอบถาม | `whatsappPhone` แบบ +66…; ข้อความไม่บังคับ |
| `vcard` | นามบัตรดิจิทัล | ชื่อหรือนามสกุลอย่างน้อยหนึ่งค่า |

**ยังไม่มีใน bulk:** email, phone, SMS, Google Review, social, payment, Dynamic QR

---

## รูปแบบ CSV

ใช้คอลัมน์ `type` + field ตามประเภท คอลัมน์ที่ไม่ใช้ปล่อยว่าง  
ดาวน์โหลด **ตัวอย่าง CSV** จากหน้า bulk ได้เลย

CSV แบบเก่า (มีแค่ `url,filename,label`) **ยังใช้ได้**

---

## ขั้นตอน

1. เตรียม CSV → Export เป็น **CSV UTF-8**  
2. อัปโหลด → ดูตาราง preview (ประเภท / เนื้อหา / สถานะ)  
3. เลือกเทมเพลตหรือปรับดีไซน์ (ชุดเดียวทั้ง batch)  
4. ดาวน์โหลด ZIP  
5. สแกนทดสอบก่อนพิมพ์จำนวนมาก  

---

## แก้ปัญหาเร็ว

- **Invalid** — ตรวจ field ตาม type; เบอร์ใส่ + รหัสประเทศ  
- ZIP น้อยกว่าแถว — แถว Invalid ไม่ถูก export  
- เกิน 50 แถว — แบ่งหลายชุด  
- type ไม่รองรับ — ใช้เฉพาะ 5 ประเภทด้านบน  

---

## ความเป็นส่วนตัว

ประมวลผล CSV และสร้าง ZIP ในเบราว์เซอร์ของคุณเท่านั้น เราไม่เก็บไฟล์บนเซิร์ฟเวอร์
