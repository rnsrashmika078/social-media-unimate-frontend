"use client";
import { useAppContext } from "@/app/providers/appContext";
import { useEffect } from "react";

interface PostStatusProps {
  likeCount: number;
  commentCount: number;
}
const PostStatus = ({ likeCount, commentCount }: PostStatusProps) => {
  // const {
  //   setLikeCount,
  //   setCommentCount,
  //   commentCount: comCount,
  //   likeCount: liCount,
  // } = useAppContext();

  // useEffect(() => {
  //   setLikeCount(likeCount);
  //   setCommentCount(commentCount);
  // }, []);

  return (
    <div className="flex justify-between px-5 py-2">
      {/* {liCount !== 0 && <p>{liCount} likes</p>} */}
      {likeCount} LIKES
      {/* {comCount !== 0 && <p>{comCount} comments</p>} */}
    </div>
  );
};

export default PostStatus;
