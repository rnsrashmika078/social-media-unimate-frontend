/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Button } from "../ui/button";
// import DefaultImage from "@/public/images/background.png";
import { memo, ReactNode } from "react";
type CardProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  image: string;
  children?: ReactNode;
};
const Card = memo(
  ({ title, description, buttonText, image, children }: CardProps) => {
    console.log("Card.tsx: Rendering!");

    if (image === "" || image === "url") return;

    return (
      <div className="select-none relative flex w-full h-full items-center justify-center bg-black">
        {/* // eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={"card image"}
          width={384}
          height={384}
          className="flex w-96 h-96 items-center justify-center"
        />
        {/* <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
          <h1 className="text-xl font-bold w-full ">
            {title ?? "This is the Header"}
          </h1>

          <p className="text-sm max-w-xs w-full">
            {description ??
              "This is the description. this must be bit long based. make sure to give a big description. thank you!"}
          </p>
          {buttonText && <Button className="w-full">{buttonText}</Button>}
        </div> */}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
