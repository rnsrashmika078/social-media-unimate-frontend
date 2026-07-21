'use client'
import { useEffect, useState } from "react";
import { enablePrivate, getEchoInstance } from "../helper/realtime";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { csrf } from "../helper/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "./NotificationProvider";

const WebsocketProvider = () => {
  const queryClient = useQueryClient();
  const [csrfReady, setCsrfReady] = useState<boolean>(false);
  useEffect(() => {
    const initCsrf = async () => {
      await csrf();
      setCsrfReady(true);
    };
    initCsrf();
  }, []);

  const { setNotification } = useNotificationContext();
  const authUserId = useSelector((store: RootState) => store.auth.authUser?.id);

  useEffect(() => {
    if (!csrfReady || !authUserId) return;
    const echo = getEchoInstance();
    if (!echo) return;

    const cleanUp = enablePrivate({
      userId: authUserId,
      onListen(data) {
        console.log(data);
        if (data.message.includes("accepted")) {
          queryClient.invalidateQueries({
            queryKey: ["get-friends-list"],
          });
        }
        setNotification({
          message: data.message,
          status: 200,
          type: "application",
        });
      },
      onError(error) {
        console.log(error);
      },
    });

    return () => cleanUp?.();
  }, [authUserId, csrfReady, queryClient, setNotification]);
  return null;
};

export default WebsocketProvider;
