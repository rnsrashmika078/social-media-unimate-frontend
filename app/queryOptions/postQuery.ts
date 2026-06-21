import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
  addComment,
  addLike,
  addPost,
  getPostComments,
  // getPostLikes,
} from "../helper/posts";
import { CommentType, LikeType } from "../types/globalTypes";

// get post done inside server
export function getCommentsQuery(post_id: number) {
  return queryOptions({
    queryKey: ["comments", post_id],
    queryFn: (): Promise<CommentType[]> => getPostComments({ post_id }),
  });
}
// export function getLikesQuery(post_id: number) {
//   return queryOptions({
//     queryKey: ["likes", post_id],
//     queryFn: (): Promise<LikeType[]> => getPostLikes({ post_id }),
//   });
// }
// export function getPostQuery(page : number, isEnable: boolean) {
//   return queryOptions({
//     queryKey: ["getPosts", page ],
//     queryFn: (): Promise<PostType[]> => getPosts({ page  }),
//     enabled: isEnable,
//   });
// }
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
