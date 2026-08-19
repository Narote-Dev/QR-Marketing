import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoTemplatePage } from "@/components/seo-template-page";
import { getTemplatePageMetadata, templateCategoryPages, templateSeoSlugs, type TemplateSeoSlug } from "@/lib/seo/templates";

type Props = { params: { category: string } };

export function generateStaticParams() {
  // Step 1: Only publish the curated SEO categories requested for Phase 3.5.
  return templateSeoSlugs.map((category) => ({ category }));
}

export function generateMetadata({ params }: Props): Metadata {
  const page = templateCategoryPages[params.category as TemplateSeoSlug];
  if (!page) return {};
  return getTemplatePageMetadata(page);
}

export default function TemplateCategoryPage({ params }: Props) {
  const page = templateCategoryPages[params.category as TemplateSeoSlug];
  if (!page) notFound();
  return <SeoTemplatePage page={page} />;
}
