import axios from "axios";
import { AuthUserType } from "../types/globalTypes";
import api from "@/lib/axios";
import { backEndConfig, frontEndConfig } from "@/config";

const URI = process.env.NEXT_PUBLIC_API_URL!;
const BASE = process.env.NEXT_PUBLIC_BASE_URL!;

export async function csrf() {
  await api.get(`${BASE}${backEndConfig.AUTH.CSRF}`);
}

export const signIn = async (data: { email: string; password: string }) => {
  await csrf();
  const res = await api.post(backEndConfig.AUTH.SIGN_IN, data);

  return res.data;
};
export const signUp = async (data: {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  dp: string;
}) => {
  await csrf();
  const res = await api.post(backEndConfig.AUTH.SIGN_UP, data);
  console.log("res", res);
  return res.data;
};
export const resetPassword = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(
    `${URI}${backEndConfig.AUTH.RESET_PASSWORD}`,
    data,
  );
  const token = res.data.token;
  await axios.post(frontEndConfig.API.SET_COOKIE, { token });
  return res.data;
};
export const getAuthUser = async () => {
  await csrf();
  const res = await api.get(backEndConfig.AUTH.USER);
  return res.data;
};
export const getUserProfile = async (userId: number): Promise<AuthUserType> => {
  const res = await axios.post(
    `${URI}${backEndConfig.AUTH.GET_USER_PROFILE}${userId}`,
  );
  return res.data;
};
export const signOut = async () => {
  await csrf();
  const res = await api.post(backEndConfig.AUTH.LOGOUT);
  return res.data;
};
