import assert from "node:assert/strict";
import test from "node:test";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { locales } from "../lib/i18n/config";
import { localizedPath } from "../lib/i18n/paths";
import { hreflangKeys } from "../lib/seo/hreflang";
import { generatorPage, bulkPage, getPageMetadata, qrPages, resolveSiteUrl, siteUrl } from "../lib/seo/site";
import { isQrSeoIndexed, isUseCaseIndexed, noindexQrSeoSlugs, noindexUseCaseSlugs } from "../lib/seo/indexing";
import { getTemplatePageBarePath, getTemplatePageMetadata, templateCategoryPages, templateIndexPage } from "../lib/seo/templates";
import { useCasePathForSlug, useCaseSlugs } from "../lib/seo/use-cases";

function assertHreflangLanguages(languages: Record<string, string> | null | undefined) {
  assert.ok(languages);
  assert.deepEqual(Object.keys(languages).sort(), [...hreflangKeys].sort());
}

test("SEO pages have unique metadata and locale canonical URLs", () => {
  const pages = [generatorPage, bulkPage, ...Object.values(qrPages)];
  assert.equal(new Set(pages.map((page) => page.title)).size, pages.length);
  assert.equal(new Set(pages.map((page) => page.description)).size, pages.length);
  for (const page of pages) {
    const bare =
      page.slug === "qr-code-generator"
        ? "/qr-code-generator"
        : page.slug === "bulk-qr-generator"
          ? "/bulk-qr-generator"
          : `/qr-code/${page.slug}`;
    for (const locale of locales) {
      const metadata = getPageMetadata(page, locale);
      const canonical = new URL(localizedPath(locale, bare), siteUrl).toString();
      assert.equal(metadata.alternates?.canonical, canonical);
      assert.equal(metadata.openGraph?.url, canonical);
      assertHreflangLanguages(metadata.alternates?.languages as Record<string, string> | undefined);
      assert.equal((metadata.twitter as { card?: string } | null | undefined)?.card, "summary");
    }
  }
});

test("template SEO pages have unique metadata and curated locale paths", () => {
  const pages = [templateIndexPage, ...Object.values(templateCategoryPages)];
  assert.equal(pages.length, 7);
  assert.equal(new Set(pages.map((page) => page.title)).size, pages.length);
  assert.equal(new Set(pages.map((page) => page.description)).size, pages.length);
  for (const page of pages) {
    const bare = getTemplatePageBarePath(page);
    for (const locale of locales) {
      const metadata = getTemplatePageMetadata(page, locale);
      const canonical = new URL(localizedPath(locale, bare), siteUrl).toString();
      assert.equal(metadata.alternates?.canonical, canonical);
      assert.equal(metadata.openGraph?.url, canonical);
      assertHreflangLanguages(metadata.alternates?.languages as Record<string, string> | undefined);
      assert.ok(page.body.length >= 2);
      assert.ok(page.faqs.length >= 2);
    }
  }
});

test("sitemap contains curated QR and template pages for every locale", () => {
  const entries = sitemap();
  const barePaths = [
    "/qr-code-generator",
    "/bulk-qr-generator",
    ...Object.values(qrPages)
      .filter((page) => isQrSeoIndexed(page.slug))
      .map((page) => `/qr-code/${page.slug}`),
    "/templates",
    ...Object.values(templateCategoryPages).map((page) => `/templates/${page.slug}`),
    "/privacy-policy",
    "/terms-of-service",
    "/about",
    "/contact",
    ...useCaseSlugs.filter((slug) => isUseCaseIndexed(slug)).map((slug) => useCasePathForSlug(slug)),
  ];
  const expected = barePaths.flatMap((bare) => locales.map((locale) => new URL(localizedPath(locale, bare), siteUrl).toString()));
  // Change: Phase A removes 12 QR types × 3 locales + 2 use-cases × 3 = 42 URLs (132 → 90).
  assert.equal(entries.length, expected.length);
  assert.equal(entries.length, 90);
  assert.equal(noindexQrSeoSlugs.length, 12);
  assert.equal(noindexUseCaseSlugs.length, 2);
  assert.deepEqual(entries.map((entry) => entry.url).sort(), expected.slice().sort());
  for (const slug of noindexQrSeoSlugs) {
    assert.equal(entries.some((entry) => entry.url.includes(`/qr-code/${slug}`)), false);
  }
  for (const slug of noindexUseCaseSlugs) {
    assert.equal(entries.some((entry) => entry.url.includes(`/use-cases/${slug}`)), false);
  }
});

test("thin QR SEO hubs publish noindex while core hubs stay indexable", () => {
  for (const locale of locales) {
    for (const page of Object.values(qrPages)) {
      const metadata = getPageMetadata(page, locale);
      assert.deepEqual(metadata.robots, isQrSeoIndexed(page.slug) ? undefined : { index: false, follow: true });
    }
  }
});

test("sitemap omits unverified dates and publishes reciprocal indexable alternates", () => {
  const entries = sitemap();
  const byUrl = new Map(entries.map((entry) => [entry.url, entry]));
  assert.equal(byUrl.size, entries.length);
  for (const entry of entries) {
    assert.equal(entry.lastModified, undefined, entry.url);
    const languages = entry.alternates?.languages as Record<string, string> | undefined;
    assertHreflangLanguages(languages);
    assert.ok(Object.values(languages!).includes(entry.url), `${entry.url} must reference itself`);
    for (const alternateUrl of Object.values(languages!)) {
      const alternate = byUrl.get(alternateUrl);
      assert.ok(alternate, `${alternateUrl} must be indexable and included`);
      assert.deepEqual(alternate.alternates?.languages, languages);
    }
  }
});

test("Phase C thick QR hubs meet menu-depth copy in en/th/zh", async () => {
  const { getDictionary } = await import("../lib/i18n/get-dictionary");
  const { getQrPages } = await import("../lib/seo/site");
  const { thickQrSeoSlugs } = await import("../lib/seo/indexing");

  for (const locale of locales) {
    const dictionary = await getDictionary(locale);
    const pages = getQrPages(dictionary);
    for (const slug of thickQrSeoSlugs) {
      const page = pages[slug];
      assert.ok((page.body?.length ?? 0) >= 4, `${locale}/${slug} body`);
      assert.ok(page.howTo.length >= 4, `${locale}/${slug} howTo`);
      assert.ok(page.faqs.length >= 4, `${locale}/${slug} faqs`);
    }
  }
});

test("robots allows public pages and points to the sitemap", () => {
  const policy = robots();
  assert.deepEqual(policy.rules, {
    userAgent: "*",
    allow: "/",
    disallow: ["/*/my/", "/*/dynamic-qr/", "/*/sign-in", "/*/sign-up", "/r/"],
  });
  assert.equal(policy.sitemap, new URL("/sitemap.xml", siteUrl).toString());
});

test("resolveSiteUrl tolerates missing or invalid NEXT_PUBLIC_SITE_URL", () => {
  assert.equal(resolveSiteUrl(undefined).toString(), "https://genmyqrcode.com/");
  assert.equal(resolveSiteUrl("").toString(), "https://genmyqrcode.com/");
  assert.equal(resolveSiteUrl("   ").toString(), "https://genmyqrcode.com/");
  assert.equal(resolveSiteUrl("not a url").toString(), "https://genmyqrcode.com/");
  assert.equal(resolveSiteUrl("ftp://files.example.com").toString(), "https://genmyqrcode.com/");
  assert.equal(resolveSiteUrl("https://preview.example.com").toString(), "https://preview.example.com/");
  assert.equal(resolveSiteUrl("preview.example.com").toString(), "https://preview.example.com/");
});
