import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath, pagePathForSlug } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import type { SeoPage } from "@/lib/seo/site";
import { siteUrl } from "@/lib/seo/site";

type Props = {
  page: SeoPage;
  locale: Locale;
  dictionary: Dictionary;
};

export function Breadcrumbs({ page, locale, dictionary }: Props) {
  // Step 1: Keep breadcrumb hrefs on the active locale prefix.
  const bare = pagePathForSlug(page.slug);
  const path = localizedPath(locale, bare);
  const home = localizedPath(locale, "/qr-code-generator");
  const generator = localizedPath(locale, "/qr-code-generator");
  const items = [
    { label: dictionary.chrome.home, href: home },
    ...(page.slug === "qr-code-generator" ? [] : [{ label: dictionary.chrome.qrCodeGeneratorCrumb, href: generator }]),
    { label: page.title, href: path },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteUrl).toString(),
    })),
  };

  return (
    <>
      <nav aria-label={dictionary.chrome.breadcrumbsAria} className="mb-6 text-sm text-slate-600">
        <ol className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link className="hover:text-brand-coral hover:underline" href={item.href}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
