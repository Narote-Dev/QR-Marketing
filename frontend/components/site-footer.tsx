import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: Props) {
  // Change: Keep AdSense-relevant policy links visible on every public page.
  return (
    <footer className="mt-14 border-t py-8 text-sm text-slate-600">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p>© 2026 genmyQRCode.com. {dictionary.chrome.footerRights}</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label={dictionary.chrome.footerNavAria}>
          <Link
            href={localizedPath(locale, "/about")}
            className="font-semibold text-brand-teal-dark hover:text-brand-coral hover:underline"
          >
            {dictionary.chrome.about}
          </Link>
          <Link
            href={localizedPath(locale, "/contact")}
            className="font-semibold text-brand-teal-dark hover:text-brand-coral hover:underline"
          >
            {dictionary.chrome.contact}
          </Link>
          <Link
            href={localizedPath(locale, "/privacy-policy")}
            className="font-semibold text-brand-teal-dark hover:text-brand-coral hover:underline"
          >
            {dictionary.chrome.privacyPolicy}
          </Link>
          <Link
            href={localizedPath(locale, "/terms-of-service")}
            className="font-semibold text-brand-teal-dark hover:text-brand-coral hover:underline"
          >
            {dictionary.chrome.termsOfService}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
