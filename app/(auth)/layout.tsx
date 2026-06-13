import React, { ReactNode } from "react";

const FeedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full lg:w-1/3 h-full m-auto justify-center items-center p-10">
      {children}
    </div>
  );
};

export default FeedLayout;
