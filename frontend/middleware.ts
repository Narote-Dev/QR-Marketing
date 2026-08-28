import { NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { runLocaleMiddleware } from "@/lib/i18n/locale-middleware";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim());

function localeOnlyMiddleware(request: NextRequest) {
  return runLocaleMiddleware(request);
}

export default clerkEnabled
  ? clerkMiddleware(async (_auth, request) => {
      // Account pages use DynamicQrAuthGate for sign-in UX; API enforces JWT.
      return runLocaleMiddleware(request);
    })
  : localeOnlyMiddleware;

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)", "/"],
};
