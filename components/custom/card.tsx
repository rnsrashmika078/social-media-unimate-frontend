import Image from "next/image";
import { Button } from "../ui/button";
import DefaultImage from "@/public/images/background.png";
import { ReactNode } from "react";
type CardProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  image?: string;
  children?: ReactNode;
};
const Card = ({
  title,
  description,
  buttonText,
  image,
  children,
}: CardProps) => {
  return (
    <div className="relative flex w-full h-full items-center justify-center border shadow-md rounded-2xl">
      {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 to-black/70"></div> */}
      <Image
        src={image || DefaultImage}
        alt={title || "card image"}
        width={512}
        height={512}
        className="flex w-fit h-fit items-center justify-center"
      />
      <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
        {/* <h1 className="text-xl font-bold w-full ">
          {title ?? "This is the Header"}
        </h1> */}

        {/* <p className="text-sm max-w-xs w-full">
          {description ??
            "This is the description. this must be bit long based. make sure to give a big description. thank you!"}
        </p> */}
        {/* {buttonText && <Button className="w-full">{buttonText}</Button>} */}
      </div>
    </div>
  );
};

export default Card;
