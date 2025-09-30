import { Amphora, Edit, Settings } from "lucide-react";
import WeatherInfoGridItem from "./WeatherInfoGridItem";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { dropDownAnimation } from "../animations/motionVariants";
import { DropdownButton as Button } from "./DropdownButton";
import { FocusTrap } from "focus-trap-react";
import { useOutsideClick } from "../utils/hooks/useClickOutside";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

function getVisibilityScale(metersValue) {
  if (metersValue >= 20000) return 10;
  if (metersValue >= 10000) return 9;
  if (metersValue >= 7000) return 8;
  if (metersValue >= 5000) return 7;
  if (metersValue >= 3000) return 6;
  if (metersValue >= 2000) return 5;
  if (metersValue >= 1000) return 4;
  if (metersValue >= 500) return 3;
  if (metersValue >= 200) return 2;
  return 1;
}

function SortableItem({ id, children, isEditMode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !isEditMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isEditMode ? attributes : {})}
      {...(isEditMode ? listeners : {})}
      className={isEditMode ? "cursor-grab active:cursor-grabbing" : ""}
    >
      {children}
    </div>
  );
}

function WeatherInfoGrid({ current, loading, selectedOptions }) {
  const [visibleItems, setVisibleItems] = useState(() => {
    const saved = localStorage.getItem("weatherItemVisibility");
    return saved
      ? JSON.parse(saved)
      : {
          feelsLike: true,
          humidity: true,
          wind: true,
          precipitation: true,
          uvIndex: true,
          visibility: true,
          airPressure: true,
        };
  });

  const [itemOrder, setItemOrder] = useState(() => {
    const saved = localStorage.getItem("weatherItemOrder");
    return saved
      ? JSON.parse(saved)
      : [
          "feelsLike",
          "humidity",
          "wind",
          "precipitation",
          "uvIndex",
          "visibility",
          "airPressure",
        ];
  });

  const [activeId, setActiveId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  useEffect(() => {
    localStorage.setItem("weatherItemVisibility", JSON.stringify(visibleItems));
  }, [visibleItems]);
  useEffect(() => {
    localStorage.setItem("weatherItemOrder", JSON.stringify(itemOrder));
  }, [itemOrder]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const items = [
    { key: "feelsLike", label: "Feels Like" },
    { key: "humidity", label: "Humidity" },
    { key: "wind", label: "Wind" },
    { key: "precipitation", label: "Precipitation" },
    { key: "uvIndex", label: "UV Index" },
    { key: "visibility", label: "Visibility" },
    { key: "airPressure", label: "Air Pressure" },
  ];

  const toggleItem = (key) => {
    setVisibleItems((prev) => {
      const visibleCount = Object.values(prev).filter(Boolean).length;

      if (prev[key] && visibleCount === 1) {
        return prev;
      }

      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      setItemOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        return newOrder;
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  // Get weather data for an item
  const getWeatherData = (key) => {
    switch (key) {
      case "feelsLike":
        return {
          label: "Feels Like",
          value: `${Math.round(current.apparent_temperature)}°`,
        };
      case "humidity":
        return {
          label: "Humidity",
          value: `${Math.round(current.relative_humidity_2m)}%`,
        };
      case "wind":
        return {
          label: "Wind",
          value: `${Math.round(current.wind_speed_10m)} ${selectedOptions.windSpeed}`,
        };
      case "precipitation":
        return {
          label: "Precipitation",
          value: `${Math.round(current.precipitation)} ${selectedOptions.precipitation}`,
        };
      case "uvIndex":
        return {
          label: "UV Index",
          value: `${Math.round(current.uv_index)}`,
        };
      case "visibility":
        return {
          label: "Visibility",
          value: `${getVisibilityScale(current.visibility)}/10`,
        };
      case "airPressure":
        return {
          label: "Air Pressure",
          value: `${Math.round(current.pressure_msl)}\u00A0hPa`,
        };
      default:
        return { label: "", value: "" };
    }
  };

  // Get only visible items in the correct order
  const visibleItemsInOrder = itemOrder.filter((key) => visibleItems[key]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        <WeatherInfoGridItem label="Feels Like" loading={true} />
        <WeatherInfoGridItem label="Humidity" loading={true} />
        <WeatherInfoGridItem label="Wind" loading={true} />
        <WeatherInfoGridItem label="Precipitation" loading={true} />
        <WeatherInfoGridItem label="UV Index" loading={true} />
        <WeatherInfoGridItem label="Visibility" loading={true} />
        <WeatherInfoGridItem label="Air Pressure" loading={true} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`focus-ring rounded-lg p-2 transition-colors ${
            isEditMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "hover:bg-gray-800"
          }`}
          aria-label={isEditMode ? "Exit edit mode" : "Enter edit mode"}
        >
          <Edit className="h-5 w-5" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus-ring rounded-lg p-2 transition-colors hover:bg-gray-800"
            aria-label="Grid settings"
          >
            <Settings className="h-5 w-5" />
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
                <FocusTrap
                  focusTrapOptions={{
                    initialFocus: false,
                    allowOutsideClick: true,
                  }}
                >
                  <motion.div
                    layout
                    variants={dropDownAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 z-10 mt-2 w-50 rounded-lg border border-neutral-600 bg-neutral-800 p-2 shadow-xl"
                  >
                    <h3 className="text-preset-8 mb-2 px-2 pt-1">
                      Display Items
                    </h3>
                    <div className="space-y-1.5">
                      {items.map(({ key, label }) => (
                        <Button
                          key={key}
                          onClick={() => toggleItem(key)}
                          isSelected={visibleItems[key]}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                </FocusTrap>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isEditMode && (
        <div className="mb-4 rounded-lg border border-blue-600/30 bg-blue-900/30 p-3 text-center">
          <p className="text-preset-6 text-blue-300">
            🔄 Edit Mode: Drag and drop cards to reorder them
          </p>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={visibleItemsInOrder}
          strategy={rectSortingStrategy}
        >
          <motion.div
            className={`grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 ${
              isEditMode
                ? "rounded-lg border-2 border-dashed border-blue-500/30 p-2"
                : ""
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {visibleItemsInOrder.map((key) => {
                const data = getWeatherData(key);
                return (
                  <SortableItem key={key} id={key} isEditMode={isEditMode}>
                    <WeatherInfoGridItem
                      label={data.label}
                      value={data.value}
                      loading={false}
                    />
                  </SortableItem>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <div className="cursor-grabbing opacity-90">
              <WeatherInfoGridItem
                {...getWeatherData(activeId)}
                loading={false}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default WeatherInfoGrid;
