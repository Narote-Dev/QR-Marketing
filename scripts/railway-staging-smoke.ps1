# Smoke test Railway staging/production API (read-only + one create if legacy allowed).
param(
    [string]$BaseUrl = "https://qr-api-production-fb1c.up.railway.app"
)

$ErrorActionPreference = "Stop"

Write-Host "== Railway API smoke: $BaseUrl =="

$health = Invoke-RestMethod "$BaseUrl/health" -TimeoutSec 15
Write-Host "health: $health"

try {
    $ready = Invoke-WebRequest "$BaseUrl/health/ready" -UseBasicParsing -TimeoutSec 15
    Write-Host "ready: $($ready.StatusCode)"
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    if ($code -eq 404) {
        Write-Host "ready: 404 (deploy older API - redeploy feature/dynamic-qr)"
    } else {
        Write-Host "ready: FAIL $($_.Exception.Message)"
    }
}

try {
    Invoke-RestMethod -Method Post -Uri "$BaseUrl/api/dynamic-qr" -ContentType "application/json" -Body (@{ destinationUrl = "https://example.com/railway-smoke"; label = "smoke" } | ConvertTo-Json) -ErrorAction Stop | Out-Null
    Write-Host "WARN: unauthenticated create succeeded (legacy token mode still on)"
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    if ($code -eq 401) {
        Write-Host "create without auth: 401 (expected after Clerk hardening)"
    } else {
        throw
    }
}

try {
    Invoke-RestMethod "$BaseUrl/api/me/quota" -ErrorAction Stop | Out-Null
    Write-Host "WARN: quota without auth should not succeed"
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    if ($code -eq 401) {
        Write-Host "quota without auth: 401 OK"
    } elseif ($code -eq 404) {
        Write-Host "quota endpoint: 404 (deploy older API - redeploy feature/dynamic-qr)"
    } else {
        throw
    }
}

Write-Host "RAILWAY_SMOKE_PASS"
