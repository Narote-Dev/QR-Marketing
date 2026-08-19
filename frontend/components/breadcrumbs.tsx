import Link from "next/link";
import type { SeoPage } from "@/lib/seo/site";
import { siteUrl } from "@/lib/seo/site";

export function Breadcrumbs({ page }: { page: SeoPage }) {
  const path = page.slug === "qr-code-generator" ? "/qr-code-generator" : `/qr-code/${page.slug}`;
  const items = [{ label: "Home", href: "/" }, ...(page.slug === "qr-code-generator" ? [] : [{ label: "QR code generator", href: "/qr-code-generator" }]), { label: page.title, href: path }];
  const jsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: new URL(item.href, siteUrl).toString() })) };
  return <><nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600"><ol className="flex flex-wrap gap-2">{items.map((item, index) => <li key={item.href} className="flex items-center gap-2">{index > 0 && <span aria-hidden="true">/</span>}{index === items.length - 1 ? <span aria-current="page">{item.label}</span> : <Link className="hover:text-blue-700 hover:underline" href={item.href}>{item.label}</Link>}</li>)}</ol></nav><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
