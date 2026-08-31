import type { QrFormValues } from "@/lib/qr/types";
import type { BatchB1Type } from "@/lib/qr/batch/schema";

/** Maximum QR codes per batch — tuned for ~4 GB RAM client-side export. */
export const BATCH_MAX_ROWS = 50;

/** How many rows to show in the on-page preview table. */
export const BATCH_PREVIEW_ROWS = 8;

export type BatchRowInput = {
  type: BatchB1Type;
  fileName: string;
  label?: string;
  fields: Partial<QrFormValues>;
  parseError?: string;
};

export type BatchRowValidated = BatchRowInput & {
  id: string;
  payload?: string;
  error?: string;
};

export type BatchCsvParseResult =
  | { rows: BatchRowInput[]; error?: undefined; truncated?: boolean }
  | { rows: BatchRowInput[]; error: string; truncated?: boolean };

export type BatchCsvMessages = {
  empty: string;
  tooMany: string;
  noUrlColumn: string;
  unsupportedType: string;
};
