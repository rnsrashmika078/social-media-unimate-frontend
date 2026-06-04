import React from "react";
import ReactMarkdown from "react-markdown";
type DescriptionProp = {
    desc?: string;
};
const Description = ({ desc }: DescriptionProp) => {
    const text = ` 
    Labrador  
    Burnese Mountain Dog`;
    return (
        <div className="w-full p-2">
            <ReactMarkdown>{desc || text}</ReactMarkdown>
        </div>
    );
};

export default Description;
