import type { Locale } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/dictionaries/en";
import type { Dictionary } from "@/lib/i18n/types";

// Step 1: Lazy-load locale packs so unused languages stay out of the critical path when possible.
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => en,
  th: async () => (await import("@/lib/i18n/dictionaries/th")).th,
  zh: async () => (await import("@/lib/i18n/dictionaries/zh")).zh,
};

// Step 2: Resolve the dictionary for a validated locale.
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}

export function getDictionarySync(locale: Locale): Dictionary {
  if (locale === "en") return en;
  // Sync fallback used by client islands after the server already selected a locale pack.
  throw new Error(`Use getDictionary(${locale}) on the server, or pass the dictionary as a prop.`);
}
