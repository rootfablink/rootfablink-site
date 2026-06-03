import { NextResponse, type NextRequest } from "next/server";
import { hasPermission } from "@rootfablink/auth";
import { isLocale } from "@rootfablink/i18n";
import type { UserRole } from "@rootfablink/types";

const protectedRoutePermissions: Array<{ pattern: RegExp; permission?: Parameters<typeof hasPermission>[1] }> = [
  { pattern: /^\/(?:en|tr|ar|zh|ru|de|fr|es|ja)\/admin(?:\/|$)/, permission: "view_admin_dashboard" },
  { pattern: /^\/(?:en|tr|ar|zh|ru|de|fr|es|ja)\/dashboard(?:\/|$)/ }
];

const sessionCookieNames = ["__Host-rootfablink_session", "rootfablink_session"];
const roleCookieNames = ["__Host-rootfablink_role", "rootfablink_role"];

function getLocale(pathname: string) {
  const locale = pathname.split("/")[1];
  return locale && isLocale(locale) ? locale : "en";
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

export function middleware(request: NextRequest) {
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
  matcher: ["/:locale/admin/:path*", "/:locale/admin", "/:locale/dashboard/:path*", "/:locale/dashboard"]
};
