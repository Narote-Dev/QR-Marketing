# Start local API for Dynamic QR + Clerk testing (Development).
param(
    [string]$ClerkAuthority = $env:Auth__ClerkAuthority
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

if (-not $ClerkAuthority) {
    Write-Host "Set Auth__ClerkAuthority first (run setup-clerk-env.ps1)"
    exit 1
}

Get-Process -Name "QrMarketing.Api" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

$env:DOTNET_ROLL_FORWARD = "LatestMajor"
$env:ASPNETCORE_ENVIRONMENT = "Development"
$env:Auth__ClerkAuthority = $ClerkAuthority
$env:Auth__AllowDevUserHeader = "false"
$env:DynamicQr__Enabled = "true"
$env:DynamicQr__PublicBaseUrl = "http://localhost:8080"
$env:DynamicQr__AllowLegacyOwnerToken = "false"
$env:ConnectionStrings__DefaultConnection = "Host=localhost;Port=5432;Database=qrmarketing;Username=qrmarketing;Password=change-me-in-development"
$env:Database__MigrateOnStartup = "true"

Write-Host "Starting API with Clerk JWT on $ClerkAuthority ..."
dotnet run --project .\backend\QrMarketing.Api\QrMarketing.Api.csproj --urls http://localhost:8080 --no-launch-profile
