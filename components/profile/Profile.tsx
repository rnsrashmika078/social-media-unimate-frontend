"use client";
import { memo, useState } from "react";
import TabsSelection from "./TabsSelection";
import { Sections } from "@/app/types/profileTypes";
import UserProfile from "./UserProfile";
import SectionContainer from "./Section";

interface ProfileProps {
  id: number;
}
const Profile = memo(({ id }: ProfileProps) => {
  const [activeSection, setActiveSection] = useState<Sections>("Posts");
  return (
    <div className="rounded-2xl w-full h-[400px]">
      {/* Tab section */}
      <TabsSelection
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {/* user data */}
      <UserProfile id={id} />

      {/* sections */}
      {/* Friends and Posts */}
      <div className="mt-5 ">
        <SectionContainer section={activeSection} id={id} />
      </div>
    </div>
  );
});
Profile.displayName = "Profile";

export default Profile;
