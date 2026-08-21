import type { Metadata } from "next";
import { defaultLocale, htmlLang, locales, openGraphLocale, type Locale } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/dictionaries/en";
import { localizedPath, templatePathForSlug } from "@/lib/i18n/paths";
import type { Dictionary, TemplateSeoCopy } from "@/lib/i18n/types";
import { siteName, siteUrl } from "@/lib/seo/site";
import type { TemplateCategory } from "@/lib/templates/types";

export type TemplateSeoPage = {
  slug: string;
  category?: TemplateCategory;
  title: string;
  description: string;
  h1: string;
  introduction: string;
  body: string[];
  howTo: string[];
  faqs: { question: string; answer: string }[];
  related: TemplateCategory[];
  recommendedQrType: "url" | "wifi" | "text";
};

type TemplateSeoMeta = {
  slug: string;
  category?: TemplateCategory;
  related: TemplateCategory[];
  recommendedQrType: "url" | "wifi" | "text";
};

const templateIndexMeta: TemplateSeoMeta = {
  slug: "templates",
  related: ["restaurant", "cafe", "hotel", "menu", "wifi"],
  recommendedQrType: "url",
};

const templateCategoryMeta = {
  restaurant: { slug: "restaurant", category: "restaurant" as const, related: ["menu", "cafe", "wifi"] as TemplateCategory[], recommendedQrType: "url" as const },
  cafe: { slug: "cafe", category: "cafe" as const, related: ["restaurant", "wifi", "menu"] as TemplateCategory[], recommendedQrType: "url" as const },
  hotel: { slug: "hotel", category: "hotel" as const, related: ["wifi", "business", "cafe"] as TemplateCategory[], recommendedQrType: "wifi" as const },
  menu: { slug: "menu", category: "menu" as const, related: ["restaurant", "cafe", "wifi"] as TemplateCategory[], recommendedQrType: "url" as const },
  wifi: { slug: "wifi", category: "wifi" as const, related: ["hotel", "cafe", "business"] as TemplateCategory[], recommendedQrType: "wifi" as const },
};

function fromCopy(meta: TemplateSeoMeta, copy: TemplateSeoCopy): TemplateSeoPage {
  return {
    slug: meta.slug,
    category: meta.category,
    title: copy.title,
    description: copy.description,
    h1: copy.h1,
    introduction: copy.introduction,
    body: copy.body,
    howTo: copy.howTo,
    faqs: copy.faqs,
    related: meta.related,
    recommendedQrType: meta.recommendedQrType,
  };
}

// Change: Build curated template SEO pages from locale dictionaries.
export function getTemplateIndexPage(dictionary: Dictionary): TemplateSeoPage {
  return fromCopy(templateIndexMeta, dictionary.seo.templatesIndex);
}

export function getTemplateCategoryPages(dictionary: Dictionary) {
  return {
    restaurant: fromCopy(templateCategoryMeta.restaurant, dictionary.seo.templates.restaurant),
    cafe: fromCopy(templateCategoryMeta.cafe, dictionary.seo.templates.cafe),
    hotel: fromCopy(templateCategoryMeta.hotel, dictionary.seo.templates.hotel),
    menu: fromCopy(templateCategoryMeta.menu, dictionary.seo.templates.menu),
    wifi: fromCopy(templateCategoryMeta.wifi, dictionary.seo.templates.wifi),
  };
}

export type TemplateSeoSlug = keyof ReturnType<typeof getTemplateCategoryPages>;
export const templateSeoSlugs = ["restaurant", "cafe", "hotel", "menu", "wifi"] as const satisfies readonly TemplateSeoSlug[];

export const templateIndexPage = getTemplateIndexPage(en);
export const templateCategoryPages = getTemplateCategoryPages(en);

export function getTemplatePagePath(page: TemplateSeoPage, locale: Locale = defaultLocale): string {
  return localizedPath(locale, templatePathForSlug(page.slug));
}

export function getTemplatePageBarePath(page: TemplateSeoPage): string {
  return templatePathForSlug(page.slug);
}

// Step 1: Locale-aware metadata with hreflang for every curated template page.
export function getTemplatePageMetadata(page: TemplateSeoPage, locale: Locale = defaultLocale): Metadata {
  const bare = getTemplatePageBarePath(page);
  const path = localizedPath(locale, bare);
  const url = new URL(path, siteUrl).toString();
  const languages = Object.fromEntries([
    ...locales.map((item) => [htmlLang[item], localizedPath(item, bare)]),
    ["x-default", localizedPath(defaultLocale, bare)],
  ]);

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: "website",
      url,
      siteName,
      title: page.title,
      description: page.description,
      locale: openGraphLocale[locale],
    },
    twitter: { card: "summary", title: page.title, description: page.description },
  };
}
