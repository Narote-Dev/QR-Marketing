"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { isClerkEnabled, isDevAuthEnabled } from "@/lib/clerk/config";
import { isDynamicQrEnabled } from "@/lib/dynamic-qr/config";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type Props = {
  locale: Locale;
  signInLabel: string;
  signUpLabel: string;
  devAuthLabel: string;
};

export function DynamicQrAuthChrome({ locale, signInLabel, signUpLabel, devAuthLabel }: Props) {
  if (!isDynamicQrEnabled()) {
    return null;
  }

  const generatorPath = localizedPath(locale, "/qr-code-generator");
  const signInPath = localizedPath(locale, "/sign-in");
  const signUpPath = localizedPath(locale, "/sign-up");

  if (isClerkEnabled()) {
    return (
      <div className="flex items-center gap-2">
        <SignedOut>
          <SignInButton mode="redirect" forceRedirectUrl={generatorPath}>
            <button
              type="button"
              className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-teal-dark"
            >
              {signInLabel}
            </button>
          </SignInButton>
          <Link
            href={signUpPath}
            className="hidden h-9 items-center rounded-lg px-3 text-sm font-medium text-slate-600 transition-colors hover:text-brand-coral sm:inline-flex"
          >
            {signUpLabel}
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl={generatorPath} />
        </SignedIn>
      </div>
    );
  }

  if (isDevAuthEnabled()) {
    return (
      <span
        className="hidden rounded-lg bg-amber-50 px-2 py-1 text-xs font-medium text-amber-900 md:inline"
        title="Local dev auth via X-Dev-User-Id"
      >
        {devAuthLabel}
      </span>
    );
  }

  return (
    <Link
      href={signInPath}
      className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-teal-dark"
    >
      {signInLabel}
    </Link>
  );
}
