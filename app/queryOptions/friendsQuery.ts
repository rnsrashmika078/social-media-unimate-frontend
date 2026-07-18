import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { addFriend, searchFriend, sendRequest } from "../helper/friends";
import { AuthUserType } from "../types/globalTypes";

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
export function sendRequestQuery(searchQuery: string) {
  return queryOptions({
    enabled: !!searchQuery,
    queryKey: ["send-request"],
    queryFn: (): Promise<AuthUserType[]> => sendRequest(searchQuery),
  });
}
export function getSendRequestsQuery(searchQuery: string) {
  return queryOptions({
    enabled: !!searchQuery,
    queryKey: ["search-friend", searchQuery],
    queryFn: (): Promise<AuthUserType[]> => searchFriend(searchQuery),
  });
}
export function getReceivedRequestsQuery(searchQuery: string) {
  return queryOptions({
    enabled: !!searchQuery,
    queryKey: ["search-friend", searchQuery],
    queryFn: (): Promise<AuthUserType[]> => searchFriend(searchQuery),
  });
}
export function acceptFriendRequestQuery(searchQuery: string) {
  return queryOptions({
    enabled: !!searchQuery,
    queryKey: ["search-friend", searchQuery],
    queryFn: (): Promise<AuthUserType[]> => searchFriend(searchQuery),
  });
}
