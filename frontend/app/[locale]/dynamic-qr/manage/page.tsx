import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicQrAccountLayout } from "@/components/dynamic-qr-account-layout";
import { DynamicQrManageForm } from "@/components/dynamic-qr-manage-form";
import { isDynamicQrEnabled } from "@/lib/dynamic-qr/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/config";

type Props = {
  params: { locale: string };
  searchParams?: { code?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dictionary = await getDictionary(params.locale);
  return {
    title: dictionary.dynamicQr.manageTitle,
    robots: { index: false, follow: false },
  };
}

export default async function DynamicQrManagePage({ params, searchParams }: Props) {
  if (!isLocale(params.locale)) notFound();
  if (!isDynamicQrEnabled()) notFound();
  const locale = params.locale as Locale;
  const dictionary = await getDictionary(locale);
  return (
    <DynamicQrAccountLayout locale={locale} dictionary={dictionary} currentPath="/my/dynamic-qr">
      <DynamicQrManageForm initialCode={searchParams?.code ?? ""} />
      <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-slate-500">{dictionary.dynamicQr.manageFooterNote}</p>
    </DynamicQrAccountLayout>
  );
}
