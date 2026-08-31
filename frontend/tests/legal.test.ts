import assert from "node:assert/strict";
import test from "node:test";
import { locales } from "../lib/i18n/config";
import { getLegalDocument, getLegalMetadata, legalSlugs } from "../lib/legal";
import { hreflangKeys } from "../lib/seo/hreflang";
import { siteUrl } from "../lib/seo/site";

test("legal documents are complete in every locale", () => {
  for (const locale of locales) {
    for (const slug of legalSlugs) {
      const document = getLegalDocument(locale, slug);
      assert.equal(document.slug, slug);
      assert.ok(document.title.length > 2);
      assert.ok(document.description.length > 20);
      assert.ok(document.sections.length >= 10);
      assert.ok(document.sections.some((section) =>
        section.links?.some((link) => link.href === "mailto:support@genmyqrcode.com"),
      ));
    }
  }
});

test("legal metadata publishes canonical and hreflang URLs", () => {
  for (const locale of locales) {
    for (const slug of legalSlugs) {
      const metadata = getLegalMetadata(locale, slug);
      const canonical = new URL(`/${locale}/${slug}`, siteUrl).toString();
      assert.equal(metadata.alternates?.canonical, canonical);
      assert.equal(metadata.openGraph?.url, canonical);
      const languages = metadata.alternates?.languages as Record<string, string> | undefined;
      assert.ok(languages);
      assert.deepEqual(Object.keys(languages).sort(), [...hreflangKeys].sort());
    }
  }
});
