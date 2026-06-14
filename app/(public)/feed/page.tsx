import { getPosts } from "@/app/helper/posts";
import Post from "@/components/main/Post";
const FeedPage = async () => {
  const posts = await getPosts();
  return (
    <>
      <Post posts={posts} />
    </>
  );
};

export default FeedPage;
