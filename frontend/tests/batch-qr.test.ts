import assert from "node:assert/strict";
import test from "node:test";
import { buildSampleCsv, parseBatchCsv } from "../lib/qr/batch/csv";
import { uniqueZipEntryName } from "../lib/qr/batch/export-zip";
import { validateBatchRows } from "../lib/qr/batch/validate";
import { BATCH_MAX_ROWS } from "../lib/qr/batch/types";

const messages = {
  empty: "empty",
  tooMany: "too many {max}",
  noUrlColumn: "no url column",
};

test("parseBatchCsv reads headered URL rows", () => {
  const csv = buildSampleCsv();
  const parsed = parseBatchCsv(csv, messages);
  assert.equal(parsed.error, undefined);
  assert.equal(parsed.rows.length, 3);
  assert.equal(parsed.rows[0]?.url, "https://example.com/menu");
  assert.equal(parsed.rows[0]?.fileName, "table-01");
  assert.equal(parsed.rows[0]?.label, "Scan for menu");
});

test("parseBatchCsv accepts headerless two-column rows", () => {
  const parsed = parseBatchCsv("https://a.test,one\nhttps://b.test,two", messages);
  assert.equal(parsed.rows.length, 2);
  assert.equal(parsed.rows[1]?.fileName, "two");
});

test("parseBatchCsv truncates to the batch cap", () => {
  const lines = ["url,filename", ...Array.from({ length: BATCH_MAX_ROWS + 5 }, (_, index) => `https://x.test/${index},qr-${index}`)];
  const parsed = parseBatchCsv(lines.join("\n"), messages);
  assert.equal(parsed.rows.length, BATCH_MAX_ROWS);
  assert.equal(parsed.truncated, true);
  assert.ok(parsed.error);
});

test("validateBatchRows flags invalid URLs", () => {
  const rows = validateBatchRows([
    { url: "https://example.com", fileName: "ok" },
    { url: "not-a-url", fileName: "bad" },
  ]);
  assert.equal(rows[0]?.payload, "https://example.com/");
  assert.ok(rows[1]?.error);
});

test("uniqueZipEntryName deduplicates file stems", () => {
  const used = new Set<string>();
  assert.equal(uniqueZipEntryName("menu", used), "menu.png");
  assert.equal(uniqueZipEntryName("menu", used), "menu-2.png");
});
