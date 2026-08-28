# Architecture: External API v1 (ERP / D365FO)

Status: **design approved for planning — not implemented**  
Branch: `feature/dynamic-qr` until explicit production merge  
Related: [`architecture-dynamic-qr.md`](./architecture-dynamic-qr.md), [`architecture-subscription-entitlement.md`](./architecture-subscription-entitlement.md), [`plan-dynamic-qr-integrated-roadmap.md`](./plan-dynamic-qr-integrated-roadmap.md)

**Constraints**

- Base path: **`/api/v1/`**
- **HTTPS only** — no direct database access for integrators (including D365FO).
- Generic **external reference** model — D365FO is the primary enterprise target, not the only supported system.
- **No payment / Stripe** in this API layer; subscription enforcement delegates to `IEntitlementService`.
- **No X++ implementation** in this document — conceptual integration patterns only.

---

## 1. Purpose and scope

The External API v1 lets ERP systems, automation scripts, and partners manage **Dynamic QR** resources programmatically:

- Create QR codes bound to business documents (Sales Order, Product, Shipment, Invoice, …).
- Update redirect targets when business URLs change.
- Activate / deactivate when business data becomes valid or invalid.
- Read scan analytics for operational dashboards.

**Out of scope (later phases):** bulk import, OAuth admin UI, AppSource packaging, webhook delivery UI, physical QR image generation (integrators encode `shortUrl` locally or via static generator).

---

## 2. System context

```mermaid
flowchart LR
  subgraph erp [ERP / Integrators]
    D365[D365FO X++]
    SAP[SAP / Odoo / custom]
    Scripts[cURL / Postman / CI]
  end

  subgraph genmy [genmyQRCode — Railway API]
    GW[HTTPS Gateway]
    Auth[Auth middleware]
    RL[Rate limiter]
    Ent[IEntitlementService]
    Svc[IDynamicQrService]
    Audit[IAuditLogService]
    WH[IWebhookDispatcher]
  end

  subgraph data [Neon PostgreSQL — internal only]
    DB[(dynamic_qr + external_ref + api_keys)]
  end

  D365 -->|Bearer API key or OAuth| GW
  SAP --> GW
  Scripts --> GW
  GW --> Auth --> RL --> Ent --> Svc
  Svc --> DB
  Svc --> Audit
  Svc --> WH
```

**Hard rule:** D365FO (and all ERPs) call **`https://api.genmyqrcode.com/api/v1/...`** (or staging equivalent). They **never** connect to PostgreSQL, Neon console, or Railway internal networks.

---

## 3. API surface (contract)

### 3.1 Base URL and media type

| Item | Value |
|------|--------|
| Production base | `https://api.genmyqrcode.com/api/v1` |
| Staging base | `https://api-staging.genmyqrcode.com/api/v1` |
| Request / response | `application/json; charset=utf-8` |
| Field naming | **camelCase** JSON |
| Timestamps | ISO-8601 UTC (`2026-08-28T07:30:00Z`) |
| IDs | UUID v4 for `id`; opaque `shortCode` for redirect |

### 3.2 Resource model: `Qr`

| Field | Type | Notes |
|-------|------|--------|
| `id` | UUID | Server-assigned; stable for life of resource |
| `shortCode` | string | Immutable; encoded in printed QR (`/r/{shortCode}`) |
| `shortUrl` | string | Full HTTPS URL — **what ERP stores on labels** |
| `name` | string | Display label (max 200) |
| `targetUrl` | string | Current redirect destination (http/https, max 2048) |
| `status` | enum | `active` \| `paused` \| `expired` |
| `expiresAt` | datetime \| null | Optional TTL |
| `externalRef` | object \| null | ERP correlation — see §4 |
| `scanCount` | integer | Denormalized total (read-only) |
| `createdAt` | datetime | |
| `updatedAt` | datetime | |

**Printed QR invariant:** image encodes `shortUrl` only. Changing `targetUrl` does **not** require reprinting.

### 3.3 Endpoints (required operations)

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/qr` | Create QR (+ optional external ref) |
| `GET` | `/qr/{id}` | Get by internal id |
| `PUT` | `/qr/{id}` | Replace mutable metadata (`name`, `expiresAt`, `externalRef.metadata`) |
| `DELETE` | `/qr/{id}` | **Soft delete** → `status: paused` (see §3.4) |
| `PUT` | `/qr/{id}/target` | Replace `targetUrl` only |
| `POST` | `/qr/{id}/activate` | Set `status: active` |
| `POST` | `/qr/{id}/deactivate` | Set `status: paused` |
| `GET` | `/qr/{id}/analytics` | Scan totals + time series |

**Supplementary (recommended, same v1):**

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/qr` | List QRs for authenticated tenant (paginated) |
| `GET` | `/qr/by-external` | Lookup by external ref query params |
| `GET` | `/openapi.json` | OpenAPI 3.1 machine-readable contract |

### 3.4 DELETE semantics

| Policy | Behavior |
|--------|----------|
| **Default (all plans)** | `DELETE /qr/{id}` sets `status: paused`; row retained; redirect returns **410 Gone** until reactivated |
| **Idempotent** | Second `DELETE` → **200** with current resource (already paused) |
| **Hard delete** | **Not exposed** in v1 — avoids breaking printed codes and audit trail |

Integrators that need “disable when invalid” should prefer **`POST /qr/{id}/deactivate`** or **`DELETE`** (equivalent end state).

---

## 4. External references (generic ERP)

### 4.1 Shape

```json
{
  "externalSystem": "D365FO",
  "externalCompany": "USMF",
  "externalType": "SalesOrder",
  "externalId": "SO-000123",
  "metadata": {
    "dataAreaId": "USMF",
    "salesId": "SO-000123",
    "customerAccount": "US-001"
  }
}
```

| Field | Required | Max | Notes |
|-------|----------|-----|--------|
| `externalSystem` | yes | 64 | e.g. `D365FO`, `SAP`, `Odoo`, `Custom` |
| `externalCompany` | no* | 64 | Legal entity / company / site — *required when ERP is multi-company |
| `externalType` | yes | 64 | Document type — see §4.2 |
| `externalId` | yes | 128 | Business key as string |
| `metadata` | no | 4 KB JSON | Opaque to genmyQRCode; echoed in GET; useful for D365 debugging |

### 4.2 Recommended `externalType` values (D365FO)

| externalType | Typical use |
|--------------|-------------|
| `SalesOrder` | Order confirmation / portal link on pick list |
| `SalesLine` | Line-level tracking URL |
| `Product` | Item catalog / spec sheet |
| `Shipment` | Packing slip / tracking portal |
| `Invoice` | Customer invoice PDF portal |
| `PurchaseOrder` | Vendor-facing link |
| `Customer` | CRM portal / statement |
| `WarehouseWork` | Mobile warehouse task deep link |

Other ERPs define their own `externalSystem` + `externalType` — no code change required.

### 4.3 Uniqueness and idempotent create

Database constraint (from platform architecture):

```sql
UNIQUE (external_system, external_company, external_type, external_id)
```

**`POST /qr` with existing external ref:**

| Response | When |
|----------|------|
| **200 OK** + existing `Qr` body | Ref already mapped — **preferred for ERP retries** |
| **201 Created** | New QR allocated |

Optional header `Idempotency-Key` (see §7) applies to the whole create operation.

### 4.4 Lookup by external ref

```http
GET /api/v1/qr/by-external?externalSystem=D365FO&externalCompany=USMF&externalType=SalesOrder&externalId=SO-000123
Authorization: Bearer byq_live_...
```

Returns **200** + `Qr` or **404** if never created.

---

## 5. Authentication

### 5.1 Supported mechanisms (phased)

| Phase | Mechanism | Consumer |
|-------|-----------|----------|
| **7 (MVP)** | **API key** — `Authorization: Bearer byq_live_{secret}` | D365 POC, scripts |
| **8+** | **OAuth 2.0 client credentials** (Azure AD app per enterprise tenant) | Customers requiring SSO / key rotation policy |
| **Never on v1 public API** | Clerk session JWT | Web UI uses `/api/dynamic-qr/*` instead |

### 5.2 API key format

| Part | Example |
|------|---------|
| Prefix (stored for lookup) | `byq_live_abc12` |
| Full secret (shown once) | `byq_live_abc12_xK9mN2pQ8vR4wL7sT1uY0zA` |
| Storage | SHA-256 hash only in `api_keys.key_hash` |

Keys are created via **dashboard** (authenticated user) or future admin API — not via public v1 self-service in Phase 7.

### 5.3 OAuth strategy (future — design now)

| Item | Value |
|------|--------|
| Flow | Client credentials |
| Token endpoint | `https://api.genmyqrcode.com/oauth/token` |
| Scopes | `qr:read`, `qr:write`, `qr:analytics`, `webhooks:manage` |
| Mapping | Azure AD `appId` → `oauth_clients` table → `users.id` (service account) |

Business logic remains identical after token validation — only the auth middleware differs.

### 5.4 Authentication failures

```json
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer error="invalid_token"
Content-Type: application/json

{
  "error": "auth.invalid_token",
  "message": "API key is invalid or revoked.",
  "correlationId": "c7f3a2b1-4e5d-6789-abcd-ef0123456789"
}
```

---

## 6. Authorization

### 6.1 Tenant isolation model

Every API key (or OAuth client) maps to exactly one **`users.id`** — the **tenant**.

| Rule | Enforcement |
|------|-------------|
| All QR rows include `user_id` | Set at create from key's user |
| Read/update/delete | `dynamic_qr.user_id == api_key.user_id` |
| External ref uniqueness | **Global per tenant** — same ref cannot belong to two users |
| Cross-tenant access | **404** (not 403) to prevent id enumeration |

There is **no** `X-Tenant-Id` header in v1 — tenant is implied by credential. Enterprise with multiple FO companies still uses one genmyQRCode account; **`externalCompany`** disambiguates ERP entities.

### 6.2 Scopes (API keys)

| Scope | Allows |
|-------|--------|
| `qr:read` | GET `/qr`, `/qr/{id}`, `/qr/by-external`, `/qr/{id}/analytics` |
| `qr:write` | POST, PUT, DELETE, activate, deactivate, target |
| `qr:analytics` | Implicit in read; separated for least-privilege keys |

Missing scope → **403**:

```json
{
  "error": "auth.insufficient_scope",
  "message": "This API key lacks qr:write.",
  "requiredScope": "qr:write",
  "correlationId": "..."
}
```

### 6.3 Subscription-gated authorization

Before mutating operations:

1. `IEntitlementService.CanUseApiAsync(userId)` — plan must have `api.enabled = true`.
2. `CanCreateDynamicQrAsync` — on POST only.
3. Rate limiter reads `api.requests_per_minute` from plan entitlements.

Failure → **403** with upgrade hint (not 401).

---

## 7. Idempotency

### 7.1 Header

```http
Idempotency-Key: d365-usmf-so-000123-create-v1
```

| Operation | Supported | TTL |
|-----------|-----------|-----|
| `POST /qr` | **Yes** | 24 hours |
| `PUT /qr/{id}/target` | **Yes** | 24 hours |
| `POST activate/deactivate` | Optional | 24 hours |
| `GET` | N/A | — |

### 7.2 Server behavior

1. Hash `(user_id, idempotency_key, method, path)`.
2. If stored response exists → return **same status + body** without re-executing.
3. If in-flight lock → **409** `idempotency.in_progress` with `Retry-After: 5`.

Storage: `idempotency_records` table or Redis — Phase 7 implementation detail.

### 7.3 External ref idempotency (without header)

ERP retries of **`POST /qr`** with the same `externalRef` tuple always return the **same QR** (**200**), even without `Idempotency-Key`.

---

## 8. Request validation

### 8.1 Rules

| Field | Validation |
|-------|------------|
| `targetUrl` | Required on create; must be `http://` or `https://`; block `javascript:`, `file:`, private IP ranges (SSRF guard) |
| `name` | 1–200 chars; trim whitespace |
| `externalRef.*` | Required fields present; lengths per §4.1 |
| `expiresAt` | Must be future if set |
| UUID path `{id}` | RFC 4122 format |

### 8.2 Validation error response

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "validation.failed",
  "message": "One or more fields are invalid.",
  "correlationId": "c7f3a2b1-...",
  "details": [
    {
      "field": "targetUrl",
      "code": "validation.url.invalid_scheme",
      "message": "targetUrl must use http or https."
    }
  ]
}
```

---

## 9. Error responses (standard envelope)

All non-2xx responses use:

```json
{
  "error": "stable.machine.code",
  "message": "Human-readable summary.",
  "correlationId": "uuid",
  "details": []
}
```

### 9.1 HTTP status matrix

| HTTP | error code (examples) | When |
|------|------------------------|------|
| 400 | `validation.failed` | Invalid body |
| 401 | `auth.missing_credentials`, `auth.invalid_token` | No / bad Bearer |
| 403 | `auth.insufficient_scope`, `quota.api.disabled`, `quota.dynamic_qr.max_active` | Auth OK but not allowed |
| 404 | `qr.not_found` | Unknown id or not owned |
| 409 | `idempotency.in_progress`, `qr.conflict` | Rare internal collision |
| 410 | — | **Redirect only** — paused/expired QR at `/r/{code}` |
| 429 | `rate_limit.exceeded` | See §10 |
| 500 | `internal.error` | Unexpected |
| 503 | `service.unavailable` | Write path DB down |

### 9.2 Quota-specific 403 example

```json
HTTP/1.1 403 Forbidden

{
  "error": "quota.dynamic_qr.max_active",
  "message": "Active Dynamic QR limit reached for current plan.",
  "limit": 25,
  "used": 25,
  "upgradePlan": "business",
  "correlationId": "..."
}
```

---

## 10. Rate limiting

### 10.1 Plan-driven limits

From `plan_entitlements` (not hard-coded):

| Plan | `api.requests_per_minute` |
|------|---------------------------|
| FREE | 0 (API disabled) |
| PRO | 120 |
| BUSINESS | 600 |
| ENTERPRISE | 3000 |

### 10.2 Additional guardrails

| Class | Limit | Key |
|-------|-------|-----|
| POST create | 30/hour/user | Abuse protection |
| Failed auth | 10/min/IP | Credential stuffing |
| Redirect `/r/*` | Separate limiter | Not part of External API |

### 10.3 429 response

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 42
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1693234567

{
  "error": "rate_limit.exceeded",
  "message": "API rate limit exceeded. Retry after 42 seconds.",
  "correlationId": "..."
}
```

---

## 11. API versioning

| Rule | Detail |
|------|--------|
| Current version | **`v1`** in URL path — `/api/v1/qr` |
| Breaking changes | New path `/api/v2/` only |
| Non-breaking additions | New JSON fields (clients must ignore unknown fields) |
| Deprecation | `Sunset` + `Deprecation` headers; minimum 12 months notice for enterprise |
| OpenAPI | `/api/v1/openapi.json` — source of truth for code gen in D365 / Postman |

**Version header (optional):** clients may send `Api-Version: 2026-08-28` for date-stamped snapshots; server defaults to latest v1.

---

## 12. Correlation IDs

### 12.1 Request

Clients **should** send:

```http
X-Correlation-Id: d365-so-000123-20260828-001
```

If omitted, API generates UUID and returns it in response body + header:

```http
X-Correlation-Id: c7f3a2b1-4e5d-6789-abcd-ef0123456789
```

### 12.2 Usage

- Logged in `audit_logs.metadata_json.correlationId`
- Returned on all success and error responses
- D365FO should persist correlation id on `SalesTable`/custom table for support tickets

---

## 13. Audit logging

Append-only `audit_logs` for every mutating v1 call:

| action | When |
|--------|------|
| `qr.created` | POST /qr |
| `qr.updated` | PUT /qr/{id} |
| `qr.target_updated` | PUT /qr/{id}/target |
| `qr.activated` | POST activate |
| `qr.deactivated` | POST deactivate or DELETE |
| `api.request.failed` | Sampled 401/403 |

Metadata stores: `correlationId`, `externalRef` snapshot, **target URL domain** (not full URL with secrets), `oldStatus`/`newStatus`. Never store API key secrets or Bearer tokens.

Retention: 90 days default; 1 year+ for ENTERPRISE (`analytics.retention_days` alignment).

---

## 14. API usage tracking

### 14.1 Metrics per request

| Dimension | Stored |
|-----------|--------|
| `user_id` | From API key |
| `api_key_id` | Key used |
| `method`, `path_template` | e.g. `POST /api/v1/qr` |
| `status_code` | |
| `duration_ms` | |
| `correlation_id` | |

Rollup table `api_usage_hourly` (user_id, hour, endpoint, count) for billing analytics **future** — design now, implement with Phase 7.

### 14.2 Response headers (optional)

```http
X-Quota-DynamicQr-Used: 4
X-Quota-DynamicQr-Limit: 25
X-Quota-Api-Remaining-Minute: 118
```

---

## 15. Subscription enforcement (integration point)

```mermaid
flowchart TB
  Req[HTTP Request]
  Auth[Authenticate API key]
  Ent[IEntitlementService]
  RL[Rate limiter]
  Svc[DynamicQrService]

  Req --> Auth --> Ent
  Ent -->|CanUseApiAsync| RL
  RL --> Svc
  Ent -->|CanCreateDynamicQrAsync| Svc
```

| Check | Operation | Deny |
|-------|-----------|------|
| `api.enabled` | All v1 routes | 403 `quota.api.disabled` |
| `api.max_keys` | Key creation (dashboard) | 403 |
| `dynamic_qr.max_active` | POST /qr | 403 |
| `api.requests_per_minute` | All v1 routes | 429 |
| Scan quota | **Not** enforced on API writes | Scans enforced at redirect |

Plan limits live in **`plan_entitlements`** — see [`architecture-subscription-entitlement.md`](./architecture-subscription-entitlement.md).

---

## 16. Webhooks (design — Phase 8+)

ERP may subscribe to events instead of polling.

### 16.1 Registration (future)

```http
POST /api/v1/webhooks
{
  "url": "https://customer.example/d365/qr-events",
  "events": ["qr.scan.threshold", "qr.deactivated"],
  "secret": "whsec_..."
}
```

### 16.2 Event envelope

```json
{
  "id": "evt_01H...",
  "type": "qr.scan.threshold",
  "createdAt": "2026-08-28T07:30:00Z",
  "data": {
    "qrId": "550e8400-e29b-41d4-a716-446655440000",
    "shortCode": "Ab3xK9",
    "scanCount": 1000,
    "externalRef": { "externalSystem": "D365FO", "externalType": "SalesOrder", "externalId": "SO-000123" }
  }
}
```

Headers: `X-Webhook-Signature: sha256=...`, `X-Correlation-Id`.

**MVP:** D365 uses synchronous API responses + optional polling `GET /qr/{id}/analytics` — webhooks when pilot requires near-real-time.

---

## 17. Retry behavior (client guidance)

Document for D365 integrators:

| HTTP | Client action |
|------|-------------|
| 2xx | Success — persist `id`, `shortUrl` |
| 400 | Fix payload — do not retry |
| 401 | Fix credentials — do not retry until rotated |
| 403 quota | Surface to user / upgrade — do not blind retry |
| 404 | Create if expected missing |
| 409 in-progress | Retry after `Retry-After` |
| 429 | Exponential backoff respecting `Retry-After` |
| 500 / 503 | Retry with backoff: 1s, 2s, 4s, 8s, max 5 attempts |

**Idempotent creates:** always safe to retry `POST /qr` with same `externalRef`.

**Target updates:** use `Idempotency-Key` per logical business event (e.g. one key per Sales Order confirmation revision).

---

## 18. D365FO scenario flows

### 18.1 Create QR for Sales Order

**Trigger:** Sales order confirmed / released to warehouse.

```http
POST /api/v1/qr
Authorization: Bearer byq_live_abc12_xK9mN2pQ8vR4wL7sT1uY0zA
Content-Type: application/json
X-Correlation-Id: d365-usmf-so-000123-create
Idempotency-Key: D365FO|USMF|SalesOrder|SO-000123

{
  "name": "Sales order SO-000123",
  "targetUrl": "https://b2b.contoso.com/orders/SO-000123",
  "externalRef": {
    "externalSystem": "D365FO",
    "externalCompany": "USMF",
    "externalType": "SalesOrder",
    "externalId": "SO-000123",
    "metadata": {
      "salesId": "SO-000123",
      "custAccount": "US-001"
    }
  }
}
```

**201 Created**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "shortCode": "Ab3xK9",
  "shortUrl": "https://genmyqrcode.com/r/Ab3xK9",
  "name": "Sales order SO-000123",
  "targetUrl": "https://b2b.contoso.com/orders/SO-000123",
  "status": "active",
  "expiresAt": null,
  "externalRef": {
    "externalSystem": "D365FO",
    "externalCompany": "USMF",
    "externalType": "SalesOrder",
    "externalId": "SO-000123",
    "metadata": { "salesId": "SO-000123", "custAccount": "US-001" }
  },
  "scanCount": 0,
  "createdAt": "2026-08-28T07:30:00Z",
  "updatedAt": "2026-08-28T07:30:00Z"
}
```

D365 stores **`shortUrl`** on label / report dataset — not internal UUID.

---

### 18.2 Update target when Sales Order portal URL changes

**Trigger:** Order rebooked to new B2B portal deep link.

```http
PUT /api/v1/qr/550e8400-e29b-41d4-a716-446655440000/target
Authorization: Bearer byq_live_...
Content-Type: application/json
X-Correlation-Id: d365-usmf-so-000123-target-v2
Idempotency-Key: D365FO|USMF|SalesOrder|SO-000123|target|2

{
  "targetUrl": "https://b2b.contoso.com/orders/SO-000123?rev=2"
}
```

**200 OK** — same `shortUrl`; printed QR unchanged.

Alternative: lookup first if id not stored:

```http
GET /api/v1/qr/by-external?externalSystem=D365FO&externalCompany=USMF&externalType=SalesOrder&externalId=SO-000123
```

Then `PUT .../target` with returned `id`.

---

### 18.3 Create QR for Product

```http
POST /api/v1/qr
{
  "name": "Product A0001",
  "targetUrl": "https://www.contoso.com/products/A0001",
  "externalRef": {
    "externalSystem": "D365FO",
    "externalCompany": "USMF",
    "externalType": "Product",
    "externalId": "A0001"
  }
}
```

Use case: item label with spec sheet / marketing page — one QR per item master (idempotent on item id).

---

### 18.4 Create QR for Shipment

```http
POST /api/v1/qr
{
  "name": "Shipment SH-000456",
  "targetUrl": "https://tracking.contoso.com/SH-000456",
  "externalRef": {
    "externalSystem": "D365FO",
    "externalCompany": "USMF",
    "externalType": "Shipment",
    "externalId": "SH-000456",
    "metadata": { "salesId": "SO-000123" }
  }
}
```

Typical: packing slip encodes `shortUrl`; target may later point to carrier tracking URL via `PUT .../target`.

---

### 18.5 Create QR for Invoice

```http
POST /api/v1/qr
{
  "name": "Invoice INV-000789",
  "targetUrl": "https://portal.contoso.com/invoices/INV-000789",
  "externalRef": {
    "externalSystem": "D365FO",
    "externalCompany": "USMF",
    "externalType": "Invoice",
    "externalId": "INV-000789"
  }
}
```

---

### 18.6 Disable QR when business data becomes invalid

**Triggers:** Sales order cancelled, invoice credited, shipment voided.

**Option A — deactivate by id**

```http
POST /api/v1/qr/550e8400-e29b-41d4-a716-446655440000/deactivate
X-Correlation-Id: d365-usmf-so-000123-cancel
```

**200 OK**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "paused",
  "shortUrl": "https://genmyqrcode.com/r/Ab3xK9",
  "...": "..."
}
```

Public redirect: **410 Gone** (or branded “link inactive” page — product decision).

**Option B — DELETE (soft)**

```http
DELETE /api/v1/qr/550e8400-e29b-41d4-a716-446655440000
```

Same end state as deactivate.

**Re-enable:** `POST /qr/{id}/activate` if order reopened.

---

### 18.7 Analytics for operations

```http
GET /api/v1/qr/550e8400-e29b-41d4-a716-446655440000/analytics?from=2026-08-01&to=2026-08-28&granularity=day
```

**200 OK**

```json
{
  "qrId": "550e8400-e29b-41d4-a716-446655440000",
  "shortCode": "Ab3xK9",
  "totalScans": 142,
  "period": {
    "from": "2026-08-01T00:00:00Z",
    "to": "2026-08-28T23:59:59Z"
  },
  "series": [
    { "date": "2026-08-26", "scans": 12 },
    { "date": "2026-08-27", "scans": 45 },
    { "date": "2026-08-28", "scans": 85 }
  ],
  "breakdown": {
    "device": { "mobile": 120, "desktop": 22 },
    "country": { "US": 90, "TH": 52 }
  }
}
```

`breakdown` omitted on plans without `analytics.breakdown_enabled`.

---

## 19. D365FO X++ — conceptual integration (no code)

### 19.1 Architecture in FO

```text
SalesTable / InventTable / WHSShipment / CustInvoiceJour
        │
        ▼
  [Extension class or batch job]
        │
        ▼
  GenmyQrApiClient  (single wrapper — no scattered HTTP)
        │
        ▼
  HTTPS → genmyQRCode /api/v1/*
        │
        ▼
  Persist shortUrl on custom table GenmyQrLink (SalesId, ShortUrl, QrId, CorrelationId)
        │
        ▼
  SSRS report / label → barcode of shortUrl (or pre-rendered QR image field)
```

### 19.2 Where to hook (typical)

| Scenario | FO hook (conceptual) |
|----------|----------------------|
| Sales Order QR | `SalesTable` post-confirm / workflow approval |
| Target URL change | `SalesTable` event when customer portal URL field changes |
| Product QR | `InventTable` on item activation |
| Shipment QR | `WHSShipmentTable` when shipment finalized |
| Invoice QR | `CustInvoiceJour` post invoice |
| Disable QR | `SalesTable` cancel / `CustInvoiceJour` reversal |

### 19.3 X++ client responsibilities (conceptual)

1. Read API key from **secure configuration** (Azure Key Vault reference / FO encrypted config) — never hard-code in X++.
2. Build JSON payload with `externalRef` matching FO keys (`DataAreaId` → `externalCompany`, `SalesId` → `externalId`).
3. Send `X-Correlation-Id` = `{DataAreaId}-{TableId}-{RecId}-{UTC timestamp}`.
4. On **200/201**, write `shortUrl` + `id` to `GenmyQrLink`.
5. On **403 quota**, log to FO event log; optional alert to admin.
6. On **429/503**, retry with backoff (see §17) inside `GenmyQrApiClient`.
7. **Never** open SQL connection to Neon — no ODBC, no linked server.

### 19.4 Pseudocode (illustrative — not production X++)

```text
class GenmyQrApiClient
{
    str baseUrl = "https://api.genmyqrcode.com/api/v1";
    str apiKey; // from secure config

    GenmyQrContract createSalesOrderQr(SalesId _salesId, str _targetUrl)
    {
        externalRef = {
            externalSystem: "D365FO",
            externalCompany: curExt(),
            externalType: "SalesOrder",
            externalId: _salesId
        };
        body = { name: strFmt("SO %1", _salesId), targetUrl: _targetUrl, externalRef: externalRef };
        return postJson("/qr", body, idempotencyKey: strFmt("D365FO|%1|SalesOrder|%2", curExt(), _salesId));
    }

    void updateTarget(str _qrId, str _newUrl)
    {
        putJson(strFmt("/qr/%1/target", _qrId), { targetUrl: _newUrl });
    }

    void deactivateByExternal(SalesId _salesId)
    {
        qr = getJson(strFmt("/qr/by-external?externalSystem=D365FO&externalCompany=%1&externalType=SalesOrder&externalId=%2", curExt(), _salesId));
        postJson(strFmt("/qr/%1/deactivate", qr.id), {});
    }
}
```

Real implementation uses FO **`System.Net.Http`** or approved HTTP helper, TLS 1.2+, and async pattern if running in batch.

---

## 20. Service interfaces (backend — for later implementation)

Controllers stay thin; shared with web JWT surface.

```csharp
// Conceptual — not implemented

public interface IDynamicQrApiService
{
    Task<QrDto> CreateAsync(Guid userId, CreateQrRequest req, IdempotencyContext? idempotency, CancellationToken ct);
    Task<QrDto?> GetByIdAsync(Guid userId, Guid qrId, CancellationToken ct);
    Task<QrDto?> GetByExternalRefAsync(Guid userId, ExternalRefQuery query, CancellationToken ct);
    Task<QrDto> UpdateMetadataAsync(Guid userId, Guid qrId, UpdateQrRequest req, CancellationToken ct);
    Task<QrDto> UpdateTargetAsync(Guid userId, Guid qrId, UpdateTargetRequest req, IdempotencyContext? idempotency, CancellationToken ct);
    Task<QrDto> ActivateAsync(Guid userId, Guid qrId, CancellationToken ct);
    Task<QrDto> DeactivateAsync(Guid userId, Guid qrId, CancellationToken ct);
    Task<QrAnalyticsDto> GetAnalyticsAsync(Guid userId, Guid qrId, AnalyticsQuery query, CancellationToken ct);
}

public interface IApiKeyAuthenticationService
{
    Task<ApiKeyPrincipal?> ValidateBearerAsync(string bearerToken, CancellationToken ct);
}

public interface IExternalApiMiddleware
{
    // Order: Auth → Entitlement (api.enabled) → Rate limit → Audit → Handler
}
```

---

## 21. Database additions (API-specific)

| Table | Purpose |
|-------|---------|
| `api_keys` | Hashed secrets, scopes, user_id — see platform doc |
| `idempotency_records` | `(user_id, key, method, path)` → response snapshot |
| `api_usage_hourly` | Optional rollup for metering |
| `oauth_clients` | Phase 8+ Azure AD mapping |
| `webhook_subscriptions` | Phase 8+ outbound events |

Existing: `dynamic_qr`, `dynamic_qr_external_ref`, `audit_logs`.

---

## 22. Failure cases (operational)

| Case | API behavior | D365 guidance |
|------|--------------|---------------|
| Duplicate create same external ref | 200 existing QR | Treat as success |
| Create over QR quota | 403 | Block label print; notify admin |
| API disabled on FREE plan | 403 | Upgrade or use manual UI |
| Invalid target URL | 400 | Validate URL in FO before call |
| QR not found | 404 | Call POST create |
| Key revoked mid-flight | 401 | Rotate key in vault |
| genmyQRCode outage | 503 | Queue FO retry batch; labels may use cached shortUrl |
| Target updated but scan quota exceeded | Redirect still works | Analytics may under-count — see subscription doc |

---

## 23. Security checklist

| Item | Mitigation |
|------|------------|
| API key leakage | Revoke key; prefix rotation; never log Bearer |
| SSRF via targetUrl | Block private IPs, metadata URLs |
| Tenant bleed | Always filter by `user_id` from key |
| Replay | Idempotency + HTTPS only |
| D365 direct DB | **Forbidden** — architecture + customer contract |

---

## 24. Recommended implementation approach

| Phase | Deliverable |
|-------|-------------|
| **7a** | `api_keys` + Bearer middleware + `POST/GET /qr` + external ref idempotency |
| **7b** | Remaining endpoints + OpenAPI + Postman collection |
| **7c** | Rate limit + usage rollup + correlation id middleware |
| **7d** | Idempotency store + audit on all mutations |
| **8** | D365 X++ `GenmyQrApiClient` sample + ER report snippet + `by-external` lookup hardening |
| **8+** | OAuth client credentials + webhooks |

**Gate before Phase 8:** curl E2E on staging with API key; `integration.d365_enabled` entitlement on pilot tenant; OpenAPI imported in Postman.

**Align with roadmap:** Phase 7 = Developer API; Phase 8 = D365FO POC — see [`plan-dynamic-qr-integrated-roadmap.md`](./plan-dynamic-qr-integrated-roadmap.md).

---

## 25. OpenAPI excerpt (contract stub)

```yaml
openapi: 3.1.0
info:
  title: genmyQRCode External API
  version: 1.0.0
servers:
  - url: https://api.genmyqrcode.com/api/v1
security:
  - bearerAuth: []
paths:
  /qr:
    post:
      operationId: createQr
      summary: Create Dynamic QR
      parameters:
        - in: header
          name: Idempotency-Key
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/CreateQrRequest' }
      responses:
        '201': { description: Created, content: { application/json: { schema: { $ref: '#/components/schemas/Qr' } } } }
        '200': { description: Existing external ref — idempotent }
        '403': { $ref: '#/components/responses/QuotaExceeded' }
  /qr/{id}/target:
    put:
      operationId: updateQrTarget
      parameters:
        - in: path
          name: id
          required: true
          schema: { type: string, format: uuid }
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [targetUrl]
              properties:
                targetUrl: { type: string, format: uri }
      responses:
        '200': { description: Updated }
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
  schemas:
    ExternalRef:
      type: object
      required: [externalSystem, externalType, externalId]
      properties:
        externalSystem: { type: string }
        externalCompany: { type: string }
        externalType: { type: string }
        externalId: { type: string }
        metadata: { type: object, additionalProperties: true }
    Qr:
      type: object
      properties:
        id: { type: string, format: uuid }
        shortCode: { type: string }
        shortUrl: { type: string, format: uri }
        targetUrl: { type: string, format: uri }
        status: { type: string, enum: [active, paused, expired] }
        externalRef: { $ref: '#/components/schemas/ExternalRef' }
```

Full generated spec lives at `/api/v1/openapi.json` at implementation time.

---

## Revision log

| Date | Change |
|------|--------|
| 2026-08-28 | Initial External API v1 contract — ERP-generic, D365FO-primary |
