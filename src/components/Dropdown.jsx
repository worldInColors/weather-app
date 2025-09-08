import { ChevronDown, Settings } from "lucide-react";
import { useState } from "react";

function Button({ onClick, children, isSelected }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-2 py-2 rounded text-sm transition-colors hover:bg-neutral-700 cursor-pointer ${
        isSelected ? "bg-neutral-700 " : ""
      }`}
    >
      <div className="flex justify-between items-center">
        {children}
        <span>{isSelected ? "✓" : ""}</span>
      </div>
    </button>
  );
}

function Dropdown({ icon, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    system: "metric",
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  });

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
        precipitation: "inches",
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
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-neutral-700 p-2 text-neutral-200 rounded-lg"
      >
        {icon}
        <span>{label}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-neutral-800 p-2 rounded-xl shadow-lg z-10 min-w-full w-[200px]">
          {/* System Selection */}
          <div className="mb-4 space-y-1">
            <Button onClick={() => handleUnitSwitch()}>
              Switch to{" "}
              {selectedOptions.system === "metric" ? "Imperial" : "Metric"}
            </Button>
          </div>

          {/* Temperature Section */}
          <h3 className="text-neutral-300 text-xs mb-2 uppercase tracking-wide">
            Temperature
          </h3>
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
          <h3 className="text-neutral-300 text-xs mb-2 uppercase tracking-wide">
            Wind Speed
          </h3>
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
          <h3 className="text-neutral-300 text-xs mb-2 uppercase tracking-wide">
            Precipitation
          </h3>
          <div className="space-y-1">
            <Button
              onClick={() => handleRadioChange("precipitation", "mm")}
              isSelected={selectedOptions.precipitation === "mm"}
            >
              Millimeters (mm)
            </Button>
            <Button
              onClick={() => handleRadioChange("precipitation", "inches")}
              isSelected={selectedOptions.precipitation === "inches"}
            >
              Inches (in)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
