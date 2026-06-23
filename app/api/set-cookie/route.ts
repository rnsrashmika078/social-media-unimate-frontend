import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  (await cookies()).set("token", body.token, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
  });

  // return NextResponse.json({
  //   success: true,
  // });
  return NextResponse.redirect(new URL("/feed", request.url));
}
