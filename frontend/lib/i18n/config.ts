// Change: Central locale constants for Build Your QR i18n (no next-intl).

export const locales = ["en", "th", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookieName = "byq_locale";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
  zh: "中文",
};

export const htmlLang: Record<Locale, string> = {
  en: "en",
  th: "th",
  zh: "zh-CN",
};

export const openGraphLocale: Record<Locale, string> = {
  en: "en_US",
  th: "th_TH",
  zh: "zh_CN",
};

/** Step 1: Narrow an unknown string to a supported Locale. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
