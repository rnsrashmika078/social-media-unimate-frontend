import { getPosts } from "@/app/helper/posts";
import AddPost from "@/components/main/AddPost";
import Post from "@/components/main/Post";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
const FeedPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["getPosts"],
    queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam }),
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <AddPost />
        <Post />
      </HydrationBoundary>
    </>
  );
};

export default FeedPage;
