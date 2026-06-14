"use client";
import {
  addCommentsQuery,
  getCommentsQuery,
} from "@/app/queryOptions/postQuery";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import UserPlate from "./user_plate";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchemaType, commentSchema } from "@/app/schema/zodSchema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useQueryClient } from "@tanstack/react-query";
import React, { memo } from "react";
import { useAppContext } from "@/app/providers/appContext";
interface CommentSectionProps {
  postId: number;
}
const CommentSection = memo(({ postId }: CommentSectionProps) => {
  const queryClient = useQueryClient();

  const { data: comments } = useSuspenseQuery(getCommentsQuery(postId));
  console.log("CommentSection.tsx: Rendering!");
  const {
    register,
    handleSubmit,
    formState: {},
    reset,
  } = useForm<commentSchemaType>({
    resolver: zodResolver(commentSchema),
  });

  // tanstack mutation
  const { mutate: addComment } = useMutation(addCommentsQuery());
  const authUser = useSelector((store: RootState) => store.auth.authUser);

  const { setCommentCount } = useAppContext();

  // form submition
  const addCommentSubmit = async (data: commentSchemaType) => {
    if (!authUser?.id) {
      return;
    }
    addComment(
      {
        user_id: authUser?.id,
        post_id: postId,
        comment: data.comment,
      },
      {
        onError: (error) => {
          reset();
          toast.error(error.message);
        },
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries({
            queryKey: ["comments", postId],
          });
          setCommentCount((prev) => prev + 1);
        },
      },
    );
  };

  return (
    <div>
      {`Comments (${comments.length})`}
      <div className="items-end gap-2 w-full mt-2">
        <form onSubmit={handleSubmit(addCommentSubmit)}>
          <Input
            {...register("comment")}
            id="input-field-add-comment"
            type="text"
            className="p-5 pl-10 mt-2 mb-2 border border-gray-400 w-full "
            placeholder="Add your comment"
          />

          <div>
            <Button type="submit">Add</Button>
            <Button>Cancel</Button>
          </div>
        </form>
      </div>

      {/* <SearchIcon className="absolute top-1/2 text-icon-color -translate-y-1/2 left-2" /> */}
      {comments?.map((c) => (
        <div key={c.id}>
          <UserPlate
            comment={c.comment}
            date={c.created_at}
            datePosition={"bottom"}
            username={c.user.username}
            profileImage={c.user.dp}
            settings={false}
          />
        </div>
      ))}
    </div>
  );
});

CommentSection.displayName = "CommentSection";

export default CommentSection;
