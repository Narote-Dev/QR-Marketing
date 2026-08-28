"use client";

import { SignInButton, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { useCallback } from "react";
import { getDevAuthHeaders, isClerkEnabled, isDevAuthEnabled } from "@/lib/clerk/config";

export function DynamicQrAuthGate({
  signInLabel,
  signInIntro,
  children,
}: {
  signInLabel: string;
  signInIntro: string;
  children: React.ReactNode;
}) {
  if (isDevAuthEnabled() && !isClerkEnabled()) {
    return <>{children}</>;
  }

  if (!isClerkEnabled() && !isDevAuthEnabled()) {
    return (
      <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        {signInIntro}
      </p>
    );
  }

  return (
    <ClerkSignedInGate signInLabel={signInLabel} signInIntro={signInIntro}>
      {children}
    </ClerkSignedInGate>
  );
}

function ClerkSignedInGate({
  signInLabel,
  signInIntro,
  children,
}: {
  signInLabel: string;
  signInIntro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="mx-auto max-w-xl space-y-4 rounded-3xl border border-brand-teal/30 bg-white/80 p-6 text-center shadow-sm sm:p-8">
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{signInIntro}</p>
          <SignInButton mode="modal">
            <button
              type="button"
              className="inline-flex rounded-xl bg-brand-teal px-5 py-3 text-sm font-semibold text-white hover:bg-brand-teal-dark"
            >
              {signInLabel}
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}

export function useClerkDynamicQrAuth() {
  const { getToken, isSignedIn } = useAuth();

  const getAuthHeaders = useCallback(async (): Promise<Record<string, string>> => {
    if (isSignedIn) {
      const token = await getToken();
      if (token) return { Authorization: `Bearer ${token}` };
    }
    if (isDevAuthEnabled()) return getDevAuthHeaders();
    return {};
  }, [getToken, isSignedIn]);

  const isAuthenticated = isSignedIn || (isDevAuthEnabled() && !isClerkEnabled());

  return { getAuthHeaders, isAuthenticated };
}
