param(
    [string]$ClientId = $env:PLAID_CLIENT_ID_PRODUCTION,
    [string]$ClientSecret = $env:PLAID_SECRET_PRODUCTION,
    [string]$PublicToken = "",
    [string]$AccessToken = "",
    [string]$UserId = "",
    [switch]$AsJson
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($ClientId)) {
    throw "Missing Plaid client id. Pass -ClientId or set PLAID_CLIENT_ID_PRODUCTION."
}

if ([string]::IsNullOrWhiteSpace($ClientSecret)) {
    throw "Missing Plaid production secret. Pass -ClientSecret or set PLAID_SECRET_PRODUCTION."
}

if ([string]::IsNullOrWhiteSpace($UserId)) {
    $UserId = "demo_user_" + [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
}

function Mask([string]$value) {
    if ([string]::IsNullOrWhiteSpace($value)) {
        return $null
    }
    if ($value.Length -le 8) {
        return ("*" * $value.Length)
    }
    return ("*" * ($value.Length - 4)) + $value.Substring($value.Length - 4, 4)
}

$summary = [ordered]@{
    timestamp_utc = (Get-Date).ToUniversalTime().ToString("o")
    checks = [ordered]@{
        dashboard_oauth = $null
        dashboard_mcp_sse = $null
        create_link_token = $null
        exchange_public_token = $null
        accounts_get = $null
    }
    outputs = [ordered]@{
        link_token_masked = $null
        access_token_masked = $null
    }
}

# 1) Dashboard OAuth token (production only)
$oauthBody = @{
    client_id     = $ClientId
    client_secret = $ClientSecret
    grant_type    = "client_credentials"
    scope         = "mcp:dashboard"
} | ConvertTo-Json -Compress

$oauthResp = Invoke-RestMethod `
    -Method Post `
    -Uri "https://production.plaid.com/oauth/token" `
    -ContentType "application/json" `
    -Body $oauthBody

$dashboardToken = $oauthResp.access_token
if (-not $dashboardToken) {
    throw "OAuth token request did not return access_token."
}

$summary.checks.dashboard_oauth = [ordered]@{
    ok = $true
    expires_in_seconds = $oauthResp.expires_in
}

# 2) Dashboard MCP SSE handshake
$headersPath = Join-Path $PSScriptRoot "production_mcp_headers.tmp"
$bodyPath = Join-Path $PSScriptRoot "production_mcp_body.tmp"
try {
    $previousErrorActionPreference = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    & curl.exe -sS `
        --max-time 8 `
        -D $headersPath `
        -o $bodyPath `
        -H "Authorization: Bearer $dashboardToken" `
        -H "Accept: text/event-stream" `
        "https://api.dashboard.plaid.com/mcp/sse" 2>$null | Out-Null
    $ErrorActionPreference = $previousErrorActionPreference

    $statusLine = [string](Get-Content -Path $headersPath -TotalCount 1)
    $firstLine = [string](Get-Content -Path $bodyPath -TotalCount 1)
    $ok = $statusLine -like "* 200 *" -and $firstLine -eq "event: endpoint"
    $summary.checks.dashboard_mcp_sse = [ordered]@{
        ok = $ok
        http_status = $statusLine
        first_event = $firstLine
    }
}
finally {
    Remove-Item $headersPath -ErrorAction SilentlyContinue
    Remove-Item $bodyPath -ErrorAction SilentlyContinue
}

# 3) Create Link token directly against Plaid production API
$linkBody = @{
    client_id = $ClientId
    secret = $ClientSecret
    products = @("auth", "identity", "signal")
    user = @{
        client_user_id = $UserId
    }
    client_name = "Hushh"
    country_codes = @("US")
    language = "en"
} | ConvertTo-Json -Depth 6

$linkToken = $null
try {
    $linkResp = Invoke-RestMethod `
        -Method Post `
        -Uri "https://production.plaid.com/link/token/create" `
        -ContentType "application/json" `
        -Body $linkBody

    $linkData = if ($linkResp.data) { $linkResp.data } else { $linkResp }
    $linkToken = $linkData.link_token

    $summary.checks.create_link_token = [ordered]@{
        ok = [bool]$linkToken
    }
    $summary.outputs.link_token_masked = Mask $linkToken
}
catch {
    $errorMessage = $_.Exception.Message
    try {
        $stream = $_.Exception.Response.GetResponseStream()
        if ($stream) {
            $reader = New-Object System.IO.StreamReader($stream)
            $body = $reader.ReadToEnd()
            if (-not [string]::IsNullOrWhiteSpace($body)) {
                $errorMessage = "$errorMessage | body: $body"
            }
        }
    }
    catch {}

    $summary.checks.create_link_token = [ordered]@{
        ok = $false
        error = $errorMessage
    }
}

# 4) Optional: exchange public token if provided
$resolvedAccessToken = $AccessToken
if (-not [string]::IsNullOrWhiteSpace($PublicToken)) {
    $exchangeBody = @{
        client_id = $ClientId
        secret = $ClientSecret
        public_token = $PublicToken
    } | ConvertTo-Json -Compress

    try {
        $exchangeResp = Invoke-RestMethod `
            -Method Post `
            -Uri "https://production.plaid.com/item/public_token/exchange" `
            -ContentType "application/json" `
            -Body $exchangeBody

        $exchangeData = if ($exchangeResp.data) { $exchangeResp.data } else { $exchangeResp }
        $resolvedAccessToken = $exchangeData.access_token

        $summary.checks.exchange_public_token = [ordered]@{
            ok = [bool]$resolvedAccessToken
        }
    }
    catch {
        $summary.checks.exchange_public_token = [ordered]@{
            ok = $false
            error = $_.Exception.Message
        }
    }
}
else {
    $summary.checks.exchange_public_token = [ordered]@{
        ok = $false
        skipped = $true
        reason = "Public token not provided."
    }
}

# 5) Optional: /accounts/get if access token available
if (-not [string]::IsNullOrWhiteSpace($resolvedAccessToken)) {
    $accountsBody = @{
        client_id = $ClientId
        secret = $ClientSecret
        access_token = $resolvedAccessToken
    } | ConvertTo-Json -Compress

    try {
        $accountsResp = Invoke-RestMethod `
            -Method Post `
            -Uri "https://production.plaid.com/accounts/get" `
            -ContentType "application/json" `
            -Body $accountsBody

        $accountCount = if ($accountsResp.accounts) { $accountsResp.accounts.Count } else { 0 }
        $summary.checks.accounts_get = [ordered]@{
            ok = $true
            account_count = $accountCount
        }
        $summary.outputs.access_token_masked = Mask $resolvedAccessToken
    }
    catch {
        $summary.checks.accounts_get = [ordered]@{
            ok = $false
            error = $_.Exception.Message
        }
    }
}
else {
    $summary.checks.accounts_get = [ordered]@{
        ok = $false
        skipped = $true
        reason = "Access token not provided or not exchanged."
    }
}

$json = $summary | ConvertTo-Json -Depth 8
if ($AsJson) {
    Write-Output $json
    exit 0
}

Write-Output "=== Production Plaid Smoke Test ==="
Write-Output $json
