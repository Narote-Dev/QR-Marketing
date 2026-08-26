import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoQrPage } from "@/components/seo-qr-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getPageMetadata, getQrPages, qrSeoSlugs, type QrSeoSlug } from "@/lib/seo/site";

type Props = { params: { locale: string; type: string } };

export function generateStaticParams() {
  return locales.flatMap((locale) => qrSeoSlugs.map((type) => ({ locale, type })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  const page = getQrPages(dictionary)[params.type as QrSeoSlug];
  return page ? getPageMetadata(page, params.locale) : {};
}

export default async function QrCodeTypePage({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  const type = params.type as QrSeoSlug;
  const page = getQrPages(dictionary)[type];
  if (!page) notFound();
  // Change: Dynamic SEO page uses URL generator; Dynamic mode appears when feature flag is on.
  const initialType = type === "dynamic" ? "url" : type;
  return <SeoQrPage page={page} initialType={initialType} locale={locale} dictionary={dictionary} />;
}
