import React, { memo, useEffect, useState } from "react";
import PostStatus from "../custom/postStatus";
import ReactBar from "../custom/react_bar";

const Bottom = memo(
  ({
    comments_count,
    liked_by_users_count,
    postId,
    liked_by_users,
  }: {
    comments_count: number;
    liked_by_users_count: number;
    postId: number;
    liked_by_users: { id: number }[];
  }) => {
    const [likedUsers, setLikedUsers] = useState<{ id: number }[] | undefined>(
      undefined,
    );

    useEffect(() => {
      const init = () => {
        setLikedUsers(liked_by_users);
      };
      init();
    }, [liked_by_users, liked_by_users_count]);

    console.log(liked_by_users.length);
    return (
      <>
        <PostStatus
          commentCount={comments_count}
          likeCount={likedUsers?.length}
        />
        <hr className=""></hr>
        <ReactBar
          postId={postId}
          likedUsers={likedUsers}
          setLikedUsers={setLikedUsers}
        />
      </>
    );
  },
);
Bottom.displayName = "Bottom";

export default Bottom;
