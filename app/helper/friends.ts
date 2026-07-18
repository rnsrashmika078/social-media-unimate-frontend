import { backEndConfig } from "@/config";
import { api } from "@/lib/axios";

export const searchFriend = async (searchQuery: string) => {
  const url = `${backEndConfig.FRIEND.SEARCH}${searchQuery}`;
  const res = await api.get(url);

  return res.data?.result?.user ?? [];
};

export const sendRequest = async (searchQuery: string) => {
  const url = `${backEndConfig.FRIEND.SEARCH}${searchQuery}`;
  const res = await api.get(url);

  return res.data?.result?.user ?? [];
};
export const addFriend = async (data: { receiver_id: number }) => {
  const url = `${backEndConfig.FRIEND.ADD}`;
  try {
    const res = await api.post(url, data);
    console.log("res", res);
    return res.data;
  } catch (err) {
    const erroMessage = err instanceof Error ? err.message : "";
    console.log(erroMessage);
  }
};
