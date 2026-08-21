import type { Metadata } from "next";
import { defaultLocale, htmlLang, locales, openGraphLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { companyEn } from "@/lib/company/en";
import { companyTh } from "@/lib/company/th";
import { companyZh } from "@/lib/company/zh";
import type { CompanyDocument, CompanySlug } from "@/lib/company/types";
import { siteName, siteUrl } from "@/lib/seo/site";

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
  const canonical = new URL(localizedPath(locale, barePath), siteUrl).toString();
  const languages = Object.fromEntries([
    ...locales.map((item) => [
      htmlLang[item],
      new URL(localizedPath(item, barePath), siteUrl).toString(),
    ]),
    [
      "x-default",
      new URL(localizedPath(defaultLocale, barePath), siteUrl).toString(),
    ],
  ]);

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
