import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  (await cookies()).set("token", body.token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return NextResponse.json({
    success: true,
  });
}
