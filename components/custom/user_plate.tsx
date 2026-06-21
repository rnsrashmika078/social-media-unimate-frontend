/* eslint-disable @next/next/no-img-element */
import Vercel from "@/public/images/profile.png";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import { memo } from "react";
import DefaultProfileImage from "@/public/images/profile.png";
import { convertDateTime } from "@/app/helper/common";
type UserPlateProps = {
  profileImage?: string;
  username?: string;
  jobTitle?: string;
  date?: string;
  comment?: string;
  datePosition?: "top" | "bottom" | "middle";
  settings?: boolean;
};
const UserPlate = memo(
  ({
    profileImage,
    username,
    jobTitle,
    comment,
    datePosition,
    date,
    settings = true,
  }: UserPlateProps) => {
    console.log("UserPlate.tsx: Rendering!");

    return (
      <div className="flex items-center justify-between gap-5  w-full select-none">
        <div className="flex gap-3 items-center">
          <img
            src={profileImage ?? DefaultProfileImage.src}
            alt={"profile_image"}
            width={50}
            height={50}
            loading="eager"
            className="flex border-2 rounded-full w-10 h-10 flex-shrink-0"
          />
          <div>
            {date && datePosition === "top" && (
              <p className="text-xs text-gray-400">{convertDateTime(date)}</p>
            )}
            <h1 className="text-md font-bold text-black dark:text-white ">
              {username ?? ""}
            </h1>
            {jobTitle && <p className="text-sm  text-gray-400">{jobTitle}</p>}

            {date && datePosition === "middle" && (
              <p className="text-xs text-gray-400">{convertDateTime(date)}</p>
            )}
            <p>{comment ?? ""}</p>
            {date && datePosition === "bottom" && (
              <p className="text-xs text-gray-400">{convertDateTime(date)}</p>
            )}
          </div>
        </div>

        {settings && (
          <div>
            <EllipsisVertical size={20} />
          </div>
        )}
      </div>
    );
  },
);
UserPlate.displayName = "UserPlate";

export default UserPlate;
