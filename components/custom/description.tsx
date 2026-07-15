import { memo } from "react";
import ReactMarkdown from "react-markdown";
type DescriptionProp = {
  desc?: string;
};
const Description = memo(({ desc }: DescriptionProp) => {
  const text = ` 
    Labrador  
    Burnese Mountain Dog`;


  return (
    <div className="w-full p-2 text-sm">
      <ReactMarkdown>{desc}</ReactMarkdown>

      {/* {desc} */}
    </div>
  );
});
Description.displayName = "Description";

export default Description;
