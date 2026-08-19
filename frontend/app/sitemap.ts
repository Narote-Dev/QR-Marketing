import type { MetadataRoute } from "next";
import { qrPages, siteUrl } from "@/lib/seo/site";
export default function sitemap(): MetadataRoute.Sitemap { const now = new Date(); return [{ url: new URL("/qr-code-generator", siteUrl).toString(), lastModified: now, changeFrequency: "weekly", priority: 1 }, ...Object.values(qrPages).map((page) => ({ url: new URL(`/qr-code/${page.slug}`, siteUrl).toString(), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 }))]; }
