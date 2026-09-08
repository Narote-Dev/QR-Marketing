# Google read-only monitoring setup

Purpose: unattended Search Console and AdSense checks without browser automation. API scopes are read-only:

- `https://www.googleapis.com/auth/webmasters.readonly`
- `https://www.googleapis.com/auth/adsense.readonly`

No token belongs in Git, chat, logs, `NEXT_PUBLIC_*`, Vercel frontend variables, or committed `.env` files.

## Google Cloud setup

1. Open Google Cloud Console. Select or create a project owned by the site operator.
2. Enable **Google Search Console API** and **AdSense Management API**.
3. Configure OAuth consent screen. Add the account that owns both Search Console and AdSense as a test user if the app remains in testing.
4. Create OAuth client credentials of type **Web application**.
5. Add this exact authorized redirect URI:

   `http://127.0.0.1:53682/oauth2/callback`

6. Keep client ID and client secret private.

For a long-running scheduled BOT, do not leave an external OAuth app in **Testing**. Google may expire its refresh token after 7 days. Use an internal app for an eligible Google Workspace organization, or publish the external app to **Production** after reviewing Google verification requirements.

## One-time authorization

From repository root in PowerShell:

```powershell
$env:GOOGLE_OAUTH_CLIENT_ID = Read-Host 'Google OAuth client ID'
$secureGoogleSecret = Read-Host 'Google OAuth client secret' -AsSecureString
$env:GOOGLE_OAUTH_CLIENT_SECRET = [Net.NetworkCredential]::new('', $secureGoogleSecret).Password
node .\scripts\setup-google-readonly-oauth.mjs
```

Open the printed Google authorization URL. Approve both read-only scopes. Script receives the localhost callback and stores credentials at `.secrets/google-readonly.json`. File and folder are Git-ignored. Script never prints access or refresh tokens.

The credential file contains a reusable refresh token and client secret. Git ignore prevents accidental commits but does not encrypt the file. Restrict Windows account/device access and never upload the file.

After setup, clear shell variables:

```powershell
Remove-Item Env:GOOGLE_OAUTH_CLIENT_ID, Env:GOOGLE_OAUTH_CLIENT_SECRET -ErrorAction SilentlyContinue
```

If Google returns no refresh token, revoke the prior app consent and run setup again. Offline access is required for scheduled execution.

## Verify access

```powershell
node .\scripts\google-readonly-monitor.mjs `
  --site 'https://genmyqrcode.com/' `
  --domain 'genmyqrcode.com' `
  --sitemap 'https://genmyqrcode.com/sitemap.xml' `
  --inspectionLimit 25 `
  --output '.\reports\google-monitor\manual.json'
```

Output contains:

- Search Console property permission;
- final 28-day clicks, impressions, CTR, average position, prior-period change;
- top 25 queries;
- sitemap errors, warnings, submission/download state;
- rotating URL Inspection sample from public sitemap;
- AdSense account state and pending tasks;
- matching site state: `REQUIRES_REVIEW`, `GETTING_READY`, `READY`, or `NEEDS_ATTENTION`;
- AdSense alerts and policy issues for `genmyqrcode.com`.

Sitemap API `contents.indexed` is deprecated. Index coverage uses rotating URL Inspection samples, not that field. Full sitemap coverage requires repeated runs until every sitemap URL has been sampled.

## Scheduled BOT gate

Do not enable scheduled account monitoring until the manual command returns both `searchConsole.ok: true` and `adsense.ok: true`.

Scheduled task should:

1. Run monitor once daily at 10:00 Asia/Bangkok.
2. Compare current report with prior report.
3. Notify on AdSense state change, new alert/policy issue, sitemap error, failed inspection, material traffic change, or credential/API failure.
4. Run deeper product/revenue review each Monday.
5. Write no Google account data into public artifacts.
6. Never change Search Console, AdSense, production environment, DNS, deploy state, or credentials.

## Troubleshooting

- `redirect_uri_mismatch`: authorized redirect URI differs from exact localhost URI above.
- `403 ... insufficient authentication scopes`: revoke consent; authorize again with both scopes.
- `No accessible AdSense account found.`: OAuth Google account lacks AdSense access.
- Search Console property missing: add OAuth Google account to the property or correct `GSC_SITE_URL`.
- `invalid_grant`: refresh token revoked/expired; repeat one-time authorization.
