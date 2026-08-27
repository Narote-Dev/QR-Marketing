import assert from "node:assert/strict";
import test from "node:test";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { locales } from "../lib/i18n/config";
import { localizedPath } from "../lib/i18n/paths";
import { generatorPage, bulkPage, getPageMetadata, qrPages, siteUrl } from "../lib/seo/site";
import { getTemplatePageBarePath, getTemplatePageMetadata, templateCategoryPages, templateIndexPage } from "../lib/seo/templates";
import { useCasePathForSlug, useCaseSlugs } from "../lib/seo/use-cases";

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
      const path = localizedPath(locale, bare);
      assert.equal(metadata.alternates?.canonical, path);
      assert.equal(metadata.openGraph?.url, new URL(path, siteUrl).toString());
      assert.ok(metadata.alternates?.languages);
      assert.equal((metadata.twitter as { card?: string } | null | undefined)?.card, "summary");
    }
  }
});

test("template SEO pages have unique metadata and curated locale paths", () => {
  const pages = [templateIndexPage, ...Object.values(templateCategoryPages)];
  assert.equal(pages.length, 6);
  assert.equal(new Set(pages.map((page) => page.title)).size, pages.length);
  assert.equal(new Set(pages.map((page) => page.description)).size, pages.length);
  for (const page of pages) {
    const bare = getTemplatePageBarePath(page);
    for (const locale of locales) {
      const metadata = getTemplatePageMetadata(page, locale);
      const path = localizedPath(locale, bare);
      assert.equal(metadata.alternates?.canonical, path);
      assert.equal(metadata.openGraph?.url, new URL(path, siteUrl).toString());
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
    ...Object.values(qrPages).map((page) => `/qr-code/${page.slug}`),
    "/templates",
    ...Object.values(templateCategoryPages).map((page) => `/templates/${page.slug}`),
    "/privacy-policy",
    "/terms-of-service",
    "/about",
    "/contact",
    ...useCaseSlugs.map((slug) => useCasePathForSlug(slug)),
  ];
  const expected = barePaths.flatMap((bare) => locales.map((locale) => new URL(localizedPath(locale, bare), siteUrl).toString()));
  assert.equal(entries.length, expected.length);
  assert.equal(entries.length, 129);
  assert.deepEqual(entries.map((entry) => entry.url).sort(), expected.slice().sort());
});

test("robots allows public pages and points to the sitemap", () => {
  const policy = robots();
  assert.deepEqual(policy.rules, { userAgent: "*", allow: "/" });
  assert.equal(policy.sitemap, new URL("/sitemap.xml", siteUrl).toString());
});
