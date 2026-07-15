"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
export type NotificationType = {
  status: number;
  message: string;
};

type LikeCountType = { post_id: number; isLiked: boolean };
export type ContextType = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;

  likeCount: LikeCountType;
  setLikeCount: React.Dispatch<React.SetStateAction<LikeCountType>>;

  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;

  isModelOpen: boolean;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;

  notification: NotificationType | null;
  setNotification: React.Dispatch<
    React.SetStateAction<NotificationType | null>
  >;
};

const AppContext = createContext<ContextType | null>(null);
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [likeCount, setLikeCount] = useState<LikeCountType>({
    isLiked: false,
    post_id: 0,
  });
  const [notification, setNotification] = useState<NotificationType | null>(
    null,
  );
  const [commentCount, setCommentCount] = useState<number>(0);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,

      likeCount,
      setLikeCount,

      commentCount,
      setCommentCount,

      isModelOpen,
      setIsModelOpen,

      notification,
      setNotification,
    }),
    [activeTab, commentCount, isModelOpen, likeCount, notification],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("useAppContext must used within the AppContextProvider");

  return context;
};
