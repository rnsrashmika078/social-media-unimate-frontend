import dynamic from "next/dynamic";
import { Sections } from "@/app/types/profileTypes";
import { memo } from "react";
import SkeletonCard from "../custom/skeletonCard";

const Post = dynamic(() => import("../main/Post"), {
  loading: () => <SkeletonCard />,
});
const FriendList = dynamic(() => import("./friendList"), {
  loading: () => <SkeletonCard />,
});

interface SectionProps {
  section: Sections;
  id: number;
}
const SectionContainer = memo(({ id, section }: SectionProps) => {
  if (section === "Friends") {
    return <FriendList />;
  } else if (section === "Posts") {
    return <Post userId={id} posts={[]} />;
  } else {
    return null;
  }
});
SectionContainer.displayName = "SectionContainer";

export default SectionContainer;
