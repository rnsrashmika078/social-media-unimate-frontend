import axios from "axios";
import { api } from "@/lib/axios";
import { backEndConfig, frontEndConfig } from "@/config";

const URI = process.env.NEXT_PUBLIC_API_URL!;
const BASE = process.env.NEXT_PUBLIC_BASE_URL!;

export async function csrf() {
  await api.get(`${BASE}${backEndConfig.AUTH.CSRF}`);
}
export const signIn = async (data: { email: string; password: string }) => {
  await csrf();
  const res = await api.post(backEndConfig.AUTH.SIGN_IN, data);
  await setAuthCookie(res.data.success);
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
  try {
    const res = await api.get(backEndConfig.AUTH.USER);
    return res.data;
  } catch (e) { 
    await clearAuthCookie();
  }
};
export const getUserProfile = async (userId: number) => {
  const res = await api.get(`${backEndConfig.AUTH.GET_USER_PROFILE}${userId}`);
  return res.data;
};
export const signOut = async () => {
  const res = await api.post(backEndConfig.AUTH.LOGOUT);
  return res.data;
};
export const clearAuthCookie = async () => {
  await axios.post(
    frontEndConfig.API.LOGOUT,
    {},
    {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    },
  );
};
export const setAuthCookie = async (enable: boolean = false) => {
  if (!enable) return;
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
};
