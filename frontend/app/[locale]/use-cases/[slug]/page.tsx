import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoUseCasePage } from "@/components/seo-use-case-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import {
  getUseCaseMetadata,
  getUseCasePage,
  isUseCaseSlug,
  useCaseSlugs,
  type UseCaseSlug,
} from "@/lib/seo/use-cases";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  // Step 1: Pre-render every curated long-tail use case for all locales.
  return locales.flatMap((locale) => useCaseSlugs.map((slug) => ({ locale, slug })));
}

export function generateMetadata({ params }: Props): Metadata {
  // Step 1: Reject unsupported locale or use-case metadata.
  if (!isLocale(params.locale) || !isUseCaseSlug(params.slug)) return {};
  // Step 2: Return localized canonical and hreflang metadata.
  return getUseCaseMetadata(params.locale, params.slug);
}

export default async function UseCasePageRoute({ params }: Props) {
  // Step 1: Reject unknown locales or use-case slugs.
  if (!isLocale(params.locale) || !isUseCaseSlug(params.slug)) notFound();
  const locale = params.locale as Locale;
  const slug = params.slug as UseCaseSlug;

  // Step 2: Load UI dictionary and intent-matched page copy.
  const dictionary = await getDictionary(locale);
  const page = getUseCasePage(locale, slug);

  // Step 3: Render the reusable long-tail landing page.
  return <SeoUseCasePage page={page} locale={locale} dictionary={dictionary} />;
}
