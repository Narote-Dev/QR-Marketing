import { buildQrContent } from "@/lib/qr/content";
import { defaultQrValues } from "@/lib/qr/types";
import type { Dictionary } from "@/lib/i18n/types";
import type { BatchRowInput, BatchRowValidated } from "@/lib/qr/batch/types";

/** Step 1: Validate each CSV row as a URL QR payload. */
export function validateBatchRows(rows: BatchRowInput[], dictionary?: Dictionary): BatchRowValidated[] {
  return rows.map((row, index) => {
    const result = buildQrContent("url", { ...defaultQrValues, url: row.url }, dictionary);
    if (result.error) {
      return { ...row, id: `row-${index}`, error: result.error };
    }
    return { ...row, id: `row-${index}`, payload: result.value };
  });
}

/** Step 2: Split validated rows into exportable and rejected sets. */
export function partitionBatchRows(rows: BatchRowValidated[]): {
  valid: BatchRowValidated[];
  invalid: BatchRowValidated[];
} {
  const valid: BatchRowValidated[] = [];
  const invalid: BatchRowValidated[] = [];
  for (const row of rows) {
    if (row.payload) valid.push(row);
    else invalid.push(row);
  }
  return { valid, invalid };
}
