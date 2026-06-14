"use client";
import { signOutQuery } from "@/app/queryOptions/authQuery";
import { RootState } from "@/app/store/store";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { AuthUserType } from "@/app/types/globalTypes";

const Profile = ({ user }: { user: AuthUserType }) => {
  // const { mutate: signOutMutate } = useMutation(signOutQuery());
  const authUser = useSelector((state: RootState) => state.auth.authUser);

  const userProfile = useMemo(() => {
    if (user.id === authUser?.id) return authUser;
    return user;
  }, [authUser, user]);
  return (
    <div className="border rounded-2xl bg-post-background flex w-full h-full flex-col gap-1 items-center justify-center p-5">
      {userProfile && userProfile.dp && (
        <>
          <Image
            src={userProfile?.dp}
            alt="display picture"
            width={200}
            height={200}
            className="w-50 h-50 rounded-full"
          />
          <h1 className="font-bold text-2xl">
            {userProfile.firstname + " " + userProfile.lastname}
          </h1>
          <p>{userProfile.username}</p>
          <p>{userProfile.email}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
