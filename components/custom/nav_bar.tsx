import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineNotification,
  AiOutlineSlackSquare,
} from "react-icons/ai";

const NavBar = () => {
  return (
    <div className="p-4 flex w-full items-center justify-evenly bg-nav-color shadow-xl">
      <div className="flex gap-5">
        <AiOutlineSlackSquare
          className="text-icon-color rounded-2xl"
          size={40}
        />
        <div className="relative w-full">
          <Input
            //   {...register("email")}
            id="input-field-search-area"
            type="text"
            className="p-5 pl-10 border border-gray-400 w-full "
            placeholder="Search your friend"
          />
          <SearchIcon className="absolute top-1/2 text-icon-color -translate-y-1/2 left-2" />
        </div>
      </div>

      <div className="flex gap-10 p-2  text-center items-center justify-center text-xs">
        <span className="flex flex-col items-center">
          <AiOutlineHome size={25} />
          <p>Home</p>
        </span>
        <span className="flex flex-col items-center">
          <AiOutlineMessage size={25} />
          <p>Messaging</p>
        </span>
        <span className="flex flex-col items-center">
          <AiOutlineNotification size={25} />
          <p>Notification</p>
        </span>
      </div>
    </div>
  );
};

export default NavBar;
