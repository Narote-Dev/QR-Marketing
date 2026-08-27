import { zipSync } from "fflate";
import type { QrDesign } from "@/lib/qr/design";
import { renderQrBlob } from "@/lib/qr/render";
import { downloadBlob } from "@/lib/qr/export";
import type { BatchRowValidated } from "@/lib/qr/batch/types";

/** Step 1: Ensure ZIP entry names are unique and safe. */
export function uniqueZipEntryName(baseName: string, used: Set<string>): string {
  const stem = baseName.replace(/\.(png|svg|jpe?g|webp)$/i, "") || "qr-code";
  let candidate = stem;
  let suffix = 2;
  while (used.has(candidate)) {
    candidate = `${stem}-${suffix}`;
    suffix += 1;
  }
  used.add(candidate);
  return `${candidate}.png`;
}

/** Step 2: Render rows sequentially to limit peak memory on low-RAM devices. */
export async function exportBatchZip(
  rows: BatchRowValidated[],
  design: QrDesign,
  onProgress?: (completed: number, total: number) => void,
): Promise<Blob> {
  const files: Record<string, Uint8Array> = {};
  const usedNames = new Set<string>();

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index]!;
    if (!row.payload) continue;

    const rowDesign = row.label ? { ...design, frameText: row.label } : design;
    const pngBlob = await renderQrBlob(row.payload, rowDesign, "png");
    const bytes = new Uint8Array(await pngBlob.arrayBuffer());
    const entryName = uniqueZipEntryName(row.fileName, usedNames);
    files[entryName] = bytes;
    onProgress?.(index + 1, rows.length);

    // Step 3: Yield the main thread between renders to keep the UI responsive.
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
  }

  const zipped = zipSync(files, { level: 6 });
  return new Blob([zipped], { type: "application/zip" });
}

/** Step 4: Trigger a browser download for the finished ZIP archive. */
export function downloadBatchZip(blob: Blob, fileName: string): void {
  downloadBlob(blob, fileName.endsWith(".zip") ? fileName : `${fileName}.zip`);
}
