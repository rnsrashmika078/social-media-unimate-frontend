import { backEndConfig } from "@/config";
import { api } from "@/lib/axios";

export const getNotification = async (id: number) => {
  const res = await api.get(backEndConfig.NOTIFICATION.GET, {
    params: { id },
  });
  console.log(res);
  return res?.data?.result?.notification;
};
