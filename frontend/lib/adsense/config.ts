export const adPlacements = ["blog-inline", "blog-bottom", "seo-after-tool", "seo-sidebar"] as const;
export type AdPlacement = (typeof adPlacements)[number];
export type AdSenseConfig = { enabled: boolean; publisherId?: string; slots: Partial<Record<AdPlacement, string>> };

export function getAdSenseConfig(environment: Record<string, string | undefined>): AdSenseConfig {
  const publisherId = environment.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();
  const enabled = environment.NEXT_PUBLIC_ENABLE_ADSENSE === "true" && Boolean(publisherId);
  return { enabled, publisherId, slots: { "blog-inline": environment.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INLINE?.trim(), "blog-bottom": environment.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_BOTTOM?.trim(), "seo-after-tool": environment.NEXT_PUBLIC_ADSENSE_SLOT_SEO_AFTER_TOOL?.trim(), "seo-sidebar": environment.NEXT_PUBLIC_ADSENSE_SLOT_SEO_SIDEBAR?.trim() } };
}

// Change: ads.txt uses pub-..., while the AdSense script client uses ca-pub-...
export function toAdsTxtPublisherId(publisherId: string): string {
  // Step 1: Strip the script-only ca- prefix so Google can authorize the seller record.
  return publisherId.replace(/^ca-/, "");
}

/** Step 1: Emit AdSense account meta when a publisher ID is configured (matches ads.txt). */
export function getAdSenseAccountMeta(publisherId?: string): Record<string, string> | undefined {
  if (!publisherId) return undefined;
  return { "google-adsense-account": publisherId };
}

export const adSenseConfig = getAdSenseConfig(process.env);
