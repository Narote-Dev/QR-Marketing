import {
  assertBulkType,
  isBatchB1Type,
  isMultiTypeBatchCsv,
  mapBatchCsvHeader,
  type BatchB1Type,
} from "@/lib/qr/batch/schema";
import { BATCH_MAX_ROWS, type BatchCsvParseResult, type BatchRowInput } from "@/lib/qr/batch/types";
import type { QrFormValues } from "@/lib/qr/types";

/** Step 1: Parse one CSV record, honoring quoted commas and escaped quotes. */
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (inQuotes) {
      if (char === '"') {
        if (line[index + 1] === '"') {
          current += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      fields.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  fields.push(current.trim());
  return fields;
}

function findColumnIndex(headers: string[], names: string[]): number {
  for (const name of names) {
    const index = headers.indexOf(name);
    if (index >= 0) return index;
  }
  return -1;
}

function sanitizeFileName(raw: string, fallback: string): string {
  const trimmed = raw.trim();
  const withoutExt = trimmed.replace(/\.(png|svg|jpe?g|webp)$/i, "");
  const safe = withoutExt
    .replace(/[^\w.\- \u0E00-\u0E7F\u4e00-\u9fff]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return safe || fallback;
}

type ParsedHeader = {
  multiType: boolean;
  columnIndexes: Map<string, number>;
};

function parseHeaders(firstFields: string[]): ParsedHeader {
  const columnIndexes = new Map<string, number>();
  for (let index = 0; index < firstFields.length; index += 1) {
    const key = mapBatchCsvHeader(firstFields[index] ?? "");
    if (key) columnIndexes.set(key, index);
  }

  const headerKeys = firstFields.map((field) => mapBatchCsvHeader(field)).filter(Boolean) as string[];
  return {
    multiType: isMultiTypeBatchCsv(headerKeys),
    columnIndexes,
  };
}

function readCell(fields: string[], columnIndexes: Map<string, number>, key: string): string {
  const index = columnIndexes.get(key);
  if (index === undefined || index < 0) return "";
  return (fields[index] ?? "").trim();
}

function readLegacyUrlRow(fields: string[], urlIndex: number, fileIndex: number, labelIndex: number, rowNumber: number): BatchRowInput | null {
  const url = (fields[urlIndex] ?? "").trim();
  if (!url) return null;

  const fallbackName = `qr-${rowNumber}`;
  const rawFileName = fileIndex >= 0 ? (fields[fileIndex] ?? "").trim() : "";
  const labelRaw = labelIndex >= 0 ? (fields[labelIndex] ?? "").trim() : "";

  return {
    type: "url",
    fileName: sanitizeFileName(rawFileName, fallbackName),
    label: labelRaw || undefined,
    fields: { url },
  };
}

function readMultiTypeRow(
  fields: string[],
  columnIndexes: Map<string, number>,
  rowNumber: number,
  unsupportedTypeMessage: string,
): { row?: BatchRowInput } {
  const fallbackName = `qr-${rowNumber}`;
  const rawFileName = readCell(fields, columnIndexes, "filename");
  const labelRaw = readCell(fields, columnIndexes, "label");
  const rawType = readCell(fields, columnIndexes, "type").toLowerCase() || "url";
  if (!isBatchB1Type(rawType)) {
    return {
      row: {
        type: "url",
        fileName: sanitizeFileName(rawFileName, fallbackName),
        label: labelRaw || undefined,
        fields: {},
        parseError: unsupportedTypeMessage.replace("{type}", rawType),
      },
    };
  }

  const type = rawType;

  const formFields: Partial<QrFormValues> = {};
  for (const [key, index] of columnIndexes.entries()) {
    if (key === "type" || key === "filename" || key === "label") continue;
    const value = (fields[index] ?? "").trim();
    if (!value) continue;
    formFields[key as keyof QrFormValues] = value as never;
  }

  if (type === "url" && !formFields.url?.trim()) {
    return {};
  }
  if (type === "wifi" && !formFields.wifiSsid?.trim()) {
    return {};
  }
  if (type === "line" && !formFields.lineId?.trim()) {
    return {};
  }
  if (type === "whatsapp" && !formFields.whatsappPhone?.trim()) {
    return {};
  }
  if (type === "vcard" && !formFields.vcardFirstName?.trim() && !formFields.vcardLastName?.trim()) {
    return {};
  }

  assertBulkType(type);

  return {
    row: {
      type,
      fileName: sanitizeFileName(rawFileName, fallbackName),
      label: labelRaw || undefined,
      fields: formFields,
    },
  };
}

/** Step 2: Convert parsed CSV text into batch rows (Phase B1 multi-type + legacy URL). */
export function parseBatchCsv(text: string, messages: BatchCsvMessages): BatchCsvParseResult {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return { rows: [], error: messages.empty };
  }

  const firstFields = parseCsvLine(lines[0]!);
  const headerLower = firstFields.map((field) => field.toLowerCase());
  const hasHeader = headerLower.some((field) => mapBatchCsvHeader(field));

  let dataStart = 0;
  let parsedHeader: ParsedHeader | null = null;

  if (hasHeader) {
    parsedHeader = parseHeaders(firstFields);
    dataStart = 1;

    if (!parsedHeader.multiType) {
      const urlIndex = findColumnIndex(headerLower, ["url", "link", "destination"]);
      if (urlIndex < 0) {
        return { rows: [], error: messages.noUrlColumn };
      }
    }
  }

  const rows: BatchRowInput[] = [];
  let firstRowError: string | undefined;

  for (let lineIndex = dataStart; lineIndex < lines.length; lineIndex += 1) {
    const fields = parseCsvLine(lines[lineIndex]!);
    const rowNumber = rows.length + 1;

    if (parsedHeader?.multiType) {
      const result = readMultiTypeRow(fields, parsedHeader.columnIndexes, rowNumber, messages.unsupportedType);
      if (result.row) {
        if (result.row.parseError) firstRowError ??= result.row.parseError;
        rows.push(result.row);
      }
      continue;
    }

    if (hasHeader && parsedHeader) {
      const urlIndex = parsedHeader.columnIndexes.get("url") ?? -1;
      const fileIndex = parsedHeader.columnIndexes.get("filename") ?? -1;
      const labelIndex = parsedHeader.columnIndexes.get("label") ?? -1;
      const legacyRow = readLegacyUrlRow(fields, urlIndex, fileIndex, labelIndex, rowNumber);
      if (legacyRow) rows.push(legacyRow);
      continue;
    }

    const legacyRow = readLegacyUrlRow(fields, 0, 1, 2, rowNumber);
    if (legacyRow) rows.push(legacyRow);
  }

  if (rows.length === 0) {
    return { rows: [], error: firstRowError ?? messages.empty };
  }

  const truncated = rows.length > BATCH_MAX_ROWS;
  if (truncated) {
    return {
      rows: rows.slice(0, BATCH_MAX_ROWS),
      error: messages.tooMany,
      truncated: true,
    };
  }

  if (firstRowError) {
    return { rows, error: firstRowError };
  }

  return { rows };
}

/** Step 3: Sample CSV with Phase B1 types for download. */
export function buildSampleCsv(): string {
  return [
    "type,filename,label,url,wifiSsid,wifiPassword,wifiEncryption,lineId,whatsappPhone,whatsappMessage,vcardFirstName,vcardLastName,vcardPhone,vcardEmail",
    "url,table-01,Scan for menu,https://example.com/menu,,,,,,,,,",
    "wifi,lobby-wifi,Guest WiFi,,GuestNet,welcome123,WPA,,,,,,",
    "line,counter-line,Add LINE,,,,,@myshop,,,,",
    "whatsapp,order-desk,WhatsApp order,,,,,,+66812345678,Hello I would like to order,,,",
    "vcard,owner-card,Contact owner,,,,,,,Somchai,Shop,+66812345678,hi@example.com",
  ].join("\n");
}

/** Step 4: Legacy URL-only sample for backward-compatible docs. */
export function buildLegacyUrlSampleCsv(): string {
  return [
    "url,filename,label",
    "https://example.com/menu,table-01,Scan for menu",
    "https://example.com/promo,table-02,Today's special",
  ].join("\n");
}
