/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import DefaultProfileImage from "@/public/images/profile.png";
import DefaultBackgroundImage from "@/public/images/background.jpg";
import { AuthUserType } from "@/app/types/globalTypes";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/app/store/store";
import { getUserProfileQuery } from "@/app/queryOptions/authQuery";
import SkeletonCard from "../custom/skeletonCard";
interface PostSectionProps {
  id: number;
}
const UserProfile = memo(({ id }: PostSectionProps) => {
  const { data: userData, isPending } = useQuery(getUserProfileQuery(id));
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const userProfile: AuthUserType = useMemo(() => {
    if (!authUser) return;
    if (id === authUser?.id) {
      return authUser;
    }
    return userData?.result?.user;
  }, [authUser, id, userData]);

  if (isPending) return <SkeletonCard />;
  return (
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
  );
});

UserProfile.displayName = "UserProfile";

export default UserProfile;
