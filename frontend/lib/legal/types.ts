export const legalSlugs = ["privacy-policy", "terms-of-service"] as const;

export type LegalSlug = (typeof legalSlugs)[number];

/** Phase D — short aliases that must redirect to the real legal slug path. */
const legalBareAliases: Record<string, `/${LegalSlug}`> = {
  "/terms": "/terms-of-service",
  "/terms/": "/terms-of-service",
};

/** Step 1: Map discoverable short paths (e.g. /terms) to published legal URLs. */
export function resolveLegalBarePath(barePath: string): string {
  return legalBareAliases[barePath] ?? barePath;
}

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  links?: { label: string; href: string }[];
};

export type LegalDocument = {
  slug: LegalSlug;
  title: string;
  description: string;
  introduction: string;
  websiteLabel: string;
  updatedLabel: string;
  updatedDate: string;
  sections: LegalSection[];
};

export type LegalDocuments = Record<LegalSlug, LegalDocument>;

export function isLegalSlug(value: string): value is LegalSlug {
  return legalSlugs.includes(value as LegalSlug);
}
