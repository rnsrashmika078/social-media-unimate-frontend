import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
  acceptRequest,
  addFriend,
  getFriends,
  searchFriend,
  sendRequest,
} from "../helper/friends";
import { AuthUserType, FriendsType } from "../types/globalTypes";

export function searchFriendQuery(searchQuery: string) {
  return queryOptions({
    enabled: !!searchQuery,
    queryKey: ["search-friend", searchQuery],
    queryFn: (): Promise<AuthUserType[]> => searchFriend(searchQuery),
  });
}
export function addFriendQuery() {
  return mutationOptions({
    mutationKey: ["add-friend"],
    mutationFn: addFriend,
  });
}
export function acceptRequestQuery() {
  return mutationOptions({
    mutationKey: ["accept-request"],
    mutationFn: acceptRequest,
  });
}
export function getFriendsQuery(id: number) {
  return queryOptions({
    enabled: !!id,
    queryKey: ["get-friends-list"],
    queryFn: (): Promise<FriendsType[]> => getFriends(id),
  });
}
