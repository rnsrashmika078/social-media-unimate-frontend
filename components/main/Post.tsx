import React, { memo } from "react";
import UserPlate from "../custom/user_plate";
import Card from "../custom/card";
import Description from "../custom/description";
import ReactBar from "../custom/react_bar";
import { PostType } from "@/app/types/globalTypes";
import PostStatus from "../custom/postStatus";
interface PostsType {
  posts?: PostType[];
}
const Post = memo(({ posts }: PostsType) => {
  console.log("Post.tsx: Rendering!");
  console.log(`posts: !`, posts);

  return (
    <div className="">
      {posts && posts.length > 0 ? (
        posts.map((p) => (
          <div
            className="border rounded-2xl p-5 mt-2 bg-post-background"
            key={p.id}
          >
            <UserPlate
              username={p.user.firstname + " " + p.user.lastname}
              jobTitle="Undergraduate"
              profileImage={p.user.dp}
              settings={true}
            />
            <Description desc={p.content} />
            <Card title={p.content} image={p.attachment} />
            <PostStatus
              commentCount={p.comments_count}
              likeCount={p.liked_by_users_count}
            />
            <hr className="mt-2"></hr>
            <ReactBar
              postId={p.id}
              // likedCount={p.liked_by_users_count}
              // commentCount={p.comments_count}
            />
          </div>
        ))
      ) : (
        <div>NO POSTS AVAILABLE</div>
      )}
    </div>
  );
});

Post.displayName = "Post";

export default Post;
