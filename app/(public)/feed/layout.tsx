import { ReactNode } from "react";
import NavBar from "@/components/custom/nav_bar";

const FeedLayout = ({
  children,
  left,
  right,
}: {
  children: ReactNode;
  left: ReactNode;
  right: ReactNode;
}) => {
  return (
    <div className="w-full h-full justify-center items-center">
      <NavBar />
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex-1 w-full h-full bg-red-500">{left}</div>
        <div className="lg:flex-2 flex-full w-full h-full overflow-y-auto">
          {children}
        </div>
        <div className="flex-1 w-full h-full bg-green-500">{right}</div>
      </div>
    </div>
  );
};

export default FeedLayout;
