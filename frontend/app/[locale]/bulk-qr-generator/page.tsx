import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoBulkPage } from "@/components/seo-bulk-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getBulkPage, getPageMetadata } from "@/lib/seo/site";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  return getPageMetadata(getBulkPage(dictionary), params.locale);
}

export default async function BulkQrGeneratorPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  return <SeoBulkPage page={getBulkPage(dictionary)} locale={locale} dictionary={dictionary} />;
}
