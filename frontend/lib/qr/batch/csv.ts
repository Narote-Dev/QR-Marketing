import { BATCH_MAX_ROWS, type BatchCsvParseResult, type BatchRowInput } from "@/lib/qr/batch/types";

export type BatchCsvMessages = {
  empty: string;
  tooMany: string;
  noUrlColumn: string;
};

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

/** Step 2: Convert parsed CSV text into batch rows (URL type only for MVP). */
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
  const hasHeader = headerLower.includes("url");

  let urlIndex = 0;
  let fileIndex = 1;
  let labelIndex = 2;
  let dataStart = 0;

  if (hasHeader) {
    urlIndex = findColumnIndex(headerLower, ["url", "link", "destination"]);
    fileIndex = findColumnIndex(headerLower, ["filename", "file", "name"]);
    labelIndex = findColumnIndex(headerLower, ["label", "frame", "frametext", "title"]);
    dataStart = 1;
    if (urlIndex < 0) {
      return { rows: [], error: messages.noUrlColumn };
    }
  }

  const rows: BatchRowInput[] = [];

  for (let lineIndex = dataStart; lineIndex < lines.length; lineIndex += 1) {
    const fields = parseCsvLine(lines[lineIndex]!);
    const url = (fields[urlIndex] ?? "").trim();
    if (!url) continue;

    const fallbackName = `qr-${rows.length + 1}`;
    const rawFileName = fileIndex >= 0 ? (fields[fileIndex] ?? "").trim() : "";
    const labelRaw = labelIndex >= 0 ? (fields[labelIndex] ?? "").trim() : "";

    rows.push({
      url,
      fileName: sanitizeFileName(rawFileName, fallbackName),
      label: labelRaw || undefined,
    });
  }

  if (rows.length === 0) {
    return { rows: [], error: messages.empty };
  }

  const truncated = rows.length > BATCH_MAX_ROWS;
  if (truncated) {
    return {
      rows: rows.slice(0, BATCH_MAX_ROWS),
      error: messages.tooMany,
      truncated: true,
    };
  }

  return { rows };
}

/** Step 3: Sample CSV users can download as a starting template. */
export function buildSampleCsv(): string {
  return [
    "url,filename,label",
    "https://example.com/menu,table-01,Scan for menu",
    "https://example.com/promo,table-02,Today's special",
    "https://example.com/wifi-info,lobby-wifi,Free guest WiFi",
  ].join("\n");
}
