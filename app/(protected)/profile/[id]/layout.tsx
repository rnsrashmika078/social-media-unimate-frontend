import { ReactNode } from "react";
import NavBar from "@/components/custom/nav_bar";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <NavBar />
      <div className="flex w-full flex-1 min-h-0 justify-center items-start">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
