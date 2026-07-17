/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    (await cookies()).set("auth", "true", {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data || "Login failed" },
      { status: error.response?.status || 500 },
    );
  }
}
