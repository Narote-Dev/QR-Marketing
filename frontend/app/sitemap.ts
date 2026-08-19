import type { MetadataRoute } from "next";
import { qrPages, siteUrl } from "@/lib/seo/site";
import { getTemplatePagePath, templateCategoryPages, templateIndexPage } from "@/lib/seo/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Step 1: Keep the sitemap curated — QR tool pages plus six template SEO pages only.
  return [
    { url: new URL("/qr-code-generator", siteUrl).toString(), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...Object.values(qrPages).map((page) => ({
      url: new URL(`/qr-code/${page.slug}`, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: new URL(getTemplatePagePath(templateIndexPage), siteUrl).toString(), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...Object.values(templateCategoryPages).map((page) => ({
      url: new URL(getTemplatePagePath(page), siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
