"use client";
import { Button } from "@/components/ui/button";
import { sendPublicMessage, sendPrivateMessage } from "@/app/helper/realtime";

const Test = () => {
  return (
    <Button
      onClick={async () => {
        // sendPublicMessage({ message: "hi there" });
        sendPrivateMessage({ message: "hi there", receiver_id: 1 });
      }}
    >
      SEND
    </Button>
  );
};

export default Test;
