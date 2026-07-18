"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type ModalContextType = {
  isModelOpen: boolean;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const memoizedValue = useMemo(
    () => ({
      isModelOpen,
      setIsModelOpen,
    }),
    [isModelOpen],
  );

  return (
    <ModalContext.Provider value={memoizedValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModalContext must be used within ModalProvider");
  return context;
};
