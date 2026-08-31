import type { Metadata } from "next";
import { openGraphLocale, type Locale } from "@/lib/i18n/config";
import { useCaseMeta, useCasePathForSlug } from "@/lib/seo/use-cases/catalog";
import { useCasesEn } from "@/lib/seo/use-cases/en";
import { useCasesTh } from "@/lib/seo/use-cases/th";
import { useCasesZh } from "@/lib/seo/use-cases/zh";
import type { UseCasePage, UseCaseSlug } from "@/lib/seo/use-cases/types";
import { useCaseSlugs } from "@/lib/seo/use-cases/types";
import { buildLocaleAlternates } from "@/lib/seo/hreflang";
import { siteName } from "@/lib/seo/site";

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
  const { canonical, languages } = buildLocaleAlternates(barePath, locale);

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
  // Step 1: Surface a short featured set, leading with Gmail/email because Search Console already shows that intent.
  const featuredSlugs: UseCaseSlug[] = [
    "gmail-email",
    "thai-restaurant-menu",
    "free-wifi-no-signup",
    "google-review-shop",
    "cafe-menu",
    "line-contact",
    "business-contact-card",
    "hotel-wifi",
  ];
  return featuredSlugs.slice(0, limit).map((slug) => getUseCasePage(locale, slug));
}

// Keep English defaults available for sitemap and non-locale helpers.
export const useCasePages = useCasesEn;
