import assert from "node:assert/strict";
import test from "node:test";
import { withDownloadExtension } from "../lib/qr/export";

test("withDownloadExtension forces png and svg endings", () => {
  assert.equal(withDownloadExtension("qr-wifi.png", "svg"), "qr-wifi.svg");
  assert.equal(withDownloadExtension("qr-wifi", "png"), "qr-wifi.png");
  assert.equal(withDownloadExtension("promo.JPEG", "svg"), "promo.svg");
  assert.equal(withDownloadExtension("   ", "png"), "qr-code.png");
});
