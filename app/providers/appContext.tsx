import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type ContextType = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const AppContext = createContext<ContextType | null>(null);
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("useAppContext must used within the AppContextProvider");

  return context;
};
