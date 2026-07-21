import { FaSpinner } from "react-icons/fa";
import { IconType } from "react-icons/lib";
interface EmptyListProps {
  icon: IconType;
  condition: boolean;
  description?: string;
}
const EmptyList = ({ icon, condition, description }: EmptyListProps) => {
  const Icon = icon;
  return (
    <div className="mt-5 flex flex-col items-center justify-center text-foreground">
      {condition ? (
        <>
          <div className="flex animate-spin items-center justify-center p-5 overflow-hidden w-full">
            <FaSpinner size={15} />
          </div>
        </>
      ) : (
        <>
          <Icon size={40} className="mb-2 opacity-60" />
          {description && <p className="text-sm">{description}</p>}
        </>
      )}
    </div>
  );
};

export default EmptyList;
