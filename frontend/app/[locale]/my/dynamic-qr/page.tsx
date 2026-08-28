import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicQrAccountLayout } from "@/components/dynamic-qr-account-layout";
import { DynamicQrDashboard } from "@/components/dynamic-qr-dashboard";
import { isDynamicQrEnabled } from "@/lib/dynamic-qr/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/config";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.dynamicQr.dashboardTitle,
    robots: { index: false, follow: false },
  };
}

export default async function MyDynamicQrPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  if (!isDynamicQrEnabled()) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  return (
    <DynamicQrAccountLayout locale={locale} dictionary={dictionary} currentPath="/my/dynamic-qr">
      <DynamicQrDashboard />
    </DynamicQrAccountLayout>
  );
}
