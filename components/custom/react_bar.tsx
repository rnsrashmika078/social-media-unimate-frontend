"use client";
import { addLikeQuery } from "@/app/queryOptions/postQuery";
import { RootState } from "@/app/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaThumbsUp } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import dynamic from "next/dynamic";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./spinner";
import { FaComments } from "react-icons/fa";

const CommentSection = dynamic(() => import("./comments"), {
  loading: () => <Spinner isLoading={true} />,
});
interface ReactBarProps {
  postId: number;
  likedUsersId: { id: number }[];
}

const ReactBar = memo(({ postId, likedUsersId }: ReactBarProps) => {
  const queryClient = useQueryClient();
  const userId = useSelector((store: RootState) => store.auth.authUser?.id);
  const [openSection, setOpenSection] = useState<string>("");
  const { mutate: addLike } = useMutation(addLikeQuery());

  const isLiked = useMemo(() => {
    if (!userId) return;
    return likedUsersId.map((u) => u.id === userId)[0];
  }, [userId, likedUsersId]);

  return (
    <div className="w-full select-none px-4 py-2 text-xs ">
      <div className="flex justify-between">
        <div className="flex flex-col items-center gap-2">
          <FaThumbsUp
            size={24}
            className={`cursor-pointer ${isLiked ? "animate-accordion-down text-blue-500 " : "text-icon-color"}`}
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
                },
              );
            }}
          />
          Like
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <FaComments
            size={24}
            className="text-icon-color"
            onClick={() =>
              setOpenSection((prev) => (prev === "comments" ? "" : "comments"))
            }
          />
          Comment
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <FaShare
            size={24}
            className="text-icon-color"
            onClick={() =>
              setOpenSection((prev) => (prev === "share" ? "" : "share"))
            }
          />
          Share
        </div>
      </div>
      {openSection === "comments" && <CommentSection postId={postId} />}
    </div>
  );
});
ReactBar.displayName = "ReactBar";

export default ReactBar;
