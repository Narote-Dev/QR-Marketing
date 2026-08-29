import { defaultQrDesign, type QrDesign } from "@/lib/qr/design";

/** Must match API QrDesignValidator.MaxUtf8Bytes (32 KiB). */
export const MAX_DESIGN_JSON_BYTES = 32 * 1024;

function designJsonByteLength(design: QrDesign): number {
  return new TextEncoder().encode(JSON.stringify(design)).length;
}

/**
 * Snapshot design for API persistence. Strips an oversized custom logo before rejecting.
 */
export function prepareDesignForSave(design: QrDesign): QrDesign {
  if (designJsonByteLength(design) <= MAX_DESIGN_JSON_BYTES) {
    return design;
  }

  if (design.logo?.startsWith("data:")) {
    const withoutLogo = { ...design, logo: undefined };
    if (designJsonByteLength(withoutLogo) <= MAX_DESIGN_JSON_BYTES) {
      return withoutLogo;
    }
  }

  throw new Error("design.too_large");
}

/** Parse API design JSON; fall back to default for legacy rows without saved design. */
export function parseStoredDesign(value: unknown): QrDesign {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ...defaultQrDesign };
  }

  return { ...defaultQrDesign, ...(value as Partial<QrDesign>) };
}

export function hasSavedDesign(value: unknown): boolean {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}
