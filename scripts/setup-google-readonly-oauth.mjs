import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const credentialPath = resolve(
  process.env.GOOGLE_READONLY_CREDENTIALS_PATH || resolve(projectRoot, ".secrets", "google-readonly.json"),
);
const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();
const port = Number(process.env.GOOGLE_OAUTH_CALLBACK_PORT || "53682");
const redirectUri = `http://127.0.0.1:${port}/oauth2/callback`;
const scopes = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/adsense.readonly",
];

if (!clientId || !clientSecret) {
  console.error("Set GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET in current shell.");
  process.exit(1);
}

const state = randomBytes(24).toString("hex");
const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authorizationUrl.search = new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: "code",
  scope: scopes.join(" "),
  access_type: "offline",
  include_granted_scopes: "true",
  prompt: "consent",
  state,
}).toString();

let timeout;
const server = createServer(async (request, response) => {
  try {
    const callback = new URL(request.url || "/", redirectUri);
    if (callback.pathname !== "/oauth2/callback") {
      response.writeHead(404).end("Not found");
      return;
    }
    if (callback.searchParams.get("state") !== state) {
      response.writeHead(400).end("OAuth state mismatch. Close this tab.");
      throw new Error("OAuth state mismatch.");
    }
    const oauthError = callback.searchParams.get("error");
    if (oauthError) {
      response.writeHead(400).end("Google authorization denied. Close this tab.");
      throw new Error(`Google authorization failed: ${oauthError}`);
    }
    const code = callback.searchParams.get("code");
    if (!code) {
      response.writeHead(400).end("Missing authorization code. Close this tab.");
      throw new Error("Missing authorization code.");
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });
    const token = await tokenResponse.json();
    if (!tokenResponse.ok) throw new Error(`Token exchange failed: ${token.error || tokenResponse.status}`);
    if (!token.refresh_token) {
      throw new Error("Google returned no refresh_token. Revoke prior consent, then run setup again.");
    }

    await mkdir(dirname(credentialPath), { recursive: true });
    await writeFile(
      credentialPath,
      `${JSON.stringify({ clientId, clientSecret, refreshToken: token.refresh_token }, null, 2)}\n`,
      { encoding: "utf8", mode: 0o600 },
    );
    response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    response.end("Read-only Google authorization saved. You may close this tab.");
    console.log(`Saved credentials: ${credentialPath}`);
    console.log("No token printed. File is Git-ignored.");
    clearTimeout(timeout);
    server.close();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    clearTimeout(timeout);
    server.close(() => process.exitCode = 1);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Add this exact redirect URI to Google OAuth client: ${redirectUri}`);
  console.log("Open URL, authorize read-only access, wait for callback:");
  console.log(authorizationUrl.toString());
});

timeout = setTimeout(() => {
  console.error("OAuth callback timed out after 5 minutes.");
  server.close(() => process.exitCode = 1);
}, 5 * 60 * 1000);
