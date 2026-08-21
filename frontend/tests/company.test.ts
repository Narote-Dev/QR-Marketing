import assert from "node:assert/strict";
import test from "node:test";
import { htmlLang, locales } from "../lib/i18n/config";
import { companySlugs, getCompanyDocument, getCompanyMetadata } from "../lib/company";
import { siteUrl } from "../lib/seo/site";

test("company documents are complete in every locale", () => {
  for (const locale of locales) {
    for (const slug of companySlugs) {
      const document = getCompanyDocument(locale, slug);
      assert.equal(document.slug, slug);
      assert.ok(document.title.length > 2);
      assert.ok(document.description.length > 20);
      assert.ok(document.sections.length >= 3);
      if (slug === "contact") {
        assert.equal(document.email?.address, "support@genmyqrcode.com");
      }
    }
  }
});

test("company metadata publishes canonical and hreflang URLs", () => {
  for (const locale of locales) {
    for (const slug of companySlugs) {
      const metadata = getCompanyMetadata(locale, slug);
      const canonical = new URL(`/${locale}/${slug}`, siteUrl).toString();
      assert.equal(metadata.alternates?.canonical, canonical);
      assert.equal(metadata.openGraph?.url, canonical);
      const languages = metadata.alternates?.languages;
      assert.ok(languages && htmlLang[locale] in languages);
    }
  }
});
