import { Sections } from "@/app/types/profileTypes";
import { memo } from "react";

interface TabsProps {
  activeSection: Sections;
  setActiveSection: React.Dispatch<React.SetStateAction<Sections>>;
}
const tabs: { id: number; name: Sections }[] = [
  { id: 1, name: "Posts" },
  { id: 2, name: "Friends" },
];
const TabsSelection = memo(({ setActiveSection, activeSection }: TabsProps) => {
  return (
    <div className="select-none transition-all flex border w-fit items-center  mb-2 justify-center">
      {tabs.map((t) => (
        <div
          key={t.id}
          onClick={() => setActiveSection(t.name)}
          className={`border px-3 cursor-pointer hover:bg-accent ${t.name === activeSection ? "bg-selection" : ""}`}
        >
          {t.name}
        </div>
      ))}
    </div>
  );
});
TabsSelection.displayName = "TabSelection";

export default TabsSelection;
