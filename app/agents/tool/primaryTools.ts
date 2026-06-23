import { createAgent, HumanMessage, tool } from "langchain";
import z from "zod";
import { imageModel } from "@/app/agents/model/languageModel";
import { ChatGroq } from "@langchain/groq";

export const ImageDescriber = tool(
  async ({ topic, image_url }: { image_url: string; topic: string }) => {
    try {
      console.log("Given image", image_url);
      const input = {
        messages: [
          new HumanMessage({
            content: [
              {
                type: "text",
                text: "based on the image generate content to social media post. no preamble",
              },
              {
                type: "image_url",
                image_url: {
                  url: image_url,
                },
              },
            ],
          }),
        ],
      };
      const imageModel = new ChatGroq({
        apiKey: "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",

        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        // model: "llama-3.3-70b-versatile",
        // maxTokens: 500,
      });
      const mainAgent = createAgent({
        model: imageModel,
      });

      const result = await mainAgent.invoke(input);
      const finalMessage = result.messages[result.messages.length - 1];

      return finalMessage.content;

      // if (writer) {
      //   writer("Calling Weather Tool...");
      // }
    } catch (error) {
      return `error : ${error instanceof Error ? error.message : "no internet connection"}`;
    }
  },
  {
    name: "ImageDescriber",
    description: "describe image",
    schema: z.object({
      image_url: z.string(),
    }),
  },
);
export const WeatherTool = tool(
  async ({ city }: { city: string }) => {
    try {
      return `Weather in ${location}: Sunny ☀️, 30°C (mock data)`;
    } catch (error) {
      return "Weather unavailable";
    }
  },
  {
    name: "WeatherTool",
    description: "Returns mock weather info as string",
    schema: z.object({
      city: z.string(),
    }),
  },
);
export const primaryTools = [ImageDescriber, WeatherTool];
