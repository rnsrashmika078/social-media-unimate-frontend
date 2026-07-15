import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const cookie = req.cookies.get("auth")?.value;

  const isAuthenticated = cookie === "true" ? true : false;

  const protectedRoutes = ["/feed"];

  const publicRoutes = ["/sign-in", "/sign-up"];

  const path = req.nextUrl.pathname;

  for (const route of protectedRoutes) {
    if (path.startsWith(route) && !isAuthenticated) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  //prevent from sign in again ( if not logged out )
  for (const route of publicRoutes) {
    if (path.startsWith(route) && isAuthenticated) {
      return NextResponse.redirect(new URL("/feed", req.url));
    }
  }

  return NextResponse.next();
}
