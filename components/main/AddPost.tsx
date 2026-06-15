"use client";
import Badge from "../custom/badge";
import { Button } from "../ui/button";
import AddPostModal from "../model/add_post_modal";
import { useAppContext } from "@/app/providers/appContext";
import { setHash } from "@/app/helper/common";
const AddPost = () => {
  const { isModelOpen, setIsModelOpen } = useAppContext();
  
  return (
    <div className="flex items-center text-start justify-center gap-1 border px-10 py-4 rounded-2xl bg-post-background">
      <Badge dp="" />
      <Button
        variant={"outline"}
        className=" min-w-full p-5 rounded-full"
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
};

export default AddPost;
