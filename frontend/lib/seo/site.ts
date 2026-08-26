import type { Metadata } from "next";
import { defaultLocale, htmlLang, locales, openGraphLocale, type Locale } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/dictionaries/en";
import { localizedPath, pagePathForSlug } from "@/lib/i18n/paths";
import type { Dictionary, SeoPageCopy } from "@/lib/i18n/types";

// Change: Rename the public product brand to Build Your QR.
export const siteName = "Build Your QR";
// Change: Use the production domain as the SEO fallback when no environment override exists.
// Step 1: Keep canonical URLs, structured data, robots, and sitemap on one origin.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://genmyqrcode.com");

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

// Change: Phase A SEO slugs include vCard, WhatsApp, LINE, and Google Review.
const qrRelated: Record<
  "url" | "wifi" | "email" | "phone" | "sms" | "vcard" | "whatsapp" | "line" | "google-review" | "dynamic",
  string[]
> = {
  url: ["dynamic", "wifi", "email", "vcard", "google-review"],
  wifi: ["url", "sms", "email"],
  email: ["phone", "sms", "vcard"],
  phone: ["sms", "whatsapp", "vcard"],
  sms: ["phone", "whatsapp", "email"],
  vcard: ["whatsapp", "line", "phone", "email"],
  whatsapp: ["line", "vcard", "sms", "phone"],
  line: ["whatsapp", "vcard", "phone", "url"],
  "google-review": ["url", "dynamic", "vcard", "whatsapp"],
  dynamic: ["url", "google-review", "vcard", "whatsapp", "wifi"],
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
    "wifi",
    "vcard",
    "whatsapp",
    "line",
    "google-review",
  ]);
}

export function getQrPages(dictionary: Dictionary): Record<
  "url" | "wifi" | "email" | "phone" | "sms" | "vcard" | "whatsapp" | "line" | "google-review" | "dynamic",
  SeoPage
> {
  return {
    url: fromCopy("url", dictionary.seo.qr.url, qrRelated.url),
    wifi: fromCopy("wifi", dictionary.seo.qr.wifi, qrRelated.wifi),
    email: fromCopy("email", dictionary.seo.qr.email, qrRelated.email),
    phone: fromCopy("phone", dictionary.seo.qr.phone, qrRelated.phone),
    sms: fromCopy("sms", dictionary.seo.qr.sms, qrRelated.sms),
    vcard: fromCopy("vcard", dictionary.seo.qr.vcard, qrRelated.vcard),
    whatsapp: fromCopy("whatsapp", dictionary.seo.qr.whatsapp, qrRelated.whatsapp),
    line: fromCopy("line", dictionary.seo.qr.line, qrRelated.line),
    "google-review": fromCopy("google-review", dictionary.seo.qr["google-review"], qrRelated["google-review"]),
    dynamic: fromCopy("dynamic", dictionary.seo.qr.dynamic, qrRelated.dynamic),
  };
}

export type QrSeoSlug = keyof ReturnType<typeof getQrPages>;
export const qrSeoSlugs = [
  "url",
  "wifi",
  "email",
  "phone",
  "sms",
  "vcard",
  "whatsapp",
  "line",
  "google-review",
  "dynamic",
] as const satisfies readonly QrSeoSlug[];

// English defaults kept for tests and non-localized helpers.
export const generatorPage = getGeneratorPage(en);
export const qrPages = getQrPages(en);

// Step 3: Emit locale-aware metadata with self-canonical and hreflang alternates.
export function getPageMetadata(page: SeoPage, locale: Locale = defaultLocale): Metadata {
  const bare = pagePathForSlug(page.slug);
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
