# Database

PostgreSQL is provisioned by the root Docker Compose file. `init/` is reserved for non-sensitive bootstrap SQL.

## Dynamic QR (feature branch)

Domain tables `dynamic_qr` and `scan_events` are owned by EF Core migrations in `backend/QrMarketing.Api/Data/Migrations`.

Local apply (API project directory):

```powershell
dotnet ef database update --project .\backend\QrMarketing.Api\QrMarketing.Api.csproj
```

Do not run production migrations until an explicit go-live approval. See `docs/plan-dynamic-qr-mvp.md`.
