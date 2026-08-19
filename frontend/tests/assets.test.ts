import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import path from "node:path";
import { getAssetById, getAssetsByCategory, presetAssets } from "../lib/assets/catalog";
import { presetAssetPath, presetPreviewPath } from "../lib/assets/paths";
import { assetCategories } from "../lib/assets/types";

const publicRoot = path.join(process.cwd(), "public");

test("asset categories each expose at least one local preset", () => {
  for (const category of assetCategories) {
    assert.ok(getAssetsByCategory(category).length >= 1, `missing assets for ${category}`);
  }
});

test("preset asset ids are unique and resolve to public files", () => {
  assert.equal(new Set(presetAssets.map((asset) => asset.id)).size, presetAssets.length);
  for (const asset of presetAssets) {
    assert.equal(getAssetById(asset.id)?.path, asset.path);
    assert.ok(asset.path.startsWith("/presets/"));
    assert.ok(existsSync(path.join(publicRoot, asset.path.replace(/^\//, ""))), asset.path);
  }
});

test("path helpers build stable public URLs", () => {
  assert.equal(presetAssetPath("logos", "cafe.svg"), "/presets/logos/cafe.svg");
  assert.equal(presetAssetPath("template-thumbnails", "wifi.svg"), "/presets/thumbnails/wifi.svg");
  assert.equal(presetPreviewPath("hotel.svg"), "/presets/previews/hotel.svg");
});
