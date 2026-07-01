"use client";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { AuthUserType } from "@/app/types/globalTypes";
import DefaultProfileImage from "@/public/images/profile.png";
import DefaultBackgroundImage from "@/public/images/background.jpg";
import Post from "../main/Post";

const Profile = memo(({ user }: { user: AuthUserType }) => {
  // const { mutate: signOutMutate } = useMutation(signOutQuery());
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const userProfile = useMemo(() => {
    if (user.id === authUser?.id) return authUser;
    return user;
  }, [authUser, user]);
  // bg-post-background
  return (
    <div className=" bg-post-background  border rounded-2xl  flex-col w-full h-[400px]">
      <div className="relative w-full  rounded-2xl h-full  items-start justify-start overflow-hidden">
        <Image
          src={DefaultBackgroundImage}
          alt="display picture"
          width={600}
          height={600}
          className="w-full h-60 "
        />
        <div className="absolute text-start left-10 top-20 gap-1 flex flex-col">
          <Image
            src={userProfile?.dp ?? DefaultProfileImage}
            alt="display picture"
            width={200}
            height={200}
            className="w-50 h-50 flex bg-black rounded-full  border-2"
          />
          <h1 className="font-bold text-2xl">
            {userProfile.firstname + " " + userProfile.lastname}
          </h1>
          <p>{userProfile.firstname + " " + userProfile.lastname}</p>
          <p>{userProfile.email}</p>
        </div>
      </div>
      <div className="flex w-full  mt-5 items-center justify-center">
        <Post userId={userProfile.id} />
      </div>
    </div>
  );
});
Profile.displayName = "Profile";

export default Profile;
