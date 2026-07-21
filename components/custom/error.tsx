import React from "react";

const ErrorMessage = ({ error }: { error?: string }) => {
  return <div className="text-red-500 font-bold p-2">{error}</div>;
};

export default ErrorMessage;
