import { defaultLocale, htmlLang, locales, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { siteUrl } from "@/lib/seo/site";

/** Step 1: Expected hreflang keys for every indexable localized page. */
export const hreflangKeys = [...locales.map((locale) => htmlLang[locale]), "x-default"] as const;

/** Step 2: Build absolute hreflang alternates for a locale-neutral bare path. */
export function buildHreflangLanguages(barePath: string): Record<string, string> {
  return Object.fromEntries([
    ...locales.map((item) => [
      htmlLang[item],
      new URL(localizedPath(item, barePath), siteUrl).toString(),
    ]),
    ["x-default", new URL(localizedPath(defaultLocale, barePath), siteUrl).toString()],
  ]);
}

/** Step 3: Build self-canonical and reciprocal hreflang URLs for one locale. */
export function buildLocaleAlternates(barePath: string, locale: Locale) {
  const canonical = new URL(localizedPath(locale, barePath), siteUrl).toString();
  return {
    canonical,
    languages: buildHreflangLanguages(barePath),
  };
}
