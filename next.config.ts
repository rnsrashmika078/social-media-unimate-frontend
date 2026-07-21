import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      {
        protocol: "https",
        hostname: "socialmediaapp.blob.core.windows.net",
      },
    ],
  },
  serverExternalPackages: [
    "langchain",
    "@langchain/langgraph",
    "@langchain/groq",
  ],
};

export default nextConfig;
