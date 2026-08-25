import type { QrDesign } from "@/lib/qr/design";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });
}

function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to decode QR image data."));
    };
    image.src = url;
  });
}

/**
 * Change: Compose QR + optional background + frame + label into one downloadable PNG.
 * Step 1: Measure the final canvas from QR size plus frame padding and label height.
 * Step 2: Draw optional background image, then a solid panel, frame, QR, and label text.
 * Step 3: Return a PNG blob for the caller to trigger a browser download.
 */
export async function composeQrPng(qrBlob: Blob, design: QrDesign): Promise<Blob> {
  const qrImage = await blobToImage(qrBlob);
  const hasLabel = design.frame === "label";
  const framePadding = design.frame === "border" ? 24 : design.frame === "label" ? 20 : 16;
  const labelHeight = hasLabel ? 40 : 0;
  const panelSize = design.size + framePadding * 2;
  const canvasSize = panelSize + 32;
  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize + labelHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable in this browser.");

  // Step 1: Fill the outer canvas and optional template background.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  if (design.backgroundImage) {
    try {
      const background = await loadImage(design.backgroundImage);
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
    } catch {
      // Step 2: Keep export usable when a demo asset fails to load.
      context.fillStyle = design.backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  const panelX = 16;
  const panelY = 16;
  context.fillStyle = design.backgroundColor;
  context.fillRect(panelX, panelY, panelSize, panelSize + labelHeight);

  if (design.frame === "border") {
    context.strokeStyle = "#0f172a";
    context.lineWidth = 12;
    context.strokeRect(panelX + 6, panelY + 6, panelSize - 12, panelSize - 12);
  }

  if (design.frame === "label") {
    context.strokeStyle = "#1d4ed8";
    context.lineWidth = 4;
    context.strokeRect(panelX + 2, panelY + 2, panelSize - 4, panelSize + labelHeight - 4);
  }

  context.drawImage(qrImage, panelX + framePadding, panelY + framePadding, design.size, design.size);

  if (hasLabel) {
    context.fillStyle = "#1e293b";
    context.font = "600 18px Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(design.frameText || "Scan me", panelX + panelSize / 2, panelY + panelSize + labelHeight / 2, panelSize - 24);
  }

  // Step 3: Encode the composed canvas as PNG.
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Could not create PNG download.");
  return blob;
}

/** Step 1: Trigger a browser download for a composed PNG blob. */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

/** Step 1: Force a download name onto the requested extension (png/svg). */
export function withDownloadExtension(fileName: string, extension: "png" | "svg"): string {
  const trimmed = fileName.trim() || `qr-code.${extension}`;
  const withoutExt = trimmed.replace(/\.(png|svg|jpe?g|webp)$/i, "");
  return `${withoutExt || "qr-code"}.${extension}`;
}
