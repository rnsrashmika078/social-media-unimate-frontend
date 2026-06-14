import axios from "axios";
import { AuthUserType } from "../types/globalTypes";

const URI = process.env.NEXT_PUBLIC_API_URL!;
export const signIn = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${URI}/auth/login`, data, {
    headers: {
      Accept: "application/json",
    },
  });
  const token = res.data.token;
  await axios.post(
    `/api/set-cookie`,
    { token },
    {
      headers: {
        Accept: "application/json",
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
  const res = await axios.post(`${URI}/auth/register`, data, {
    headers: {
      Accept: "application/json",
    },
  });
  const token = res.data.token;
  await axios.post(
    `/api/set-cookie`,
    { token },
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
  return res.data;
};
export const resetPassword = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${URI}/auth/reset_password`, data, {
    headers: {
      Accept: "application/json",
    },
  });
  const token = res.data.token;

  await axios.post(
    `/api/set-cookie`,
    { token },
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
  return res.data;
};
export const getAuthUser = async () => {
  const res = await axios.post(
    `/api/authUser`,
    {},
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
  return res.data.user;
};
export const getUserProfile = async (userId: number): Promise<AuthUserType> => {
  const res = await axios.post(
    `${URI}/user/get-user-profile/${userId}`,
    {},
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
  return res.data.user;
};
export const signOut = async () => {
  const res = await axios.post(
    `/api/logout`,
    {},
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return res.data;
};
