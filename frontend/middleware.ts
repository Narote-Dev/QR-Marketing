import { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { runLocaleMiddleware } from "@/lib/i18n/locale-middleware";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim());
const dynamicEnabled = process.env.NEXT_PUBLIC_ENABLE_DYNAMIC_QR === "true";
const devAuthEnabled = process.env.NEXT_PUBLIC_DYNAMIC_QR_DEV_AUTH === "true";

const isProtectedDynamicRoute = createRouteMatcher([
  "/(en|th|zh)/my/dynamic-qr(.*)",
  "/(en|th|zh)/dynamic-qr/manage(.*)",
]);

function localeOnlyMiddleware(request: NextRequest) {
  return runLocaleMiddleware(request);
}

export default clerkEnabled
  ? clerkMiddleware(async (auth, request) => {
      const localeResponse = runLocaleMiddleware(request);
      if (dynamicEnabled && !devAuthEnabled && isProtectedDynamicRoute(request)) {
        auth().protect();
      }
      return localeResponse;
    })
  : localeOnlyMiddleware;

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)", "/"],
};
