import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import path from "node:path";
import { applyTemplate, clearTemplateDesign } from "../lib/templates/apply";
import { getTemplateById, getTemplatesByCategory, templates } from "../lib/templates/catalog";
import { templateCategories } from "../lib/templates/types";
import { defaultQrDesign } from "../lib/qr/design";

const publicRoot = path.join(process.cwd(), "public");

test("every template category has at least one curated template", () => {
  for (const category of templateCategories) {
    assert.ok(getTemplatesByCategory(category).length >= 1, `missing templates for ${category}`);
  }
});

test("template ids and category/slug pairs are unique", () => {
  assert.equal(new Set(templates.map((template) => template.id)).size, templates.length);
  assert.equal(new Set(templates.map((template) => `${template.category}/${template.slug}`)).size, templates.length);
});

test("applyTemplate maps eye style and preserves content-independent design defaults", () => {
  const template = getTemplateById("restaurant-warm");
  assert.ok(template);
  const design = applyTemplate(template);
  assert.equal(design.foregroundColor, template.defaultForegroundColor);
  assert.equal(design.backgroundColor, template.defaultBackgroundColor);
  assert.equal(design.dotStyle, template.defaultDotStyle);
  assert.equal(design.innerEyeStyle, template.defaultEyeStyle);
  assert.equal(design.outerEyeStyle, template.defaultEyeStyle);
  assert.equal(design.frame, template.defaultFrame);
  assert.equal(design.frameText, template.defaultFrameText);
  assert.equal(design.logo, template.logo);
  assert.equal(design.backgroundImage, template.backgroundImage);
  assert.equal(design.errorCorrectionLevel, "H");
  assert.equal(design.size, defaultQrDesign.size);
});

test("clearTemplateDesign restores the default design", () => {
  assert.deepEqual(clearTemplateDesign(), defaultQrDesign);
});

test("template asset paths point at local public files", () => {
  for (const template of templates) {
    for (const assetPath of [template.thumbnail, template.previewImage, template.logo, template.backgroundImage]) {
      if (!assetPath) continue;
      assert.ok(assetPath.startsWith("/presets/"), assetPath);
      assert.ok(existsSync(path.join(publicRoot, assetPath.replace(/^\//, ""))), assetPath);
    }
  }
});
