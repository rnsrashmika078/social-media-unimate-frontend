import { revalidateTag } from "next/cache";

export async function POST() {

  revalidateTag("posts", "max");

  return Response.json({ success: true });
}
