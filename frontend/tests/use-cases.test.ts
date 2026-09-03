import assert from "node:assert/strict";
import test from "node:test";
import { locales } from "../lib/i18n/config";
import { getDictionary } from "../lib/i18n/get-dictionary";
import { localizedPath } from "../lib/i18n/paths";
import { hreflangKeys } from "../lib/seo/hreflang";
import { siteUrl } from "../lib/seo/site";
import {
  getAllUseCasePages,
  getUseCaseMetadata,
  getUseCasePage,
  useCasePathForSlug,
  useCaseSlugs,
} from "../lib/seo/use-cases";
import { getTemplateById } from "../lib/templates/catalog";

function assertHreflangLanguages(languages: Record<string, string> | null | undefined) {
  assert.ok(languages);
  assert.deepEqual(Object.keys(languages).sort(), [...hreflangKeys].sort());
}

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
      if (page.slug === "thai-restaurant-menu" || page.slug === "line-contact") {
        assert.ok(page.body.length >= 4);
        assert.ok(page.faqs.length >= 5);
        assert.ok(page.toolLinks && page.toolLinks.length >= 3);
      }
      const phase2Slugs = [
        "thai-restaurant-menu",
        "cafe-menu",
        "line-contact",
        "google-review-shop",
        "restaurant-table-tent",
        "hotel-wifi",
        "free-wifi-no-signup",
      ] as const;
      if (phase2Slugs.includes(page.slug as (typeof phase2Slugs)[number])) {
        assert.ok(page.body.length >= 4, `${page.slug} body`);
        assert.ok(page.faqs.length >= 4, `${page.slug} faqs`);
        assert.ok(page.howTo.length >= 4, `${page.slug} howTo`);
      }
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
      assertHreflangLanguages(metadata.alternates?.languages as Record<string, string> | undefined);
      assert.equal(getUseCasePage(locale, slug).related.length >= 2, true);
      if (slug === "event-poster" || slug === "gmail-email") {
        assert.deepEqual(metadata.robots, { index: false, follow: true });
      } else {
        assert.equal(metadata.robots, undefined);
      }
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
  assert.match(getUseCasePage("en", "line-contact").title, /LINE OA/i);
  assert.match(getUseCasePage("th", "line-contact").title, /LINE OA|QR Code LINE/i);

  const th = await getDictionary("th");
  const en = await getDictionary("en");
  assert.match(th.seo.generator.title, /ทำคิวอาร์โค้ดฟรี/);
  assert.match(en.seo.generator.title, /free qr code generator/i);
  assert.match(en.seo.templates.menu.title, /menu design/i);
  assert.match(en.seo.templates.hotel.title, /hotel qr code/i);
});
