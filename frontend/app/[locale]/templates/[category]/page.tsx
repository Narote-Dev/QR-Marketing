import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoTemplatePage } from "@/components/seo-template-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getTemplateCategoryPages, getTemplatePageMetadata, templateSeoSlugs, type TemplateSeoSlug } from "@/lib/seo/templates";

type Props = { params: { locale: string; category: string } };

export function generateStaticParams() {
  // Step 1: Publish curated SEO categories for every locale.
  return locales.flatMap((locale) => templateSeoSlugs.map((category) => ({ locale, category })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  const page = getTemplateCategoryPages(dictionary)[params.category as TemplateSeoSlug];
  if (!page) return {};
  return getTemplatePageMetadata(page, params.locale);
}

export default async function TemplateCategoryPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  const page = getTemplateCategoryPages(dictionary)[params.category as TemplateSeoSlug];
  if (!page) notFound();
  return <SeoTemplatePage page={page} locale={locale} dictionary={dictionary} />;
}
