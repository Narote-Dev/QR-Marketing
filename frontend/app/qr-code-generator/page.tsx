import type { Metadata } from "next";
import { SeoQrPage } from "@/components/seo-qr-page";
import { generatorPage, getPageMetadata } from "@/lib/seo/site";
export const metadata: Metadata = getPageMetadata(generatorPage);
export default function QrCodeGeneratorPage() { return <SeoQrPage page={generatorPage} />; }
