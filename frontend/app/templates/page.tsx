import type { Metadata } from "next";
import { SeoTemplatePage } from "@/components/seo-template-page";
import { getTemplatePageMetadata, templateIndexPage } from "@/lib/seo/templates";

export const metadata: Metadata = getTemplatePageMetadata(templateIndexPage);

export default function TemplatesIndexPage() {
  return <SeoTemplatePage page={templateIndexPage} />;
}
