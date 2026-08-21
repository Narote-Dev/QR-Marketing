export const companySlugs = ["about", "contact"] as const;

export type CompanySlug = (typeof companySlugs)[number];

export type CompanySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CompanyDocument = {
  slug: CompanySlug;
  title: string;
  description: string;
  introduction: string;
  websiteLabel: string;
  email?: { label: string; address: string };
  sections: CompanySection[];
};

export function isCompanySlug(value: string): value is CompanySlug {
  return companySlugs.includes(value as CompanySlug);
}
