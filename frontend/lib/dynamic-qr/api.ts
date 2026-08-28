import { getDynamicQrApiBaseUrl } from "@/lib/dynamic-qr/config";
import { getDevAuthHeaders } from "@/lib/clerk/config";

export type CreateDynamicQrResult = {
  shortCode: string;
  shortUrl: string;
  manageToken: string;
  destinationUrl: string;
  label: string | null;
  createdAt: string;
};

export type DynamicQrDetails = {
  shortCode: string;
  shortUrl: string;
  destinationUrl: string;
  label: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DynamicQrStats = {
  shortCode: string;
  totalScans: number;
};

export type DynamicQrListItem = {
  shortCode: string;
  shortUrl: string;
  destinationUrl: string;
  label: string | null;
  isActive: boolean;
  totalScans: number;
  createdAt: string;
  updatedAt: string;
};

export type QuotaSummary = {
  planCode: string;
  dynamicQr: { used: number; limit: number | null; unlimited: boolean };
  scans: {
    used: number;
    limit: number | null;
    unlimited: boolean;
    periodUnit: string;
    overQuotaBehavior: { redirect: string; log: string };
  };
  api: { enabled: boolean; keysLimit: number };
};

const ownerHeader = "X-Owner-Token";

async function readError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string; message?: string };
    if (body.message) return body.message;
    if (body.error) return body.error;
  } catch {
    /* ignore */
  }
  return `Request failed (${response.status})`;
}

function mergeHeaders(authHeaders: Record<string, string>, extra?: HeadersInit): Headers {
  const headers = new Headers(extra);
  Object.entries(authHeaders).forEach(([key, value]) => headers.set(key, value));
  return headers;
}

export async function createDynamicQr(
  input: { destinationUrl: string; label?: string },
  authHeaders: Record<string, string> = {},
): Promise<CreateDynamicQrResult> {
  const response = await fetch(`${getDynamicQrApiBaseUrl()}/api/dynamic-qr`, {
    method: "POST",
    headers: mergeHeaders(authHeaders, { "Content-Type": "application/json" }),
    body: JSON.stringify({
      destinationUrl: input.destinationUrl,
      label: input.label || null,
    }),
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as CreateDynamicQrResult;
}

export async function listDynamicQrs(authHeaders: Record<string, string> = {}): Promise<DynamicQrListItem[]> {
  const response = await fetch(`${getDynamicQrApiBaseUrl()}/api/dynamic-qr`, {
    headers: mergeHeaders(authHeaders),
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as DynamicQrListItem[];
}

export async function getQuotaSummary(authHeaders: Record<string, string> = {}): Promise<QuotaSummary> {
  const response = await fetch(`${getDynamicQrApiBaseUrl()}/api/me/quota`, {
    headers: mergeHeaders(authHeaders),
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as QuotaSummary;
}

export async function getDynamicQr(
  shortCode: string,
  authHeaders: Record<string, string>,
  manageToken?: string,
): Promise<DynamicQrDetails> {
  const headers = mergeHeaders(authHeaders);
  if (manageToken) headers.set(ownerHeader, manageToken);
  const response = await fetch(`${getDynamicQrApiBaseUrl()}/api/dynamic-qr/${encodeURIComponent(shortCode)}`, {
    headers,
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as DynamicQrDetails;
}

export async function updateDynamicQr(
  shortCode: string,
  authHeaders: Record<string, string>,
  patch: { destinationUrl?: string; label?: string | null; isActive?: boolean },
  manageToken?: string,
): Promise<DynamicQrDetails> {
  const headers = mergeHeaders(authHeaders, { "Content-Type": "application/json" });
  if (manageToken) headers.set(ownerHeader, manageToken);
  const response = await fetch(`${getDynamicQrApiBaseUrl()}/api/dynamic-qr/${encodeURIComponent(shortCode)}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(patch),
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as DynamicQrDetails;
}

export async function getDynamicQrStats(
  shortCode: string,
  authHeaders: Record<string, string>,
  manageToken?: string,
): Promise<DynamicQrStats> {
  const headers = mergeHeaders(authHeaders);
  if (manageToken) headers.set(ownerHeader, manageToken);
  const response = await fetch(
    `${getDynamicQrApiBaseUrl()}/api/dynamic-qr/${encodeURIComponent(shortCode)}/stats`,
    { headers },
  );
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as DynamicQrStats;
}

/** Dev-only helper when Clerk is off. */
export async function getDefaultDevAuthHeaders(): Promise<Record<string, string>> {
  return getDevAuthHeaders();
}
