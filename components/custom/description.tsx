import { memo } from "react";
import ReactMarkdown from "react-markdown";
type DescriptionProp = {
  desc?: string;
};
const Description = memo(({ desc }: DescriptionProp) => {
  return (
    <div className="w-full p-2 text-sm break-words overflow-hidden">
      <ReactMarkdown>{desc}</ReactMarkdown>
    </div>
  );
});
Description.displayName = "Description";

export default Description;
