"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useEffect } from "react";
import { getEcho } from "./helper";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Component = () => {
  
  const userId = useSelector((store: RootState) => store.auth.authUser?.id);
  useEffect(() => {
    const echo = getEcho("6%7CcsAakcro2ccvw7K0NqSj3eaLamqww0MMPdlVWqUE4306dcd5");
    if (!echo) return;

    const publicChannel = echo
      .channel("public-user")
      .listen("PublicChannelEvent", (e: any) => {
        console.log(e);
      });


    return () => {
      echo.leaveChannel("public-user");
    };
  }, []);

  return <div>Component</div>;
};

export default Component;
