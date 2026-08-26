import { getDynamicQrApiBaseUrl } from "@/lib/dynamic-qr/config";

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

const ownerHeader = "X-Owner-Token";

async function readError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string };
    if (body.error) return body.error;
  } catch {
    /* ignore */
  }
  return `Request failed (${response.status})`;
}

export async function createDynamicQr(input: {
  destinationUrl: string;
  label?: string;
}): Promise<CreateDynamicQrResult> {
  const response = await fetch(`${getDynamicQrApiBaseUrl()}/api/dynamic-qr`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      destinationUrl: input.destinationUrl,
      label: input.label || null,
    }),
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as CreateDynamicQrResult;
}

export async function getDynamicQr(shortCode: string, manageToken: string): Promise<DynamicQrDetails> {
  const response = await fetch(`${getDynamicQrApiBaseUrl()}/api/dynamic-qr/${encodeURIComponent(shortCode)}`, {
    headers: { [ownerHeader]: manageToken },
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as DynamicQrDetails;
}

export async function updateDynamicQr(
  shortCode: string,
  manageToken: string,
  patch: { destinationUrl?: string; label?: string | null; isActive?: boolean },
): Promise<DynamicQrDetails> {
  const response = await fetch(`${getDynamicQrApiBaseUrl()}/api/dynamic-qr/${encodeURIComponent(shortCode)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      [ownerHeader]: manageToken,
    },
    body: JSON.stringify(patch),
  });
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as DynamicQrDetails;
}

export async function getDynamicQrStats(shortCode: string, manageToken: string): Promise<DynamicQrStats> {
  const response = await fetch(
    `${getDynamicQrApiBaseUrl()}/api/dynamic-qr/${encodeURIComponent(shortCode)}/stats`,
    { headers: { [ownerHeader]: manageToken } },
  );
  if (!response.ok) throw new Error(await readError(response));
  return (await response.json()) as DynamicQrStats;
}
