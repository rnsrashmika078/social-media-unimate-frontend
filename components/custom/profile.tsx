"use client";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { AuthUserType } from "@/app/types/globalTypes";
import DefaultProfileImage from "@/public/images/profile.png";
import DefaultBackgroundImage from "@/public/images/background.jpg";

const Profile = ({ user }: { user: AuthUserType }) => {
  // const { mutate: signOutMutate } = useMutation(signOutQuery());
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const userProfile = useMemo(() => {
    if (user.id === authUser?.id) return authUser;
    return user;
  }, [authUser, user]);

  console.log("userProfile", userProfile);

  return (
    <div className="relative border rounded-2xl bg-post-background flex w-full h-full flex-col gap-1 items-center justify-center p-5">
      <div className="w-full h-96 flex-col flex items-center justify-center">
        <Image
          src={userProfile?.dp ?? DefaultBackgroundImage}
          alt="display picture"
          width={600}
          height={600}
          className="w-full h-full object-fill"
        />
        <div className="absolute text-center">
          <div className="">
            <Image
              src={userProfile?.dp ?? DefaultProfileImage}
              alt="display picture"
              width={200}
              height={200}
              className="w-50 h-50 bg-black rounded-full  border-2"
            />
          </div>

          <h1 className="font-bold text-2xl">
            {userProfile.firstname + " " + userProfile.lastname}
          </h1>
          <p>{userProfile.firstname + " " + userProfile.lastname}</p>
          <p>{userProfile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
