import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

/** Public tool paths that exist without a locale prefix (legacy + matcher helpers). */
export const publicToolPaths = [
  "/qr-code-generator",
  "/bulk-qr-generator",
  "/qr-code/:type",
  "/templates",
  "/templates/:category",
] as const;

const LEGACY_PUBLIC_PATH_REGEX =
  /^\/(?:qr-code-generator|bulk-qr-generator|qr-code\/[^/]+|templates(?:\/[^/]+)?)\/?$/;

/** Step 1: Normalize a pathname by ensuring a leading slash and dropping a trailing slash (except root). */
function normalizePathname(pathname: string): string {
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (withSlash === "/") return "/";
  return withSlash.replace(/\/+$/, "") || "/";
}

/**
 * Step 1: True when middleware should skip locale routing (robots, sitemap, api, static files).
 * Change: Keep SEO and verification assets unprefixed.
 */
export function isExemptPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (path === "/robots.txt" || path === "/sitemap.xml" || path === "/ads.txt" || path === "/favicon.ico") {
    return true;
  }
  if (path === "/api" || path.startsWith("/api/")) return true;
  // Change: Dynamic QR short links must stay unprefixed so rewrites can proxy to the API.
  if (path === "/r" || path.startsWith("/r/")) return true;
  // Step 2: Any path with a file extension is treated as a static asset.
  const last = path.split("/").pop() ?? "";
  return last.includes(".");
}

/** Step 1: Prefix a root-relative path with a locale segment (`/` → `/${locale}`). */
export function localizedPath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) {
    throw new Error(`localizedPath expects a path starting with "/": ${path}`);
  }
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

/** Step 1: Peel a leading locale segment off a pathname when present. */
export function stripLocaleFromPath(pathname: string): { locale?: Locale; path: string } {
  const normalized = normalizePathname(pathname);
  const parts = normalized.split("/");
  // parts[0] is "" for absolute paths; parts[1] may be the locale.
  const maybeLocale = parts[1];
  if (maybeLocale && isLocale(maybeLocale)) {
    const rest = parts.slice(2);
    const path = rest.length === 0 ? "/" : `/${rest.join("/")}`;
    return { locale: maybeLocale, path };
  }
  return { path: normalized };
}

/** Step 1: Swap or insert the locale segment for language switching. */
export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const { path } = stripLocaleFromPath(pathname);
  return localizedPath(nextLocale, path);
}

/** Step 1: True when pathname is a legacy unprefixed public tool URL. */
export function isLegacyPublicPath(pathname: string): boolean {
  return LEGACY_PUBLIC_PATH_REGEX.test(normalizePathname(pathname));
}

/**
 * Step 1: Map a legacy public path to a permanent localized target (default `/en/...`).
 * Change: Middleware can 308 to this result; query strings are left to the caller.
 */
export function legacyLocalizedRedirectPath(
  pathname: string,
  locale: Locale = defaultLocale,
): string | null {
  const path = normalizePathname(pathname.split("?")[0] ?? pathname);
  if (!isLegacyPublicPath(path)) return null;
  return localizedPath(locale, path);
}

/** Matcher helpers for middleware permanent redirects of legacy public routes. */
export const legacyPublicPaths = {
  /** Step 1: Regex usable in Next.js middleware path tests. */
  pattern: LEGACY_PUBLIC_PATH_REGEX,
  isMatch: isLegacyPublicPath,
  toLocalized: legacyLocalizedRedirectPath,
  paths: publicToolPaths,
} as const;

/** Step 1: Build a bare QR SEO path from a page slug. */
export function pagePathForSlug(slug: string): string {
  if (slug === "qr-code-generator") return "/qr-code-generator";
  if (slug === "bulk-qr-generator") return "/bulk-qr-generator";
  return `/qr-code/${slug}`;
}

/** Step 2: Build a bare template SEO path from a page slug. */
export function templatePathForSlug(slug: string): string {
  return slug === "templates" ? "/templates" : `/templates/${slug}`;
}

export function withDefaultLocale(path: string): string {
  return localizedPath(defaultLocale, path);
}
