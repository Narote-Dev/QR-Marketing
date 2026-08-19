import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { FaqSection } from "@/components/faq-section";
import { QrGenerator } from "@/components/qr-generator";
import { TemplateBreadcrumbs } from "@/components/templates/template-breadcrumbs";
import { getRelatedTemplates, getTemplatesByCategory, templates } from "@/lib/templates/catalog";
import { templateCategoryLabels, type TemplateCategory } from "@/lib/templates/types";
import { getTemplatePagePath, templateCategoryPages, type TemplateSeoPage } from "@/lib/seo/templates";
import { siteName, siteUrl } from "@/lib/seo/site";

function TemplateJsonLd({ page }: { page: TemplateSeoPage }) {
  const path = getTemplatePagePath(page);
  const url = new URL(path, siteUrl).toString();
  const graph = [
    {
      "@type": "WebApplication",
      name: page.title,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      url,
      description: page.description,
      publisher: { "@type": "Organization", name: siteName },
    },
    {
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}

function RelatedTemplateLinks({ categories }: { categories: TemplateCategory[] }) {
  // Step 1: Link only to curated SEO category pages when available; otherwise stay on /templates.
  return (
    <section className="mt-12" aria-labelledby="related-templates-heading">
      <h2 id="related-templates-heading" className="text-2xl font-bold tracking-tight">Related templates</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const seoPage = Object.values(templateCategoryPages).find((page) => page.category === category);
          const href = seoPage ? getTemplatePagePath(seoPage) : "/templates";
          const sample = getTemplatesByCategory(category)[0] ?? getRelatedTemplates(category, 1)[0];
          return (
            <Link key={category} href={href} className="rounded-2xl border bg-white p-4 shadow-sm transition hover:border-blue-400">
              <p className="text-sm font-semibold text-blue-700">{templateCategoryLabels[category]}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{sample?.name ?? templateCategoryLabels[category]}</h3>
              <p className="mt-2 text-sm text-slate-600">{sample?.description ?? "Browse templates in this category."}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function SeoTemplatePage({ page }: { page: TemplateSeoPage }) {
  const categoryTemplates = page.category ? getTemplatesByCategory(page.category) : templates;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <TemplateJsonLd page={page} />
      <header className="mb-8 flex items-center justify-between">
        {/* Change: Show the Build Your QR brand in template page headers. */}
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">Build Your QR</Link>
        <Link href="/templates" className="text-sm font-semibold text-blue-700 hover:underline">All templates</Link>
      </header>
      <TemplateBreadcrumbs page={page} />
      <article>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{page.h1}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{page.introduction}</p>

        <div className="mt-8 space-y-3 rounded-2xl border bg-slate-50 p-5">
          <h2 className="text-lg font-bold text-slate-900">Featured in this collection</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {categoryTemplates.map((template) => (
              <li key={template.id} className="rounded-xl border bg-white px-3 py-2 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">{template.name}</span>
                <span className="block text-slate-500">{template.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-9">
          <QrGenerator initialType={page.recommendedQrType} initialTemplateCategory={page.category} />
        </div>

        <AdSlot placement="seo-after-tool" minHeight={180} />

        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-10">
          <div>
            <section className="mt-12 max-w-3xl space-y-4" aria-labelledby="template-guide-heading">
              <h2 id="template-guide-heading" className="text-2xl font-bold tracking-tight">About these templates</h2>
              {page.body.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-slate-700">{paragraph}</p>
              ))}
            </section>
            <section className="mt-12 max-w-3xl" aria-labelledby="how-to-heading">
              <h2 id="how-to-heading" className="text-2xl font-bold tracking-tight">How to use this template</h2>
              <ol className="mt-5 space-y-3">
                {page.howTo.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">{index + 1}</span>
                    <p className="pt-0.5 text-slate-700">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
            <FaqSection page={page} />
            <RelatedTemplateLinks categories={page.related} />
          </div>
          <div className="hidden xl:block">
            <AdSlot placement="seo-sidebar" minHeight={600} />
          </div>
        </div>
      </article>
    </main>
  );
}
