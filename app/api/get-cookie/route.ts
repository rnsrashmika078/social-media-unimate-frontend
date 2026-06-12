import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  console.log("TONES", token);
  return NextResponse.json({
    success: true,
    token,
  });
}
