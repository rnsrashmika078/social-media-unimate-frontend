import { getPosts } from "@/app/helper/posts";
import { SkeletonAvatar } from "@/components/custom/skeletonAvatar";
import SkeletonCard from "@/components/custom/skeletonCard";
import dynamic from "next/dynamic";

const Post = dynamic(() => import("@/components/main/Post"), {
  loading: () => <SkeletonAvatar />,
});
const AddPost = dynamic(() => import("@/components/main/AddPost"), {
  loading: () => <SkeletonCard />,
});
const FeedPage = async () => {
  const posts = await getPosts({ page: 1 });

  return (
    <>
      <AddPost />
      <Post posts={posts.result} />
    </>
  );
};

export default FeedPage;
