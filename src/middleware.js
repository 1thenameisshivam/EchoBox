import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET,
  });
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname === "/signin" ||
      url.pathname === "/signup" ||
      url.pathname === "/verify" ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Proceed as usual if no redirects are needed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/signup", "/signin", "/verify/:path*", "/", "/dashboard/:path*"],
};
