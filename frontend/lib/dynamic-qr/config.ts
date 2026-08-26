/** Dynamic QR is off unless explicitly enabled (production must stay false until go-live). */
export function isDynamicQrEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_DYNAMIC_QR === "true";
}

export function getDynamicQrApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");
}
