import { ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import { DropdownButton as Button } from "./DropdownButton";

function Heading({ children }) {
  return <h3 className="text-preset-8 mb-2 px-2">{children}</h3>;
}

function UnitsDropdown({ selectedOptions, setSelectedOptions }) {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-md bg-neutral-800 p-2 text-neutral-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings />
        <span className="text-sm">Units</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-1 w-[200px] min-w-full rounded-xl bg-neutral-800 p-2 shadow-lg">
          {/* System Selection */}
          <div className="mb-4 space-y-1">
            <Button onClick={() => handleUnitSwitch()}>
              Switch to{" "}
              {selectedOptions.system === "metric" ? "Imperial" : "Metric"}
            </Button>
          </div>

          {/* Temperature Section */}
          <Heading>Temperature</Heading>
          <div className="mb-4 space-y-1">
            <Button
              onClick={() => handleRadioChange("temperature", "celsius")}
              isSelected={selectedOptions.temperature === "celsius"}
            >
              Celsius (°C)
            </Button>
            <Button
              onClick={() => handleRadioChange("temperature", "fahrenheit")}
              isSelected={selectedOptions.temperature === "fahrenheit"}
            >
              Fahrenheit (°F)
            </Button>
          </div>

          {/* Wind Speed Section */}
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

          {/* Precipitation Section */}
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
        </div>
      )}
    </div>
  );
}

export default UnitsDropdown;
