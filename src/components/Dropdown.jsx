import { ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import { DropdownButton as Button } from "./DropdownButton";

function Dropdown({ selectedDay, setSelectedDay }) {
  const [isOpen, setIsOpen] = useState(false);
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
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-lg bg-neutral-600 p-2 text-neutral-200"
      >
        <span>{selectedDay}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-1 w-[200px] min-w-full rounded-xl bg-neutral-800 p-2 shadow-lg">
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
