import axios from "axios";

const URI = process.env.NEXT_PUBLIC_API_URL!;
export const getPosts = async () => {
  const res = await axios.get(`${URI}/post/`, {});

  return res.data.post ?? [];
};
export const getPostComments = async (data: { post_id: number }) => {
  const res = await axios.get(`${URI}/post/comment/${data.post_id}`, {});

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
