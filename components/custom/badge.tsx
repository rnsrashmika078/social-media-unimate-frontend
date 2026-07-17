"use client";
import React, { memo } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { frontEndConfig } from "@/config";
interface BadgeProps {
  dp?: string;
  id?: number;
  firstname?: string;
  lastname?: string;

  onClick?: () => void;
}
const Badge = memo(({ dp, id, onClick, lastname, firstname }: BadgeProps) => {
  return (
    <Link href={`${frontEndConfig.PROTECTED.PROFILE}/${id}`}>
      <div onClick={() => onClick?.()} className="flex gap-2 flex-shrink-0">
        {dp && dp ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={dp}
            alt="display picture"
            width={48}
            height={48}
            className="select-none rounded-full w-10 h-10 border shadow-md object-cover"
          />
        ) : (
          <FaUserCircle className="text-icon-color rounded-2xl" size={40} />
        )}
        {firstname && (
          <div>
            {<h1 className="text-xl">{`${firstname} ${lastname}`}</h1>}
            <p>{"Faculty of Technology"}</p>
            <p className="text-sm">{"4th Year"}</p>
          </div>
        )}
      </div>
    </Link>
  );
});
Badge.displayName = "Badge";

export default Badge;
