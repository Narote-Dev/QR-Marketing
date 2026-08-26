import assert from "node:assert/strict";
import test from "node:test";
import { getDynamicQrApiBaseUrl, isDynamicQrEnabled } from "../lib/dynamic-qr/config";

test("dynamic QR flag defaults off", () => {
  assert.equal(isDynamicQrEnabled(), false);
});

test("dynamic QR API base URL falls back to local API", () => {
  assert.equal(getDynamicQrApiBaseUrl(), "http://localhost:8080");
});
