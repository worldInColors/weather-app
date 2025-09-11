import { ChevronDown, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DropdownButton as Button } from "./DropdownButton";

function Dropdown({ selectedDay, setSelectedDay }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayIndex = new Date().getDay();

  const rotatedDays = [...days.slice(todayIndex), ...days.slice(0, todayIndex)];
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-1 rounded-lg bg-neutral-600 p-2 text-neutral-200 transition-colors outline-none hover:bg-neutral-700 focus:ring-2 focus:ring-neutral-0 focus:ring-offset-2 focus:ring-offset-neutral-800"
      >
        <span>{selectedDay}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-1 w-[200px] min-w-full rounded-xl border border-neutral-600 bg-neutral-800 p-2 shadow-lg">
          <div className="mb-4 space-y-1">
            {rotatedDays.map((day) => (
              <Button
                key={day}
                onClick={() => {
                  setSelectedDay(day);
                  setIsOpen(false);
                }}
                isSelected={selectedDay === day}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { Dropdown };
