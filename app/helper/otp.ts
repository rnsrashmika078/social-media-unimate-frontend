import { frontEndConfig } from "@/config";
import api from "@/lib/axios";
import axios from "axios";
import { csrf } from "./auth";

export const verify = async (data: {
  email: string;
  mobile?: string;
  media_type: string;
  code: number;
}) => {
  const res = await api.post(`/otp/verify`, data);
  if (res.data.success) {
    await axios.post(
      frontEndConfig.API.SET_COOKIE,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
  }
  return res.data;
};
export const send = async (data: {
  email?: string;
  mobile?: string;
  media_type: string;
}) => {
  await csrf();
  const res = await api.post(`/otp/send`, data);
  console.log("res", res);
  return res.data;
};
