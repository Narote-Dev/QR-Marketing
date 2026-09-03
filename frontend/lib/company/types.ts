export const companySlugs = ["about", "contact"] as const;

export type CompanySlug = (typeof companySlugs)[number];

export type CompanySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CompanyOperator = {
  name: string;
  role: string;
  location: string;
  nameLabel: string;
  roleLabel: string;
  locationLabel: string;
};

export type CompanyContactForm = {
  title: string;
  intro: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  send: string;
  messageRequired: string;
  mailtoHint: string;
  mailSubject: string;
  replyLine: string;
};

export type CompanyDocument = {
  slug: CompanySlug;
  title: string;
  description: string;
  introduction: string;
  websiteLabel: string;
  /** Phase D — real operator identity for AdSense / trust (About). */
  operator?: CompanyOperator;
  email?: { label: string; address: string };
  /** Phase D — working mailto form on Contact (not brand-only mailto link). */
  form?: CompanyContactForm;
  sections: CompanySection[];
};

export function isCompanySlug(value: string): value is CompanySlug {
  return companySlugs.includes(value as CompanySlug);
}
