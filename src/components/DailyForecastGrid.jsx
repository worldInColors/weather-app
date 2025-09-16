import { getWeatherIconPath } from "../utils/weatherIcons";
import DailyForecastGridItem from "./DailyForecastGridItem";
import SkeletonCard from "./SkeletonCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const getDayName = (dateString, index) => {
  const date = new Date(dateString);
  const today = new Date();

  // If it's today, show "Today"
  if (index === 0 && date.toDateString() === today.toDateString()) {
    return "Today";
  }

  // Otherwise, return the abbreviated day name
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

function DailyForecastGrid({ daily, loading }) {
  if (loading) {
    return (
      <div className="mt-5 grid grid-cols-3 items-end gap-4 gap-y-4 md:flex lg:justify-center">
        {Array.from({ length: 7 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  return (
    <motion.div
      className="mt-5 grid grid-cols-3 gap-4 md:flex lg:justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {daily.time.map((dateString, index) => (
        <DailyForecastGridItem
          key={dateString}
          day={getDayName(dateString, index)}
          icon={getWeatherIconPath(daily.weather_code[index], true)}
          tempMax={daily.temperature_2m_max[index]}
          tempMin={daily.temperature_2m_min[index]}
        />
      ))}
    </motion.div>
  );
}

export default DailyForecastGrid;
