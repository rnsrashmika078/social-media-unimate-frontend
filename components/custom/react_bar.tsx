"use client";
import { addLikeQuery } from "@/app/queryOptions/postQuery";
import { RootState } from "@/app/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ThumbsUp } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { Forward } from "lucide-react";
import dynamic from "next/dynamic";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./spinner";

const CommentSection = dynamic(() => import("./comments"), {
  loading: () => <Spinner isLoading={true} />,
});
interface ReactBarProps {
  postId: number;
  likedUsersId: { id: number }[];
}

const ReactBar = memo(({ postId, likedUsersId }: ReactBarProps) => {
  console.log("ReactBar.tsx: Rendering!");
  const queryClient = useQueryClient();
  const userId = useSelector((store: RootState) => store.auth.authUser?.id);
  const [openSection, setOpenSection] = useState<string>("");
  const { mutate: addLike } = useMutation(addLikeQuery());

  const isLiked = useMemo(() => {
    if (!userId) return;
    return likedUsersId.map((u) => u.id === userId)[0];
  }, [userId, likedUsersId]);

  return (
    <div className="w-full select-none px-10 py-2">
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <ThumbsUp
            className={`cursor-pointer ${isLiked ? "animate-accordion-down text-blue-500" : "text-icon-color"}`}
            onClick={() => {
              if (!userId) return;
              addLike(
                { post_id: postId, user_id: userId },
                {
                  onSuccess: async () => {
                    queryClient.invalidateQueries({
                      queryKey: ["getPosts"],
                    });
                  },
                  // onError: (data) => alert(JSON.stringify(data)),
                },
              );
            }}
          />
          Like
        </div>
        <div className="flex flex-col items-center">
          <MessageCircleMore
            className="text-icon-color"
            onClick={() => setOpenSection("comments")}
          />
          Comment
        </div>
        <div className="flex flex-col items-center">
          <Forward className="text-icon-color" />
          Share
        </div>
      </div>
      {openSection === "comments" && <CommentSection postId={postId} />}
    </div>
  );
});
ReactBar.displayName = "ReactBar";

export default ReactBar;
