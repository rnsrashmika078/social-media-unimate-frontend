import React from "react";
import { FileText } from "lucide-react"; // optional icon lib
import { Button } from "../ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Icon */}
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <FileText className="w-10 h-10 text-gray-400" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800">No Posts Yet</h2>

      {/* Subtitle */}
      <p className="text-gray-500 mt-2 max-w-sm">
        Looks like there are no posts available right now. Be the first to share
        something!
      </p>

      {/* Action Button */}
      <Button>Create Post</Button>
    </div>
  );
};

export default NotFound;
