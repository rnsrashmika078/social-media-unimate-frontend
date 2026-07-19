/* eslint-disable @next/next/no-img-element */
import React, { memo } from "react";
import DefaultProfileImage from "@/public/images/profile.png";
import DefaultBackgroundImage from "@/public/images/background.jpg";
import { AuthUserType } from "@/app/types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { getFriendsQuery } from "@/app/queryOptions/friendsQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import ListBadge from "./listBadge";

const FriendList = memo(() => {
  const authUserId = useSelector((store: RootState) => store.auth.authUser?.id);
  const { data: friends } = useQuery(getFriendsQuery(authUserId!));

  if (!authUserId) return;
  if (!friends) return;
  return (
    <div className="w-full border rounded-2xl p-5 h-full  items-start justify-start overflow-hidden">
      <div className="">
        {friends.map((f) => {
          return (
            <ListBadge
              key={f.id}
              status={f.status}
              action={f.status.toLowerCase() === "accepted" ? false : true}
              senderId={f.sender_id}
              condition={f.is_send_by_me}
              firstname={
                f.is_send_by_me ? f.receiver.firstname : f.sender.firstname
              }
              lastname={
                f.is_send_by_me ? f.receiver.lastname : f.sender.lastname
              }
              id={f.id}
            />
          );
        })}
      </div>
    </div>
  );
});

FriendList.displayName = "FriendList";
export default FriendList;
