"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type TabContextType = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const TabContext = createContext<TabContextType | null>(null);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const memoizedValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab],
  );

  return (
    <TabContext.Provider value={memoizedValue}>{children}</TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context)
    throw new Error("useTabContext must be used within TabProvider");
  return context;
};
