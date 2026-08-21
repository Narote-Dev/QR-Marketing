import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, localeCookieName, type Locale } from "@/lib/i18n/config";
import { resolvePreferredLocale } from "@/lib/i18n/detect";
import { isExemptPath, localizedPath, stripLocaleFromPath } from "@/lib/i18n/paths";

const CANONICAL_HOST = "genmyqrcode.com";

// Step 1: Prefer Vercel geo, then Cloudflare, then nothing.
function requestCountry(request: NextRequest): string | null {
  return request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? null;
}

// Step 2: Collapse www onto the apex host in one hop with the locale redirect.
function canonicalUrl(request: NextRequest, pathname: string): URL {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https:";
  }
  return url;
}

function redirectPermanent(request: NextRequest, pathname: string): NextResponse {
  return NextResponse.redirect(canonicalUrl(request, pathname), 308);
}

function redirectTemporary(request: NextRequest, pathname: string): NextResponse {
  return NextResponse.redirect(canonicalUrl(request, pathname), 307);
}

function setLocaleCookie(response: NextResponse, locale: Locale): NextResponse {
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Step 3: Never locale-prefix static SEO or verification assets.
  if (isExemptPath(pathname)) {
    if (request.nextUrl.hostname === `www.${CANONICAL_HOST}`) {
      return redirectPermanent(request, pathname);
    }
    return NextResponse.next();
  }

  const { locale: pathLocale, path } = stripLocaleFromPath(pathname);
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  const preferred = resolvePreferredLocale({
    cookie: cookieLocale,
    country: requestCountry(request),
    acceptLanguage: request.headers.get("accept-language"),
  });

  // Step 4: Root path detects region/language for humans only (temporary redirect).
  if (pathname === "/" || pathname === "") {
    const target = localizedPath(preferred, "/qr-code-generator");
    return setLocaleCookie(redirectTemporary(request, target), preferred);
  }

  // Step 5: Legacy unprefixed public URLs permanently move under /en.
  if (!pathLocale) {
    const target = localizedPath(defaultLocale, path === "/" ? "/qr-code-generator" : path);
    return setLocaleCookie(redirectPermanent(request, target), defaultLocale);
  }

  // Step 6: Invalid locale segments fall back to the English equivalent.
  if (!isLocale(pathLocale)) {
    const target = localizedPath(defaultLocale, path);
    return setLocaleCookie(redirectPermanent(request, target), defaultLocale);
  }

  // Step 7: Canonicalize www while keeping the already-localized path.
  if (request.nextUrl.hostname === `www.${CANONICAL_HOST}`) {
    return setLocaleCookie(redirectPermanent(request, pathname), pathLocale);
  }

  // Step 8: Remember the active locale when the URL already includes one.
  const response = NextResponse.next();
  return setLocaleCookie(response, pathLocale);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)", "/"],
};
