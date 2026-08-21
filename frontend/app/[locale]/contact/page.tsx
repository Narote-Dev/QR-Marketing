import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyPage } from "@/components/company-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getCompanyDocument, getCompanyMetadata } from "@/lib/company";

type Props = { params: { locale: string } };

export function generateStaticParams() {
  // Step 1: Pre-render the Contact page in every supported language.
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: Props): Metadata {
  // Step 1: Reject unsupported locale metadata.
  if (!isLocale(params.locale)) return {};
  // Step 2: Return localized canonical and hreflang metadata.
  return getCompanyMetadata(params.locale, "contact");
}

export default async function ContactPage({ params }: Props) {
  // Step 1: Reject unknown locales instead of publishing thin pages.
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  // Step 2: Load localized UI and company content.
  const dictionary = await getDictionary(locale);
  const document = getCompanyDocument(locale, "contact");

  // Step 3: Render the complete localized page.
  return <CompanyPage locale={locale} dictionary={dictionary} document={document} />;
}
