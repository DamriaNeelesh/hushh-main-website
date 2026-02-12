param(
    [string]$ClientId = $env:PLAID_CLIENT_ID_PRODUCTION,
    [string]$ClientSecret = $env:PLAID_PRODUCTION_SECRET,
    [switch]$AsJson,
    [switch]$CopyToClipboard
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($ClientId)) {
    throw "Missing Plaid client id. Pass -ClientId or set PLAID_CLIENT_ID_PRODUCTION."
}

if ([string]::IsNullOrWhiteSpace($ClientSecret)) {
    throw "Missing Plaid production secret. Pass -ClientSecret or set PLAID_PRODUCTION_SECRET."
}

$requestBody = @{
    client_id     = $ClientId
    client_secret = $ClientSecret
    grant_type    = "client_credentials"
    scope         = "mcp:dashboard"
} | ConvertTo-Json -Compress

$tokenResponse = Invoke-RestMethod `
    -Method Post `
    -Uri "https://production.plaid.com/oauth/token" `
    -ContentType "application/json" `
    -Body $requestBody

if (-not $tokenResponse.access_token) {
    throw "Plaid OAuth response did not include access_token."
}

if ($CopyToClipboard) {
    Set-Clipboard -Value $tokenResponse.access_token
}

if ($AsJson) {
    $expiresAtUtc = (Get-Date).ToUniversalTime().AddSeconds([int]$tokenResponse.expires_in).ToString("o")
    [pscustomobject]@{
        access_token   = $tokenResponse.access_token
        refresh_token  = $tokenResponse.refresh_token
        expires_in     = $tokenResponse.expires_in
        expires_at_utc = $expiresAtUtc
    } | ConvertTo-Json -Depth 4
    exit 0
}

Write-Output $tokenResponse.access_token
