/** Clerk is optional until keys are configured in env. */
export function getClerkPublishableKey(): string {
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() ?? "";
}

export function isClerkEnabled(): boolean {
  return Boolean(getClerkPublishableKey());
}

/** Local dev auth via X-Dev-User-Id when Clerk is not configured. */
export function isDevAuthEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DYNAMIC_QR_DEV_AUTH === "true";
}

const devUserStorageKey = "byq_dev_user_id";

export function getDevUserId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(devUserStorageKey);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(devUserStorageKey, id);
  }
  return id;
}

export async function getDevAuthHeaders(): Promise<Record<string, string>> {
  const id = getDevUserId();
  return id ? { "X-Dev-User-Id": id } : {};
}
