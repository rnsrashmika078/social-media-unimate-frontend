import { backEndConfig } from "@/config";
import { api } from "@/lib/axios";

export const searchFriend = async (searchQuery: string) => {
  const url = `${backEndConfig.FRIEND.SEARCH}${searchQuery}`;
  const res = await api.get(url);

  return res.data?.result?.user ?? [];
};
