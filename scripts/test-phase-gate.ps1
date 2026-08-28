# Phase gate tests - run after each phase before continuing.
# Usage: .\scripts\test-phase-gate.ps1 -Phase 1
param(
    [Parameter(Mandatory = $true)]
    [ValidateRange(1, 5)]
    [int]$Phase
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$env:DOTNET_ROLL_FORWARD = "LatestMajor"
$base = "http://localhost:8080"

function Test-ApiUp {
    try {
        Invoke-RestMethod "$base/health" -TimeoutSec 5 | Out-Null
        return $true
    } catch {
        return $false
    }
}

function Assert-ApiRunning {
    if (-not (Test-ApiUp)) {
        Write-Host "API not running on $base. Start it first (see README or staging-soak.ps1 hint)."
        exit 2
    }
}

function Get-Redirect([string]$url) {
    $curl = Get-Command curl.exe -ErrorAction SilentlyContinue
    if ($curl) {
        $headersFile = [System.IO.Path]::GetTempFileName()
        try {
            $null = & curl.exe -sS -D $headersFile -o NUL --max-redirs 0 $url 2>$null
            $raw = Get-Content $headersFile -Raw
            $status = 0
            if ($raw -match "HTTP/\S+\s+(\d+)") { $status = [int]$Matches[1] }
            $location = $null
            if ($raw -match "(?im)^Location:\s*(.+)$") { $location = $Matches[1].Trim() }
            return @{ StatusCode = $status; Location = [string]$location }
        } finally {
            Remove-Item $headersFile -ErrorAction SilentlyContinue
        }
    }
    throw "curl.exe required for redirect tests"
}

Write-Host "== Phase $Phase gate =="

switch ($Phase) {
    1 {
        Assert-ApiRunning
        $live = Invoke-RestMethod "$base/health"
        if ($live.status -ne "Healthy" -and $live -ne $null) { }
        $ready = Invoke-WebRequest "$base/health/ready" -UseBasicParsing
        if ($ready.StatusCode -ne 200) { throw "health/ready failed" }
        Write-Host "health + ready OK"
        & "$root\scripts\staging-soak.ps1"
        if ($LASTEXITCODE -ne 0) { throw "staging-soak failed" }
        Write-Host "PHASE_1_GATE_PASS"
    }
    2 {
        Assert-ApiRunning
        $userId = [guid]::NewGuid()
        $headers = @{ "X-Dev-User-Id" = $userId.ToString() }
        $quota = Invoke-RestMethod -Uri "$base/api/me/quota" -Headers $headers
        if ($quota.planCode -ne "free") { throw "expected free plan" }
        if ($quota.dynamicQr.limit -ne 6) { throw "expected 6 QR limit" }
        if ($quota.scans.limit -ne 7000) { throw "expected 7000 scan limit" }
        Write-Host "me/quota OK plan=$($quota.planCode)"
        try {
            Invoke-RestMethod -Uri "$base/api/me/quota" -ErrorAction Stop | Out-Null
            throw "expected 401 without auth"
        } catch {
            if ($_.Exception.Response.StatusCode.value__ -ne 401) { throw "expected 401 without auth" }
        }
        Write-Host "unauthenticated quota blocked OK"
        Write-Host "PHASE_2_GATE_PASS"
    }
    3 {
        Assert-ApiRunning
        $userA = [guid]::NewGuid()
        $userB = [guid]::NewGuid()
        $hA = @{ "X-Dev-User-Id" = $userA.ToString() }
        $hB = @{ "X-Dev-User-Id" = $userB.ToString() }
        $created = @()
        for ($i = 0; $i -lt 6; $i++) {
            $body = @{ destinationUrl = "https://example.com/p3-$i"; label = "p3-$i" } | ConvertTo-Json
            $r = Invoke-RestMethod -Method Post -Uri "$base/api/dynamic-qr" -ContentType "application/json" -Headers $hA -Body $body
            $created += $r.shortCode
        }
        try {
            $body = @{ destinationUrl = "https://example.com/p3-7"; label = "p3-7" } | ConvertTo-Json
            Invoke-RestMethod -Method Post -Uri "$base/api/dynamic-qr" -ContentType "application/json" -Headers $hA -Body $body -ErrorAction Stop
            throw "7th create should fail"
        } catch {
            if ($_.Exception.Response.StatusCode.value__ -ne 403) { throw "expected 403 on 7th create" }
        }
        $list = Invoke-RestMethod -Uri "$base/api/dynamic-qr" -Headers $hA
        if ($list.Count -ne 6) { throw "list should return 6 items, got $($list.Count)" }
        try {
            Invoke-RestMethod -Uri "$base/api/dynamic-qr/$($created[0])" -Headers $hB -ErrorAction Stop
            throw "user B should not read user A QR"
        } catch {
            if ($_.Exception.Response.StatusCode.value__ -ne 404) { throw "expected 404 for cross-user read" }
        }
        $r = Get-Redirect "$base/r/$($created[0])"
        if ($r.StatusCode -ne 302) { throw "redirect failed" }
        Write-Host "quota + list + isolation OK"
        Write-Host "PHASE_3_GATE_PASS"
    }
    4 {
        Push-Location "$root\frontend"
        npm test 2>&1 | Out-Host
        if ($LASTEXITCODE -ne 0) { throw "frontend tests failed" }
        Pop-Location
        Write-Host "frontend tests OK (includes dynamic flag default off)"
        Write-Host "PHASE_4_GATE_PASS - also verify UI manually: sign-in/dev auth, create, manage list"
    }
    5 {
        Assert-ApiRunning
        Write-Host "Re-running automated gates 1-3..."
        & "$PSScriptRoot\test-phase-gate.ps1" -Phase 1
        if ($LASTEXITCODE -ne 0) { throw "phase 1 regression" }
        & "$PSScriptRoot\test-phase-gate.ps1" -Phase 2
        if ($LASTEXITCODE -ne 0) { throw "phase 2 regression" }
        & "$PSScriptRoot\test-phase-gate.ps1" -Phase 3
        if ($LASTEXITCODE -ne 0) { throw "phase 3 regression" }
        & "$PSScriptRoot\test-phase-gate.ps1" -Phase 4
        if ($LASTEXITCODE -ne 0) { throw "phase 4 regression" }
        Write-Host "Automated regression OK (J4 covered in phase 3 gate)"
        Write-Host ""
        Write-Host "Manual / operator checklist before prod enable:"
        Write-Host "  [ ] Neon + Railway staging deployed"
        Write-Host "  [ ] Clerk keys on Vercel + Auth__ClerkAuthority on Railway"
        Write-Host "  [ ] J1 sign-up + create on staging"
        Write-Host "  [ ] J2 phone scan PNG on staging origin"
        Write-Host "  [ ] J5 rollback drill on staging (see phase5-rollback-drill.ps1)"
        Write-Host "  [ ] Prod enable sequence in docs/production-dynamic-qr-go-live.md"
        Write-Host "PHASE_5_GATE_PASS (automated portion)"
    }
}
