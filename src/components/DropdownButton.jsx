import { CheckIcon } from "lucide-react";

function DropdownButton({ onClick, children, isSelected }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-2 py-3 rounded-lg text-preset-7 transition-colors hover:bg-neutral-700 cursor-pointer ${
        isSelected ? "bg-neutral-700 " : ""
      }`}
    >
      <div className="flex justify-between items-center">
        {children}
        <span>{isSelected ? <CheckIcon className="w-4 h-4" /> : ""}</span>
      </div>
    </button>
  );
}
export { DropdownButton };
