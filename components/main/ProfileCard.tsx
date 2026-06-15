import React from "react";
import UserPlate from "../custom/user_plate";
import { Input } from "../ui/input";

const ProfileCard = () => {
  return (
    <div className="flex">
      <UserPlate settings={false} />
      <Input />
    </div>
  );
};

export default ProfileCard;
