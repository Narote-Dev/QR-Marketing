import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import type { LegalDocument } from "@/lib/legal";
import { siteUrl } from "@/lib/seo/site";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
  document: LegalDocument;
};

export function LegalPage({ locale, dictionary, document }: Props) {
  // Step 1: Publish basic WebPage data for the localized policy.
  const pageUrl = new URL(localizedPath(locale, `/${document.slug}`), siteUrl).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: document.title,
    description: document.description,
    url: pageUrl,
    inLanguage: locale,
    dateModified: "2026-08-21",
  };

  // Step 2: Render readable policy sections with discoverable navigation.
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader locale={locale} dictionary={dictionary} currentPath={`/${document.slug}`} />

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
          <p className="mt-3 text-sm text-slate-500">
            {document.updatedLabel}: {document.updatedDate}
          </p>
          <p className="mt-5 max-w-3xl leading-7 text-slate-700">
            {document.introduction}
          </p>
        </header>

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
                {section.links && (
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {section.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="font-semibold text-brand-teal-dark underline underline-offset-2 hover:text-brand-coral"
                        {...(link.href.startsWith("https://")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
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
