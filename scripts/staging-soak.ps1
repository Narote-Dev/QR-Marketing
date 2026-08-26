# Local staging soak for Dynamic QR (does NOT touch production).
# Uses local PostgreSQL (Docker optional). Requires .NET SDK.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$env:DOTNET_ROLL_FORWARD = "LatestMajor"
$env:ASPNETCORE_ENVIRONMENT = "Development"
$env:ConnectionStrings__DefaultConnection = "Host=localhost;Port=5432;Database=qrmarketing;Username=qrmarketing;Password=change-me-in-development"
$env:DynamicQr__Enabled = "true"
$env:DynamicQr__PublicBaseUrl = "http://localhost:8080"

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
      # Exit code 47 = max redirects; still a successful probe when AllowAutoRedirect is off.
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
    Invoke-RestMethod "http://localhost:8080/api/platform/health" | Out-Null
    return $true
  } catch {
    return $false
  }
}

if (-not (Test-ApiUp)) {
  Write-Host "API not running on :8080. Start it in another terminal:"
  Write-Host '  $env:ASPNETCORE_ENVIRONMENT="Development"; $env:DynamicQr__Enabled="true"; $env:DynamicQr__PublicBaseUrl="http://localhost:8080"; $env:ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=qrmarketing;Username=qrmarketing;Password=change-me-in-development"; $env:DOTNET_ROLL_FORWARD="LatestMajor"; dotnet run --project .\backend\QrMarketing.Api\QrMarketing.Api.csproj --urls http://localhost:8080 --no-launch-profile'
  exit 2
}

Write-Host "== API soak =="
$base = "http://localhost:8080"
$created = Invoke-RestMethod -Method Post -Uri "$base/api/dynamic-qr" -ContentType "application/json" -Body (@{ destinationUrl = "https://example.com/menu"; label = "soak" } | ConvertTo-Json)
$r1 = Get-Redirect $created.shortUrl
if ($r1.StatusCode -ne 302 -or $r1.Location -ne "https://example.com/menu") { throw "redirect1 failed" }
$headers = @{ "X-Owner-Token" = $created.manageToken }
Invoke-RestMethod -Method Patch -Uri "$base/api/dynamic-qr/$($created.shortCode)" -ContentType "application/json" -Headers $headers -Body (@{ destinationUrl = "https://example.com/updated" } | ConvertTo-Json) | Out-Null
$r2 = Get-Redirect $created.shortUrl
if ($r2.Location -ne "https://example.com/updated") { throw "redirect2 failed" }
Invoke-RestMethod -Method Patch -Uri "$base/api/dynamic-qr/$($created.shortCode)" -ContentType "application/json" -Headers $headers -Body (@{ isActive = $false } | ConvertTo-Json) | Out-Null
$r3 = Get-Redirect $created.shortUrl
if ($r3.StatusCode -ne 410) { throw "pause failed" }
Invoke-RestMethod -Method Patch -Uri "$base/api/dynamic-qr/$($created.shortCode)" -ContentType "application/json" -Headers $headers -Body (@{ isActive = $true } | ConvertTo-Json) | Out-Null
$stats = Invoke-RestMethod -Uri "$base/api/dynamic-qr/$($created.shortCode)/stats" -Headers $headers
Write-Host "API soak OK scans=$($stats.totalScans) code=$($created.shortCode)"
Write-Host "STAGING_SOAK_API_PASS"
