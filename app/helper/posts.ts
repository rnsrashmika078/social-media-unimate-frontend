import axios from "axios";
import { csrf } from "./auth";
import { api } from "@/lib/axios";
import { backEndConfig } from "@/config";

const URI = process.env.NEXT_PUBLIC_API_URL!;

export const getPosts = async ({
  page = 1,
  userId,
}: {
  page: number;
  userId?: number | undefined;
}) => {
  const res = await api.get(backEndConfig.POST.GET, {
    params: userId ? { page, userId } : { page },
  });
  return res.data ?? [];
};
export const getPostComments = async (data: { post_id: number }) => {
  const res = await api.get(backEndConfig.POST.GET_COMMENTS, {
    params: { post_id: data.post_id },
  });
  console.log("COMMENTS RES", res);
  return res.data.result.comments ?? [];
};
export const getPostLikes = async (data: { post_id: number }) => {
  try {
    const res = await axios.get(`${URI}/post/like/${data.post_id}`, {});
    return res.data.comments ?? [];
  } catch (err) {
    throw err;
  }
};
export const addComment = async (data: {
  post_id: number;
  user_id: number;
  comment: string;
}) => {
  const res = await api.post(backEndConfig.POST.ADD_COMMENT, {
    comment: data.comment,
    post_id: data.post_id,
    user_id: data.user_id,
  });
  return res.data;
};
export const addLike = async (data: { post_id: number; user_id: number }) => {
  try {
    const res = await api.post(backEndConfig.POST.LIKE, data);
    return res.data.result;
  } catch (err) {
    throw err;
  }
};
export const addPost = async (data: {
  user_id: number;
  content: string;
  attachment: string;
}) => {
  await csrf();
  const res = await api.post(backEndConfig.POST.ADD, data);
  return res.data;
};
export const deletePost = async (data: { postId: number }) => {
  try {
    const res = await axios.delete(`${URI}/post/${data.postId}`);

    return res.data;
  } catch (err) {
    throw err;
  }
};
export const uploadImage = async (file: File | null) => {
  try {
    if (!file) return;
    const res = await fetch("/api/upload");
    const { url } = await res.json();

    await fetch(url, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type,
      },
      body: file,
    });

    const imageUrl = url.split("?")[0];
    return imageUrl;
  } catch (err) {
    throw err;
  }
};
