import type { Metadata } from "next";
import { defaultLocale, htmlLang, locales, openGraphLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { useCaseMeta, useCasePathForSlug } from "@/lib/seo/use-cases/catalog";
import { useCasesEn } from "@/lib/seo/use-cases/en";
import { useCasesTh } from "@/lib/seo/use-cases/th";
import { useCasesZh } from "@/lib/seo/use-cases/zh";
import type { UseCasePage, UseCaseSlug } from "@/lib/seo/use-cases/types";
import { useCaseSlugs } from "@/lib/seo/use-cases/types";
import { siteName, siteUrl } from "@/lib/seo/site";

export * from "@/lib/seo/use-cases/types";
export { useCaseMeta, useCasePathForSlug } from "@/lib/seo/use-cases/catalog";

const useCasesByLocale: Record<Locale, Record<UseCaseSlug, UseCasePage>> = {
  en: useCasesEn,
  th: useCasesTh,
  zh: useCasesZh,
};

export function getUseCasePage(locale: Locale, slug: UseCaseSlug): UseCasePage {
  // Step 1: Resolve localized long-tail copy for the requested slug.
  return useCasesByLocale[locale][slug];
}

export function getAllUseCasePages(locale: Locale): UseCasePage[] {
  // Step 1: Return every curated use-case page in stable slug order.
  return useCaseSlugs.map((slug) => getUseCasePage(locale, slug));
}

export function getRelatedUseCasePages(locale: Locale, slug: UseCaseSlug): UseCasePage[] {
  // Step 1: Map related slug ids to localized pages for internal linking.
  return getUseCasePage(locale, slug).related.map((relatedSlug) => getUseCasePage(locale, relatedSlug));
}

export function getUseCaseMetadata(locale: Locale, slug: UseCaseSlug): Metadata {
  // Step 1: Build canonical and hreflang URLs for this use-case page.
  const page = getUseCasePage(locale, slug);
  const barePath = useCasePathForSlug(slug);
  const canonical = new URL(localizedPath(locale, barePath), siteUrl).toString();
  const languages = Object.fromEntries([
    ...locales.map((item) => [htmlLang[item], new URL(localizedPath(item, barePath), siteUrl).toString()]),
    ["x-default", new URL(localizedPath(defaultLocale, barePath), siteUrl).toString()],
  ]);

  // Step 2: Publish intent-specific metadata for long-tail discovery.
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical, languages },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName,
      locale: openGraphLocale[locale],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}

export function getFeaturedUseCasePages(locale: Locale, limit = 6): UseCasePage[] {
  // Step 1: Surface a short featured set for hub internal linking.
  return getAllUseCasePages(locale).slice(0, limit);
}

// Keep English defaults available for sitemap and non-locale helpers.
export const useCasePages = useCasesEn;
