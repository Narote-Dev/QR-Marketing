import type { Locale } from "@/lib/i18n/config";
import { localizedPath, pagePathForSlug } from "@/lib/i18n/paths";
import type { SeoPage } from "@/lib/seo/site";
import { siteName, siteUrl } from "@/lib/seo/site";

type Props = {
  page: SeoPage;
  locale: Locale;
};

export function SeoJsonLd({ page, locale }: Props) {
  // Step 1: Point structured data at the localized canonical URL.
  const path = localizedPath(locale, pagePathForSlug(page.slug));
  const url = new URL(path, siteUrl).toString();
  const graph = [
    {
      "@type": "WebApplication",
      name: page.title,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      url,
      description: page.description,
      inLanguage: locale,
      publisher: { "@type": "Organization", name: siteName },
    },
    {
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}
