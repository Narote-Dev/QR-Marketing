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

const qrRelated: Record<"url" | "wifi" | "email" | "phone" | "sms", string[]> = {
  url: ["wifi", "email", "phone"],
  wifi: ["url", "sms", "email"],
  email: ["phone", "sms", "url"],
  phone: ["sms", "email", "url"],
  sms: ["phone", "wifi", "email"],
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
  return fromCopy("qr-code-generator", dictionary.seo.generator, ["url", "wifi", "email", "phone", "sms"]);
}

export function getQrPages(dictionary: Dictionary): Record<"url" | "wifi" | "email" | "phone" | "sms", SeoPage> {
  return {
    url: fromCopy("url", dictionary.seo.qr.url, qrRelated.url),
    wifi: fromCopy("wifi", dictionary.seo.qr.wifi, qrRelated.wifi),
    email: fromCopy("email", dictionary.seo.qr.email, qrRelated.email),
    phone: fromCopy("phone", dictionary.seo.qr.phone, qrRelated.phone),
    sms: fromCopy("sms", dictionary.seo.qr.sms, qrRelated.sms),
  };
}

export type QrSeoSlug = keyof ReturnType<typeof getQrPages>;
export const qrSeoSlugs = ["url", "wifi", "email", "phone", "sms"] as const satisfies readonly QrSeoSlug[];

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
