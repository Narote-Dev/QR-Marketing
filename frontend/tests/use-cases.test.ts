import assert from "node:assert/strict";
import test from "node:test";
import { htmlLang, locales } from "../lib/i18n/config";
import { getDictionary } from "../lib/i18n/get-dictionary";
import { localizedPath } from "../lib/i18n/paths";
import { siteUrl } from "../lib/seo/site";
import {
  getAllUseCasePages,
  getUseCaseMetadata,
  getUseCasePage,
  useCasePathForSlug,
  useCaseSlugs,
} from "../lib/seo/use-cases";
import { getTemplateById } from "../lib/templates/catalog";

test("use-case pages are complete in every locale", () => {
  for (const locale of locales) {
    const pages = getAllUseCasePages(locale);
    assert.equal(pages.length, 11);
    assert.equal(new Set(pages.map((page) => page.title)).size, pages.length);
    assert.equal(new Set(pages.map((page) => page.description)).size, pages.length);
    for (const page of pages) {
      assert.ok(page.h1.length > 5);
      assert.ok(page.body.length >= 2);
      assert.ok(page.examples.length >= 2);
      assert.ok(page.howTo.length >= 3);
      assert.ok(page.faqs.length >= 2);
      assert.ok(getTemplateById(page.templateId), `missing template ${page.templateId}`);
      assert.ok(useCaseSlugs.includes(page.slug));
    }
  }
});

test("use-case metadata publishes canonical and hreflang URLs", () => {
  for (const locale of locales) {
    for (const slug of useCaseSlugs) {
      const metadata = getUseCaseMetadata(locale, slug);
      const path = localizedPath(locale, useCasePathForSlug(slug));
      const canonical = new URL(path, siteUrl).toString();
      assert.equal(metadata.alternates?.canonical, canonical);
      assert.equal(metadata.openGraph?.url, canonical);
      assert.ok(metadata.alternates?.languages && htmlLang[locale] in metadata.alternates.languages);
      assert.equal(getUseCasePage(locale, slug).related.length >= 2, true);
    }
  }
});

test("Phase E1 SEO copy targets proven GSC queries", async () => {
  assert.match(getUseCasePage("en", "thai-restaurant-menu").title, /menu design/i);
  assert.match(getUseCasePage("en", "cafe-menu").title, /menu design/i);
  assert.match(getUseCasePage("en", "restaurant-table-tent").title, /menu design/i);
  assert.match(getUseCasePage("en", "hotel-wifi").title, /hotel qr code/i);
  assert.match(getUseCasePage("th", "hotel-wifi").title, /hotel qr code/i);
  assert.match(getUseCasePage("th", "thai-restaurant-menu").title, /QR เมนู|ออกแบบ/);

  const th = await getDictionary("th");
  const en = await getDictionary("en");
  assert.match(th.seo.generator.title, /ทำตัวอาร์โค้ดฟรี/);
  assert.match(en.seo.generator.title, /free qr code generator/i);
  assert.match(en.seo.templates.menu.title, /menu design/i);
  assert.match(en.seo.templates.hotel.title, /hotel qr code/i);
});
