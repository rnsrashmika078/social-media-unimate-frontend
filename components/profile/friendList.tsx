import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFriendsQuery } from "@/app/queryOptions/friendsQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { GrEmptyCircle } from "react-icons/gr";
import EmptyList from "../profile/EmptyList";
import ListBadge from "../custom/listBadge";

const FriendList = memo(() => {
  const authUserId = useSelector((store: RootState) => store.auth.authUser?.id);
  const { data: friends, isLoading } = useQuery(getFriendsQuery(authUserId!));
  if (!authUserId) return;
  if (!friends || friends.length === 0) {
    return (
      <EmptyList
        condition={isLoading}
        icon={GrEmptyCircle}
        description="No friends yet"
      />
    );
  }
  return (
    <div className="w-full rounded-2xl p-5 h-full  items-start justify-start overflow-hidden">
      Friends
      <hr className="mb-5"></hr>
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
            lastname={f.is_send_by_me ? f.receiver.lastname : f.sender.lastname}
            id={f.id}
          />
        );
      })}
    </div>
  );
});

FriendList.displayName = "FriendList";
export default FriendList;
