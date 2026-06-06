import { NextResponse, type NextRequest } from "next/server";
import { hasPermission } from "@rootfablink/auth";
import { isLocale, type Locale } from "@rootfablink/i18n";
import type { UserRole } from "@rootfablink/types";

const localeCookieName = "rootfablink_locale";
const supportedLocaleCodes = ["en", "tr", "ar", "zh", "ru", "de", "fr", "es", "ja"] as const;

const protectedRoutePermissions: Array<{ pattern: RegExp; permission?: Parameters<typeof hasPermission>[1] }> = [
  { pattern: /^\/(?:en|tr|ar|zh|ru|de|fr|es|ja)\/admin(?:\/|$)/, permission: "view_admin_dashboard" },
  { pattern: /^\/(?:en|tr|ar|zh|ru|de|fr|es|ja)\/dashboard(?:\/|$)/ }
];

const sessionCookieNames = ["__Host-rootfablink_session", "rootfablink_session"];
const roleCookieNames = ["__Host-rootfablink_role", "rootfablink_role"];

const countryLocaleMap: Record<string, Locale> = {
  TR: "tr",
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  DE: "de",
  AT: "de",
  CH: "de",
  FR: "fr",
  BE: "fr",
  LU: "fr",
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  SA: "ar",
  AE: "ar",
  QA: "ar",
  KW: "ar",
  BH: "ar",
  OM: "ar",
  IQ: "ar",
  JO: "ar",
  EG: "ar",
  MA: "ar",
  DZ: "ar",
  TN: "ar",
  CN: "zh",
  HK: "zh",
  TW: "zh",
  RU: "ru",
  KZ: "ru"
};

const publicAssetPrefixes = ["/api", "/auth", "/_next", "/images", "/brands", "/assets"];
const publicAssetFiles = ["/favicon.ico", "/robots.txt", "/sitemap.xml"];

function getLocale(pathname: string) {
  const locale = pathname.split("/")[1];
  return locale && isLocale(locale) ? locale : "en";
}

function pathnameHasLocale(pathname: string) {
  const firstSegment = pathname.split("/")[1];
  return Boolean(firstSegment && isLocale(firstSegment));
}

function shouldSkipLocaleMiddleware(pathname: string) {
  if (publicAssetFiles.includes(pathname)) return true;
  if (publicAssetPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return true;
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) return true;
  return false;
}

function readCookie(request: NextRequest, names: string[]) {
  for (const name of names) {
    const value = request.cookies.get(name)?.value;
    if (value) {
      return value;
    }
  }

  return undefined;
}

function validLocale(value?: string | null): Locale | undefined {
  if (!value) return undefined;
  return isLocale(value) ? value : undefined;
}

function localeFromCountry(request: NextRequest) {
  const country = (
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("x-country-code") ??
    ""
  ).toUpperCase();

  return countryLocaleMap[country];
}

function localeFromAcceptLanguage(request: NextRequest): Locale | undefined {
  const header = request.headers.get("accept-language");
  if (!header) return undefined;

  const preferredLanguages = header
    .split(",")
    .map((item) => item.trim().split(";")[0]?.toLowerCase())
    .filter((language): language is string => Boolean(language));

  for (const language of preferredLanguages) {
    const baseLanguage = language.split("-")[0];
    if (baseLanguage && supportedLocaleCodes.includes(baseLanguage as (typeof supportedLocaleCodes)[number])) {
      return baseLanguage as Locale;
    }
  }

  return undefined;
}

function detectLocale(request: NextRequest): Locale {
  return (
    validLocale(request.cookies.get(localeCookieName)?.value) ??
    localeFromCountry(request) ??
    localeFromAcceptLanguage(request) ??
    "en"
  );
}

function redirectToDetectedLocale(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (shouldSkipLocaleMiddleware(pathname) || pathnameHasLocale(pathname)) {
    return undefined;
  }

  const locale = detectLocale(request);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  redirectUrl.search = search;
  return NextResponse.redirect(redirectUrl);
}

export function middleware(request: NextRequest) {
  const localeRedirect = redirectToDetectedLocale(request);
  if (localeRedirect) {
    return localeRedirect;
  }

  const { pathname } = request.nextUrl;
  const matchedRoute = protectedRoutePermissions.find(({ pattern }) => pattern.test(pathname));

  if (!matchedRoute) {
    return NextResponse.next();
  }

  const sessionToken = readCookie(request, sessionCookieNames);
  const locale = getLocale(pathname);

  if (!sessionToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/auth/login`;
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = readCookie(request, roleCookieNames) as UserRole | undefined;

  if (matchedRoute.permission && (!role || !hasPermission(role, matchedRoute.permission))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]
};
