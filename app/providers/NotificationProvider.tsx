"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
export type NotificationType = {
  status: number;
  message: string;
  type?: "system" | "application";
};

type NotificationContextType = {
  notification: NotificationType | null;
  setNotification: React.Dispatch<
    React.SetStateAction<NotificationType | null>
  >;
  
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null,
  );
  const memoizedValue = useMemo(
    () => ({
      notification,
      setNotification,
    }),
    [notification],
  );

  return (
    <NotificationContext.Provider value={memoizedValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotificationContext must be used within NotificationProvider",
    );
  return context;
};
