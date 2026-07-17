/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { memo, useCallback, useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { csrf } from "../helper/auth";
import { api } from "@/lib/axios";

interface WebsocketProps {
  channelType?: "public" | "private" | "presence";
}
const ReverbWebsocket = memo(({ channelType = "private" }: WebsocketProps) => {
  const [echoInstance, setEchoInstance] = useState<any | null>(null);
  // const [csrfReady, setCsrfReady] = useState(false);

  useEffect(() => {
    const initCsrf = async () => {
      await csrf();
      // setCsrfReady(true);
    };
    initCsrf();
  }, []);

  useEffect(() => {
    // if (!csrfReady) return;

    if (typeof window === "undefined") return;
    (window as any).Pusher = Pusher;
    const echo = new Echo({
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
      // authEndpoint: `${process.env.NEXT_PUBLIC_BASE_URL}/broadcasting/auth`,
      withCredentials: true,
      auth: {
        headers: {
          Accept: "application/json",
        },
      },
    });
    setEchoInstance(echo);
    return () => {
      echo.disconnect();
    };
  }, []);

  const authUser = useSelector((store: RootState) => store.auth.authUser);

  const enablePrivate = useCallback(() => {
    if (!echoInstance || !authUser) return;
    console.log("authUser.id",authUser.id);

    const privateChannelName = `private-social-channel.user.${authUser.id}`;
    const privateEventName = ".PrivateChannelEvent";

    const privateChannel = echoInstance.private(privateChannelName);
    privateChannel
      .listen(privateEventName, (e: any) => {
        console.log("Private Event received!", e);
      })
      .error((error: any) => {
        console.error("Failed to subscribe to private channel:", error);
      });
    return () => {
      privateChannel.stopListening(privateEventName);
      echoInstance.leaveChannel(privateChannelName);
    };
  }, [authUser, echoInstance]);

  const enablePublic = useCallback(() => {
    if (!echoInstance) return;
    const channelName = "public-social-channel";
    const eventName = ".PublicChannelEvent";
    const channel = echoInstance.channel(channelName);
    channel
      .listen(eventName, (e: any) => {
        console.log("Public Event received!", e);
      })
      .error((error: any) => {
        console.error("Failed to subscribe to private channel:", error);
      });
    return () => {
      channel.stopListening(eventName);
      echoInstance.leaveChannel(channelName);
    };
  }, [echoInstance]);

  useEffect(() => {
    if (!echoInstance) return;

    if (channelType === "public") {
      const cleanup = enablePublic();
      return () => {
        cleanup?.();
      };
    } else if (channelType === "private") {
      const cleanup = enablePrivate();
      return () => {
        cleanup?.();
      };
    }
  }, [channelType, echoInstance, enablePrivate, enablePublic]);

  return null;
});
ReverbWebsocket.displayName = "ReverbWebsocket";
export default ReverbWebsocket;
