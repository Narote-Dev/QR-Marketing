# Local staging soak for Dynamic QR (does NOT touch production).
# Uses local PostgreSQL (Docker optional). Requires .NET SDK.
param(
    [switch]$IncludeLegacyToken
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$env:DOTNET_ROLL_FORWARD = "LatestMajor"
$env:ASPNETCORE_ENVIRONMENT = "Development"
$env:ConnectionStrings__DefaultConnection = "Host=localhost;Port=5432;Database=qrmarketing;Username=qrmarketing;Password=change-me-in-development"
$env:DynamicQr__Enabled = "true"
$env:DynamicQr__PublicBaseUrl = "http://localhost:8080"
$env:DynamicQr__AllowLegacyOwnerToken = "true"
$env:Auth__AllowDevUserHeader = "true"

$psql = "C:\Program Files\PostgreSQL\16\bin\psql.exe"
if (-not (Test-Path $psql)) {
  Write-Host "PostgreSQL 16 psql not found. Install Postgres or start Docker Compose DB first."
  exit 1
}

Write-Host "== Ensure database =="
$env:PGPASSWORD = "postgres"
& $psql -U postgres -h 127.0.0.1 -d postgres -v ON_ERROR_STOP=1 -c @"
DO `$`$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'qrmarketing') THEN
    CREATE ROLE qrmarketing LOGIN PASSWORD 'change-me-in-development';
  END IF;
END
`$`$;
"@
$dbExists = (& $psql -U postgres -h 127.0.0.1 -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'qrmarketing';").Trim()
if ($dbExists -ne "1") {
  & $psql -U postgres -h 127.0.0.1 -d postgres -v ON_ERROR_STOP=1 -c "CREATE DATABASE qrmarketing OWNER qrmarketing;"
}
& $psql -U postgres -h 127.0.0.1 -d qrmarketing -v ON_ERROR_STOP=1 -c "GRANT ALL ON SCHEMA public TO qrmarketing; CREATE EXTENSION IF NOT EXISTS pgcrypto;"
Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue

Write-Host "== Migrate =="
try {
  dotnet ef database update --project .\backend\QrMarketing.Api\QrMarketing.Api.csproj | Out-Host
} catch {
  Write-Host "Migrate skipped/failed (API may be locking build). Continuing if DB already migrated."
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

  $req = [System.Net.HttpWebRequest]::Create($url)
  $req.AllowAutoRedirect = $false
  $req.Method = "GET"
  try {
    $resp = [System.Net.HttpWebResponse]$req.GetResponse()
  } catch [System.Net.WebException] {
    $resp = [System.Net.HttpWebResponse]$_.Exception.Response
  }
  if (-not $resp) { throw "No response for $url" }
  try {
    return @{ StatusCode = [int]$resp.StatusCode; Location = [string]$resp.Headers["Location"] }
  } finally {
    $resp.Close()
  }
}

function Test-ApiUp {
  try {
    Invoke-RestMethod "http://localhost:8080/health" -TimeoutSec 5 | Out-Null
    return $true
  } catch {
    return $false
  }
}

if (-not (Test-ApiUp)) {
  Write-Host "API not running on :8080. Start it in another terminal:"
  Write-Host '  $env:ASPNETCORE_ENVIRONMENT="Development"; $env:DynamicQr__Enabled="true"; $env:DynamicQr__PublicBaseUrl="http://localhost:8080"; $env:DynamicQr__AllowLegacyOwnerToken="true"; $env:Auth__AllowDevUserHeader="true"; $env:ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=qrmarketing;Username=qrmarketing;Password=change-me-in-development"; $env:Database__MigrateOnStartup="true"; $env:DOTNET_ROLL_FORWARD="LatestMajor"; dotnet run --project .\backend\QrMarketing.Api\QrMarketing.Api.csproj --urls http://localhost:8080 --no-launch-profile --no-build'
  exit 2
}

$base = "http://localhost:8080"

Write-Host "== Account auth soak (X-Dev-User-Id) =="
$userId = [guid]::NewGuid()
$authHeaders = @{ "X-Dev-User-Id" = $userId.ToString() }
$quota = Invoke-RestMethod -Uri "$base/api/me/quota" -Headers $authHeaders
if ($quota.planCode -ne "free") { throw "expected free plan" }
$created = Invoke-RestMethod -Method Post -Uri "$base/api/dynamic-qr" -ContentType "application/json" -Headers $authHeaders -Body (@{ destinationUrl = "https://example.com/menu"; label = "soak-account" } | ConvertTo-Json)
$r1 = Get-Redirect $created.shortUrl
if ($r1.StatusCode -ne 302 -or $r1.Location -ne "https://example.com/menu") { throw "account redirect1 failed" }
Invoke-RestMethod -Method Patch -Uri "$base/api/dynamic-qr/$($created.shortCode)" -ContentType "application/json" -Headers $authHeaders -Body (@{ destinationUrl = "https://example.com/updated" } | ConvertTo-Json) | Out-Null
$r2 = Get-Redirect $created.shortUrl
if ($r2.Location -ne "https://example.com/updated") { throw "account redirect2 failed" }
Invoke-RestMethod -Method Patch -Uri "$base/api/dynamic-qr/$($created.shortCode)" -ContentType "application/json" -Headers $authHeaders -Body (@{ isActive = $false } | ConvertTo-Json) | Out-Null
$r3 = Get-Redirect $created.shortUrl
if ($r3.StatusCode -ne 410) { throw "account pause failed" }
Invoke-RestMethod -Method Patch -Uri "$base/api/dynamic-qr/$($created.shortCode)" -ContentType "application/json" -Headers $authHeaders -Body (@{ isActive = $true } | ConvertTo-Json) | Out-Null
$list = Invoke-RestMethod -Uri "$base/api/dynamic-qr" -Headers $authHeaders
if ($list.Count -lt 1) { throw "account list empty" }
$stats = Invoke-RestMethod -Uri "$base/api/dynamic-qr/$($created.shortCode)/stats" -Headers $authHeaders
Write-Host "Account soak OK scans=$($stats.totalScans) code=$($created.shortCode) user=$userId"

if ($IncludeLegacyToken) {
  Write-Host "== Legacy owner-token soak =="
  $legacy = Invoke-RestMethod -Method Post -Uri "$base/api/dynamic-qr" -ContentType "application/json" -Body (@{ destinationUrl = "https://example.com/legacy"; label = "soak-legacy" } | ConvertTo-Json)
  $legacyHeaders = @{ "X-Owner-Token" = $legacy.manageToken }
  Invoke-RestMethod -Method Patch -Uri "$base/api/dynamic-qr/$($legacy.shortCode)" -ContentType "application/json" -Headers $legacyHeaders -Body (@{ destinationUrl = "https://example.com/legacy-updated" } | ConvertTo-Json) | Out-Null
  $lr = Get-Redirect $legacy.shortUrl
  if ($lr.Location -ne "https://example.com/legacy-updated") { throw "legacy redirect failed" }
  Write-Host "Legacy token soak OK code=$($legacy.shortCode)"
}

Write-Host "STAGING_SOAK_API_PASS"
