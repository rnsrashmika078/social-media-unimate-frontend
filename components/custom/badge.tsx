import React from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface BadgeProps {
  dp: string | undefined;
  onClick?: () => void;
}
const Badge = ({ dp, onClick }: BadgeProps) => {
  return (
    <div onClick={() => onClick?.()}>
      {dp && dp ? (
        <Image
          src={dp}
          alt="display picture"
          width={48}
          height={48}
          className="rounded-full w-12 h-12 border shadow-md object-cover"
        />
      ) : (
        <FaUserCircle className="text-icon-color rounded-2xl" size={40} />
      )}
    </div>
  );
};

export default Badge;
