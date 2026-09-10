import Image from "next/image";
import Link from "next/link";
import { isDynamicQrEnabled } from "@/lib/dynamic-qr/config";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

type FooterLink = { path: string; label: string };

const linkClass = "text-slate-600 transition-colors hover:text-brand-teal-dark hover:underline";

export function SiteFooter({ locale, dictionary }: Props) {
  const chrome = dictionary.chrome;

  // Step 1: Product hubs (existing routes only) plus the homepage pricing section.
  const productLinks: FooterLink[] = [
    { path: "/qr-code-generator", label: chrome.navGenerator },
    { path: "/qr-code/dynamic", label: chrome.navDynamicQr },
    { path: "/templates", label: chrome.templatesCrumb },
    { path: "/bulk-qr-generator", label: chrome.bulkQrGenerator },
    { path: "/qr-code-generator#pricing", label: chrome.navPricing },
    ...(isDynamicQrEnabled() ? [{ path: "/my/dynamic-qr", label: chrome.navMyDynamicQr }] : []),
  ];

  // Step 2: Keep AdSense-relevant policy links visible on every public page.
  const companyLinks: FooterLink[] = [
    { path: "/about", label: chrome.about },
    { path: "/contact", label: chrome.contact },
    { path: "/privacy-policy", label: chrome.privacyPolicy },
    { path: "/terms-of-service", label: chrome.termsOfService },
  ];

  return (
    <footer className="mt-14 border-t py-10 text-sm text-slate-600">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="max-w-sm">
          <Link href={localizedPath(locale, "/qr-code-generator")} className="inline-flex rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal">
            <Image
              src="/brand/wordmark-transparent.png"
              alt={`${dictionary.site.name} — genmyQRCode.com`}
              width={730}
              height={245}
              className="h-9 w-auto"
            />
          </Link>
          <p className="mt-3 leading-6">{chrome.footerTagline}</p>
        </div>

        <nav aria-label={chrome.footerProduct}>
          <p className="font-semibold text-slate-900">{chrome.footerProduct}</p>
          <ul className="mt-3 space-y-2">
            {productLinks.map((link) => (
              <li key={link.path}>
                <Link href={localizedPath(locale, link.path)} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={chrome.footerNavAria}>
          <p className="font-semibold text-slate-900">{chrome.footerCompany}</p>
          <ul className="mt-3 space-y-2">
            {companyLinks.map((link) => (
              <li key={link.path}>
                <Link href={localizedPath(locale, link.path)} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mt-8 border-t border-slate-200/70 pt-6 text-xs text-slate-500">
        © 2026 genmyQRCode.com. {chrome.footerRights}
      </p>
    </footer>
  );
}
