import React from "react";
import { ThumbsUp } from "lucide-react";
import { MessageCircleMore } from 'lucide-react';
import { Forward } from 'lucide-react';

const ReactBar = () => {
    return (
        <div className="flex justify-between px-10 py-5">
            <ThumbsUp />
            <MessageCircleMore/>
            <Forward/>
        </div>
    );
};

export default ReactBar;
