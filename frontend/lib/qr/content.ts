import type { QrFormValues, QrType } from "@/lib/qr/types";
export type QrContentResult = { value: string; error?: never } | { value?: never; error: string };
const escapeWifi = (value: string) => value.replace(/([\\;,:"])/g, "\\$1");
const validPhone = (value: string) => /^\+?[0-9().\-\s]{5,}$/.test(value.trim());
const normalizedPhone = (value: string) => value.trim().replace(/[().\-\s]/g, "");
export function buildQrContent(type: QrType, values: QrFormValues): QrContentResult {
  switch (type) {
    case "url": try { const url = new URL(values.url.trim()); return url.protocol === "http:" || url.protocol === "https:" ? { value: url.toString() } : { error: "Enter a valid http or https URL." }; } catch { return { error: "Enter a valid URL." }; }
    case "text": return values.text.trim() ? { value: values.text } : { error: "Enter text to encode." };
    case "wifi": { if (!values.wifiSsid.trim()) return { error: "Enter a WiFi network name." }; if (values.wifiEncryption !== "nopass" && !values.wifiPassword) return { error: "Enter the WiFi password." }; const password = values.wifiEncryption === "nopass" ? "" : escapeWifi(values.wifiPassword); return { value: `WIFI:T:${values.wifiEncryption};S:${escapeWifi(values.wifiSsid)};P:${password};;` }; }
    case "email": { const email = values.email.trim(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." }; const params = new URLSearchParams(); if (values.emailSubject) params.set("subject", values.emailSubject); if (values.emailBody) params.set("body", values.emailBody); const query = params.toString(); return { value: `mailto:${email}${query ? `?${query}` : ""}` }; }
    case "phone": return validPhone(values.phone) ? { value: `tel:${normalizedPhone(values.phone)}` } : { error: "Enter a valid phone number." };
    case "sms": if (!validPhone(values.smsPhone)) return { error: "Enter a valid phone number." }; return { value: `SMSTO:${normalizedPhone(values.smsPhone)}:${values.smsMessage}` };
  }
}
