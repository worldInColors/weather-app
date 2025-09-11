import { CheckIcon } from "lucide-react";

function DropdownButton({ onClick, children, isSelected }) {
  return (
    <button
      onClick={onClick}
      className={`text-preset-7 w-full cursor-pointer rounded-lg px-2 py-3 text-left transition-colors outline-none hover:bg-neutral-700 focus:ring-2 focus:ring-neutral-0 ${
        isSelected ? "bg-neutral-700" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        {children}
        <span>{isSelected ? <CheckIcon className="h-4 w-4" /> : ""}</span>
      </div>
    </button>
  );
}
export { DropdownButton };
