import { memo, useRef, useState } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { searchFriendQuery } from "@/app/queryOptions/friendsQuery";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/app/hooks/useDebounce";
import useFocus from "@/app/hooks/useFocus";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const UserList = dynamic(() => import("./userlist"));

const SearchArea = memo(() => {
  const [text, setText] = useState<string>("");

  const debounceText = useDebounce(text ?? "", 500);
  const { data: friends, isLoading } = useQuery(
    searchFriendQuery(debounceText ?? ""),
  );
  const focusRef = useRef<HTMLDivElement | null>(null);
  const focus = useFocus(focusRef);
  return (
    <form className="w-full">
      <motion.div className="relative w-full md:w-72" ref={focusRef}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="pl-10 pr-3 py-2 border border-gray-400 w-full text-sm md:text-base"
          placeholder="Search your friend"
        />
        {text !== "" && (
          <motion.div animate={focus ? { opacity: 0 } : { opacity: 1 }}>
            <UserList friends={friends} isLoading={isLoading} />
          </motion.div>
        )}

        <SearchIcon
          className="absolute top-1/2 left-3 -translate-y-1/2 text-icon-color"
          size={18}
        />
      </motion.div>
    </form>
  );
});
SearchArea.displayName = "SearchArea";

export default SearchArea;
