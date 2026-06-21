import { RootState } from "@/app/store/store";
import { PostType } from "@/app/types/globalTypes";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";

interface PostStatusProps {
  likeCount: number;
  commentCount: number;
}
const PostStatus = memo(
  ({ likeCount, commentCount }: PostStatusProps) => {
   

    
    return (
      <div className="flex justify-between px-5 py-2">
        {likeCount !== 0 && <p>{likeCount} likes</p>}
        {commentCount !== 0 && <p>{commentCount} comments</p>}
      </div>
    );
  },
);
PostStatus.displayName = "PostStatus";

export default PostStatus;
