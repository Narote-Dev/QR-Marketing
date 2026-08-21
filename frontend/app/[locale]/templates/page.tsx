import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoTemplatePage } from "@/components/seo-template-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getTemplateIndexPage, getTemplatePageMetadata } from "@/lib/seo/templates";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  return getTemplatePageMetadata(getTemplateIndexPage(dictionary), params.locale);
}

export default async function TemplatesIndexPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  return <SeoTemplatePage page={getTemplateIndexPage(dictionary)} locale={locale} dictionary={dictionary} />;
}
