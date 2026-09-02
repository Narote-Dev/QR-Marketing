import Link from "next/link";
import Image from "next/image";
import { AdSlot } from "@/components/ad-slot";
import { FaqSection } from "@/components/faq-section";
import { PopularUseCases } from "@/components/popular-use-cases";
import { QrGenerator } from "@/components/qr-generator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TemplateBreadcrumbs } from "@/components/templates/template-breadcrumbs";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { getRelatedTemplates, getTemplatesByCategory, localizeTemplate, localizeTemplates, templates } from "@/lib/templates/catalog";
import type { TemplateCategory } from "@/lib/templates/types";
import { getTemplateCategoryPages, getTemplatePagePath, type TemplateSeoPage } from "@/lib/seo/templates";
import { siteName, siteUrl } from "@/lib/seo/site";

type Props = {
  page: TemplateSeoPage;
  locale: Locale;
  dictionary: Dictionary;
};

function TemplateJsonLd({ page, locale }: { page: TemplateSeoPage; locale: Locale }) {
  const path = getTemplatePagePath(page, locale);
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

function RelatedTemplateLinks({
  categories,
  locale,
  dictionary,
}: {
  categories: TemplateCategory[];
  locale: Locale;
  dictionary: Dictionary;
}) {
  // Step 1: Link only to curated SEO category pages when available.
  const categoryPages = getTemplateCategoryPages(dictionary);
  return (
    <section className="mt-12" aria-labelledby="related-templates-heading">
      <h2 id="related-templates-heading" className="text-2xl font-bold tracking-tight">
        {dictionary.chrome.relatedTemplates}
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const seoPage = Object.values(categoryPages).find((item) => item.category === category);
          const href = seoPage ? getTemplatePagePath(seoPage, locale) : localizedPath(locale, "/templates");
          const sample = localizeTemplate(getTemplatesByCategory(category)[0] ?? getRelatedTemplates(category, 1)[0], dictionary);
          return (
            <Link key={category} href={href} className="rounded-2xl border bg-white p-4 shadow-sm transition hover:border-brand-teal">
              <p className="text-sm font-semibold text-brand-teal-dark">{dictionary.categories[category]}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{sample?.name ?? dictionary.categories[category]}</h3>
              <p className="mt-2 text-sm text-slate-600">{sample?.description ?? dictionary.chrome.browseCategory}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function SeoTemplatePage({ page, locale, dictionary }: Props) {
  // Change: Localize featured templates and chrome for template SEO pages.
  const categoryTemplates = localizeTemplates(page.category ? getTemplatesByCategory(page.category) : templates, dictionary);
  // Change: On menu/wifi hubs, defer the in-flow ad below the guide so mobile download CTAs stay reachable.
  const deferToolAd = page.slug === "menu" || page.slug === "wifi";

  return (
    <>
      <TemplateJsonLd page={page} locale={locale} />
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        currentPath={page.slug === "templates" ? "/templates" : `/templates/${page.slug}`}
      />
      <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14 lg:px-8">
      <TemplateBreadcrumbs page={page} locale={locale} dictionary={dictionary} />
      <article>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{page.h1}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{page.introduction}</p>

        <div className="mt-8 space-y-3 rounded-2xl border bg-slate-50 p-5">
          <h2 className="text-lg font-bold text-slate-900">{dictionary.chrome.featuredCollection}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {categoryTemplates.map((template) => (
              <li key={template.id} className="overflow-hidden rounded-xl border bg-white">
                <div className="relative aspect-[4/3] bg-slate-50">
                  <Image
                    src={template.previewImage}
                    alt={`${template.name} — ${template.description}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 320px"
                    unoptimized
                  />
                </div>
                <div className="px-3 py-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">{template.name}</span>
                  <span className="mt-1 block text-slate-500">{template.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-9">
          <QrGenerator initialType={page.recommendedQrType} initialTemplateCategory={page.category} />
        </div>

        {!deferToolAd ? <AdSlot placement="seo-after-tool" minHeight={180} /> : null}

        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-10">
          <div>
            <section className="mt-12 max-w-3xl space-y-4" aria-labelledby="template-guide-heading">
              <h2 id="template-guide-heading" className="text-2xl font-bold tracking-tight">
                {dictionary.chrome.aboutTemplates}
              </h2>
              {page.body.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-slate-700">
                  {paragraph}
                </p>
              ))}
            </section>
            <section className="mt-12 max-w-3xl" aria-labelledby="how-to-heading">
              <h2 id="how-to-heading" className="text-2xl font-bold tracking-tight">
                {dictionary.chrome.howToUseTemplate}
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
            {deferToolAd ? <AdSlot placement="seo-after-tool" minHeight={120} className="max-xl:mt-8" /> : null}
            <RelatedTemplateLinks categories={page.related} locale={locale} dictionary={dictionary} />
            {/* Change: Connect template hubs to specialized long-tail use cases. */}
            <PopularUseCases locale={locale} dictionary={dictionary} />
          </div>
          <div className="hidden xl:block">
            <AdSlot placement="seo-sidebar" minHeight={600} />
          </div>
        </div>
      </article>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </main>
    </>
  );
}
