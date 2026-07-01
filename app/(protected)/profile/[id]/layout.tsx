import { ReactNode } from "react";
import NavBar from "@/components/custom/nav_bar";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full  flex-col flex items-center justify-center ">
      <NavBar />
      <div className="w-full md:w-1/2 h-full custom-scrollbar-y p-5 bg-feed-background ">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
