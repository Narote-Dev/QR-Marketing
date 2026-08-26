# Verify Dynamic QR create → redirect loop (local / staging only)
# Prefer scripts/staging-soak.ps1 for the full automated API soak.
# Do NOT run against production.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "If using Docker Compose DB:"
Write-Host "  docker compose up -d database"
Write-Host "If using local PostgreSQL 16 (current machine path): ensure service postgresql-x64-16 is Running"
Write-Host ""
Write-Host "Then:"
Write-Host '  $env:DOTNET_ROLL_FORWARD="LatestMajor"'
Write-Host '  $env:ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=qrmarketing;Username=qrmarketing;Password=change-me-in-development"'
Write-Host "  dotnet ef database update --project .\backend\QrMarketing.Api\QrMarketing.Api.csproj"
Write-Host ""
Write-Host "Start API (Development enables DynamicQr):"
Write-Host '  $env:ASPNETCORE_ENVIRONMENT="Development"'
Write-Host '  $env:DynamicQr__Enabled="true"'
Write-Host '  $env:DynamicQr__PublicBaseUrl="http://localhost:8080"'
Write-Host "  dotnet run --project .\backend\QrMarketing.Api\QrMarketing.Api.csproj --urls http://localhost:8080 --no-launch-profile"
Write-Host ""
Write-Host "Run soak:"
Write-Host "  .\scripts\staging-soak.ps1"
Write-Host ""
Write-Host "Frontend staging flags: copy frontend/.env.local.staging.example → .env.local (delete after soak)"
