import { ChevronRight } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { FaqSection } from "@/components/faq-section";
import { HomeCustomization } from "@/components/home/home-customization";
import { HomeAnalytics, HomeDynamic } from "@/components/home/home-dynamic";
import { HomeFinalCta } from "@/components/home/home-final-cta";
import { HomeHero } from "@/components/home/home-hero";
import { HomePricing } from "@/components/home/home-pricing";
import { HomeQrTypes } from "@/components/home/home-qr-types";
import { HomeRoadmap } from "@/components/home/home-roadmap";
import { HomeValueStrip } from "@/components/home/home-value-strip";
import { homeUi } from "@/components/home/ui";
import { PopularUseCases } from "@/components/popular-use-cases";
import { QrGenerator } from "@/components/qr-generator";
import { RelatedQrTools } from "@/components/related-qr-tools";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n/config";
import { pagePathForSlug } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { allowsAdsOnBarePath } from "@/lib/seo/indexing";
import type { SeoPage } from "@/lib/seo/site";

type Props = {
  page: SeoPage;
  locale: Locale;
  dictionary: Dictionary;
};

/**
 * Change: SaaS-style homepage for the generator hub. Marketing sections are server-rendered;
 * the only client islands are the existing QrGenerator, ads, and small QR artwork.
 */
export function HomePage({ page, locale, dictionary }: Props) {
  const barePath = pagePathForSlug(page.slug);
  const allowAds = allowsAdsOnBarePath(barePath);
  const flow = dictionary.home.generatorSection;

  return (
    <>
      <SeoJsonLd page={page} locale={locale} />
      <SiteHeader locale={locale} dictionary={dictionary} currentPath={barePath} />
      <main className="min-h-screen">
        <HomeHero locale={locale} dictionary={dictionary} h1={page.h1} introduction={page.introduction} />
        <HomeValueStrip dictionary={dictionary} />

        {/* Step 1: The existing generator is the product; anchor it so every CTA lands here. */}
        <section id="generator" aria-labelledby="generator-heading" className="scroll-mt-[var(--header-height)] py-12 sm:py-16">
          <div className={homeUi.container}>
            <p className={homeUi.eyebrow}>{flow.eyebrow}</p>
            <ol aria-label={flow.heading} className="mt-3 flex flex-wrap items-center gap-y-2 text-sm font-medium text-slate-700">
              {flow.flow.map((step, index) => (
                <li key={step} className="flex items-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-teal text-[11px] font-bold text-white">
                      {index + 1}
                    </span>
                    {step}
                  </span>
                  {index < flow.flow.length - 1 && (
                    <ChevronRight className="mx-1 h-4 w-4 text-slate-400" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <QrGenerator />
            </div>
            {allowAds ? <AdSlot placement="seo-after-tool" minHeight={180} /> : null}
          </div>
        </section>

        <HomeQrTypes locale={locale} dictionary={dictionary} />
        <HomeDynamic locale={locale} dictionary={dictionary} />
        <HomeAnalytics dictionary={dictionary} />
        <HomeCustomization dictionary={dictionary} />
        <HomeRoadmap dictionary={dictionary} />
        <HomePricing locale={locale} dictionary={dictionary} />

        {/* Step 2: Keep the long-form SEO copy, how-to, FAQ, and internal links server-rendered. */}
        <section aria-labelledby="about-tool-heading" className="py-14 sm:py-20">
          <div className={homeUi.container}>
            <div className={allowAds ? "xl:grid xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-10" : undefined}>
              <div>
                {page.body && page.body.length > 0 ? (
                  <div className="max-w-3xl space-y-4">
                    <h2 id="about-tool-heading" className="text-2xl font-bold tracking-tight">
                      {dictionary.chrome.aboutThisTool}
                    </h2>
                    {page.body.map((paragraph) => (
                      <p key={paragraph} className="leading-7 text-slate-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
                <div className="mt-12 max-w-3xl">
                  <h2 id="how-to-heading" className="text-2xl font-bold tracking-tight">
                    {dictionary.chrome.howToCreate}
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
                </div>
                <FaqSection page={page} heading={dictionary.chrome.faqs} />
                <RelatedQrTools slugs={page.related} locale={locale} dictionary={dictionary} />
                <PopularUseCases locale={locale} dictionary={dictionary} />
              </div>
              {allowAds ? (
                <div className="hidden xl:block">
                  <AdSlot placement="seo-sidebar" minHeight={600} />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <HomeFinalCta locale={locale} dictionary={dictionary} />
        <div className={homeUi.container}>
          <SiteFooter locale={locale} dictionary={dictionary} />
        </div>
      </main>
    </>
  );
}
