import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { siteUrl } from "@/lib/seo/site";
import { getTemplatePagePath, type TemplateSeoPage } from "@/lib/seo/templates";

type Crumb = { label: string; href: string };

type Props = {
  page: TemplateSeoPage;
  locale: Locale;
  dictionary: Dictionary;
};

export function TemplateBreadcrumbs({ page, locale, dictionary }: Props) {
  // Step 1: Build Home → Templates → Category crumbs on the active locale.
  const items: Crumb[] = [
    { label: dictionary.chrome.home, href: localizedPath(locale, "/qr-code-generator") },
    { label: dictionary.chrome.templatesCrumb, href: localizedPath(locale, "/templates") },
    ...(page.slug === "templates" ? [] : [{ label: page.title, href: getTemplatePagePath(page, locale) }]),
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
            <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link className="hover:text-blue-700 hover:underline" href={item.href}>
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
