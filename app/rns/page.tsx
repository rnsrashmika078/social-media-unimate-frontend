"use client";
import { useMemo } from "react";
import {
  FetchStreamTransport,
  useStream,
} from "@langchain/langgraph-sdk/react";
import { extractContent } from "../helper/common";

import { v4 as uuid } from "uuid";
export default function Home() {
  const transport = useMemo(() => {
    return new FetchStreamTransport({
      // apiUrl: "http://localhost:3000/api/chat",
      apiUrl: "/api/generative",
      // apiUrl: "http://localhost:2024",
      // assistantId: "agent",
    });
  }, []);
  const stream = useStream({
    transport,
  });

  const handleSubmit = async (content: string) => {
    const thread_id = uuid();
    const url = "";
    // const url =
    //   "https://res.cloudinary.com/dwcjokd3s/image/upload/v1755256165/images/nivpvznbqmybfmh6a2gn.jpg";
    await stream.submit(
      {
        messages: [
          { content, role: "human" },
          url ? { url, role: "human" } : {},
        ],
      },
      {
        config: {
          configurable: { thread_id },
        },
      },
    );
  };

  return (
    <div className="text-xs items-center justify-between flex h-screen flex-col w-full p-5">
      <div>
        {stream.messages.map((msg) => {
          const textContent = extractContent(msg);
          return <div key={msg.id}>{textContent as string}</div>;
        })}
      </div>
      <input
        aria-label="prompt inject field"
        className="border p-5"
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const content = e.currentTarget.value;
            handleSubmit(content);
          }
        }}
      ></input>
    </div>
  );
}
