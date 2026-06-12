import axios from "axios";
export const signIn = async (data: { email: string; password: string }) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    data,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
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

  console.log("data", res.data);
  console.log("token", token);
  return res.data;
};
