"use client";
import { useAppContext } from "@/app/providers/appContext";
import { addLikeQuery } from "@/app/queryOptions/postQuery";
import { RootState } from "@/app/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThumbsUp } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { Forward } from "lucide-react";
import dynamic from "next/dynamic";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CommentSection = dynamic(() => import("./comments"), {
  loading: () => <p>Loading</p>,
});
interface ReactBarProps {
  postId: number;
}

const ReactBar = memo(({ postId }: ReactBarProps) => {
  console.log("ReactBar.tsx: Rendering!");
  const queryClient = useQueryClient();
  const userId = useSelector((store: RootState) => store.auth.authUser?.id);

  const [openSection, setOpenSection] = useState<string>("");

  const { mutate: addLike } = useMutation(addLikeQuery());

  const { setLikeCount } = useAppContext();

  return (
    <div className="w-full select-none px-10 py-2">
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <ThumbsUp
            onClick={() => {
              if (!userId) return;
              addLike(
                { post_id: postId, user_id: userId },
                {
                  onSuccess: async (data) => {
                    // if (data.isLike) {
                    //   // queryClient.invalidateQueries({
                    //   //   queryKey: ["comments", postId],
                    //   // });

                    //   // setLikeCount((prev) => prev + 1);
                    //   return;
                    // }
                    // setLikeCount((prev) => prev - 1);
                    // return;

                    await axios.post(
                      "/api/revalidate",
                      {},
                      {
                        headers: {
                          Accept: "application/json",
                        },
                      },
                    );
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
