import { FaSpinner } from "react-icons/fa";

const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return;
  return (
    <div className="flex animate-spin items-center justify-center p-5 overflow-hidden">
      <FaSpinner size={25} />
    </div>
  );
};

export default Spinner;
