import { queryOptions } from "@tanstack/react-query";
import { searchFriend } from "../helper/friends";
import { AuthUserType } from "../types/globalTypes";

export function searchFriendQuery(searchQuery: string) {
  return queryOptions({
    enabled: !!searchQuery,
    queryKey: ["search-friend", searchQuery],
    queryFn: (): Promise<AuthUserType[]> => searchFriend(searchQuery),
  });
}
