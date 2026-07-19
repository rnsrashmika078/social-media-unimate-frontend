import { RefObject, useEffect, useState } from "react";

/**
 *  ## Catch the weather the user click outside or inside ( focus window )
 * ** pass the parameter ref
 */
const useFocus = <T extends HTMLElement>(ref: RefObject<T | null>) => {
  const [isOutSide, setIsOutSide] = useState<boolean>(false);
  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) {
        setIsOutSide(false);
        return () =>
          document.removeEventListener("mousedown", handleMouseClick);
      }
      setIsOutSide(true);
    };

    document.addEventListener("mousedown", handleMouseClick);
    return () => document.removeEventListener("mousedown", handleMouseClick);
  }, [ref]);

  return isOutSide;
};

export default useFocus;
