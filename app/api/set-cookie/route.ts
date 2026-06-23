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
  const baseURL = process.env.NEXT_PUBLIC_API_URL!;
  return NextResponse.redirect(new URL("/feed", baseURL));
  // non prod request.nextUrl
}
