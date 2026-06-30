import { Groq } from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("key", process.env.GROQ_API_KEY!);
  console.log("body", body);

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
Write social media post.

- Human tone, match user
- Hook + short content + optional hashtags
- Continue naturally if needed
- Use emojis
- Safe content only
- If image doesn't match topic, ignore image and write for topic

OUTPUT:
- Only post text
- No quotes, no code blocks, no explanations
- use markdown format
`,
      },
      {
        role: "user",
        content: body.content,
      },
    ],
    model: "llama-3.1-8b-instant",
    temperature: 1,
    top_p: 1,
    stream: false,
    stop: null,
  });

  const content = chatCompletion.choices[0]?.message?.content ?? "";
  console.log("content", content);

  return NextResponse.json({
    message: "success",
    content,
  });
}
