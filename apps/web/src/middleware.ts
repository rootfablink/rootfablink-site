import { NextResponse, type NextRequest } from "next/server";
import { hasPermission } from "@rootfablink/auth";
import type { UserRole } from "@rootfablink/types";

const protectedRoutePermissions: Array<{ pattern: RegExp; permission?: Parameters<typeof hasPermission>[1] }> = [
  { pattern: /^\/(?:en|tr)\/admin(?:\/|$)/, permission: "view_admin_dashboard" },
  { pattern: /^\/(?:en|tr)\/dashboard(?:\/|$)/ }
];

const sessionCookieNames = ["__Host-rootfablink_session", "rootfablink_session"];
const roleCookieNames = ["__Host-rootfablink_role", "rootfablink_role"];

function getLocale(pathname: string) {
  const locale = pathname.split("/")[1];
  return locale === "tr" || locale === "en" ? locale : "en";
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
  matcher: ["/:locale(en|tr)/admin/:path*", "/:locale(en|tr)/admin", "/:locale(en|tr)/dashboard/:path*", "/:locale(en|tr)/dashboard"]
};
