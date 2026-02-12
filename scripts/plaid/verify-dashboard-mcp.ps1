param(
    [string]$ClientId = $env:PLAID_CLIENT_ID_PRODUCTION,
    [string]$ClientSecret = $env:PLAID_PRODUCTION_SECRET,
    [int]$TimeoutSeconds = 8
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($ClientId)) {
    throw "Missing Plaid client id. Pass -ClientId or set PLAID_CLIENT_ID_PRODUCTION."
}

if ([string]::IsNullOrWhiteSpace($ClientSecret)) {
    throw "Missing Plaid production secret. Pass -ClientSecret or set PLAID_PRODUCTION_SECRET."
}

$oauthBody = @{
    client_id     = $ClientId
    client_secret = $ClientSecret
    grant_type    = "client_credentials"
    scope         = "mcp:dashboard"
} | ConvertTo-Json -Compress

$oauthResponse = Invoke-RestMethod `
    -Method Post `
    -Uri "https://production.plaid.com/oauth/token" `
    -ContentType "application/json" `
    -Body $oauthBody

if (-not $oauthResponse.access_token) {
    throw "Plaid OAuth response did not include access_token."
}

$token = $oauthResponse.access_token
$headersPath = Join-Path $PSScriptRoot "dashboard_mcp_headers.tmp"
$bodyPath = Join-Path $PSScriptRoot "dashboard_mcp_body.tmp"

try {
    $previousErrorActionPreference = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    & curl.exe -sS `
        --max-time $TimeoutSeconds `
        -D $headersPath `
        -o $bodyPath `
        -H "Authorization: Bearer $token" `
        -H "Accept: text/event-stream" `
        "https://api.dashboard.plaid.com/mcp/sse" 2>$null | Out-Null
    $ErrorActionPreference = $previousErrorActionPreference
    $curlExitCode = $LASTEXITCODE

    if ($curlExitCode -ne 0 -and $curlExitCode -ne 28) {
        throw "curl exited with code $curlExitCode."
    }

    $statusLine = [string](Get-Content -Path $headersPath -TotalCount 1)
    $firstBodyLine = [string](Get-Content -Path $bodyPath -TotalCount 1)
    $isOk = $statusLine -like "* 200 *" -and $firstBodyLine -eq "event: endpoint"

    [pscustomobject]@{
        oauth_ok                 = $true
        access_token_length      = $token.Length
        refresh_token_present    = [bool]$oauthResponse.refresh_token
        token_expires_in_seconds = $oauthResponse.expires_in
        mcp_status_line          = $statusLine
        mcp_first_event_line     = $firstBodyLine
        verified                 = $isOk
    } | ConvertTo-Json -Depth 4

    if (-not $isOk) {
        exit 1
    }
}
finally {
    Remove-Item $headersPath -ErrorAction SilentlyContinue
    Remove-Item $bodyPath -ErrorAction SilentlyContinue
}
