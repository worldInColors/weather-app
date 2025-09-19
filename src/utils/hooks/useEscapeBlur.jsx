import { useEffect } from "react";

export const useEscapeBlur = () => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && document.activeElement) {
        document.activeElement.blur();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
};
