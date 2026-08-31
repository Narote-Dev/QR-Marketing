import { buildQrContent } from "@/lib/qr/content";
import type { Dictionary } from "@/lib/i18n/types";
import { batchFieldsToFormValues } from "@/lib/qr/batch/schema";
import type { BatchRowInput, BatchRowValidated } from "@/lib/qr/batch/types";

/** Step 1: Validate each CSV row using the same payload builder as the single generator. */
export function validateBatchRows(rows: BatchRowInput[], dictionary?: Dictionary): BatchRowValidated[] {
  return rows.map((row, index) => {
    if (row.parseError) {
      return { ...row, id: `row-${index}`, error: row.parseError };
    }
    const values = batchFieldsToFormValues(row.type, row.fields);
    const result = buildQrContent(row.type, values, dictionary);
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
