"use client";
import { memo } from "react";

interface PostStatusProps {
  likeCount: number | undefined;
  commentCount: number | undefined;
}
const PostStatus = memo(({ likeCount, commentCount }: PostStatusProps) => {
  return (
    <div className="flex justify-between px-5 py-2">
      {likeCount !== 0 && <p>{likeCount} likes</p>}
      {commentCount !== 0 && <p>{commentCount} comments</p>}
    </div>
  );
});
PostStatus.displayName = "PostStatus";

export default PostStatus;
