import { AuthUserType } from "@/app/types/globalTypes";
import { FaSpinner } from "react-icons/fa";
import { memo } from "react";
import dynamic from "next/dynamic";
const Badge = dynamic(() => import("./badge"));

const UserList = memo(
  ({
    friends,
    isLoading,
  }: {
    isLoading: boolean;
    friends: AuthUserType[] | undefined;
  }) => {
    if (!friends) return;
    if (friends.length == 0) {
      return <p className="absolute top-10 left-0">No User Found</p>;
    }
    return (
      <div className="absolute  max-h-[400px] custom-scrollbar-y  top-8 left-0 rounded-2xl z-0 p-2 w-full bg-accent ">
        {!isLoading && (
          <div className="flex animate-spin items-center justify-center p-5 overflow-hidden w-full">
            <FaSpinner size={20} />
          </div>
        )}
        {friends &&
          friends?.map((f) => (
            <div key={f.id} className="flex w-full hover:bg-card">
              <Badge
                action={true}
                firstname={f.firstname}
                lastname={f.lastname}
                id={f.id}
              />
            </div>
          ))}
      </div>
    );
  },
);
UserList.displayName = "UserList";

export default UserList;
