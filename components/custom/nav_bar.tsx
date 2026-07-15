/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppContext } from "@/app/providers/appContext";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineNotification,
  AiOutlineSlackSquare,
} from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { signOutQuery } from "@/app/queryOptions/authQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { memo } from "react";
import Badge from "./badge";
import { useRouter } from "next/navigation";
import axios from "axios";

const NavBar = memo(() => {
  const { setActiveTab, activeTab, setNotification } = useAppContext();

  const tabs = [
    { name: "Home", icon: AiOutlineHome, route: "/feed" },
    {
      name: "Notification",
      icon: AiOutlineNotification,
      route: "notification",
    },
    { name: "Logout", icon: AiOutlineLogout, route: "" },
  ];
  const router = useRouter();
  const { mutate: signOut } = useMutation(signOutQuery());
  const authUser = useSelector((store: RootState) => store.auth.authUser);

  return (
    <div className="sticky top-0 z-50 w-full bg-nav-color shadow-md px-4 md:px-10 py-2">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <AiOutlineSlackSquare
            className="text-icon-color rounded-xl shrink-0"
            size={36}
          />

          <div className="relative w-full md:w-72">
            <Input
              id="input-field-search-area"
              type="text"
              className="pl-10 pr-3 py-2 border border-gray-400 w-full text-sm md:text-base"
              placeholder="Search your friend"
            />
            <SearchIcon
              className="absolute top-1/2 left-3 -translate-y-1/2 text-icon-color"
              size={18}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto justify-between md:justify-center">
          {tabs.map((t, idx) => {
            const Icon = t.icon;

            return (
              <div key={idx}>
                <span
                  className={`flex flex-col items-center justify-center cursor-pointer px-3 py-2 rounded-xl transition-all text-xs md:text-sm whitespace-nowrap
                  ${activeTab === t.name ? "bg-active-tab" : "hover:bg-gray-200/20"}`}
                  onClick={async () => {
                    if (t.name.toLowerCase() === "logout") {
                      await axios.post(
                        "/api/logout",
                        {},
                        {
                          headers: {
                            Accept: "application/json",
                            "content-type": "application/json",
                          },
                        },
                      );
                      router.push("/sign-in");
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
