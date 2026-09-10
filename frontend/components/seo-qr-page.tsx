import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdSlot } from "@/components/ad-slot";
import { FaqSection } from "@/components/faq-section";
import { PopularUseCases } from "@/components/popular-use-cases";
import { QrGenerator, type GeneratorMode } from "@/components/qr-generator";
import { RelatedQrTools } from "@/components/related-qr-tools";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n/config";
import { pagePathForSlug } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/types";
import { allowsAdsOnBarePath } from "@/lib/seo/indexing";
import type { SeoPage } from "@/lib/seo/site";
import type { PaymentProvider, QrType, SocialNetwork } from "@/lib/qr/types";

type Props = {
  page: SeoPage;
  initialType?: QrType;
  initialSocialNetwork?: SocialNetwork;
  initialPaymentProvider?: PaymentProvider;
  // Change: Dynamic QR guide page opens the generator in Dynamic mode.
  initialMode?: GeneratorMode;
  locale: Locale;
  dictionary: Dictionary;
};

export function SeoQrPage({
  page,
  initialType = "url",
  initialSocialNetwork,
  initialPaymentProvider,
  initialMode,
  locale,
  dictionary,
}: Props) {
  // Change: Locale-aware chrome, links, and generator copy for SEO QR pages.
  const barePath = pagePathForSlug(page.slug);
  const allowAds = allowsAdsOnBarePath(barePath);
  // Change: Phase C — defer in-flow ads below guide copy so download CTAs stay reachable.
  const hasGuideBody = Boolean(page.body && page.body.length > 0);
  const showToolAdInline = allowAds && !hasGuideBody;

  return (
    <>
      <SeoJsonLd page={page} locale={locale} />
      <SiteHeader locale={locale} dictionary={dictionary} currentPath={barePath} />
      <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14 lg:px-8">
      <Breadcrumbs page={page} locale={locale} dictionary={dictionary} />
      <article>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{page.h1}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{page.introduction}</p>
        <div className="mt-9">
          <QrGenerator
            initialType={initialType}
            initialSocialNetwork={initialSocialNetwork}
            initialPaymentProvider={initialPaymentProvider}
            initialMode={initialMode}
          />
        </div>
        {showToolAdInline ? <AdSlot placement="seo-after-tool" minHeight={180} /> : null}
        <div className={allowAds ? "xl:grid xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-10" : undefined}>
          <div>
            {hasGuideBody ? (
              <section className="mt-12 max-w-3xl space-y-4" aria-labelledby="about-tool-heading">
                <h2 id="about-tool-heading" className="text-2xl font-bold tracking-tight">
                  {dictionary.chrome.aboutThisTool}
                </h2>
                {page.body!.map((paragraph) => (
                  <p key={paragraph} className="leading-7 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </section>
            ) : null}
            <section className="mt-12 max-w-3xl" aria-labelledby="how-to-heading">
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
            </section>
            <FaqSection page={page} heading={dictionary.chrome.faqs} />
            {allowAds && hasGuideBody ? <AdSlot placement="seo-after-tool" minHeight={120} className="max-xl:mt-8" /> : null}
            <RelatedQrTools slugs={page.related} locale={locale} dictionary={dictionary} />
            {/* Change: Link hub pages into long-tail use-case clusters for crawl depth. */}
            <PopularUseCases locale={locale} dictionary={dictionary} />
          </div>
          {allowAds ? (
            <div className="hidden xl:block">
              <AdSlot placement="seo-sidebar" minHeight={600} />
            </div>
          ) : null}
        </div>
      </article>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </main>
    </>
  );
}
