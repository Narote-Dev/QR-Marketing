import type { Metadata } from "next";
import { defaultLocale, htmlLang, locales, openGraphLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { legalEn } from "@/lib/legal/en";
import { legalTh } from "@/lib/legal/th";
import { legalZh } from "@/lib/legal/zh";
import type { LegalDocument, LegalDocuments, LegalSlug } from "@/lib/legal/types";
import { siteName, siteUrl } from "@/lib/seo/site";

export * from "@/lib/legal/types";

const legalByLocale: Record<Locale, LegalDocuments> = {
  en: legalEn,
  th: legalTh,
  zh: legalZh,
};

export function getLegalDocument(locale: Locale, slug: LegalSlug): LegalDocument {
  // Step 1: Resolve legal copy from the requested locale.
  return legalByLocale[locale][slug];
}

export function getLegalMetadata(locale: Locale, slug: LegalSlug): Metadata {
  // Step 1: Build canonical and hreflang URLs for this legal page.
  const document = getLegalDocument(locale, slug);
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

  // Step 2: Publish localized metadata without blocking policy indexing.
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
