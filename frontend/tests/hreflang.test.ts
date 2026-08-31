import assert from "node:assert/strict";
import test from "node:test";
import { buildHreflangLanguages, hreflangKeys } from "../lib/seo/hreflang";

test("hreflang alternates include en, th, zh-CN, and x-default", () => {
  const languages = buildHreflangLanguages("/use-cases/thai-restaurant-menu");
  assert.deepEqual(Object.keys(languages).sort(), [...hreflangKeys].sort());
  for (const key of hreflangKeys) {
    assert.match(languages[key], /^https:\/\/genmyqrcode\.com\//);
  }
});
