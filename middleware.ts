import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import {
  MARKET_OVERRIDE_COOKIE,
  getManualOverrideLocale,
  resolveAutomaticLocale,
} from "@/lib/i18n/market";
import { localeToPathPrefix, pathPrefixToLocale } from "@/lib/i18n/config";
import { routing } from "@/i18n/navigation";

const intlMiddleware = createMiddleware(routing);

const hasLocalePrefix = (pathname: string) =>
  Object.keys(pathPrefixToLocale).some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

export default function middleware(request: NextRequest) {
  if (hasLocalePrefix(request.nextUrl.pathname)) {
    return intlMiddleware(request);
  }

  const manualOverride = request.cookies.get(MARKET_OVERRIDE_COOKIE)?.value;
  const overrideLocale = getManualOverrideLocale(request.cookies);
  const locale = overrideLocale ?? resolveAutomaticLocale(request.headers);

  const url = request.nextUrl.clone();
  const localePrefix = localeToPathPrefix[locale];
  url.pathname = `${localePrefix}${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;

  const response = NextResponse.redirect(url);

  if (manualOverride !== "true") {
    response.cookies.set("NEXT_LOCALE", locale, {
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
