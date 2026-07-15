/* eslint-disable @typescript-eslint/no-explicit-any */
import { csrf } from "@/app/helper/auth";
import api from "@/lib/axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    // await csrf();
    const res = await api.post(`/auth/login`, {
      email: body.email,
      password: body.password,
    });

    (await cookies()).set("auth", "true", {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
    });

    console.log("result", res.data);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      { message: error.response?.data || "Login failed" },
      { status: error.response?.status || 500 },
    );
  }
}
