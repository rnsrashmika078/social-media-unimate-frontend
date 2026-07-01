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
    <div className="select-none flex items-center text-start justify-center gap-1 border px-10 py-4 rounded-2xl bg-post-background">
      <Badge dp={authUser?.dp || ""} id={authUser?.id} />
      <Button
        variant={"outline"}
        className=" w-full p-5 rounded-full"
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
