export const adPlacements = ["blog-inline", "blog-bottom", "seo-after-tool", "seo-sidebar"] as const;
export type AdPlacement = (typeof adPlacements)[number];
export type AdSenseConfig = { enabled: boolean; publisherId?: string; slots: Partial<Record<AdPlacement, string>> };

export function getAdSenseConfig(environment: Record<string, string | undefined>): AdSenseConfig {
  const publisherId = environment.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();
  const enabled = environment.NEXT_PUBLIC_ENABLE_ADSENSE === "true" && Boolean(publisherId);
  return { enabled, publisherId, slots: { "blog-inline": environment.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INLINE?.trim(), "blog-bottom": environment.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_BOTTOM?.trim(), "seo-after-tool": environment.NEXT_PUBLIC_ADSENSE_SLOT_SEO_AFTER_TOOL?.trim(), "seo-sidebar": environment.NEXT_PUBLIC_ADSENSE_SLOT_SEO_SIDEBAR?.trim() } };
}

export const adSenseConfig = getAdSenseConfig(process.env);
