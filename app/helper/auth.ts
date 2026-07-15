import axios from "axios";
import { AuthUserType } from "../types/globalTypes";
import api from "@/lib/axios";

const URI = process.env.NEXT_PUBLIC_API_URL!;
const BASE = process.env.NEXT_PUBLIC_BASE_URL!;

export async function csrf() {
  await api.get(`${BASE}/sanctum/csrf-cookie`);
}

export const signIn = async (data: { email: string; password: string }) => {
  await csrf();

  const res = await axios.post(
    "/api/set-cookie",
    { email: data.email, password: data.password, isAuthenticated: true },
    {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    },
  );
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
  const res = await api.post(`/auth/register`, data);
  console.log("res" , res)
  return res.data;
};
export const resetPassword = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${URI}/auth/reset_password`, data);
  const token = res.data.token;

  await axios.post(`/api/set-cookie`, { token });
  console.log("res" , res)
  return res.data;
};
export const getAuthUser = async () => {
  await csrf();
  const res = await api.get(`${URI}/auth/user`);
  return res.data.user;
};
export const getUserProfile = async (userId: number): Promise<AuthUserType> => {
  const res = await axios.post(`${URI}/user/get-user-profile/${userId}`);
  // get the current data from the database

  return res.data.user;
};
export const signOut = async () => {
  await csrf();
  const res = await api.post(`/auth/logout`);

  return res.data;
};
