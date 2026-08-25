import assert from "node:assert/strict";
import test from "node:test";
import { locales } from "../lib/i18n/config";
import { getDictionary } from "../lib/i18n/get-dictionary";
import { applyStarterSelection, getStarterConfig, isQrTypeContentDirty, starterIds, starterNeedsConfirm, starters } from "../lib/qr/starters";
import { defaultQrValues } from "../lib/qr/types";
import { getTemplateById } from "../lib/templates/catalog";

test("each starter maps to an existing use-case template and type", () => {
  assert.equal(starters.length, 5);
  assert.equal(new Set(starters.map((starter) => starter.id)).size, starterIds.length);

  for (const locale of locales) {
    for (const id of starterIds) {
      const config = getStarterConfig(id, locale);
      const template = getTemplateById(config.templateId);
      assert.ok(template, `missing template ${config.templateId} for ${id}`);
      assert.equal(template.category, config.templateCategory);
      assert.ok(config.frameText.length > 0, `empty frame text for ${id} (${locale})`);
      assert.ok(config.helperHint.length > 0);
      assert.ok(config.downloadFileName.endsWith(".png"));
    }
  }
});

test("applying a starter keeps form values and overrides frame text", () => {
  const values = { ...defaultQrValues, url: "https://menu.example.com/lunch" };
  const config = getStarterConfig("hotel-wifi", "en");
  const template = getTemplateById(config.templateId);
  assert.ok(template);
  const next = applyStarterSelection(values, template, config);
  assert.equal(next.type, "wifi");
  assert.equal(next.values.url, "https://menu.example.com/lunch");
  assert.equal(next.selectedTemplateId, "hotel-slate");
  assert.equal(next.templateCategory, "hotel");
  assert.equal(next.design.frameText, "Guest WiFi");
  assert.equal(next.design.foregroundColor, template.defaultForegroundColor);
});

test("dirty content detection only looks at the active type", () => {
  assert.equal(isQrTypeContentDirty("url", defaultQrValues), false);
  assert.equal(isQrTypeContentDirty("url", { ...defaultQrValues, url: "https://shop.example.com" }), true);
  assert.equal(isQrTypeContentDirty("wifi", defaultQrValues), false);
  assert.equal(isQrTypeContentDirty("wifi", { ...defaultQrValues, wifiSsid: "Lobby" }), true);
  assert.equal(
    starterNeedsConfirm("url", { ...defaultQrValues, url: "https://shop.example.com" }, "wifi"),
    true,
  );
  assert.equal(starterNeedsConfirm("url", defaultQrValues, "wifi"), false);
  assert.equal(starterNeedsConfirm("url", { ...defaultQrValues, url: "https://shop.example.com" }, "url"), false);
});

test("dictionaries include a label for every starter", async () => {
  for (const locale of locales) {
    const dictionary = await getDictionary(locale);
    assert.deepEqual(Object.keys(dictionary.generator.starterLabels), [...starterIds]);
  }
});
