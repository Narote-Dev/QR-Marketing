import type { Metadata } from "next";
import { defaultLocale, locales, openGraphLocale, type Locale } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/dictionaries/en";
import { pagePathForSlug } from "@/lib/i18n/paths";
import type { Dictionary, SeoPageCopy } from "@/lib/i18n/types";
import { buildLocaleAlternates } from "@/lib/seo/hreflang";
import { isQrSeoIndexed } from "@/lib/seo/indexing";
import { qrSeoSlugs, type QrSeoSlug } from "@/lib/seo/qr-seo-seed";

// Change: Rename the public product brand to Build Your QR.
export const siteName = "Build Your QR";
// Change: Use the production domain as the SEO fallback when no environment override exists.
const productionSiteOrigin = "https://genmyqrcode.com";

// Step 1: Keep canonical URLs, structured data, robots, and sitemap on one origin.
// Change: Tolerate empty or invalid NEXT_PUBLIC_SITE_URL so sitemap.xml never throws at build/runtime.
export function resolveSiteUrl(rawUrl: string | undefined = process.env.NEXT_PUBLIC_SITE_URL): URL {
  const trimmed = rawUrl?.trim();
  if (!trimmed) return new URL(productionSiteOrigin);

  // Step 1: Reject non-HTTP(S) schemes before URL parsing can mis-normalize values like ftp://...
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
    return new URL(productionSiteOrigin);
  }

  try {
    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(normalized);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return new URL(productionSiteOrigin);
    }
    return parsed;
  } catch {
    return new URL(productionSiteOrigin);
  }
}

export const siteUrl = resolveSiteUrl();

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  introduction: string;
  howTo: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

export type { QrSeoSlug };
export { qrSeoSlugs, getQrSeoGeneratorSeed } from "@/lib/seo/qr-seo-seed";

// Change: Related links for Phase A tools plus new Social brand and Payment SEO pages.
// Change: Allow hub slugs (bulk) alongside QR type pages in related lists.
const qrRelated: Record<QrSeoSlug, Array<QrSeoSlug | "bulk-qr-generator">> = {
  // Change: Surface bulk hub next to URL tool for stronger primary internal linking.
  url: ["dynamic", "wifi", "email", "vcard", "payment", "bulk-qr-generator"],
  wifi: ["url", "sms", "email"],
  email: ["phone", "sms", "vcard"],
  phone: ["sms", "whatsapp", "vcard"],
  sms: ["phone", "whatsapp", "email"],
  vcard: ["whatsapp", "line", "phone", "linkedin"],
  whatsapp: ["line", "vcard", "sms", "phone"],
  line: ["whatsapp", "kakaotalk", "vcard", "phone"],
  "google-review": ["url", "dynamic", "vcard", "whatsapp"],
  dynamic: ["url", "google-review", "vcard", "payment", "wifi"],
  youtube: ["tiktok", "spotify", "url", "dynamic", "soundcloud"],
  tiktok: ["youtube", "snapchat", "url", "discord"],
  linkedin: ["vcard", "url", "whatsapp", "email"],
  snapchat: ["tiktok", "youtube", "url", "discord"],
  reddit: ["discord", "url", "youtube", "dynamic"],
  discord: ["reddit", "url", "spotify", "tiktok"],
  spotify: ["soundcloud", "youtube", "url", "tiktok"],
  soundcloud: ["spotify", "youtube", "url", "discord"],
  kakaotalk: ["line", "whatsapp", "vcard", "url"],
  payment: ["url", "dynamic", "vcard", "google-review"],
};
function fromCopy(slug: string, copy: SeoPageCopy, related: string[]): SeoPage {
  return {
    slug,
    title: copy.title,
    description: copy.description,
    h1: copy.h1,
    introduction: copy.introduction,
    howTo: copy.howTo,
    faqs: copy.faqs,
    related,
  };
}

// Step 2: Build SEO page objects from a locale dictionary.
export function getGeneratorPage(dictionary: Dictionary): SeoPage {
  return fromCopy("qr-code-generator", dictionary.seo.generator, [
    "url",
    "dynamic",
    "wifi",
    "vcard",
    "whatsapp",
    "bulk-qr-generator",
    "payment",
  ]);
}

export function getBulkPage(dictionary: Dictionary): SeoPage {
  // Change: Cross-link Create QR + Templates hubs from bulk SEO related tools.
  return fromCopy("bulk-qr-generator", dictionary.seo.bulk, [
    "qr-code-generator",
    "templates",
    "url",
    "wifi",
    "vcard",
  ]);
}

export function getQrPages(dictionary: Dictionary): Record<QrSeoSlug, SeoPage> {
  return Object.fromEntries(
    qrSeoSlugs.map((slug) => [slug, fromCopy(slug, dictionary.seo.qr[slug], qrRelated[slug])]),
  ) as Record<QrSeoSlug, SeoPage>;
}

// English defaults kept for tests and non-localized helpers.
export const generatorPage = getGeneratorPage(en);
export const bulkPage = getBulkPage(en);
export const qrPages = getQrPages(en);

// Step 3: Emit locale-aware metadata with self-canonical and hreflang alternates.
export function getPageMetadata(page: SeoPage, locale: Locale = defaultLocale): Metadata {
  const bare = pagePathForSlug(page.slug);
  const { canonical, languages } = buildLocaleAlternates(bare, locale);
  // Change: Phase A — thin social/core QR SEO hubs stay reachable but must notIndex.
  const isQrTypePage = page.slug !== "qr-code-generator" && page.slug !== "bulk-qr-generator";
  const noindex = isQrTypePage && !isQrSeoIndexed(page.slug);

  return {
    title: page.title,
    description: page.description,
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: canonical,
      siteName,
      title: page.title,
      description: page.description,
      locale: openGraphLocale[locale],
    },
    twitter: { card: "summary", title: page.title, description: page.description },
  };
}
