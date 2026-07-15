import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echoInstance: Echo<"reverb"> | null = null;

export function getEcho(token: string) {
  if (typeof window === "undefined") return;
  if (echoInstance) return echoInstance;

  window.Pusher = Pusher;
  echoInstance = new Echo({
    broadcaster: "reverb",
    key: "ivnm3t4uz9kem3kwlpza",
    wsHost: "localhost",
    wsPort: 8080,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    authEndpoint: "http://localhost:8000/broadcasting/auth",
    auth: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  return echoInstance;
}

export async function csrf() {
  await fetch("http://localhost:8000/sanctum/csrf-cookie", {
    credentials: "include",
  });
}
