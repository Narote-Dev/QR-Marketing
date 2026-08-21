import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import {
  getLegalDocument,
  getLegalMetadata,
  isLegalSlug,
  legalSlugs,
} from "@/lib/legal";

type Props = {
  params: { locale: string; legal: string };
};

export function generateStaticParams() {
  // Step 1: Pre-render both policy documents in every supported language.
  return locales.flatMap((locale) => legalSlugs.map((legal) => ({ locale, legal })));
}

export function generateMetadata({ params }: Props): Metadata {
  // Step 1: Reject unsupported locale or legal route metadata.
  if (!isLocale(params.locale) || !isLegalSlug(params.legal)) return {};

  // Step 2: Return localized canonical and hreflang metadata.
  return getLegalMetadata(params.locale, params.legal);
}

export default async function LocalizedLegalPage({ params }: Props) {
  // Step 1: Reject unknown routes instead of publishing thin policy pages.
  if (!isLocale(params.locale) || !isLegalSlug(params.legal)) notFound();
  const locale = params.locale as Locale;

  // Step 2: Load localized UI and legal content.
  const dictionary = await getDictionary(locale);
  const document = getLegalDocument(locale, params.legal);

  // Step 3: Render the complete localized policy.
  return <LegalPage locale={locale} dictionary={dictionary} document={document} />;
}
