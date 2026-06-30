import axios from "axios";

const URI = process.env.NEXT_PUBLIC_API_URL!;

export const getPosts = async ({ page = 1 }) => {
  try {
    const res = await axios.get(`${URI}/post?page=${page}`, {});
    return res.data ?? [];
  } catch (err) {
    const payload = {
      err: err instanceof Error ? err.message : "error while getting posts",
      path: "/helper/posts.ts/getPosts()",
    };
    console.log(payload);
    console.error(err);
  }
};
export const getPostComments = async (data: { post_id: number }) => {
  try {
    const res = await axios.get(`${URI}/post/comment/${data.post_id}`, {});

    return res.data.comments ?? [];
  } catch (err) {
    const payload = {
      err: err instanceof Error ? err.message : "error while getPostComments",
      path: "/helper/posts.ts/getPostComments()",
    };
    console.log(payload);
    console.error(err);
  }
};
export const getPostLikes = async (data: { post_id: number }) => {
  try {
    const res = await axios.get(`${URI}/post/like/${data.post_id}`, {});
    return res.data.comments ?? [];
  } catch (err) {
    const payload = {
      err:
        err instanceof Error ? err.message : "error while getting post likes",
      path: "/helper/posts.ts/getPostLikes()",
    };
    console.log(payload);
    console.error(err);
  }
};
export const addComment = async (data: {
  post_id: number;
  user_id: number;
  comment: string;
}) => {
  try {
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
  } catch (err) {
    const payload = {
      err: err instanceof Error ? err.message : "error while add Comment",
      path: "/helper/posts.ts/addComment()",
    };
    console.log(payload);
    console.error(err);
  }
};
export const addLike = async (data: { post_id: number; user_id: number }) => {
  try {
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
  } catch (err) {
    const payload = {
      err: err instanceof Error ? err.message : "error while add Like",
      path: "/helper/posts.ts/addLike()",
    };
    console.log(payload);
    console.error(err);
  }
};
export const addPost = async (data: {
  user_id: number;
  content: string;
  attachment: string;
}) => {
  try {
    const res = await axios.post(`${URI}/post/add`, data, {
      headers: {
        Accept: "application/json",
      },
    });

    return res.data;
  } catch (err) {
    const payload = {
      err: err instanceof Error ? err.message : "error while add post",
      path: "/helper/posts.ts/addPost()",
    };
    console.log(payload);
    console.error(err);
  }
};
export const uploadImage = async (file: File | null) => {
  try {
    if (!file) return;
    console.log("file", file);
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
    const payload = {
      err: err instanceof Error ? err.message : "error while Upload image",
      path: "/helper/posts.ts/uploadImage()",
    };
    console.log(payload);
    console.error(err);
  }
};
