import React, { ReactNode } from "react";

const FeedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex-1 w-full h-full bg-red-500">Section 01</div>
      <div className="flex-2 w-full h-full overflow-y-auto">{children}</div>
      <div className="flex-1 w-full h-full bg-green-500">Section 03</div>
    </div>
  );
};

export default FeedLayout;
