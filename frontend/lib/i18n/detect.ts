import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

/** Step 1: Map a country code to a preferred locale (TH→th, CN→zh, else en). */
export function localeFromCountry(country?: string | null): Locale {
  const code = country?.trim().toUpperCase();
  if (code === "TH") return "th";
  if (code === "CN") return "zh";
  return defaultLocale;
}

/**
 * Step 1: Parse Accept-Language and prefer th / zh / en when present.
 * Change: Match primary subtags (th, zh, en) including regional variants like zh-CN.
 */
export function localeFromAcceptLanguage(header?: string | null): Locale {
  if (!header?.trim()) return defaultLocale;

  // Step 2: Walk language tags in preference order.
  const tags = header.split(",").map((part) => {
    const [raw] = part.trim().split(";");
    return raw.trim().toLowerCase();
  });

  for (const tag of tags) {
    if (!tag) continue;
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
    if (tag.startsWith("zh")) return "zh";
  }

  return defaultLocale;
}

type ResolvePreferredLocaleInput = {
  cookie?: string | null;
  country?: string | null;
  acceptLanguage?: string | null;
};

/** Step 1: Resolve locale with cookie > country > Accept-Language > en. */
export function resolvePreferredLocale({
  cookie,
  country,
  acceptLanguage,
}: ResolvePreferredLocaleInput): Locale {
  // Step 2: Cookie wins when it stores a known locale.
  if (cookie && isLocale(cookie)) return cookie;

  // Step 3: Geo country next when present.
  if (country?.trim()) return localeFromCountry(country);

  // Step 4: Browser language, then default English.
  return localeFromAcceptLanguage(acceptLanguage);
}
