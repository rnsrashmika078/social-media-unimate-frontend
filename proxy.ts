import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/feed"];

  const publicRoutes = ["/sign-in", "/sign-up"];

  const path = req.nextUrl.pathname;

  for (const route of protectedRoutes) {
    if (path.startsWith(route) && !token) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  //prevent from sign in again ( if not logged out )
  for (const route of publicRoutes) {
    if (path.startsWith(route) && token) {
      return NextResponse.redirect(new URL("/feed", req.url));
    }
  }

  return NextResponse.next();
}
