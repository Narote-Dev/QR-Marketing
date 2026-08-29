import assert from "node:assert/strict";
import test from "node:test";
import { defaultQrDesign } from "../lib/qr/design.ts";
import {
  MAX_DESIGN_JSON_BYTES,
  parseStoredDesign,
  prepareDesignForSave,
} from "../lib/dynamic-qr/design-storage.ts";

test("prepareDesignForSave keeps compact designs", () => {
  const saved = prepareDesignForSave(defaultQrDesign);
  assert.deepEqual(saved, defaultQrDesign);
});

test("prepareDesignForSave strips oversized custom logo", () => {
  const bigLogo = `data:image/png;base64,${"A".repeat(MAX_DESIGN_JSON_BYTES)}`;
  const saved = prepareDesignForSave({ ...defaultQrDesign, logo: bigLogo });
  assert.equal(saved.logo, undefined);
});

test("parseStoredDesign falls back to default", () => {
  assert.deepEqual(parseStoredDesign(null), defaultQrDesign);
  assert.deepEqual(parseStoredDesign({ foregroundColor: "#111111" }), {
    ...defaultQrDesign,
    foregroundColor: "#111111",
  });
});
