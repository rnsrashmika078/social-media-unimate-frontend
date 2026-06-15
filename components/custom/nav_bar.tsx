"use client";
import { useAppContext } from "@/app/providers/appContext";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
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
const NavBar = memo(() => {
  const { setActiveTab, activeTab } = useAppContext();
  const tabs = [
    { name: "Home", icon: AiOutlineHome, route: "/feed" },
    { name: "Messaging", icon: AiOutlineMessage, route: "/messaging" },
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
    <div className=" flex sticky top-0 w-full items-center justify-evenly bg-nav-color shadow-xl select-none">
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

      <div className="flex gap-5 p-2  text-center items-center justify-center text-xs">
        {tabs.map((t, idx) => {
          const Icon = t.icon;
          return (
            <div key={idx}>
              <span
                className={`flex flex-col items-center cursor-pointer ${activeTab === t.name ? "bg-active-tab" : ""} px-2 py-2 rounded-xl transition-all`}
                onClick={async () => {
                  if (t.name.toLowerCase() === "logout") {
                    await signOut(undefined, {
                      onSuccess: () => {
                        router.push("/sign-in");
                      },
                    });
                    return;
                  }
                  router.push(t.route);
                  setActiveTab(t.name);
                }}
              >
                <Icon size={25} />
                <p>{t.name}</p>
              </span>
            </div>
          );
        })}
      </div>
      <Badge
        dp={authUser?.dp}
        onClick={() => {
          setActiveTab("profile");
          router.push(`/profile/${authUser?.id}`);
        }}
      />
    </div>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
