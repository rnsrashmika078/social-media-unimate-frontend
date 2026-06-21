import { ReactNode } from "react";
import NavBar from "@/components/custom/nav_bar";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col">
      <NavBar />
      <div className="">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
