import assert from "node:assert/strict";
import test from "node:test";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { generatorPage, getPageMetadata, qrPages, siteUrl } from "../lib/seo/site";
import { getTemplatePageMetadata, getTemplatePagePath, templateCategoryPages, templateIndexPage } from "../lib/seo/templates";

test("SEO pages have unique metadata and canonical URLs", () => {
  const pages = [generatorPage, ...Object.values(qrPages)];
  assert.equal(new Set(pages.map((page) => page.title)).size, pages.length);
  assert.equal(new Set(pages.map((page) => page.description)).size, pages.length);
  for (const page of pages) {
    const metadata = getPageMetadata(page);
    const path = page.slug === "qr-code-generator" ? "/qr-code-generator" : `/qr-code/${page.slug}`;
    assert.equal(metadata.alternates?.canonical, path);
    assert.equal(metadata.openGraph?.url, new URL(path, siteUrl).toString());
    assert.equal(metadata.twitter?.card, "summary");
  }
});

test("template SEO pages have unique metadata and curated paths", () => {
  const pages = [templateIndexPage, ...Object.values(templateCategoryPages)];
  assert.equal(pages.length, 6);
  assert.equal(new Set(pages.map((page) => page.title)).size, pages.length);
  assert.equal(new Set(pages.map((page) => page.description)).size, pages.length);
  for (const page of pages) {
    const metadata = getTemplatePageMetadata(page);
    const path = getTemplatePagePath(page);
    assert.equal(metadata.alternates?.canonical, path);
    assert.equal(metadata.openGraph?.url, new URL(path, siteUrl).toString());
    assert.ok(page.body.length >= 2);
    assert.ok(page.faqs.length >= 2);
  }
});

test("sitemap contains curated QR and template pages only", () => {
  const entries = sitemap();
  const expected = [
    "/qr-code-generator",
    ...Object.values(qrPages).map((page) => `/qr-code/${page.slug}`),
    "/templates",
    ...Object.values(templateCategoryPages).map((page) => `/templates/${page.slug}`),
  ].map((path) => new URL(path, siteUrl).toString());
  assert.equal(entries.length, expected.length);
  assert.deepEqual(entries.map((entry) => entry.url), expected);
});

test("robots allows public pages and points to the sitemap", () => {
  const policy = robots();
  assert.deepEqual(policy.rules, { userAgent: "*", allow: "/" });
  assert.equal(policy.sitemap, new URL("/sitemap.xml", siteUrl).toString());
});
