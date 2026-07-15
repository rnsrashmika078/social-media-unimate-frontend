"use client";
import { useNotificationContext } from "@/app/providers/NotificationProvider";
import { memo, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const ToastProviderContainer = memo(() => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Toast />
    </>
  );
});
ToastProviderContainer.displayName = "ToastProviderContainer";

export default ToastProviderContainer;

const Toast = memo(() => {
  const { setNotification, notification } = useNotificationContext();

  useEffect(() => {
    if (!notification) return;

    switch (notification.status) {
      case 200:
      case 201:
        toast.success(notification.message);
        break;

      case 400:
      case 401:
      case 404:
        toast.error(notification.message);
        break;

      case 429:
        toast.warn(notification.message);
        break;

      default:
        toast.info(notification.message);
    }

    return () => setNotification(null);
  }, [notification?.status]);

  return null;
});
Toast.displayName = "Toast";
