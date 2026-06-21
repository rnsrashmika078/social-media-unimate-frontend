import axios from "axios";

const URI = process.env.NEXT_PUBLIC_API_URL!;
export const getPosts = async ({ page = 1 }) => {
  try {
    const res = await axios.get(`${URI}/post?page=${page}`, {});
    return res.data ?? [];
  } catch (err) {}
};
export const getPostComments = async (data: { post_id: number }) => {
  const res = await axios.get(`${URI}/post/comment/${data.post_id}`, {});

  return res.data.comments ?? [];
};
export const getPostLikes = async (data: { post_id: number }) => {
  const res = await axios.get(`${URI}/post/like/${data.post_id}`, {});

  return res.data.comments ?? [];
};
export const addComment = async (data: {
  post_id: number;
  user_id: number;
  comment: string;
}) => {
  const res = await axios.post(
    `${URI}/post/comment/${data.post_id}/${data.user_id}`,
    { comment: data.comment },
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return res.data;
};
export const addLike = async (data: { post_id: number; user_id: number }) => {
  const res = await axios.post(
    `${URI}/post/like/${data.post_id}/${data.user_id}`,
    {},
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return res.data;
};
export const addPost = async (data: {
  user_id: number;
  content: string;
  attachment: string;
}) => {
  const res = await axios.post(`${URI}/post/add`, data, {
    headers: {
      Accept: "application/json",
    },
  });

  return res.data;
};
export const uploadImage = async (file: File | null) => {
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
};
