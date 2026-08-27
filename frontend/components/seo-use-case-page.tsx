import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { FaqSection } from "@/components/faq-section";
import { QrGenerator } from "@/components/qr-generator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import {
  getRelatedUseCasePages,
  useCasePathForSlug,
  type UseCasePage,
} from "@/lib/seo/use-cases";
import { siteName, siteUrl } from "@/lib/seo/site";

type Props = {
  page: UseCasePage;
  locale: Locale;
  dictionary: Dictionary;
};

function UseCaseJsonLd({ page, locale }: { page: UseCasePage; locale: Locale }) {
  // Step 1: Publish WebApplication + FAQ schema for long-tail landing pages.
  const path = localizedPath(locale, useCasePathForSlug(page.slug));
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}

export function SeoUseCasePage({ page, locale, dictionary }: Props) {
  // Step 1: Resolve related long-tail pages for cluster internal linking.
  const related = getRelatedUseCasePages(locale, page.slug);

  // Step 2: Render an intent-matched landing page around the shared generator.
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <UseCaseJsonLd page={page} locale={locale} />
      <SiteHeader locale={locale} dictionary={dictionary} currentPath={useCasePathForSlug(page.slug)} />

      <nav aria-label={dictionary.chrome.breadcrumbsAria} className="mb-6 text-sm text-slate-600">
        <Link
          href={localizedPath(locale, "/qr-code-generator")}
          className="font-medium text-brand-teal-dark hover:text-brand-coral hover:underline"
        >
          {dictionary.chrome.home}
        </Link>
        <span className="px-2" aria-hidden="true">
          /
        </span>
        <span aria-current="page">{page.h1}</span>
      </nav>

      <article>
        <p className="text-sm font-semibold text-brand-teal-dark">{page.promise}</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{page.h1}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{page.introduction}</p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {[dictionary.chrome.trustNoSignup, dictionary.chrome.trustBrowserOnly, dictionary.chrome.trustLocalized].map(
            (item) => (
              <li key={item} className="rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-brand-ink shadow-sm">
                {item}
              </li>
            ),
          )}
        </ul>

        <div className="mt-9">
          <QrGenerator
            initialType={page.recommendedQrType}
            initialTemplateCategory={page.templateCategory}
            initialTemplateId={page.templateId}
            initialFrameText={page.frameText}
            downloadFileName={page.downloadFileName}
            helperHint={page.helperHint}
          />
        </div>

        <AdSlot placement="seo-after-tool" minHeight={180} />

        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-10">
          <div>
            <section className="mt-12 max-w-3xl space-y-4" aria-labelledby="why-heading">
              <h2 id="why-heading" className="text-2xl font-bold tracking-tight">
                {dictionary.chrome.whyThisWorks}
              </h2>
              {page.body.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-slate-700">
                  {paragraph}
                </p>
              ))}
            </section>

            <section className="mt-12 max-w-3xl" aria-labelledby="examples-heading">
              <h2 id="examples-heading" className="text-2xl font-bold tracking-tight">
                {dictionary.chrome.useCaseExamples}
              </h2>
              <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-700">
                {page.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </section>

            <section className="mt-12 max-w-3xl" aria-labelledby="how-to-heading">
              <h2 id="how-to-heading" className="text-2xl font-bold tracking-tight">
                {dictionary.chrome.howToUseCase}
              </h2>
              <ol className="mt-5 space-y-3">
                {page.howTo.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-teal-light/20 text-sm font-bold text-brand-teal-dark">
                      {index + 1}
                    </span>
                    <p className="pt-0.5 text-slate-700">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <FaqSection page={page} heading={dictionary.chrome.faqs} />

            <section className="mt-12" aria-labelledby="related-use-cases-heading">
              <h2 id="related-use-cases-heading" className="text-2xl font-bold tracking-tight">
                {dictionary.chrome.relatedUseCases}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={localizedPath(locale, useCasePathForSlug(item.slug))}
                    className="rounded-2xl border bg-white p-4 shadow-sm transition hover:border-brand-teal"
                  >
                    <h3 className="font-semibold text-brand-teal-dark">{item.h1}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.promise}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
          <div className="hidden xl:block">
            <AdSlot placement="seo-sidebar" minHeight={600} />
          </div>
        </div>
      </article>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </main>
  );
}
