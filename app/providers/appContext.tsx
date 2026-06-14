"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type ContextType = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;

  likeCount: number;
  setLikeCount: React.Dispatch<React.SetStateAction<number>>;

  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
};

const AppContext = createContext<ContextType | null>(null);
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,

      likeCount,
      setLikeCount,
      commentCount,
      setCommentCount,
    }),
    [activeTab, commentCount, likeCount],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("useAppContext must used within the AppContextProvider");

  return context;
};
