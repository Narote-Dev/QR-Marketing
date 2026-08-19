import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoQrPage } from "@/components/seo-qr-page";
import { getPageMetadata, qrPages, qrSeoSlugs, type QrSeoSlug } from "@/lib/seo/site";

type Props = { params: { type: string } };
export function generateStaticParams() { return qrSeoSlugs.map((type) => ({ type })); }
export function generateMetadata({ params }: Props): Metadata { const page = qrPages[params.type as QrSeoSlug]; return page ? getPageMetadata(page) : {}; }
export default function QrCodeTypePage({ params }: Props) { const type = params.type as QrSeoSlug; const page = qrPages[type]; if (!page) notFound(); return <SeoQrPage page={page} initialType={type} />; }
