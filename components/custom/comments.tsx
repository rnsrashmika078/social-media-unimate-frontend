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
import { IoMdSend } from "react-icons/io";
import { useAppContext } from "@/app/providers/appContext";
interface CommentSectionProps {
  postId: number;
}
const CommentSection = memo(({ postId }: CommentSectionProps) => {
  const queryClient = useQueryClient();

  const { data: comments } = useSuspenseQuery(getCommentsQuery(postId));
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
            queryKey: ["getPosts"],
          });
          queryClient.invalidateQueries({
            queryKey: ["comments", postId],
          });
        },
      },
    );
  };

  return (
    <>
      <hr className="mt-2" />

      {comments?.map((c) => (
        <div key={c.id} className="w-full mt-2">
          <UserPlate
            postId={c.post_id}
            comment={c.comment}
            date={c.created_at}
            datePosition={"bottom"}
            username={c.user.firstname + " " + c.user.lastname}
            profileImage={c.user.dp}
            settings={false}
          />
        </div>
      ))}
      <hr className="mt-2" />

      <div className="flex w-full  sticky -bottom-5 bg-post-background py-2">
        <form
          onSubmit={handleSubmit(addCommentSubmit)}
          className="w-full flex items-center gap-2"
        >
          <Input
            {...register("comment")}
            id="input-field-add-comment"
            type="text"
            className="flex p-5 pl-10 mt-2 mb-2 border border-gray-400 w-full "
            placeholder="Add your comment"
          />

          <Button type="submit" className="p-5">
            <IoMdSend size={50} />
          </Button>
        </form>
      </div>
    </>
  );
});

CommentSection.displayName = "CommentSection";

export default CommentSection;
