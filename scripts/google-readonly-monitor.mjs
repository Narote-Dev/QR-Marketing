import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const args = parseArgs(process.argv.slice(2));
const credentialPath = resolve(
  args.credentials ||
    process.env.GOOGLE_READONLY_CREDENTIALS_PATH ||
    resolve(projectRoot, ".secrets", "google-readonly.json"),
);
const siteUrl = args.site || process.env.GSC_SITE_URL || "https://genmyqrcode.com/";
const domain = args.domain || process.env.GOOGLE_MONITOR_DOMAIN || "genmyqrcode.com";
const publicSitemap = args.sitemap || process.env.GOOGLE_MONITOR_SITEMAP || `https://${domain}/sitemap.xml`;
const inspectionLimit = clamp(Number(args.inspectionLimit || process.env.GSC_INSPECTION_LIMIT || "25"), 0, 100);
const outputPath = args.output ? resolve(args.output) : null;
const requestTimeoutMs = 20000;

const credentials = JSON.parse(await readFile(credentialPath, "utf8"));
for (const key of ["clientId", "clientSecret", "refreshToken"]) {
  if (!credentials[key]) throw new Error(`Credential file missing ${key}: ${credentialPath}`);
}

const accessToken = await refreshAccessToken(credentials);
const generatedAt = new Date();
const report = {
  generatedAt: generatedAt.toISOString(),
  target: { siteUrl, domain, publicSitemap },
  searchConsole: await captureFailure(() => collectSearchConsole(accessToken)),
  adsense: await captureFailure(() => collectAdsense(accessToken)),
};

const json = `${JSON.stringify(report, null, 2)}\n`;
if (outputPath) {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, json, "utf8");
  console.error(`Report saved: ${outputPath}`);
}
process.stdout.write(json);

async function refreshAccessToken({ clientId, clientSecret, refreshToken }) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
  const body = await response.json();
  if (!response.ok || !body.access_token) {
    throw new Error(`OAuth refresh failed: ${body.error || response.status}`);
  }
  return body.access_token;
}

async function collectSearchConsole(token) {
  const encodedSite = encodeURIComponent(siteUrl);
  const end = addDays(startOfUtcDay(generatedAt), -3);
  const currentStart = addDays(end, -27);
  const previousEnd = addDays(currentStart, -1);
  const previousStart = addDays(previousEnd, -27);

  const [sites, sitemaps, current, previous, topQueries, urls] = await Promise.all([
    googleJson("https://www.googleapis.com/webmasters/v3/sites", token),
    googleJson(`https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps`, token),
    searchAnalytics(token, currentStart, end, []),
    searchAnalytics(token, previousStart, previousEnd, []),
    searchAnalytics(token, currentStart, end, ["query"], 25),
    loadSitemapUrls(publicSitemap),
  ]);

  const property = (sites.siteEntry || []).find((entry) => entry.siteUrl === siteUrl) || null;
  const sample = rotateSample(urls, inspectionLimit, generatedAt);
  const inspections = await Promise.all(sample.map(async (url) => {
    const result = await captureFailure(async () => {
      const body = await googleJson(
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        token,
        { inspectionUrl: url, siteUrl, languageCode: "en-US" },
      );
      const status = body.inspectionResult?.indexStatusResult || {};
      return {
        url,
        verdict: status.verdict || null,
        coverageState: status.coverageState || null,
        indexingState: status.indexingState || null,
        pageFetchState: status.pageFetchState || null,
        robotsTxtState: status.robotsTxtState || null,
        lastCrawlTime: status.lastCrawlTime || null,
        userCanonical: status.userCanonical || null,
        googleCanonical: status.googleCanonical || null,
      };
    });
    return result.ok ? result.value : { url, error: result.error };
  }));

  const currentTotals = analyticsTotals(current);
  const previousTotals = analyticsTotals(previous);
  return {
    property,
    periods: {
      current: { start: formatDate(currentStart), end: formatDate(end), ...currentTotals },
      previous: { start: formatDate(previousStart), end: formatDate(previousEnd), ...previousTotals },
      changePercent: percentageChanges(currentTotals, previousTotals),
    },
    topQueries: (topQueries.rows || []).map((row) => ({
      query: row.keys?.[0] || "",
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    })),
    sitemaps: (sitemaps.sitemap || []).map((item) => ({
      path: item.path,
      lastSubmitted: item.lastSubmitted || null,
      lastDownloaded: item.lastDownloaded || null,
      pending: Boolean(item.isPending),
      warnings: Number(item.warnings || 0),
      errors: Number(item.errors || 0),
      submitted: (item.contents || []).reduce((sum, entry) => sum + Number(entry.submitted || 0), 0),
    })),
    sitemapUrlCount: urls.length,
    inspectedUrlCount: inspections.length,
    inspections,
  };
}

async function collectAdsense(token) {
  const accountsResponse = await googleJson("https://adsense.googleapis.com/v2/accounts?pageSize=100", token);
  const accounts = accountsResponse.accounts || [];
  const requestedAccount = args.adsenseAccount || process.env.ADSENSE_ACCOUNT_NAME;
  const account = requestedAccount
    ? accounts.find((entry) => entry.name === requestedAccount || entry.name === `accounts/${requestedAccount}`)
    : accounts[0];
  if (!account) throw new Error("No accessible AdSense account found.");

  const accountName = account.name;
  const [sitesResponse, alertsResponse, policyResponse] = await Promise.all([
    googleJson(`https://adsense.googleapis.com/v2/${accountName}/sites?pageSize=10000`, token),
    googleJson(`https://adsense.googleapis.com/v2/${accountName}/alerts?languageCode=en-US`, token),
    googleJson(`https://adsense.googleapis.com/v2/${accountName}/policyIssues?pageSize=10000`, token),
  ]);
  const normalizedDomain = domain.replace(/^www\./, "").toLowerCase();
  const sites = (sitesResponse.sites || []).filter(
    (site) => site.domain?.replace(/^www\./, "").toLowerCase() === normalizedDomain,
  );

  return {
    account: {
      name: account.name,
      displayName: account.displayName || null,
      state: account.state || null,
      pendingTasks: account.pendingTasks || [],
    },
    sites: sites.map((site) => ({
      name: site.name,
      domain: site.domain,
      state: site.state,
      autoAdsEnabled: Boolean(site.autoAdsEnabled),
    })),
    alerts: (alertsResponse.alerts || []).map((alert) => ({
      name: alert.name,
      severity: alert.severity,
      message: alert.message,
      type: alert.type,
    })),
    policyIssues: (policyResponse.policyIssues || [])
      .filter((issue) => issue.site?.replace(/^www\./, "").toLowerCase() === normalizedDomain)
      .map((issue) => ({
        name: issue.name,
        entityType: issue.entityType,
        site: issue.site,
        uri: issue.uri || null,
        action: issue.action,
        policyTopics: (issue.policyTopics || []).map((topic) => ({
          topic: topic.topic,
          type: topic.type,
        })),
        firstDetectedDate: issue.firstDetectedDate || null,
        lastDetectedDate: issue.lastDetectedDate || null,
      })),
  };
}

async function searchAnalytics(token, start, end, dimensions, rowLimit = 1) {
  return googleJson(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    token,
    {
      startDate: formatDate(start),
      endDate: formatDate(end),
      dimensions,
      type: "web",
      dataState: "final",
      rowLimit,
    },
  );
}

async function googleJson(url, token, body) {
  const response = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: {
      authorization: `Bearer ${token}`,
      accept: "application/json",
      ...(body ? { "content-type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
  const text = await response.text();
  const parsed = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(`${response.status} ${parsed.error?.message || response.statusText}`);
  }
  return parsed;
}

async function loadSitemapUrls(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "QRMarketingReadOnlyMonitor/1.0" },
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
  if (!response.ok) throw new Error(`Sitemap fetch failed: ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeXml(match[1].trim()));
}

function analyticsTotals(response) {
  const row = response.rows?.[0] || {};
  return {
    clicks: Number(row.clicks || 0),
    impressions: Number(row.impressions || 0),
    ctr: Number(row.ctr || 0),
    position: Number(row.position || 0),
  };
}

function percentageChanges(current, previous) {
  return Object.fromEntries(
    Object.keys(current).map((key) => [key, previous[key] ? ((current[key] - previous[key]) / previous[key]) * 100 : null]),
  );
}

function rotateSample(items, limit, date) {
  if (!items.length || limit <= 0) return [];
  const count = Math.min(limit, items.length);
  const offset = (dayOfYear(date) * count) % items.length;
  return Array.from({ length: count }, (_, index) => items[(offset + index) % items.length]);
}

async function captureFailure(callback) {
  try {
    return { ok: true, value: await callback() };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    const key = values[index];
    if (!key.startsWith("--")) throw new Error(`Unexpected argument: ${key}`);
    const value = values[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${key}`);
    parsed[key.slice(2)] = value;
    index += 1;
  }
  return parsed;
}

function startOfUtcDay(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 86400000);
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function dayOfYear(date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  return Math.floor((date.getTime() - start) / 86400000);
}

function clamp(value, minimum, maximum) {
  if (!Number.isFinite(value)) return minimum;
  return Math.max(minimum, Math.min(maximum, Math.trunc(value)));
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}
