"use client";
import React, { memo, useEffect, useMemo, useRef } from "react";
import UserPlate from "../custom/user_plate";
import Card from "../custom/card";
import Description from "../custom/description";
import ReactBar from "../custom/react_bar";
import { PostType } from "@/app/types/globalTypes";
import PostStatus from "../custom/postStatus";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/app/helper/posts";
import { useInView } from "framer-motion";
import Spinner from "../custom/spinner";

const Post = memo(
  ({ posts, userId }: { posts?: PostType[]; userId?: number | undefined }) => {
    const infiniteScroll = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(infiniteScroll, { once: false });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useInfiniteQuery({
        queryKey: ["getPosts", userId],
        queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam, userId }),
        initialPageParam: 1,
        initialData: {
          pages: [
            {
              data: posts,
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
      return data?.pages.flatMap((page) => page?.data) as PostType[];
    }, [data?.pages]);

    useEffect(() => {
      if (!isInView) return;
      if (!hasNextPage) return;
      if (isFetchingNextPage) return;
      const fetchWait = async () => {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        fetchNextPage();
      };
      fetchWait();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isInView]);

    console.log("allPosts", allPosts);
    return (
      <div className="select-auto">
        {allPosts && allPosts.length > 0 ? (
          allPosts.map((p) => {
            if (!p?.user) return;
            return (
              <div
                className="border rounded-2xl p-5 mt-2 bg-post-background"
                key={p.id}
              >
                {/* date may htrow hydration error */}
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
                {p.attachment && (
                  <Card title={p.content} image={p.attachment} />
                )}
                <PostStatus
                  commentCount={p.comments_count}
                  likeCount={p.liked_by_users_count}
                />
                <hr className=""></hr>
                <ReactBar postId={p.id} likedUsersId={p.liked_by_users} />
              </div>
            );
          })
        ) : (
          <div className="text-center mt-5">
            Hmm...It looks like feed is empty
          </div>
        )}
        <div ref={infiniteScroll}></div>
        <Spinner isLoading={isInView && hasNextPage} />
      </div>
    );
  },
);

Post.displayName = "Post";

export default Post;
