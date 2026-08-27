import Image from "next/image";
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
  bulkHref?: string;
  bulkLabel?: string;
};

export function SiteHeader({
  locale,
  siteName,
  languageLabel,
  secondaryHref,
  secondaryLabel,
  bulkHref,
  bulkLabel,
}: Props) {
  // Change: Replace the text brand with the supplied genmyQRCode.com wordmark.
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <Link href={localizedPath(locale, "/qr-code-generator")} className="rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal">
        <Image
          src="/brand/wordmark-transparent.png"
          alt={`${siteName} — genmyQRCode.com`}
          width={730}
          height={245}
          priority
          className="h-auto w-[220px] max-w-[68vw] sm:w-[270px]"
        />
      </Link>
      <div className="flex flex-wrap items-center gap-4">
        <LanguageSelector locale={locale} label={languageLabel} />
        {bulkHref && bulkLabel && (
          <Link
            href={localizedPath(locale, bulkHref)}
            className="rounded-lg border border-brand-teal bg-brand-cream/60 px-3 py-1.5 text-sm font-semibold text-brand-teal-dark transition hover:bg-brand-cream"
          >
            {bulkLabel}
          </Link>
        )}
        <Link href={localizedPath(locale, secondaryHref)} className="text-sm font-semibold text-brand-teal-dark hover:text-brand-coral hover:underline">
          {secondaryLabel}
        </Link>
      </div>
    </header>
  );
}
