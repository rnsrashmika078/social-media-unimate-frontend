import { memo } from "react";
import ReactMarkdown from "react-markdown";
type DescriptionProp = {
  desc?: string;
};
const Description = memo(({ desc }: DescriptionProp) => {
  const text = ` 
    Labrador  
    Burnese Mountain Dog`;

  console.log("Description.tsx: Rendering!");

  return (
    <div className="w-full p-2 text-sm">
      <ReactMarkdown>{desc || text}</ReactMarkdown>
    </div>
  );
})
Description.displayName = "Description"

export default Description;
