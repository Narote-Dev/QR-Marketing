import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, localeCookieName, type Locale } from "@/lib/i18n/config";
import { resolvePreferredLocale } from "@/lib/i18n/detect";
import { isExemptPath, localizedPath, stripLocaleFromPath } from "@/lib/i18n/paths";

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

/** Step 1: Expose the resolved locale to the root layout for SSR html lang. */
function setRequestLocaleHeader(response: NextResponse, locale: Locale): NextResponse {
  response.headers.set("x-locale", locale);
  return response;
}

function withLocaleContext(response: NextResponse, locale: Locale): NextResponse {
  return setRequestLocaleHeader(setLocaleCookie(response, locale), locale);
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
      return withLocaleContext(NextResponse.next(), preferred);
    }
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

  if (pathname === "/" || pathname === "") {
    const target = localizedPath(preferred, "/qr-code-generator");
    return withLocaleContext(redirectTemporary(request, target), preferred);
  }

  if (!pathLocale) {
    const target = localizedPath(defaultLocale, path === "/" ? "/qr-code-generator" : path);
    return withLocaleContext(redirectPermanent(request, target), defaultLocale);
  }

  if (!isLocale(pathLocale)) {
    const target = localizedPath(defaultLocale, path);
    return withLocaleContext(redirectPermanent(request, target), defaultLocale);
  }

  if (request.nextUrl.hostname === `www.${CANONICAL_HOST}`) {
    return withLocaleContext(redirectPermanent(request, pathname), pathLocale);
  }

  return withLocaleContext(NextResponse.next(), pathLocale);
}
