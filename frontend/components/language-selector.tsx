"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { localeCookieName, localeLabels, locales, type Locale } from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/paths";

type Props = {
  locale: Locale;
  label: string;
};

export function LanguageSelector({ locale, label }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  // Step 1: Persist the chosen locale and navigate to the matching prefixed path.
  const onChange = (next: Locale) => {
    document.cookie = `${localeCookieName}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.push(switchLocalePath(pathname || "/", next));
  };

  return (
    <label className="relative inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
      <Globe className="h-4 w-4 text-brand-teal-dark" aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <select
        className="rounded-lg border border-slate-300 bg-white py-1.5 pl-2 pr-8 text-sm font-semibold text-slate-800 outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal-light/30"
        value={locale}
        aria-label={label}
        onChange={(event) => onChange(event.target.value as Locale)}
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
