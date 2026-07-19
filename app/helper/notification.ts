import { backEndConfig } from "@/config";
import { api } from "@/lib/axios";

export const getNotification = async (id: number, noCache: string) => {
  const res = await api.get(backEndConfig.NOTIFICATION.GET, {
    params: { id, noCache },
  });
  return res?.data?.result?.notification;
};
