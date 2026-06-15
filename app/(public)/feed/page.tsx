import { getPosts } from "@/app/helper/posts";
import AddPost from "@/components/main/AddPost";
import Post from "@/components/main/Post";
const FeedPage = async () => {
  const posts = await getPosts();
  return (
    <>
      <AddPost />
      <Post posts={posts} />
    </>
  );
};

export default FeedPage;
