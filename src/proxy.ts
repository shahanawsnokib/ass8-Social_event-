import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

// Protected pages verify the session; Proxy only provides an optimistic cookie check.
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/events/create/:path*",
    "/my-plan/:path*",
    "/manage-events/:path*",
    "/profile/:path*"],
};
