import type { MetadataRoute } from "next";
import { defaultLocale, htmlLang, locales } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { qrPages, siteUrl } from "@/lib/seo/site";
import { getTemplatePageBarePath, templateCategoryPages, templateIndexPage } from "@/lib/seo/templates";
import { useCasePathForSlug, useCaseSlugs } from "@/lib/seo/use-cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Step 1: Publish every locale URL while attaching hreflang alternates.
  const barePaths = [
    "/qr-code-generator",
    ...Object.values(qrPages).map((page) => `/qr-code/${page.slug}`),
    getTemplatePageBarePath(templateIndexPage),
    ...Object.values(templateCategoryPages).map((page) => getTemplatePageBarePath(page)),
    // Change: Make localized Privacy Policy and Terms pages discoverable.
    "/privacy-policy",
    "/terms-of-service",
    // Change: Make localized About and Contact pages discoverable.
    "/about",
    "/contact",
    // Change: Include first-wave long-tail use-case landing pages.
    ...useCaseSlugs.map((slug) => useCasePathForSlug(slug)),
  ];

  return barePaths.flatMap((bare) => {
    const languages = Object.fromEntries([
      ...locales.map((locale) => [htmlLang[locale], new URL(localizedPath(locale, bare), siteUrl).toString()]),
      ["x-default", new URL(localizedPath(defaultLocale, bare), siteUrl).toString()],
    ]);

    return locales.map((locale) => ({
      url: new URL(localizedPath(locale, bare), siteUrl).toString(),
      lastModified: now,
      changeFrequency: (bare.includes("generator") || bare === "/templates" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: bare === "/qr-code-generator" ? 1 : bare === "/templates" ? 0.9 : 0.8,
      alternates: { languages },
    }));
  });
}
