import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getProfile from "./utils/getProfile";

const authRoutes = [
  "/login",
  "/forgot-password",
  "/otp-verify",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const origin = request.nextUrl.origin;

  // get the token from the cookie
  const token = request.cookies.get("accessToken")?.value;

  // If there's no token, redirect unauthorized users to the login page
  if (!token) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      const loginUrl = new URL(`/login?redirect=${pathname}`, origin);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Get the current user from the session
  const user = await getProfile();

  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      request.cookies.delete("accessToken");
      const loginUrl = new URL(`/login?redirect=${pathname}`, origin);
      return NextResponse.redirect(loginUrl);
    }
  }

  // prevent authorized users from accessing unauthorized routes
  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", origin));
  }

  // allow super admin to access all routes
  if (user?.role === "SUPER_ADMIN") return NextResponse.next();

  // Check role-based access
  if (user?.role && user?.adminaccess?.length > 0) {
    const allowedRoutes = user.adminaccess;

    const hasAccess = allowedRoutes.some((route) =>
      typeof route === "string" ? pathname === route : pathname.match(route)
    );

    if (hasAccess) return NextResponse.next();
  }

  // Default redirect if access is denied
  const defaultRedirectUrl = new URL("/not-allowed", origin);
  return NextResponse.redirect(defaultRedirectUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (Next.js static files)
     * - _next/image (Next.js image optimization files)
     * - favicon.ico (favicon file)
     * - Any path containing a period (e.g., .png, .jpg, .css, .js)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|not-allowed|user/download-user-list).*)",
  ],
};
