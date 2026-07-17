import React from "react";
import { FileText } from "lucide-react"; // optional icon lib
import { Button } from "../ui/button";
import { useModalContext } from "@/app/providers/ModalProvider";

const NotFound = () => {
  const { setIsModelOpen } = useModalContext();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Icon */}
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <FileText className="w-10 h-10 text-black" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-foreground ">No Posts Yet</h2>

      {/* Subtitle */}
      <p className="text-foreground max-w-sm mb-2">
        Looks like there are no posts available right now. Be the first to share
        something!
      </p>

      {/* Action Button */}
      <Button onClick={() => setIsModelOpen(true)}>Create Post</Button>
    </div>
  );
};

export default NotFound;
