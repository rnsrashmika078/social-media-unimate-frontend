// ... your existing imports (e.g., import { ChatGroq } from "@langchain/groq")
// ... your existing code
import { ChatGroq } from "@langchain/groq";

export const llm = new ChatGroq({
  // apiKey: "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",
  apiKey: process.env.GROQ_API_KEY,
  // model: "meta-llama/llama-4-scout-17b-16e-instruct",
  model: "llama-3.3-70b-versatile",
  // maxTokens: 500,
  // maxRetries: 2,
});
export const imageModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,

  model: "meta-llama/llama-4-scout-17b-16e-instruct",
  // model: "llama-3.3-70b-versatile",
  // maxTokens: 500,
});
