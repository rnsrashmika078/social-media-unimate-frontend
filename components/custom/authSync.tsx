"use client";
import { getAuthUserQuery } from "@/app/queryOptions/authQuery";
import { setAuthUser } from "@/app/store/authSlice";
import { RootState, AppDispatch } from "@/app/store/store";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const AuthSync = () => {
  const { mutate: authUserMutate } = useMutation(getAuthUserQuery());
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!authUser) {
      authUserMutate(undefined, {
        onSuccess: (data) => {
          console.log("data", data);
          dispatch(setAuthUser(data));
        },
        onError: (error) => {
          console.log("error", error);

          dispatch(setAuthUser(null));
        },
      });
    }
  }, [authUser, authUserMutate, dispatch]);

  return null;
};

export default AuthSync;
