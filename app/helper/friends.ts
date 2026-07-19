import { backEndConfig } from "@/config";
import { api } from "@/lib/axios";

export const searchFriend = async (searchQuery: string) => {
  const url = `${backEndConfig.FRIEND.SEARCH}`;
  const res = await api.get(url, {
    params: { searchQuery },
  });
  return res.data?.result?.user ?? [];
};

export const sendRequest = async (searchQuery: string) => {
  const url = `${backEndConfig.FRIEND.SEARCH}`;
  const res = await api.get(url, {
    params: { searchQuery },
  });
  return res.data?.result?.user ?? [];
};

export const getFriends = async (id: number) => {
  const url = `${backEndConfig.FRIEND.GET}`;
  const res = await api.get(url, {
    params: { user_id: id },
  });
  return res.data?.result?.friends ?? [];
};
export const addFriend = async (data: {
  receiver_id: number;
  message: string;
}) => {
  const url = `${backEndConfig.FRIEND.SEND}`;
  const res = await api.post(url, data);
  return res.data;
};
export const acceptRequest = async (data: {
  id: number;
  receiver_id: number;
  name: string;
}) => {
  const url = `${backEndConfig.FRIEND.ACCEPT}`;
  const res = await api.put(url, data);
  return res.data;
};
