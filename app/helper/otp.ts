import { api } from "@/lib/axios";
import { setAuthCookie } from "./auth";
import { backEndConfig } from "@/config";

export const verify = async (data: {
  email: string;
  mobile?: string;
  media_type: string;
  code: number;
}) => {
  const res = await api.post(backEndConfig.OTP.VERIFY, data);
  await setAuthCookie(res.data.success);
  return res.data;
};
export const send = async (data: {
  email?: string;
  mobile?: string;
  media_type: string;
}) => {
  const res = await api.post(backEndConfig.OTP.REQUEST, data);
  return res.data;
};
