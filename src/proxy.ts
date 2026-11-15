import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// Redirect visitors without a session cookie; protected pages verify the session too.
export async function proxy(request: NextRequest) {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  // if (!getSessionCookie(request)) {
  //   return NextResponse.redirect(new URL("/login", request.url));

  // }
   const user = session?.user
   if(!user){
     return NextResponse.redirect(new URL("/login", request.url));
   }
   
    
  // return NextResponse.next();
}

export const config = {
  matcher: ["/events/create/:path*",
    "/my-plan/:path*",
    "/manage-events/:path*",
    "/profile/:path*",
    "/events/:path*"],
};
