import { defaultQrValues, type QrFormValues, type QrType } from "@/lib/qr/types";

/** Phase B1 bulk types — static payloads only, client-side export. */
export const batchB1Types = ["url", "wifi", "line", "whatsapp", "vcard"] as const;
export type BatchB1Type = (typeof batchB1Types)[number];

export function isBatchB1Type(value: string): value is BatchB1Type {
  return (batchB1Types as readonly string[]).includes(value);
}

/** Step 1: QR form fields accepted in CSV for each bulk type. */
export const batchTypeFields: Record<BatchB1Type, readonly (keyof QrFormValues)[]> = {
  url: ["url"],
  wifi: ["wifiSsid", "wifiPassword", "wifiEncryption"],
  line: ["lineId"],
  whatsapp: ["whatsappPhone", "whatsappMessage"],
  vcard: [
    "vcardFirstName",
    "vcardLastName",
    "vcardOrganization",
    "vcardPhone",
    "vcardEmail",
    "vcardWebsite",
  ],
};

type BatchMetaColumn = "type" | "filename" | "label";
type BatchColumnKey = BatchMetaColumn | keyof QrFormValues;

const HEADER_ALIASES: Record<string, BatchColumnKey> = {
  type: "type",
  filename: "filename",
  file: "filename",
  name: "filename",
  label: "label",
  frame: "label",
  frametext: "label",
  title: "label",
  url: "url",
  link: "url",
  destination: "url",
  wifissid: "wifiSsid",
  ssid: "wifiSsid",
  wifipassword: "wifiPassword",
  password: "wifiPassword",
  wifiencryption: "wifiEncryption",
  encryption: "wifiEncryption",
  lineid: "lineId",
  line: "lineId",
  whatsappphone: "whatsappPhone",
  whatsappmessage: "whatsappMessage",
  vcardfirstname: "vcardFirstName",
  firstname: "vcardFirstName",
  first: "vcardFirstName",
  vcardlastname: "vcardLastName",
  lastname: "vcardLastName",
  last: "vcardLastName",
  vcardorganization: "vcardOrganization",
  organization: "vcardOrganization",
  org: "vcardOrganization",
  vcardphone: "vcardPhone",
  phone: "vcardPhone",
  vcardemail: "vcardEmail",
  email: "vcardEmail",
  vcardwebsite: "vcardWebsite",
  website: "vcardWebsite",
};

/** Step 2: Normalize a CSV header cell to a known column key. */
export function mapBatchCsvHeader(header: string): BatchColumnKey | null {
  const normalized = header.trim().toLowerCase().replace(/[\s_-]+/g, "");
  return HEADER_ALIASES[normalized] ?? null;
}

/** Step 3: True when the CSV uses multi-type columns (not legacy url-only). */
export function isMultiTypeBatchCsv(headers: string[]): boolean {
  const keys = headers.map((header) => mapBatchCsvHeader(header)).filter(Boolean);
  if (keys.includes("type")) return true;
  return keys.some((key) => key !== "url" && key !== "filename" && key !== "label");
}

/** Step 4: Merge parsed CSV cells into form values for a bulk row type. */
export function batchFieldsToFormValues(
  type: BatchB1Type,
  fields: Partial<QrFormValues>,
): QrFormValues {
  const values: QrFormValues = { ...defaultQrValues, ...fields };
  if (type === "wifi" && !fields.wifiEncryption?.trim()) {
    values.wifiEncryption = "WPA";
  }
  return values;
}

/** Step 5: Short preview string for the bulk preview table. */
export function batchRowSummary(type: BatchB1Type, fields: Partial<QrFormValues>): string {
  switch (type) {
    case "url":
      return fields.url?.trim() || "—";
    case "wifi":
      return fields.wifiSsid?.trim() || "—";
    case "line":
      return fields.lineId?.trim() || "—";
    case "whatsapp":
      return fields.whatsappPhone?.trim() || "—";
    case "vcard": {
      const name = [fields.vcardFirstName, fields.vcardLastName].filter(Boolean).join(" ").trim();
      return name || "—";
    }
    default:
      return "—";
  }
}

export function batchTypeLabel(type: BatchB1Type): string {
  const labels: Record<BatchB1Type, string> = {
    url: "URL",
    wifi: "WiFi",
    line: "LINE",
    whatsapp: "WhatsApp",
    vcard: "vCard",
  };
  return labels[type];
}

/** Step 6: Guard against accidental use of unsupported generator types in bulk CSV. */
export function assertBulkType(type: string): type is BatchB1Type {
  return isBatchB1Type(type);
}

export type { QrType };
