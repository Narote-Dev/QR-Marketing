import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import type { CompanyDocument } from "@/lib/company";
import { siteName, siteUrl } from "@/lib/seo/site";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
  document: CompanyDocument;
};

export function CompanyPage({ locale, dictionary, document }: Props) {
  // Step 1: Build entity structured data to signal site quality to search engines.
  const pageUrl = new URL(localizedPath(locale, `/${document.slug}`), siteUrl).toString();
  const structuredData =
    document.slug === "about"
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteName,
          url: siteUrl.toString(),
          email: document.email?.address,
          description: document.description,
        }
      : {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: document.title,
          url: pageUrl,
          inLanguage: locale,
          description: document.description,
        };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader
        locale={locale}
        siteName={dictionary.site.name}
        languageLabel={dictionary.chrome.language}
        secondaryHref="/qr-code-generator"
        secondaryLabel={dictionary.chrome.allQrTools}
      />

      <nav aria-label={dictionary.chrome.breadcrumbsAria} className="mb-6 text-sm text-slate-600">
        <Link
          href={localizedPath(locale, "/qr-code-generator")}
          className="font-medium text-brand-teal-dark hover:text-brand-coral hover:underline"
        >
          {dictionary.chrome.home}
        </Link>
        <span className="px-2" aria-hidden="true">/</span>
        <span aria-current="page">{document.title}</span>
      </nav>

      <article className="rounded-3xl border bg-white px-5 py-7 shadow-sm sm:px-10 sm:py-10">
        <header className="border-b pb-7">
          <p className="text-sm font-semibold text-brand-teal-dark">
            {document.websiteLabel}: genmyQRCode.com
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            {document.title}
          </h1>
          <p className="mt-5 max-w-3xl leading-7 text-slate-700">
            {document.introduction}
          </p>
        </header>

        {document.email && (
          <div className="mt-8 rounded-2xl border border-brand-teal/30 bg-brand-teal-light/10 px-5 py-5">
            <p className="text-sm font-semibold text-brand-teal-dark">{document.email.label}</p>
            <a
              href={`mailto:${document.email.address}`}
              className="mt-1 inline-block text-lg font-bold text-brand-teal-dark underline underline-offset-2 hover:text-brand-coral"
            >
              {document.email.address}
            </a>
          </div>
        )}

        <div className="mt-8 space-y-9">
          {document.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-brand-ink">{section.title}</h2>
              <div className="mt-3 space-y-3 leading-7 text-slate-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.bullets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </article>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </main>
  );
}
