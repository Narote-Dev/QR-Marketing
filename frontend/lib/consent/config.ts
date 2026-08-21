export type ConsentConfig = { enabled: boolean };

export function getConsentConfig(environment: Record<string, string | undefined>): ConsentConfig {
  // Step 1: Require an explicit flag so consent gating never activates unexpectedly.
  return { enabled: environment.NEXT_PUBLIC_ENABLE_CONSENT === "true" };
}

export const consentConfig = getConsentConfig(process.env);
