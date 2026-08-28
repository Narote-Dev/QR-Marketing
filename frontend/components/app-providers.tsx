"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { getClerkPublishableKey, isClerkEnabled } from "@/lib/clerk/config";

type Props = {
  children: React.ReactNode;
};

export function AppProviders({ children }: Props) {
  if (!isClerkEnabled()) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={getClerkPublishableKey()} afterSignOutUrl="/en/qr-code-generator">
      {children}
    </ClerkProvider>
  );
}
