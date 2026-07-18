/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getAuthUserQuery } from "@/app/queryOptions/authQuery";
import { setAuthUser } from "@/app/store/authSlice";
import { RootState, AppDispatch } from "@/app/store/store";
import { useMutation} from "@tanstack/react-query";
import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AuthSync = memo(() => {
  const { mutate: authUserMutate } = useMutation(getAuthUserQuery());
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const dispatch = useDispatch<AppDispatch>();

  console.log("RENDER AUTH SYNC")
  // useEffect(() => {
  //   if (!authUser) return;
  //   console.log("data", notification);  
  //   dispatch(setNotification(notification));
  // }, [authUser, dispatch, notification]);

  useEffect(() => {
    if (!authUser) {
      authUserMutate(undefined, {
        onSuccess: (data) => {
          dispatch(setAuthUser(data?.result.user));
        },
        onError: (error: any) => {
          const err = error?.response?.data?.message;
          toast.error(err);

          dispatch(setAuthUser(null));
        },
      });
    }
  }, [authUser, authUserMutate, dispatch]);


  return null;
});
AuthSync.displayName = "AuthSync";

export default AuthSync;
