import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { buildHreflangLanguages } from "@/lib/seo/hreflang";
import { isQrSeoIndexed, isUseCaseIndexed } from "@/lib/seo/indexing";
import { qrPages, siteUrl } from "@/lib/seo/site";
import { getTemplatePageBarePath, templateCategoryPages, templateIndexPage } from "@/lib/seo/templates";
import { useCasePathForSlug, useCaseSlugs } from "@/lib/seo/use-cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Step 1: Publish indexable locale URLs only — Phase A drops noindex QR/use-case hubs.
  const barePaths = [
    "/qr-code-generator",
    "/bulk-qr-generator",
    ...Object.values(qrPages)
      .filter((page) => isQrSeoIndexed(page.slug))
      .map((page) => `/qr-code/${page.slug}`),
    getTemplatePageBarePath(templateIndexPage),
    ...Object.values(templateCategoryPages).map((page) => getTemplatePageBarePath(page)),
    // Change: Make localized Privacy Policy and Terms pages discoverable.
    "/privacy-policy",
    "/terms-of-service",
    // Change: Make localized About and Contact pages discoverable.
    "/about",
    "/contact",
    // Change: Include indexable long-tail use-case landing pages only.
    ...useCaseSlugs.filter((slug) => isUseCaseIndexed(slug)).map((slug) => useCasePathForSlug(slug)),
  ];

  return barePaths.flatMap((bare) => {
    const languages = buildHreflangLanguages(bare);

    return locales.map((locale) => ({
      url: new URL(localizedPath(locale, bare), siteUrl).toString(),
      lastModified: now,
      changeFrequency: (bare.includes("generator") || bare === "/templates" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: bare === "/qr-code-generator" ? 1 : bare === "/bulk-qr-generator" ? 0.95 : bare === "/templates" ? 0.9 : 0.8,
      alternates: { languages },
    }));
  });
}
