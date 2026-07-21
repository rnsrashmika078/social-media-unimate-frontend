"use client";
import dynamic from "next/dynamic";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { PostType } from "@/app/types/globalTypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/app/helper/posts";
import { useInView } from "framer-motion";
import Bottom from "./Bottom";

const UserPlate = dynamic(() => import("../custom/user_plate"), { ssr: false });
const ReactBar = dynamic(() => import("../custom/react_bar"), { ssr: false });

const Description = dynamic(() => import("../custom/description"), {
  ssr: false,
});
const Card = dynamic(() => import("../custom/card"), { ssr: false });
const PostStatus = dynamic(() => import("../custom/postStatus"), {
  ssr: false,
});
const NotFound = dynamic(() => import("../custom/NotFound"), { ssr: false });
const Spinner = dynamic(() => import("../custom/spinner"), { ssr: false });

const Post = memo(
  ({ posts, userId }: { posts: PostType[]; userId?: number | undefined }) => {
    const infiniteScroll = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(infiniteScroll, { once: false });
    const [likedUser, setLikedUser] = useState<{ id: number }[] | undefined>(
      undefined,
    );
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useInfiniteQuery({
        queryKey: ["getPosts", userId],
        queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam, userId }),
        initialPageParam: 1,
        initialData: {
          pages: [
            {
              result: posts,
              currentPage: 1,
              hasMore: true,
            },
          ],
          pageParams: [1],
        },

        getNextPageParam: (lastPage) => {
          if (!lastPage) return;
          return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
        },
      });

    const allPosts = useMemo(() => {
      return data?.pages.flatMap((page) => page.result) as PostType[];
    }, [data?.pages]);

    useEffect(() => {
      if (!isInView) return;
      if (!hasNextPage) return;
      if (isFetchingNextPage) return;
      const fetchWait = async () => {
        fetchNextPage();
      };
      fetchWait();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isInView]);

    useEffect(() => {
      setLikedUser(allPosts.flatMap((p) => p.liked_by_users));
    }, [allPosts]);

    if (!allPosts || allPosts?.length === 0) return <NotFound />;

    return (
      <div className="select-auto">
        {allPosts.map((p) => {
          if (!p?.user) return;
          return (
            <div
              className="border rounded-2xl p-5 mt-2 bg-post-background"
              key={p.id}
            >
              {/* date may thrw hydration error */}
              <UserPlate
                postId={p.id}
                username={p.user.firstname + " " + p.user.lastname}
                jobTitle="Undergraduate"
                profileImage={p.user.dp}
                date={p.created_at}
                datePosition="bottom"
                settings={true}
              />
              <Description desc={p.content} />
              {p.attachment && <Card title={p.content} image={p.attachment} />}
              <Bottom
                comments_count={p.comments_count}
                liked_by_users={p.liked_by_users}
                liked_by_users_count={p.liked_by_users_count}
                postId={p.id}
              />
            </div>
          );
        })}
        <div ref={infiniteScroll}></div>
        <Spinner isLoading={isInView && hasNextPage} />
      </div>
    );
  },
);

Post.displayName = "Post";

export default Post;
