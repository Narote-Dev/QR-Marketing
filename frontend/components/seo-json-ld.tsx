import type { SeoPage } from "@/lib/seo/site";
import { siteName, siteUrl } from "@/lib/seo/site";

export function SeoJsonLd({ page }: { page: SeoPage }) {
  const path = page.slug === "qr-code-generator" ? "/qr-code-generator" : `/qr-code/${page.slug}`;
  const url = new URL(path, siteUrl).toString();
  const graph = [{ "@type": "WebApplication", name: page.title, applicationCategory: "UtilityApplication", operatingSystem: "Web", url, description: page.description, publisher: { "@type": "Organization", name: siteName } }, { "@type": "FAQPage", mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}
