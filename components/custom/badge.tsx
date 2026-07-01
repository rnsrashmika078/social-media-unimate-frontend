"use client";
import React, { memo } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
interface BadgeProps {
  dp: string | undefined;
  id: number | undefined;
  onClick?: () => void;
}
const Badge = memo(({ dp, id, onClick }: BadgeProps) => {
  const router = useRouter();
  return (
    <div onClick={() => onClick?.()} className=" flex-shrink-0">
      {dp && dp ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={dp}
          alt="display picture"
          width={48}
          height={48}
          onClick={() => router.push(`/profile/${id}`)}
          className="select-none rounded-full w-10 h-10 border shadow-md object-cover"
        />
      ) : (
        <FaUserCircle className="text-icon-color rounded-2xl" size={40} />
      )}
    </div>
  );
});
Badge.displayName = "Badge";

export default Badge;
