import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoQrPage } from "@/components/seo-qr-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getGeneratorPage, getPageMetadata } from "@/lib/seo/site";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  return getPageMetadata(getGeneratorPage(dictionary), params.locale);
}

export default async function QrCodeGeneratorPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  return <SeoQrPage page={getGeneratorPage(dictionary)} locale={locale} dictionary={dictionary} />;
}
