import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  console.log("🔥 authUser HIT");

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  return NextResponse.json({ success: true, user: result });
}
