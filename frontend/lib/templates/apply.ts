import { defaultQrDesign, type QrDesign } from "@/lib/qr/design";
import type { QrTemplate } from "@/lib/templates/types";

/**
 * Change: Map a curated template onto QrDesign without touching content generation.
 * Step 1: Start from the project default design so unspecified fields stay consistent.
 * Step 2: Apply template colors, styles, frame, logo, and optional background image.
 * Step 3: Map the single template eye style onto both inner and outer eyes.
 */
export function applyTemplate(template: QrTemplate, base: QrDesign = defaultQrDesign): QrDesign {
  return {
    ...base,
    foregroundColor: template.defaultForegroundColor,
    backgroundColor: template.defaultBackgroundColor,
    dotStyle: template.defaultDotStyle,
    innerEyeStyle: template.defaultEyeStyle,
    outerEyeStyle: template.defaultEyeStyle,
    frame: template.defaultFrame,
    frameText: template.defaultFrameText,
    logo: template.logo,
    backgroundImage: template.backgroundImage,
    // Step 4: Prefer high correction when a logo is present so scans stay reliable.
    errorCorrectionLevel: template.logo ? "H" : base.errorCorrectionLevel,
  };
}

/** Step 1: Clear template-driven visuals and restore the default design. */
export function clearTemplateDesign(): QrDesign {
  return { ...defaultQrDesign };
}
