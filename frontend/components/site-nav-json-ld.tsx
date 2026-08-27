import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { siteName, siteUrl } from "@/lib/seo/site";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

/** Step 1: Expose primary navbar hubs as SiteNavigationElement for crawlers. */
export function SiteNavJsonLd({ locale, dictionary }: Props) {
  const chrome = dictionary.chrome;
  const homeUrl = new URL(localizedPath(locale, "/qr-code-generator"), siteUrl).toString();

  const navItems = [
    { name: chrome.navGenerator, path: "/qr-code-generator" },
    { name: chrome.bulkQrGenerator, path: "/bulk-qr-generator" },
    { name: chrome.allTemplates, path: "/templates" },
  ].map((item) => ({
    "@type": "SiteNavigationElement",
    name: item.name,
    url: new URL(localizedPath(locale, item.path), siteUrl).toString(),
  }));

  const graph = [
    {
      "@type": "WebSite",
      name: siteName,
      url: homeUrl,
      description: dictionary.site.description,
      inLanguage: locale,
      publisher: { "@type": "Organization", name: siteName, url: siteUrl.toString() },
      hasPart: navItems,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
