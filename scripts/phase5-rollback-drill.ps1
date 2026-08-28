# Phase 5 rollback drill (local or staging API).
# Verifies Dynamic QR endpoints return 404 when the API kill-switch is off.
# Usage:
#   1. Stop API on :8080
#   2. Start API with DynamicQr__Enabled=false (see hint below)
#   3. .\scripts\phase5-rollback-drill.ps1

param(
    [string]$BaseUrl = "http://localhost:8080"
)

$ErrorActionPreference = "Stop"

function Test-ApiUp {
    try {
        Invoke-RestMethod "$BaseUrl/health" -TimeoutSec 5 | Out-Null
        return $true
    } catch {
        return $false
    }
}

if (-not (Test-ApiUp)) {
    Write-Host "API not running on $BaseUrl"
    Write-Host "Start with DynamicQr__Enabled=false:"
    Write-Host '  $env:DynamicQr__Enabled="false"; $env:ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=qrmarketing;Username=qrmarketing;Password=change-me-in-development"; $env:DOTNET_ROLL_FORWARD="LatestMajor"; dotnet run --project .\backend\QrMarketing.Api\QrMarketing.Api.csproj --urls http://localhost:8080 --no-launch-profile --no-build'
    exit 2
}

Write-Host "== Rollback drill on $BaseUrl =="

$health = Invoke-RestMethod "$BaseUrl/health"
if ($health -ne "Healthy" -and $health.status -ne "Healthy") {
    Write-Host "Warning: unexpected health payload"
}

try {
    Invoke-RestMethod -Method Post -Uri "$BaseUrl/api/dynamic-qr" -ContentType "application/json" -Body (@{ destinationUrl = "https://example.com/x" } | ConvertTo-Json) -ErrorAction Stop
    throw "POST /api/dynamic-qr should fail when disabled"
} catch {
    if ($_.Exception.Response.StatusCode.value__ -ne 404) {
        throw "expected 404 on create when DynamicQr disabled, got $($_.Exception.Response.StatusCode.value__)"
    }
}

try {
    Invoke-WebRequest "$BaseUrl/r/testcode" -UseBasicParsing -MaximumRedirection 0 -ErrorAction Stop | Out-Null
    throw "GET /r/{code} should fail when disabled"
} catch {
    $status = $_.Exception.Response.StatusCode.value__
    if ($status -ne 404 -and $status -ne 410) {
        throw "expected 404/410 on redirect when disabled, got $status"
    }
}

Write-Host "Rollback drill OK - Dynamic endpoints disabled"
Write-Host "PHASE5_ROLLBACK_DRILL_PASS"
Write-Host ""
Write-Host "Production rollback (<5 min):"
Write-Host "  1. Railway: DynamicQr__Enabled=false"
Write-Host "  2. Vercel: NEXT_PUBLIC_ENABLE_DYNAMIC_QR=false"
Write-Host "  3. Confirm static generator on https://genmyqrcode.com"
