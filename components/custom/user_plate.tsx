/* eslint-disable @next/next/no-img-element */
import { EllipsisVertical } from "lucide-react";
import { memo, useEffect, useState } from "react";
import DefaultProfileImage from "@/public/images/profile.png";
import { convertDateTime } from "@/app/helper/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { deletePostQuery } from "@/app/queryOptions/postQuery";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type UserPlateProps = {
  postId?: number;
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
    postId,
    profileImage,
    username,
    jobTitle,
    comment,
    datePosition,
    date,
    settings = true,
  }: UserPlateProps) => {
    const { mutate: deletePostMutation } = useMutation(deletePostQuery());
    const queryClient = useQueryClient();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return;
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
          <div className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Post Action</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (!postId) return;
                      deletePostMutation(
                        { postId },
                        {
                          onSuccess: (data) => {
                            toast.success(data.message);

                            queryClient.invalidateQueries({
                              queryKey: ["getPosts"],
                            });
                          },
                        },
                      );
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    );
  },
);
UserPlate.displayName = "UserPlate";

export default UserPlate;
