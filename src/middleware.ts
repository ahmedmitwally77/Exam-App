import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register", "/forgot-password"];
const protectedRoutes = ["^/dashboard.*$"];

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Check for protected routes
  if (
    protectedRoutes.some((route) =>
      new RegExp(route).test(request.nextUrl.pathname)
    )
  ) {
    if (token) return NextResponse.next();

    const redirectUrl = new URL("/login", request.nextUrl.origin); //  x.com/login
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname); //  x.com/login?callbackUrl=/dashboard
    return NextResponse.redirect(redirectUrl);
  }

  // Check for auth routes
  if (authRoutes.includes(request.nextUrl.pathname)) {
    if (!token) return NextResponse.next();
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes / Route Handlers)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
