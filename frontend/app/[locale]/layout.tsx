import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConsentBanner } from "@/components/consent-banner";
import { I18nProvider } from "@/components/i18n-provider";
import { SiteNavJsonLd } from "@/components/site-nav-json-ld";
import { htmlLang, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  return {
    title: { default: dictionary.site.name, template: `%s | ${dictionary.site.name}` },
    description: dictionary.site.description,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Step 1: Reject unknown locale segments before rendering.
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);

  // Step 2: Set html lang via a nested html is invalid — use lang on a wrapper and rely on root.
  // Next.js only allows one <html>; set lang through a scriptless approach on the body parent.
  return (
    <div lang={htmlLang[locale]}>
      <SiteNavJsonLd locale={locale} dictionary={dictionary} />
      <I18nProvider locale={locale} dictionary={dictionary}>
        {children}
        <ConsentBanner />
      </I18nProvider>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(htmlLang[locale])};`,
        }}
      />
    </div>
  );
}
