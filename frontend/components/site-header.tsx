import Link from "next/link";
import { LanguageSelector } from "@/components/language-selector";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type Props = {
  locale: Locale;
  siteName: string;
  languageLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function SiteHeader({ locale, siteName, languageLabel, secondaryHref, secondaryLabel }: Props) {
  // Change: Shared header keeps brand, secondary nav, and language switch in one place.
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <Link href={localizedPath(locale, "/qr-code-generator")} className="text-lg font-bold tracking-tight text-slate-900">
        {siteName}
      </Link>
      <div className="flex flex-wrap items-center gap-4">
        <LanguageSelector locale={locale} label={languageLabel} />
        <Link href={localizedPath(locale, secondaryHref)} className="text-sm font-semibold text-blue-700 hover:underline">
          {secondaryLabel}
        </Link>
      </div>
    </header>
  );
}
