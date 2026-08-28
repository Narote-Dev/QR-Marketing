import assert from "node:assert/strict";
import test from "node:test";
import { getDynamicQrApiBaseUrl, isDynamicQrEnabled, useDynamicQrApiRewrite } from "../lib/dynamic-qr/config";

test("dynamic QR flag defaults off", () => {
  assert.equal(isDynamicQrEnabled(), false);
});

test("dynamic QR API base URL falls back to local API", () => {
  assert.equal(getDynamicQrApiBaseUrl(), "http://localhost:8080");
});

test("dynamic QR rewrite mode uses same-origin API paths", () => {
  const original = process.env.NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE;
  process.env.NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE = "true";
  try {
    assert.equal(useDynamicQrApiRewrite(), true);
    assert.equal(getDynamicQrApiBaseUrl(), "");
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE;
    else process.env.NEXT_PUBLIC_DYNAMIC_QR_USE_REWRITE = original;
  }
});
