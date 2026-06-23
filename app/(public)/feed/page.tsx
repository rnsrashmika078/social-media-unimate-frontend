import { getPosts } from "@/app/helper/posts";
import AddPost from "@/components/main/AddPost";
import Post from "@/components/main/Post";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
const FeedPage = async () => {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ["getPosts"],
  //   queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam }),
  //   initialPageParam: 1,
  // });
  // const dehydratedState = dehydrate(queryClient);

  // const posts = getPosts({ page: 1 }, {});
  // let allPosts = [];
  const posts = await getPosts({ page: 1 });
  // if (posts.posts) {
  //   allPosts = posts.posts.value.data;
  // }

  // console.log("ALL POSTS", posts.data);
  return (
    <>
      {/* <HydrationBoundary state={dehydratedState}> */}
      <AddPost />
      <Post posts={posts.data} />
      {/* </HydrationBoundary> */}
    </>
  );
};

export default FeedPage;
