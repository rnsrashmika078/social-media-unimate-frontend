import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const page = () => {
  return (
    <div className="flex p-5 border">
      <div className="relative flex w-full h-full items-center justify-center border shadow-md rounded-2xl">
        {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 to-black/70"></div> */}
        <Image
          src={"/images/background.png"}
          alt={"card image"}
          width={512}
          height={512}
          className="flex w-fit h-fit items-center justify-center"
        />
        <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
          <h1 className="text-xl font-bold w-full ">Title</h1>

          <p className="text-sm max-w-xs w-full">
            {"This is the description."}
          </p>
          <Button className="w-full">Click Here</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
