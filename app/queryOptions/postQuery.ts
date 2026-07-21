import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
  addComment,
  addLike,
  addPost,
  deletePost,
  getPostComments,
} from "../helper/posts";
import { CommentType } from "../types/globalTypes";

// get post done inside server
export function getCommentsQuery(post_id: number) {
  return queryOptions({
    queryKey: ["comments", post_id],
    queryFn: (): Promise<CommentType[]> => getPostComments({ post_id }),
  });
}
// export function getLikesQuery(post_id: number) {

export function addCommentsQuery() {
  return mutationOptions({
    mutationKey: ["comments"],
    mutationFn: addComment,
  });
}
export function addLikeQuery() {
  return mutationOptions({
    mutationKey: ["like"],
    mutationFn: addLike,
  });
}
export function addPostQuery() {
  return mutationOptions({
    mutationKey: ["addPosts"],
    mutationFn: addPost,
  });
}
export function deletePostQuery() {
  return mutationOptions({
    mutationKey: ["deletePost"],
    mutationFn: deletePost,
  });
}
