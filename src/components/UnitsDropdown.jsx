import { ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import { DropdownButton as Button } from "./DropdownButton";
import { AnimatePresence, motion } from "motion/react";
import { dropDownAnimation } from "../animations/motionVariants";
import { useOutsideClick } from "../utils/hooks/useClickOutside";
import { FocusTrap } from "focus-trap-react";

function Heading({ children }) {
  return <h3 className="text-preset-8 mb-2 px-2">{children}</h3>;
}

const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: -10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 350,
      damping: 25,
      delay,
    }}
  >
    {children}
  </motion.div>
);

function UnitsDropdown({ selectedOptions, setSelectedOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  const handleRadioChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleUnitSwitch = () => {
    if (selectedOptions.system === "metric") {
      setSelectedOptions((prev) => ({
        ...prev,
        system: "imperial",
        temperature: "fahrenheit",
        windSpeed: "mph",
        precipitation: "in",
      }));
    } else {
      setSelectedOptions((prev) => ({
        ...prev,
        system: "metric",
        temperature: "celsius",
        windSpeed: "kmh",
        precipitation: "mm",
      }));
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="focus-ring flex cursor-pointer items-center gap-2 rounded-md bg-neutral-800 p-2 text-neutral-0 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Settings />
        </motion.div>
        <span className="text-preset-7 hidden sm:inline">Units</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="hidden sm:inline"
        >
          <ChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <FocusTrap
            focusTrapOptions={{
              initialFocus: false,
              allowOutsideClick: true,
            }}
          >
            <motion.div
              variants={dropDownAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full right-0 z-10 mt-1 w-[200px] min-w-full rounded-xl border border-neutral-600 bg-neutral-800 p-2 shadow-lg"
            >
              <AnimatedSection delay={0.05}>
                <div className="mb-4 space-y-1">
                  <Button onClick={() => handleUnitSwitch()}>
                    Switch to{" "}
                    {selectedOptions.system === "metric"
                      ? "Imperial"
                      : "Metric"}
                  </Button>
                </div>
              </AnimatedSection>

              {/* Temperature Section */}
              <AnimatedSection delay={0.1}>
                <Heading>Temperature</Heading>
                <div className="mb-4 space-y-1">
                  <Button
                    onClick={() => handleRadioChange("temperature", "celsius")}
                    isSelected={selectedOptions.temperature === "celsius"}
                  >
                    Celsius (°C)
                  </Button>
                  <Button
                    onClick={() =>
                      handleRadioChange("temperature", "fahrenheit")
                    }
                    isSelected={selectedOptions.temperature === "fahrenheit"}
                  >
                    Fahrenheit (°F)
                  </Button>
                </div>
              </AnimatedSection>

              {/* Wind Speed Section */}
              <AnimatedSection delay={0.15}>
                <Heading>Wind Speed</Heading>
                <div className="mb-4 space-y-1">
                  <Button
                    onClick={() => handleRadioChange("windSpeed", "kmh")}
                    isSelected={selectedOptions.windSpeed === "kmh"}
                  >
                    km/h
                  </Button>
                  <Button
                    onClick={() => handleRadioChange("windSpeed", "mph")}
                    isSelected={selectedOptions.windSpeed === "mph"}
                  >
                    mph
                  </Button>
                </div>
              </AnimatedSection>

              {/* Precipitation Section */}
              <AnimatedSection delay={0.2}>
                <Heading>Precipitation</Heading>
                <div className="space-y-1">
                  <Button
                    onClick={() => handleRadioChange("precipitation", "mm")}
                    isSelected={selectedOptions.precipitation === "mm"}
                  >
                    Millimeters (mm)
                  </Button>
                  <Button
                    onClick={() => handleRadioChange("precipitation", "in")}
                    isSelected={selectedOptions.precipitation === "in"}
                  >
                    Inches (in)
                  </Button>
                </div>
              </AnimatedSection>
            </motion.div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UnitsDropdown;
