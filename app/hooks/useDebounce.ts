import { useEffect, useState } from "react";

const useDebounce = (text: string, delay: number) => {
  const [debounceText, setDebounceText] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceText(text), delay);

    return () => clearTimeout(timeout);
  }, [delay, text]);

  return debounceText;
};

export default useDebounce;
