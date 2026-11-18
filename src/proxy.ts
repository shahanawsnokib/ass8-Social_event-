import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

// Protected pages verify the session; Proxy only provides an optimistic cookie check.
export function proxy(request: NextRequest) {
  const hasSession = Boolean(getSessionCookie(request));
  const isAuthPage = ["/login", "/sign-up"].includes(request.nextUrl.pathname);

  if (hasSession && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!hasSession && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/sign-up",
    "/events/create/:path*",
    "/my-plan/:path*",
    "/manage-events/:path*",
    "/profile/:path*",
  ],
};
