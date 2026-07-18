import { getPosts } from "@/app/helper/posts";
import AddPost from "@/components/main/AddPost";
import Post from "@/components/main/Post";
const FeedPage = async () => {
  const posts = await getPosts({ page: 1 });
  console.log("re render FeedPage")

  return (
    <>
      <AddPost />
      <Post posts={posts?.data} />
    </>
  );
};

export default FeedPage;
