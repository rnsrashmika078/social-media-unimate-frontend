"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type CommentContextType = {
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
};

const CommentContext = createContext<CommentContextType | null>(null);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [commentCount, setCommentCount] = useState<number>(0);

  const memoizedValues = useMemo(
    () => ({
      commentCount,
      setCommentCount,
    }),
    [commentCount],
  );
  return (
    <CommentContext.Provider value={memoizedValues}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context)
    throw new Error("useCommentContext must be used within CommentProvider");
  return context;
};
