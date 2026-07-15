"use client";
import Badge from "../custom/badge";
import { Button } from "../ui/button";
import { setHash } from "@/app/helper/common";
import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import dynamic from "next/dynamic";
import { useModalContext } from "@/app/providers/ModalProvider";

const AddPostModal = dynamic(() => import("../modal/AddPostModal"));
const AddPost = memo(() => {
  const { isModelOpen, setIsModelOpen } = useModalContext();
  const authUser = useSelector((store: RootState) => store.auth.authUser);

  return (
    <div className="select-none flex items-center text-start justify-center gap-2 border px-10 py-2 rounded-2xl bg-post-background">
      <Badge dp={authUser?.dp || ""} id={authUser?.id} />
      <Button
        variant={"outline"}
        className=" w-full p-3 rounded-full"
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
