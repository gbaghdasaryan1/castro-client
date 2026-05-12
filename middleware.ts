import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("MIDDLEWARE RUN:", request.nextUrl.pathname);

  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login", "/register", "/forgot-password", "/auth/google/callback"];
  const isPublicPage = publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};