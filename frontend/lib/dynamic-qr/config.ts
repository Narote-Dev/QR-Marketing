/** Dynamic QR is off unless NEXT_PUBLIC_ENABLE_DYNAMIC_QR=true (enabled in production). */
export function isDynamicQrEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_DYNAMIC_QR === "true";
}

/** When true, browser calls same-origin /api/* and Next.js rewrites to DYNAMIC_QR_API_ORIGIN (avoids CORS). */
export function useDynamicQrApiRewrite(): boolean {
  return process.env.NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE === "true";
}

export function getDynamicQrApiBaseUrl(): string {
  if (useDynamicQrApiRewrite()) return "";
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");
}
