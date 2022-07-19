import { useState, useEffect } from "react";

export default function useDebounce(value, wait = 0) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    return () => {
      window.clearTimeout(timeoutId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debouncedValue;
}
