import assert from "node:assert/strict";
import test from "node:test";
import { defaultLocale, isLocale, locales } from "../lib/i18n/config";
import { localeFromAcceptLanguage, localeFromCountry, resolvePreferredLocale } from "../lib/i18n/detect";
import { getDictionary } from "../lib/i18n/get-dictionary";
import { isExemptPath, localizedPath, stripLocaleFromPath, switchLocalePath } from "../lib/i18n/paths";

test("locales are validated and labeled", () => {
  assert.deepEqual(locales, ["en", "th", "zh"]);
  assert.equal(defaultLocale, "en");
  assert.equal(isLocale("th"), true);
  assert.equal(isLocale("de"), false);
});

test("region and accept-language resolve to preferred locales", () => {
  assert.equal(localeFromCountry("TH"), "th");
  assert.equal(localeFromCountry("CN"), "zh");
  assert.equal(localeFromCountry("US"), "en");
  assert.equal(localeFromAcceptLanguage("th-TH,th;q=0.9,en;q=0.8"), "th");
  assert.equal(localeFromAcceptLanguage("zh-CN,zh;q=0.9"), "zh");
  assert.equal(resolvePreferredLocale({ cookie: "zh", country: "TH" }), "zh");
  assert.equal(resolvePreferredLocale({ country: "TH" }), "th");
  assert.equal(resolvePreferredLocale({ acceptLanguage: "zh-CN" }), "zh");
});

test("localized path helpers preserve tool paths", () => {
  assert.equal(localizedPath("th", "/qr-code-generator"), "/th/qr-code-generator");
  assert.equal(stripLocaleFromPath("/zh/templates/wifi").locale, "zh");
  assert.equal(stripLocaleFromPath("/zh/templates/wifi").path, "/templates/wifi");
  assert.equal(switchLocalePath("/en/qr-code/url", "th"), "/th/qr-code/url");
  assert.equal(isExemptPath("/sitemap.xml"), true);
  assert.equal(isExemptPath("/robots.txt"), true);
  assert.equal(isExemptPath("/google916c8d25fc4de77f.html"), true);
  assert.equal(isExemptPath("/r/SZHRJeME"), true);
  assert.equal(isExemptPath("/api/dynamic-qr"), true);
});

test("dictionaries expose unique SEO titles per locale", async () => {
  for (const locale of locales) {
    const dictionary = await getDictionary(locale);
    const titles = [
      dictionary.seo.generator.title,
      ...Object.values(dictionary.seo.qr).map((page) => page.title),
      dictionary.seo.templatesIndex.title,
      ...Object.values(dictionary.seo.templates).map((page) => page.title),
    ];
    assert.equal(new Set(titles).size, titles.length, `duplicate titles in ${locale}`);
    assert.equal(dictionary.site.name, "Build Your QR");
  }
});
