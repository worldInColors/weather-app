import { ChevronDown, Settings } from "lucide-react";

function Button() {
  return (
    <button className="flex items-center gap-2 rounded-md bg-neutral-800 p-2 text-neutral-0">
      <Settings />
      <span className="text-sm">Units</span>
      <ChevronDown />
    </button>
  );
}

export default Button;
