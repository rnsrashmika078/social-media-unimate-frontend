import React, { useMemo, useState } from "react";
import { FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
import { replaceHash } from "@/app/helper/common";
import {
  FetchStreamTransport,
  useStream,
} from "@langchain/langgraph-sdk/react";
import { useModalContext } from "@/app/providers/ModalProvider";

const AddPostModal = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValues,
    formState: { errors },
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
  const [newContent, setNewContent] = useState<string>("");

  const contentGenerate = async () => {
    const content = getValues().content;

    if (!content && !url) return;

    const result = await fetch("/api/simple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, url }),
    });

    const cont = await result.json();
    setNewContent(cont.content);
    setValues({ content: cont.content });
  };

  const { mutate } = useMutation(addPostQuery());
  const authUserId = useSelector((store: RootState) => store.auth.authUser?.id);

  const [url, setUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // form submition
  const onSubmit = async (data: addPostSchemaType) => {
    if (!authUserId) {
      return;
    }
    alert(JSON.stringify(data));

    mutate(
      {
        user_id: authUserId,
        content: newContent === "" ? data.content : newContent,
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

  // useMemo(() => {
  //   const content = stream.messages.map((msg) => {
  //     const textContent = extractContent(msg);
  //     setValues({ content: textContent });
  //     return textContent as string;
  //   });

  //   return content;
  // }, [setValues, stream.messages]);

  const { setIsModelOpen } = useModalContext();

  return (
    <div className="fixed z-50 left-0 top-0 w-full h-full bg-opacity-50 backdrop-blur-sm">
      <div className="fixed  z-50 p-5 select-none border rounded-2xl bg-post-background w-1/2 h-fit   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
          <FieldLabel htmlFor=" input-field-profile-image">
            Attachment
          </FieldLabel>
          <Input
            type="file"
            className="mt-2 mb-2"
            onChange={async (e) => {
              const file = e.target.files?.[0] || null;
              if (!file) return;
              const url = await uploadImage(file);
              setUrl(url || null);
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
              contentGenerate();
            }}
          >
            Generate
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
