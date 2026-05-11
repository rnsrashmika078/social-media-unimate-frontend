"use client";

import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { Forward } from "lucide-react";
import dynamic from "next/dynamic";

const CommentSection = dynamic(() => import("./comment_section"), {
  loading: () => <p>Loading Comments..</p>,
  //   ssr:false
});
const ReactBar = () => {
  // CSO stands for Comment Section Open
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col justify-between px-4 py-5 w-full h-full">
      <div className="flex justify-between">
        <ThumbsUp />
        <MessageCircleMore onClick={() => setIsCommentsOpen((prev) => !prev)} />
        <Forward />
      </div>
      {isCommentsOpen && <CommentSection isCommentsOpen={isCommentsOpen} />}
    </div>
  );
};

export default ReactBar;
