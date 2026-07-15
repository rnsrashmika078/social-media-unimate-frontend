"use client";
import Badge from "../custom/badge";
import { Button } from "../ui/button";
import AddPostModal from "../modal/AddPostModal";
import { useAppContext } from "@/app/providers/appContext";
import { setHash } from "@/app/helper/common";
import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const AddPost = memo(() => {
  const { isModelOpen, setIsModelOpen } = useAppContext();
  const authUser = useSelector((store: RootState) => store.auth.authUser);

  return (
    <div className="w-full select-none flex items-center gap-3 border px-3 sm:px-5 md:px-8 py-3 rounded-2xl bg-post-background shadow-sm">
      
      <div className="shrink-0">
        <Badge dp={authUser?.dp || ""} id={authUser?.id} />
      </div>

      <Button
        variant={"outline"}
        className="flex-1 text-left justify-start rounded-full px-4 py-3 text-sm sm:text-base text-gray-500 hover:bg-gray-100 transition-all"
        onClick={() => {
          setHash("model");
          setIsModelOpen(true);
        }}
      >
        Start a post
      </Button>

      {isModelOpen && <AddPostModal />}
    </div>
  );
});

AddPost.displayName = "AddPost";
export default AddPost;