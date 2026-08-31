import type { Metadata } from "next";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { defaultLocale, htmlLang, isLocale, localeCookieName } from "@/lib/i18n/config";
import { resolvePreferredLocale } from "@/lib/i18n/detect";
import { localizedPath } from "@/lib/i18n/paths";
import {
  getRedirectUnavailableCopy,
  parseRedirectUnavailableReason,
  type RedirectUnavailableReason,
} from "@/lib/redirect-unavailable/copy";

export const metadata: Metadata = {
  title: "Link unavailable",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams?: { reason?: string };
};

function requestCountry(headerStore: Headers): string | null {
  return headerStore.get("x-vercel-ip-country") ?? headerStore.get("cf-ipcountry");
}

export default async function RedirectUnavailablePage({ searchParams }: Props) {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const locale = resolvePreferredLocale({
    cookie: cookieStore.get(localeCookieName)?.value,
    country: requestCountry(headerStore),
    acceptLanguage: headerStore.get("accept-language"),
  });
  const resolvedLocale = isLocale(locale) ? locale : defaultLocale;
  const reason: RedirectUnavailableReason = parseRedirectUnavailableReason(searchParams?.reason);
  const copy = getRedirectUnavailableCopy(resolvedLocale);
  const generatorHref = localizedPath(resolvedLocale, "/qr-code-generator");

  return (
    <main
      lang={htmlLang[resolvedLocale]}
      className="mx-auto flex min-h-[100dvh] max-w-lg flex-col justify-center px-6 py-12"
    >
      <div className="rounded-3xl border border-brand-teal/20 bg-white/90 p-8 shadow-sm backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-teal-dark">genmyqrcode.com</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          {reason === "paused" ? copy.pausedHeading : copy.notFoundHeading}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          {reason === "paused" ? copy.pausedBody : copy.notFoundBody}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={generatorHref}
            className="inline-flex items-center justify-center rounded-xl bg-brand-teal px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-teal-dark"
          >
            {copy.generatorLink}
          </Link>
          <Link
            href={localizedPath(resolvedLocale, "/")}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            {copy.homeLink}
          </Link>
        </div>
      </div>
    </main>
  );
}
