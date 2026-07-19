/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { memo, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { frontEndConfig } from "@/config";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  acceptRequestQuery,
  addFriendQuery,
} from "@/app/queryOptions/friendsQuery";
import { useNotificationContext } from "@/app/providers/NotificationProvider";
interface BadgeProps {
  dp?: string;
  id?: number;
  firstname?: string;
  lastname?: string;
  action?: boolean;
  status?: string;
  condition?: boolean;
  senderId?: number;

  onClick?: () => void;
}
const ListBadge = memo(
  ({
    action = false,
    status,
    dp,
    id,
    onClick,
    condition,
    lastname,
    firstname,
    senderId,
  }: BadgeProps) => {
    const authUser = useSelector((store: RootState) => store.auth.authUser);

    const { mutate } = useMutation(acceptRequestQuery());
    const { setNotification } = useNotificationContext();
    const queryClient = useQueryClient();

    const handleAcceptFriend = useCallback(
      async (data: { id: number }) => {
        const payload = {
          id: data.id!,
          receiver_id: senderId!,
          name: firstname + " " + lastname,
        };
        mutate(payload, {
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
            queryClient.invalidateQueries({
              queryKey: ["get-friends-list"],
            });
          },
        });
      },
      [firstname, lastname, mutate, queryClient, senderId, setNotification],
    );
    return (
      <Link href={id ? `${frontEndConfig.PROTECTED.PROFILE}/${id}` : "/feed"}>
        <div
          onClick={() => {
            onClick?.();
          }}
          className="flex gap-2 rounded-xl p-2 flex-shrink-0 items-center hover:bg-background w-full"
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
            </div>
          )}
          {action && (
            <>
              <Button
                className="text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!condition) handleAcceptFriend({ id: id! });
                }}
              >
                {condition ? status?.toUpperCase() : "ADD AS FRIEND"}
              </Button>
            </>
          )}
        </div>
      </Link>
    );
  },
);
ListBadge.displayName = "ListBadge";

export default ListBadge;
