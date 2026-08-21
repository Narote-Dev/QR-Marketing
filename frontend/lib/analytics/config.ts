export type AnalyticsConfig = { enabled: boolean; measurementId?: string };

export function getAnalyticsConfig(environment: Record<string, string | undefined>): AnalyticsConfig {
  // Step 1: Only enable GA4 when both the feature flag and a measurement ID are present.
  const measurementId = environment.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const enabled = environment.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" && Boolean(measurementId);
  return { enabled, measurementId };
}

export const analyticsConfig = getAnalyticsConfig(process.env);
