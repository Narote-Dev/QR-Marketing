import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdSlot } from "@/components/ad-slot";
import { FaqSection } from "@/components/faq-section";
import { PopularUseCases } from "@/components/popular-use-cases";
import { QrGenerator } from "@/components/qr-generator";
import { RelatedQrTools } from "@/components/related-qr-tools";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import type { SeoPage } from "@/lib/seo/site";
import type { PaymentProvider, QrType, SocialNetwork } from "@/lib/qr/types";

type Props = {
  page: SeoPage;
  initialType?: QrType;
  initialSocialNetwork?: SocialNetwork;
  initialPaymentProvider?: PaymentProvider;
  locale: Locale;
  dictionary: Dictionary;
};

export function SeoQrPage({
  page,
  initialType = "url",
  initialSocialNetwork,
  initialPaymentProvider,
  locale,
  dictionary,
}: Props) {
  // Change: Locale-aware chrome, links, and generator copy for SEO QR pages.
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <SeoJsonLd page={page} locale={locale} />
      <SiteHeader
        locale={locale}
        siteName={dictionary.site.name}
        languageLabel={dictionary.chrome.language}
        secondaryHref="/qr-code-generator"
        secondaryLabel={dictionary.chrome.allQrTools}
        bulkHref="/bulk-qr-generator"
        bulkLabel={dictionary.chrome.bulkQrGenerator}
      />
      <Breadcrumbs page={page} locale={locale} dictionary={dictionary} />
      <article>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{page.h1}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{page.introduction}</p>
        <div className="mt-9">
          <QrGenerator
            initialType={initialType}
            initialSocialNetwork={initialSocialNetwork}
            initialPaymentProvider={initialPaymentProvider}
          />
        </div>
        <AdSlot placement="seo-after-tool" minHeight={180} />
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-10">
          <div>
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
            <RelatedQrTools slugs={page.related} locale={locale} dictionary={dictionary} />
            {/* Change: Link hub pages into long-tail use-case clusters for crawl depth. */}
            <PopularUseCases locale={locale} dictionary={dictionary} />
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
