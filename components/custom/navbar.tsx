/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineNotification,
  AiOutlineSlackSquare,
} from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signOutQuery } from "@/app/queryOptions/authQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { memo, useEffect, useState } from "react";
import Badge from "./badge";
import { useRouter } from "next/navigation";
import { useTabContext } from "@/app/providers/TabProvider";
import { useNotificationContext } from "@/app/providers/NotificationProvider";
import { frontEndConfig } from "@/config";
import { clearAuthCookie } from "@/app/helper/auth";
import useDebounce from "@/app/hooks/useDebounce";

import { searchFriendQuery } from "@/app/queryOptions/friendsQuery";
import UserList from "./userlist";

const NavBar = memo(() => {
  const { setActiveTab, activeTab } = useTabContext();
  const { setNotification } = useNotificationContext();
  const [text, setText] = useState<string>("");
  const router = useRouter();
  const authUser = useSelector((store: RootState) => store.auth.authUser);

  const debounceText = useDebounce(text ?? "", 500);
  const [visited, setVisited] = useState<string[]>([]);

  const { data: friends, isFetched } = useQuery(
    searchFriendQuery(debounceText ?? ""),
  );

  const { mutate: signOut } = useMutation(signOutQuery());

  const [tabs, setTabs] = useState([
    {
      name: "Home",
      icon: AiOutlineHome,
      route: frontEndConfig.PROTECTED.FEED,
      visited: false,
    },
    {
      name: "Notification",
      icon: AiOutlineNotification,
      route: frontEndConfig.PROTECTED.NOTIFICATION,
      visited: false,
    },
    { name: "Logout", icon: AiOutlineLogout, route: "", visited: false },
  ]);

  return (
    <div className="sticky top-0 z-50 w-full bg-nav-color shadow-md px-4 md:px-10 py-2">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <AiOutlineSlackSquare
            className="text-icon-color rounded-xl shrink-0"
            size={36}
          />

          <form className="w-full">
            <div className="relative w-full md:w-72">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="pl-10 pr-3 py-2 border border-gray-400 w-full text-sm md:text-base"
                placeholder="Search your friend"
              />
              <UserList friends={friends} isLoading={isFetched} />
              <SearchIcon
                className="absolute top-1/2 left-3 -translate-y-1/2 text-icon-color"
                size={18}
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto justify-between md:justify-center">
          {tabs.map((t, idx) => {
            const Icon = t.icon;

            return (
              <div key={idx}>
                <span
                  className={`flex relative flex-col items-center justify-center cursor-pointer px-3 py-2 rounded-xl transition-all text-xs md:text-sm whitespace-nowrap
                  ${activeTab === t.name ? "bg-active-tab" : "hover:bg-gray-200/20"}`}
                  onClick={async () => {
                    setTabs((prev) =>
                      prev.map((tb) =>
                        tb.name === t.name ? { ...tb, visited: true } : tb,
                      ),
                    );

                    if (t.name.toLowerCase() === "logout") {
                      await clearAuthCookie();
                      router.push(frontEndConfig.AUTH.SIGN_IN);
                      await signOut(undefined, {
                        onError(error: any) {
                          setNotification({
                            message: error?.response?.data?.message,
                            status: error.response?.status,
                          });
                        },
                        onSuccess: (data) => {
                          setNotification({
                            message: data.message,
                            status: 200,
                          });
                        },
                      });
                      return;
                    }
                    router.push(t.route);
                    setActiveTab(t.name);
                  }}
                >
                  {t.name.toLowerCase() !== "logout" && !t.visited && (
                    <span className="w-2 rounded-full right-2 top-2 h-2 absolute bg-red-500"></span>
                  )}

                  <Icon size={22} />
                  <p className="hidden sm:block">{t.name}</p>
                </span>
              </div>
            );
          })}

          <div className="ml-2">
            <Badge dp={authUser?.dp} id={authUser?.id} />
          </div>
        </div>
      </div>
    </div>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
