import { TComment } from "@/app/types";
import { comments } from "@/sample-data";
import { AnimatePresence, motion } from "framer-motion";
import UserPlate from "./user_plate";

interface CommentSectionProps {
  isCommentsOpen: boolean;
}
const CommentSection = ({ isCommentsOpen }: CommentSectionProps) => {
  console.log("comment section render");
  return (
    <AnimatePresence>
      {isCommentsOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="w-full  p-2 mt-2"
        >
          {/* header */}
          <div className="flex justify-between items-center">
            <h1 className="flex  gap-2 items-center">
              Comments
              <span className="text-xs">{`(${comments.length})`}</span>
            </h1>
            <span className="flex gap-2 items-center underline text-xs">
              View all
            </span>
          </div>
          {/* comments */}
          {comments.map((comment: TComment, idx) => (
            <div key={comment.id} className="mt-2">
              <UserPlate
                username={comment.name}
                jobTitle={comment.comment}
                settings={false}
              />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentSection;
