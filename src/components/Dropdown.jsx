import { ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";

function Dropdown({ label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-neutral-600 p-2 text-neutral-200 rounded-lg"
      >
        <span>{selectedDay}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-neutral-800 p-2 rounded-xl shadow-lg z-10 min-w-full w-[200px]">
          <div className="mb-4 space-y-1">
            <Button
              onClick={() => setSelectedDay("Monday")}
              isSelected={selectedDay === "Monday"}
            >
              Monday
            </Button>
            <Button
              onClick={() => setSelectedDay("Tuesday")}
              isSelected={selectedDay === "Tuesday"}
            >
              Tuesday
            </Button>
            <Button
              onClick={() => setSelectedDay("Wednesday")}
              isSelected={selectedDay === "Wednesday"}
            >
              Wednesday
            </Button>
            <Button
              onClick={() => setSelectedDay("Thursday")}
              isSelected={selectedDay === "Thursday"}
            >
              Thursday
            </Button>
            <Button
              onClick={() => setSelectedDay("Friday")}
              isSelected={selectedDay === "Friday"}
            >
              Friday
            </Button>
            <Button
              onClick={() => setSelectedDay("Saturday")}
              isSelected={selectedDay === "Saturday"}
            >
              Saturday
            </Button>
            <Button
              onClick={() => setSelectedDay("Sunday")}
              isSelected={selectedDay === "Sunday"}
            >
              Sunday
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export { Dropdown };
