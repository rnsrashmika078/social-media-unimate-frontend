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
    <div className="w-full min-h-screen flex flex-col ">
      <NavBar />
      <div className="flex w-full flex-1 min-h-0 justify-center items-start">
        {/* <div className="flex-1 min-w-0 h-full ">{left}</div> */}
        <div className="flex flex-col  w-full md:w-1/3 h-full custom-scrollbar-y p-5 bg-feed-background ">
          {children}
        </div>
        {/* <div className="flex-1 min-w-0 h-full ">{right}</div> */}
      </div>
    </div>
  );
};

export default FeedLayout;
