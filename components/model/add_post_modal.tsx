import React, { useMemo, useState } from "react";
import { FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { addPostQuery } from "@/app/queryOptions/postQuery";
import { RootState } from "@/app/store/store";
import { addPostSchema, addPostSchemaType } from "@/app/schema/zodSchema";
import { uploadImage } from "@/app/helper/posts";
import ErrorMessage from "../custom/error";
import { GrClose } from "react-icons/gr";
import { useAppContext } from "@/app/providers/appContext";
import { extractContent, replaceHash } from "@/app/helper/common";
import {
  FetchStreamTransport,
  useStream,
} from "@langchain/langgraph-sdk/react";

const AddPostModal = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<addPostSchemaType>({
    resolver: zodResolver(addPostSchema),
  });

  const transport = useMemo(() => {
    return new FetchStreamTransport({
      apiUrl: "/api/generative",
    });
  }, []);

  const stream = useStream({
    transport,
  });

  const contentGenerate = async () => {
    const thread_id = "chat-123";
    const url = await uploadImage(file);
    console.log("URL ", url);
    const content = getValues().content;

    if (!content) return;

    // const url =
    //   "https://res.cloudinary.com/dwcjokd3s/image/upload/v1755256165/images/nivpvznbqmybfmh6a2gn.jpg";
    // await stream.submit(
    //   {
    //     messages: [
    //       { content, role: "human" },
    //       url ? { url, role: "human" } : {},
    //     ],
    //     threadId: thread_id,
    //   },

    //   {
    //     config: {
    //       configurable: { thread_id },
    //     },
    //   },
    // );
  };

  const [file, setFile] = useState<File | null>(null);
  // const router = useRouter();
  // const dispatch = useDispatch<AppDispatch>();
  // tanstack mutation
  const { mutate } = useMutation(addPostQuery());
  const authUserId = useSelector((store: RootState) => store.auth.authUser?.id);

  const [url, setUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // form submition
  const onSubmit = async (data: addPostSchemaType) => {
    if (!authUserId) {
      return;
    }
    mutate(
      {
        user_id: authUserId,
        content: data.content,
        attachment: url || "",
      },
      {
        onError: (error) => {
          reset();
          toast.error(error.message);
        },
        onSuccess: (data) => {
          toast.success(data.message);
          setIsModelOpen(false);
          replaceHash();
          reset();
          queryClient.invalidateQueries({
            queryKey: ["getPosts"],
          });
        },
      },
    );
  };

  useMemo(() => {
    const content = stream.messages.map((msg) => {
      const textContent = extractContent(msg);
      setValues({ content: textContent });
      return textContent as string;
    });

    return content;
  }, [setValues, stream.messages]);

  const { setIsModelOpen } = useAppContext();

  return (
    <div className="z-50 p-5 select-none shadow-2xl border rounded-2xl bg-post-background w-1/2 h-fit  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-full flex justify-between">
        <h1 className="font-bold">Add Post</h1>
        <h1 className="font-bold text-icon-color cursor-pointer transition-all hover:scale-110">
          <GrClose
            onClick={() => {
              replaceHash();
              setIsModelOpen(false);
            }}
          />
        </h1>
      </div>
      <hr className="p-2"></hr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldLabel htmlFor=" input-field-profile-image">Attachment</FieldLabel>
        <Input
          type="file"
          className="mt-2 mb-2"
          onChange={async (e) => {
            setFile(e.target.files?.[0] || null);
            const url = await uploadImage(file);
            if (!url) return;
            setUrl(url);
          }}
        />
        <FieldLabel htmlFor="input-field-profile-image">Content</FieldLabel>
        <textarea
          {...register("content")}
          aria-label="description"
          placeholder="add your thought.."
          className={`resize-none rounded-2xl w-full h-full border  mt-2 pl-2 pt-2 ${stream.isLoading ? "animate-pulse" : ""}`}
          rows={5}
        />
        {errors.content && <ErrorMessage error={errors.content?.message} />}
        <Button type="submit">Post</Button>
        <Button
          type="button"
          onClick={() => {
            console.log("value", getValues().content);
            contentGenerate();
          }}
        >
          Generate
        </Button>
      </form>
    </div>
  );
};

export default AddPostModal;
