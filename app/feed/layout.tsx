import Post from "@/components/main/Post";
import React, { ReactNode } from "react";

interface FeedLayoutProps {
  left: ReactNode;
  children: ReactNode;
  right: ReactNode;
}
const FeedLayout = ({ left, children, right }: FeedLayoutProps) => {
  return (
    <div className="flex  w-screen h-screen justify-center items-center">
      <div className="flex-0 md:flex-1 w-full h-full bg-red-500">{left}</div>
      <div className="flex-2 w-full h-full overflow-y-auto">{children}</div>
      <div className="flex-0 md:flex-1 w-full h-full bg-green-500">{right}</div>
    </div>
  );
};

export default FeedLayout;
