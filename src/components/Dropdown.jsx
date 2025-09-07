import { ChevronDown, Settings } from "lucide-react";

function Dropdown() {
  return (
    <button className="flex items-center gap-1 bg-neutral-700 p-2 text-neutral-200 rounded-lg">
      <Settings />
      <span>Units</span>
      <ChevronDown />
    </button>
  );
}

export default Dropdown;
