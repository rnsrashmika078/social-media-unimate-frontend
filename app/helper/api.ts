const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;
async function apiFetch<T>(
  path: string,
  method: "POST" | "GET" | "DELETE" | "PUT" = "GET",
  body?: T,
  optional?: T,
) {
  const url = `${baseURL}/${path}`;

  const res = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      "Content-Type": "application/json",
      Accept: "Application/json",
      ...optional,
    },
  });
  return res;
}
export async function authLogin<T>(credential: T) {
  const res = await apiFetch("auth/login", "POST", credential);
  console.log("credentials", credential);
  console.log("Response", res);
}
async function authLogout() {}
async function authRegister() {}
