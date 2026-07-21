import { ReactNode } from "react";
import AuthSync from "@/components/custom/authSync";
import NavBar from "@/components/navbar/nav";
import WebsocketProvider from "@/app/providers/WebsocketProvider";

const FeedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col ">
      <NavBar />
      <div className="flex w-full flex-1 min-h-0 justify-center items-start ">
        <div className="flex flex-col  w-full md:w-1/2 h-full custom-scrollbar-y p-5 bg-feed-background ">
          <WebsocketProvider />
          <AuthSync />
          {children}
        </div>
      </div>
    </div>
  );
};

export default FeedLayout;
