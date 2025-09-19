import { ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import { DropdownButton as Button } from "./DropdownButton";
import { AnimatePresence, motion } from "motion/react";
import { dropDownAnimation } from "../animations/motionVariants";
import { useOutsideClick } from "../utils/hooks/useClickOutside";

function Dropdown({ selectedDay, setSelectedDay }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-1 rounded-lg bg-neutral-600 p-2 text-neutral-200 transition-colors outline-none hover:bg-neutral-700 focus:ring-2 focus:ring-neutral-0 focus:ring-offset-2 focus:ring-offset-neutral-800"
      >
        <span>{selectedDay}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropDownAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full right-0 z-10 mt-1 w-[200px] min-w-full rounded-xl border border-neutral-600 bg-neutral-800 p-2 shadow-lg"
          >
            <div className="mb-4 space-y-1">
              {rotatedDays.map((day, index) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.2,
                  }}
                >
                  <Button
                    onClick={() => {
                      setSelectedDay(day);
                      setIsOpen(false);
                    }}
                    isSelected={selectedDay === day}
                  >
                    {day}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { Dropdown };
