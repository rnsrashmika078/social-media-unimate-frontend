import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
