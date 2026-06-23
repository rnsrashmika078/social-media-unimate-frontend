import { HumanMessage } from "langchain";
import { NextResponse } from "next/server";
import { createAgent } from "langchain";
import { MemorySaver } from "@langchain/langgraph";

import { primaryTools } from "@/app/agents/tool/primaryTools";
import { ChatGroq } from "@langchain/groq";
const checkpointer = new MemorySaver();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body.input;

    const imageUrl = messages[1].url;

    const llm = new ChatGroq({
      apiKey: "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",
      // apiKey: process.env.GROQ_API_KEY,
      // model: "meta-llama/llama-4-scout-17b-16e-instruct",
      model: "llama-3.3-70b-versatile",
      // maxTokens: 500,
      // maxRetries: 2,
    });

    const input = {
      messages: [
        new HumanMessage({
          content: [{ type: "text", text: messages[0].content }],
        }),
      ],
    };

    const config = body.config;
    const mainAgent = createAgent({
      model: llm,
      tools: primaryTools,
      systemPrompt: !imageUrl
        ? `
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
`
        : `
Generate social media post from image.
Run ImageDescriber tool with: ${imageUrl}

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
      checkpointer,
    });

    const stream = await mainAgent.stream(input, {
      ...config,
      encoding: "text/event-stream",
      streamMode: [
        // "updates",
        "messages",
        // "values",
        // "checkpoints",
        // "tools",
        // "custom",
      ],
      recursionLimit: 6,
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    return NextResponse.json(
      {
        error:
          e instanceof Error
            ? e.message
            : "An error occurred while processing the request.",
      },
      { status: 500 },
    );
  }
}
