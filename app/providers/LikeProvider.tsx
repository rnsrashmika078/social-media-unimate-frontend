"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
type LikeCountType = { post_id: number; isLiked: boolean };

type LikeContextType = {
  likeCount: LikeCountType;
  setLikeCount: React.Dispatch<React.SetStateAction<LikeCountType>>;
};

const LikeContext = createContext<LikeContextType | null>(null);

export const LikeProvider = ({ children }: { children: ReactNode }) => {
  const [likeCount, setLikeCount] = useState<LikeCountType>({
    isLiked: false,
    post_id: 0,
  });
  const memoizedValues = useMemo(
    () => ({
      likeCount,
      setLikeCount,
    }),
    [likeCount],
  );
  return (
    <LikeContext.Provider value={memoizedValues}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeContext = () => {
  const context = useContext(LikeContext);
  if (!context)
    throw new Error("useLikeContext must be used within LikeProvider");
  return context;
};
