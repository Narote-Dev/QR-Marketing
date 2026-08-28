# Verify Clerk + Dynamic QR configuration before staging/prod.
param(
    [string]$BaseUrl = "http://localhost:8080",
    [string]$BearerToken
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$envLocal = Join-Path $root "frontend\.env.local"

Write-Host "== Clerk readiness check =="

$checks = @()

if (Test-Path $envLocal) {
    $content = Get-Content $envLocal -Raw
    $checks += [pscustomobject]@{
        Name = "frontend/.env.local exists"
        Ok = $true
    }
    $checks += [pscustomobject]@{
        Name = "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY set"
        Ok = ($content -match "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_")
    }
    $checks += [pscustomobject]@{
        Name = "CLERK_SECRET_KEY set"
        Ok = ($content -match "CLERK_SECRET_KEY=sk_")
    }
    $checks += [pscustomobject]@{
        Name = "NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true"
        Ok = ($content -match "NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true")
    }
    $checks += [pscustomobject]@{
        Name = "Dev auth off (prod-like)"
        Ok = ($content -notmatch "NEXT_PUBLIC_DYNAMIC_QR_DEV_AUTH=true")
    }
} else {
    $checks += [pscustomobject]@{ Name = "frontend/.env.local exists"; Ok = $false }
    Write-Host "Run: .\scripts\setup-clerk-env.ps1"
}

try {
    Invoke-RestMethod "$BaseUrl/health" -TimeoutSec 5 | Out-Null
    $checks += [pscustomobject]@{ Name = "API health"; Ok = $true }
} catch {
    $checks += [pscustomobject]@{ Name = "API health"; Ok = $false }
}

if ($BearerToken) {
    try {
        $headers = @{ Authorization = "Bearer $BearerToken" }
        $quota = Invoke-RestMethod -Uri "$BaseUrl/api/me/quota" -Headers $headers
        $checks += [pscustomobject]@{
            Name = "JWT quota (plan=$($quota.planCode))"
            Ok = ($quota.planCode -eq "free")
        }
    } catch {
        $checks += [pscustomobject]@{ Name = "JWT quota"; Ok = $false }
        Write-Host "JWT test failed: $($_.Exception.Message)"
    }
} else {
    Write-Host "Tip: pass -BearerToken from Clerk session to test API JWT"
}

$checks | ForEach-Object {
    $mark = if ($_.Ok) { "OK" } else { "MISSING" }
    Write-Host "[$mark] $($_.Name)"
}

if ($checks.Ok -contains $false) {
    Write-Host ""
    Write-Host "CLERK_READY_FAIL"
    exit 1
}

Write-Host ""
Write-Host "CLERK_READY_PASS"
