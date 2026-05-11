import Post from "@/components/main/Post";
import React from "react";

const FeedLayout = () => {
  return (
    <div className="flex  w-screen h-screen justify-center items-center">
      <div className="flex-1 w-full h-full bg-red-500">Section 01</div>
      <div className="flex-2 w-full h-full overflow-y-auto">
        <Post />
        <Post />
      </div>
      <div className="flex-1 w-full h-full bg-green-500">Section 03</div>
    </div>
  );
};

export default FeedLayout;
