import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdSlot } from "@/components/ad-slot";
import { FaqSection } from "@/components/faq-section";
import { QrGenerator } from "@/components/qr-generator";
import { RelatedQrTools } from "@/components/related-qr-tools";
import { SeoJsonLd } from "@/components/seo-json-ld";
import type { SeoPage } from "@/lib/seo/site";
import type { QrType } from "@/lib/qr/types";
export function SeoQrPage({ page, initialType = "url" }: { page: SeoPage; initialType?: QrType }) {
  // Change: Show the Build Your QR brand in the public QR page header.
  return <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8 sm:py-14"><SeoJsonLd page={page} /><header className="mb-8 flex items-center justify-between"><Link href="/" className="text-lg font-bold tracking-tight text-slate-900">Build Your QR</Link><Link href="/qr-code-generator" className="text-sm font-semibold text-blue-700 hover:underline">All QR tools</Link></header><Breadcrumbs page={page} /><article><h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{page.h1}</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{page.introduction}</p><div className="mt-9"><QrGenerator initialType={initialType} /></div><AdSlot placement="seo-after-tool" minHeight={180} /><div className="xl:grid xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-10"><div><section className="mt-12 max-w-3xl" aria-labelledby="how-to-heading"><h2 id="how-to-heading" className="text-2xl font-bold tracking-tight">How to create this QR code</h2><ol className="mt-5 space-y-3">{page.howTo.map((step, index) => <li key={step} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">{index + 1}</span><p className="pt-0.5 text-slate-700">{step}</p></li>)}</ol></section><FaqSection page={page} /><RelatedQrTools slugs={page.related} /></div><div className="hidden xl:block"><AdSlot placement="seo-sidebar" minHeight={600} /></div></div></article></main>;
}
