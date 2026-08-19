"use client";
import { useEffect, useState } from "react";
type HealthResponse = { status: string; checkedAt: string };
const publicApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
export function ApiHealthStatus() {
  const [message, setMessage] = useState("Checking API connection…");
  useEffect(() => { const controller = new AbortController(); fetch(`${publicApiBaseUrl}/api/platform/health`, { signal: controller.signal }).then(async response => { if (!response.ok) throw new Error("API request failed"); const health = await response.json() as HealthResponse; setMessage(`API is ${health.status}`); }).catch(() => setMessage("API is unavailable")); return () => controller.abort(); }, []);
  return <p className="text-sm font-medium">{message}</p>;
}
