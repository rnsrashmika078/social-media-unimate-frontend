/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { memo, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { frontEndConfig } from "@/config";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useMutation } from "@tanstack/react-query";
import { addFriendQuery } from "@/app/queryOptions/friendsQuery";
import { useNotificationContext } from "@/app/providers/NotificationProvider";
interface BadgeProps {
  dp?: string;
  id?: number;
  firstname?: string;
  lastname?: string;
  action?: boolean;

  onClick?: () => void;
}
const Badge = memo(
  ({ action = false, dp, id, onClick, lastname, firstname }: BadgeProps) => {
    const authUser = useSelector((store: RootState) => store.auth.authUser);

    const { mutate } = useMutation(addFriendQuery());
    const { setNotification } = useNotificationContext();

    const handleAddFriend = useCallback(
      async (data: {
        firstname: string;
        lastname: string;
        dp?: string;
        id: number;
      }) => {
        mutate(
          {
            message: `You have new friend request from ${authUser?.firstname} ${authUser?.lastname}`,
            receiver_id: data.id,
          },
          {
            onError: (error: any) => {
              setNotification({
                status: error.status,
                message: error.response.data.message,
              });
            },
            onSuccess: (data) => {
              setNotification({
                status: 200,
                message: data.message,
              });
            },
          },
        );
      },
      [authUser?.firstname, authUser?.lastname, mutate, setNotification],
    );
    return (
      <Link href={id ? `${frontEndConfig.PROTECTED.PROFILE}/${id}` : "/feed"}>
        <div
          onClick={() => {
            onClick?.();
          }}
          className="flex gap-2 rounded-2xl p-2 flex-shrink-0"
        >
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
          {firstname && lastname && (
            <div className="text-md w-full">
              {<h1 className="">{`${firstname} ${lastname}`}</h1>}
              <p className="text-xs">{"Faculty of Technology"}</p>
              {action && id !== authUser?.id && (
                <Button
                  className="text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddFriend({ id: id!, firstname, lastname });
                  }}
                >
                  Add Friend
                </Button>
              )}
            </div>
          )}
        </div>
      </Link>
    );
  },
);
Badge.displayName = "Badge";

export default Badge;
