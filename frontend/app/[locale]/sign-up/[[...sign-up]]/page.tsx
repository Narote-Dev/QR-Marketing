import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { isClerkEnabled } from "@/lib/clerk/config";
import { isDynamicQrEnabled } from "@/lib/dynamic-qr/config";
import { isLocale } from "@/lib/i18n/config";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return { title: "Sign up", robots: { index: false, follow: false } };
}

export default function SignUpPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  if (!isDynamicQrEnabled() || !isClerkEnabled()) notFound();
  return (
    <main className="mx-auto flex max-w-md justify-center px-4 py-16">
      <SignUp routing="path" path={`/${params.locale}/sign-up`} signInUrl={`/${params.locale}/sign-in`} />
    </main>
  );
}
