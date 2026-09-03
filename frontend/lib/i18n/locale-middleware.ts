import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, localeCookieName, type Locale } from "@/lib/i18n/config";
import { resolvePreferredLocale } from "@/lib/i18n/detect";
import { isExemptPath, localizedPath, stripLocaleFromPath } from "@/lib/i18n/paths";
import { allowsAdsOnBarePath, barePathFromLocalizedPathname } from "@/lib/seo/indexing";

const CANONICAL_HOST = "genmyqrcode.com";

function requestCountry(request: NextRequest): string | null {
  return request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? null;
}

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

/**
 * Step 1: Forward locale + ads gate on the *request* so root layout can read them via headers().
 * Change: Response-only headers do not stop Auto ads; the layout must skip AdSenseScript.
 */
function nextWithContext(request: NextRequest, locale: Locale, barePath: string): NextResponse {
  const allowAds = allowsAdsOnBarePath(barePath);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-allow-ads", allowAds ? "1" : "0");

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  // Change: Keep response mirrors for debugging / edge consumers.
  response.headers.set("x-locale", locale);
  response.headers.set("x-allow-ads", allowAds ? "1" : "0");
  return setLocaleCookie(response, locale);
}

function redirectWithContext(
  response: NextResponse,
  locale: Locale,
  barePath: string,
): NextResponse {
  const allowAds = allowsAdsOnBarePath(barePath);
  response.headers.set("x-locale", locale);
  response.headers.set("x-allow-ads", allowAds ? "1" : "0");
  return setLocaleCookie(response, locale);
}

/** Shared locale/canonical routing used by root middleware (with or without Clerk). */
export function runLocaleMiddleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (isExemptPath(pathname)) {
    if (pathname === "/r/unavailable" || pathname.startsWith("/r/unavailable/")) {
      const cookieLocale = request.cookies.get(localeCookieName)?.value;
      const preferred = resolvePreferredLocale({
        cookie: cookieLocale,
        country: requestCountry(request),
        acceptLanguage: request.headers.get("accept-language"),
      });
      return nextWithContext(request, preferred, "/r/unavailable");
    }
    if (request.nextUrl.hostname === `www.${CANONICAL_HOST}`) {
      return redirectPermanent(request, pathname);
    }
    // Change: Sitemap/robots/ads.txt never load Auto ads.
    return nextWithContext(request, defaultLocale, pathname);
  }

  const { locale: pathLocale, path } = stripLocaleFromPath(pathname);
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  const preferred = resolvePreferredLocale({
    cookie: cookieLocale,
    country: requestCountry(request),
    acceptLanguage: request.headers.get("accept-language"),
  });

  if (pathname === "/" || pathname === "") {
    const target = localizedPath(preferred, "/qr-code-generator");
    return redirectWithContext(redirectTemporary(request, target), preferred, "/qr-code-generator");
  }

  if (!pathLocale) {
    const bare = path === "/" ? "/qr-code-generator" : path;
    const target = localizedPath(defaultLocale, bare);
    return redirectWithContext(redirectPermanent(request, target), defaultLocale, bare);
  }

  if (!isLocale(pathLocale)) {
    const target = localizedPath(defaultLocale, path);
    return redirectWithContext(redirectPermanent(request, target), defaultLocale, path);
  }

  const barePath = barePathFromLocalizedPathname(pathname) || path;

  if (request.nextUrl.hostname === `www.${CANONICAL_HOST}`) {
    return redirectWithContext(redirectPermanent(request, pathname), pathLocale, barePath);
  }

  return nextWithContext(request, pathLocale, barePath);
}
