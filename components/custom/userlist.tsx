import { AuthUserType } from "@/app/types/globalTypes";
import Badge from "./badge";

const UserList = ({ friends }: { friends: AuthUserType[] | undefined }) => {
  if (!friends) return;
  if (friends.length == 0) {
    return <p className="absolute top-10 left-0">No User Found</p>;
  }
  return (
    <div className="absolute  max-h-[400px] custom-scrollbar-y  top-8 left-0 rounded-2xl z-0 p-2 w-full bg-accent ">
      {friends &&
       friends.map((f) => (
          <div key={f.id} className="flex">
            <Badge firstname={f.firstname} lastname={f.lastname} id={f.id} />
          </div>
        ))}
    </div>
  );
};

export default UserList;
