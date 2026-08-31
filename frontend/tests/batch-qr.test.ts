import assert from "node:assert/strict";
import test from "node:test";
import { buildLegacyUrlSampleCsv, buildSampleCsv, parseBatchCsv } from "../lib/qr/batch/csv";
import { uniqueZipEntryName } from "../lib/qr/batch/export-zip";
import { validateBatchRows } from "../lib/qr/batch/validate";
import { BATCH_MAX_ROWS } from "../lib/qr/batch/types";

const messages = {
  empty: "empty",
  tooMany: "too many {max}",
  noUrlColumn: "no url column",
  unsupportedType: "unsupported {type}",
};

test("parseBatchCsv reads legacy headered URL rows", () => {
  const csv = buildLegacyUrlSampleCsv();
  const parsed = parseBatchCsv(csv, messages);
  assert.equal(parsed.error, undefined);
  assert.equal(parsed.rows.length, 2);
  assert.equal(parsed.rows[0]?.type, "url");
  assert.equal(parsed.rows[0]?.fields.url, "https://example.com/menu");
  assert.equal(parsed.rows[0]?.fileName, "table-01");
});

test("parseBatchCsv reads Phase B1 mixed-type sample", () => {
  const parsed = parseBatchCsv(buildSampleCsv(), messages);
  assert.equal(parsed.error, undefined);
  assert.equal(parsed.rows.length, 5);
  assert.deepEqual(
    parsed.rows.map((row) => row.type),
    ["url", "wifi", "line", "whatsapp", "vcard"],
  );
  assert.equal(parsed.rows[1]?.fields.wifiSsid, "GuestNet");
  assert.equal(parsed.rows[2]?.fields.lineId, "@myshop");
});

test("parseBatchCsv accepts headerless two-column URL rows", () => {
  const parsed = parseBatchCsv("https://a.test,one\nhttps://b.test,two", messages);
  assert.equal(parsed.rows.length, 2);
  assert.equal(parsed.rows[0]?.type, "url");
  assert.equal(parsed.rows[1]?.fileName, "two");
});

test("parseBatchCsv truncates to the batch cap", () => {
  const lines = ["url,filename", ...Array.from({ length: BATCH_MAX_ROWS + 5 }, (_, index) => `https://x.test/${index},qr-${index}`)];
  const parsed = parseBatchCsv(lines.join("\n"), messages);
  assert.equal(parsed.rows.length, BATCH_MAX_ROWS);
  assert.equal(parsed.truncated, true);
  assert.ok(parsed.error);
});

test("validateBatchRows builds payloads for B1 types", () => {
  const rows = validateBatchRows([
    { type: "url", fileName: "ok", fields: { url: "https://example.com" } },
    { type: "wifi", fileName: "wifi", fields: { wifiSsid: "Guest", wifiPassword: "secret", wifiEncryption: "WPA" } },
    { type: "line", fileName: "line", fields: { lineId: "@shop" } },
    { type: "whatsapp", fileName: "wa", fields: { whatsappPhone: "+66812345678" } },
    { type: "vcard", fileName: "card", fields: { vcardFirstName: "Som", vcardLastName: "Chai" } },
  ]);
  assert.ok(rows.every((row) => row.payload));
  assert.match(rows[1]?.payload ?? "", /^WIFI:/);
  assert.match(rows[2]?.payload ?? "", /line\.me/);
  assert.match(rows[3]?.payload ?? "", /wa\.me/);
  assert.match(rows[4]?.payload ?? "", /BEGIN:VCARD/);
});

test("validateBatchRows flags invalid URLs", () => {
  const rows = validateBatchRows([
    { type: "url", fileName: "ok", fields: { url: "https://example.com" } },
    { type: "url", fileName: "bad", fields: { url: "not-a-url" } },
  ]);
  assert.equal(rows[0]?.payload, "https://example.com/");
  assert.ok(rows[1]?.error);
});

test("validateBatchRows surfaces unsupported type parse errors", () => {
  const rows = validateBatchRows([
    { type: "url", fileName: "bad-type", fields: {}, parseError: "unsupported sms" },
  ]);
  assert.equal(rows[0]?.error, "unsupported sms");
});

test("uniqueZipEntryName deduplicates file stems", () => {
  const used = new Set<string>();
  assert.equal(uniqueZipEntryName("menu", used), "menu.png");
  assert.equal(uniqueZipEntryName("menu", used), "menu-2.png");
});
