export const qrTypes = ["url", "text", "wifi", "email", "phone", "sms"] as const;
export type QrType = (typeof qrTypes)[number];
export type QrFormValues = { url: string; text: string; wifiSsid: string; wifiPassword: string; wifiEncryption: "WPA" | "WEP" | "nopass"; email: string; emailSubject: string; emailBody: string; phone: string; smsPhone: string; smsMessage: string };
export const defaultQrValues: QrFormValues = { url: "https://example.com", text: "", wifiSsid: "", wifiPassword: "", wifiEncryption: "WPA", email: "", emailSubject: "", emailBody: "", phone: "", smsPhone: "", smsMessage: "" };
export const qrTypeLabels: Record<QrType, string> = { url: "URL", text: "Text", wifi: "WiFi", email: "Email", phone: "Phone", sms: "SMS" };
