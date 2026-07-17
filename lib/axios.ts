import axios from "axios";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});
export const apiV2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// export async function apiV2(url: string, options: RequestInit = {}) {
//   return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     credentials: "include",
//     ...options,
//   });
// }
