"use client";
import { getAuthUserQuery, signOutQuery } from "@/app/queryOptions/authQuery";
import { setAuthUser } from "@/app/store/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const { mutate: signOutMutate } = useMutation(signOutQuery());
  const { mutate: authUserMutate } = useMutation(getAuthUserQuery());
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!authUser) {
      authUserMutate(undefined, {
        onSuccess: (data) => {
          dispatch(setAuthUser(data));
        },
        onError: () => dispatch(setAuthUser(null)),
      });
    }
  }, [authUser, authUserMutate, dispatch]);

  const router = useRouter();
  return (
    <div className="flex w-full h-full flex-col gap-5 items-center justify-center p-5">
      {JSON.stringify(authUser)}
      <Button
        onClick={() => {
          signOutMutate(undefined, {
            onSuccess: () => {
              router.push("/sign-in");
            },
          });
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
};

export default ProfilePage;
