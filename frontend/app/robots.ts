import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Change: Keep account, auth, and short-link redirect paths out of crawl budget.
      disallow: ["/*/my/", "/*/dynamic-qr/", "/*/sign-in", "/*/sign-up", "/r/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
