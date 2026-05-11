import React from "react";
import UserPlate from "../custom/user_plate";
import Card from "../custom/card";
import Description from "../custom/description";
import ReactBar from "../custom/react_bar";

const Post = () => {
  return (
    <div className="border p-2 mt-2 rounded-xl">
      <UserPlate
      
        username="Rashmika Siriwardhana"
        jobTitle="Undergraduate"
        settings={true}
      />
      <Description />
      <Card />
      <ReactBar />
    </div>
  );
};

export default Post;
