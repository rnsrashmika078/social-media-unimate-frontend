"use client";
import axios from "axios";
import { FormEvent } from "react";

const page = () => {
  const fetchFriend = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/friends`;

    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("result", response.data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      // passwordConfirmation: formData.get("password_confirmation"),
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`;
      const sanctum = `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`;

      await axios.get(sanctum, {
        withCredentials: true,
      });

      const response = await axios.post(url, data, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occurred");
    } finally {
      //   setLoading(false);
    }
  };
  return (
    <>
      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          name="email" // ✅ Add this
          aria-label="email"
          type="text"
          placeholder="email"
          className="border"
        ></input>
        <input
          name="password" // ✅ Add this
          aria-label="password"
          type="text"
          placeholder="password"
          className="border"
        ></input>
        <input
          name="password_confirmation" // ✅ Add this
          aria-label="password_confirmation"
          type="text"
          className="border"
          placeholder="password confirmation"
        ></input>
        <button type="submit" aria-label="submission-btn" className="border">
          Login
        </button>
      </form>
      <button onClick={() => fetchFriend()}>GET FRIENDS</button>
    </>
  );
};

export default page;
