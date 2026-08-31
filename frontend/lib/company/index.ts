import type { Metadata } from "next";
import { openGraphLocale, type Locale } from "@/lib/i18n/config";
import { buildLocaleAlternates } from "@/lib/seo/hreflang";
import { companyEn } from "@/lib/company/en";
import { companyTh } from "@/lib/company/th";
import { companyZh } from "@/lib/company/zh";
import type { CompanyDocument, CompanySlug } from "@/lib/company/types";
import { siteName } from "@/lib/seo/site";

export * from "@/lib/company/types";

const companyByLocale: Record<Locale, Record<CompanySlug, CompanyDocument>> = {
  en: companyEn,
  th: companyTh,
  zh: companyZh,
};

export function getCompanyDocument(locale: Locale, slug: CompanySlug): CompanyDocument {
  // Step 1: Resolve company copy from the requested locale.
  return companyByLocale[locale][slug];
}

export function getCompanyMetadata(locale: Locale, slug: CompanySlug): Metadata {
  // Step 1: Build canonical and hreflang URLs for this company page.
  const document = getCompanyDocument(locale, slug);
  const barePath = `/${slug}`;
  const { canonical, languages } = buildLocaleAlternates(barePath, locale);

  // Step 2: Publish localized metadata without blocking indexing.
  return {
    title: document.title,
    description: document.description,
    alternates: { canonical, languages },
    openGraph: {
      title: document.title,
      description: document.description,
      url: canonical,
      siteName,
      locale: openGraphLocale[locale],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: document.title,
      description: document.description,
    },
  };
}
