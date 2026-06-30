import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      {
        protocol: "https",
        hostname: "socialmediastorage1.blob.core.windows.net",
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
