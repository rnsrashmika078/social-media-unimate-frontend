/* eslint-disable @next/next/no-img-element */
"use client";
import dynamic from "next/dynamic";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import DefaultProfileImage from "@/public/images/profile.png";
import DefaultBackgroundImage from "@/public/images/background.jpg";
import { getUserProfileQuery } from "@/app/queryOptions/authQuery";
import { useQuery } from "@tanstack/react-query";
import { AuthUserType } from "@/app/types/globalTypes";

const Post = dynamic(() => import("../main/Post"));
const SkeletonCard = dynamic(() => import("./skeletonCard"));
const FriendList = dynamic(() => import("./friendList"));

type Tabs = "Overview" | "Friends";
const Profile = memo(({ id }: { id: number }) => {
  const { data: userData, isPending } = useQuery(getUserProfileQuery(id));
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const [activeTab, setActiveTab] = useState<Tabs>("Overview");


  const userProfile: AuthUserType = useMemo(() => {
    if (!authUser) return;
    if (id === authUser?.id) {
      return authUser;
    }
    return userData?.result?.user;
  }, [authUser, id, userData]);

  if (isPending) return <SkeletonCard />;

  const tabs: { id: number; name: Tabs }[] = [
    { id: 1, name: "Overview" },
    { id: 2, name: "Friends" },
  ];
  return (
    <div className="rounded-2xl  flex-col w-full h-[400px]">
      <div className="select-none transition-all flex border w-fit items-center  mb-2 justify-center">
        {tabs.map((t) => (
          <div
            key={t.id}
            onClick={() => setActiveTab(t.name)}
            className={`border px-3 cursor-pointer hover:bg-accent ${t.name === activeTab ? "bg-selection" : ""}`}
          >
            {t.name}
          </div>
        ))}
      </div>
      {activeTab === "Overview" && (
        <>
          <div className="bg-post-background relative w-full border rounded-2xl h-full  items-start justify-start overflow-hidden">
            <Image
              src={DefaultBackgroundImage}
              alt="display picture"
              width={600}
              height={600}
              className="w-full h-60 "
            />
            <div className="absolute text-start left-10 top-20 gap-1 flex flex-col">
              <img
                src={userProfile?.dp ?? DefaultProfileImage}
                alt="display picture"
                width={200}
                height={200}
                className="w-50 h-50 flex bg-black rounded-full  border-2"
              />
              <h1 className="font-bold text-2xl">
                {userProfile?.firstname + " " + userProfile?.lastname}
              </h1>
              <p>{userProfile?.firstname + " " + userProfile?.lastname}</p>
              <p>{userProfile?.email}</p>
            </div>
          </div>
          <div className="flex w-full  mt-5 items-center justify-center">
            <Post userId={userProfile?.id} posts={[]} />
          </div>
        </>
      )}

      {activeTab === "Friends" && <FriendList />}
    </div>
  );
});
Profile.displayName = "Profile";

export default Profile;
