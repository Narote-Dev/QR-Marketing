import { getAdSenseConfig, toAdsTxtPublisherId } from "@/lib/adsense/config";

// Change: Serve the AdSense authorized-sellers file at the domain root.
export function GET() {
  // Step 1: Read the configured publisher ID so ads.txt stays consistent with the ad script.
  const { publisherId } = getAdSenseConfig(process.env);
  // Step 2: Emit the Google seller record with pub-... (not ca-pub-...), or an empty file when AdSense is not configured.
  const content = publisherId
    ? `google.com, ${toAdsTxtPublisherId(publisherId)}, DIRECT, f08c47fec0942fa0\n`
    : "";
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
