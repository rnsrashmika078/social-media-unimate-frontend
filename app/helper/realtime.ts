/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { PrivateMessageType } from "../types/globalTypes";
let echoInstance: Echo<"reverb"> | null = null;
export async function sendPrivateMessage(credentials: {
  message: string;
  receiver_id: number;
}) {
  try {
    const response = await api.post(`/realtime/private`, credentials);

    return {
      success: response.data.success,
      message: response.data.message,
      status: response.status,
      data: response.data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data.message,
      status: err.response?.status,
    };
  }
}

export async function sendPublicMessage(credentials: { message: string }) {
  try {
    const response = await api.post(`/realtime/public`, credentials);

    return {
      success: response.data.success,
      message: response.data.message,
      status: response.status,
      data: response.data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data.message,
      status: err.response?.status,
    };
  }
}

export const getEchoInstance = (): Echo<"reverb"> | null => {
  if (typeof window === "undefined") return null;
  if (!echoInstance) {
    (window as any).Pusher = Pusher;
    echoInstance = new Echo({
      broadcaster: "reverb",
      key: "ivnm3t4uz9kem3kwlpza",
      wsHost: "localhost",
      wsPort: 8080,
      forceTLS: false,
      enabledTransports: ["ws", "wss"],
      authorizer: (channel: any) => {
        return {
          authorize: (socketId: string, callback: any) => {
            api
              .post(`${process.env.NEXT_PUBLIC_BASE_URL}/broadcasting/auth`, {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => {
                callback(null, response.data);
              })
              .catch((error) => {
                console.error("Auth error:", error);
                console.error("Auth error response:", error.response);
                callback(error, null);
              });
          },
        };
      },
      withCredentials: true,
      auth: {
        headers: {
          Accept: "application/json",
        },
      },
    });
  }
  return echoInstance;
};

export const enablePrivate = ({
  userId,
  channelName,
  eventName,
  onListen,
  onError,
}: {
  userId: number;
  channelName?: string;
  eventName?: string;
  onListen?: (data: PrivateMessageType) => void;
  onError?: (error: any) => void;
}) => {
  if (!echoInstance || !userId) return;

  const privateChannelName =
    channelName ?? `private-social-channel.user.${userId}`;
  const privateEventName = eventName ?? ".PrivateChannelEvent";

  const privateChannel = echoInstance.private(privateChannelName);
  privateChannel
    .listen(privateEventName, (data: PrivateMessageType) => {
      onListen?.(data);
      if (data.message.includes("accepted")) {
        // queryClient.invalidateQueries({
        //   queryKey: ["get-friends-list"],
        // });
      }
      // setNotification({
      //   message: e.message,
      //   status: 200,
      //   type: "application",
      // });
    })
    .error((error: any) => {
      console.error("Failed to subscribe to private channel:", error);
      onError?.(error);
    });
  return () => {
    echoInstance?.leaveChannel(privateChannelName);
  };
};
