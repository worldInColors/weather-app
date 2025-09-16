import WeatherInfoGridItem from "./WeatherInfoGridItem";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

function getVisibilityScale(metersValue) {
  if (metersValue >= 20000) return 10; // Excellent (20km+)
  if (metersValue >= 10000) return 9; // Very Good (10-20km)
  if (metersValue >= 7000) return 8; // Good (7-10km)
  if (metersValue >= 5000) return 7; // Fair (5-7km)
  if (metersValue >= 3000) return 6; // Moderate (3-5km)
  if (metersValue >= 2000) return 5; // Poor (2-3km)
  if (metersValue >= 1000) return 4; // Very Poor (1-2km)
  if (metersValue >= 500) return 3; // Bad (0.5-1km)
  if (metersValue >= 200) return 2; // Very Bad (0.2-0.5km)
  return 1; // Extremely Poor (<200m)
}

function WeatherInfoGrid({ current, loading, selectedOptions }) {
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
    <motion.div
      className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <WeatherInfoGridItem
        label="Feels Like"
        value={`${Math.round(current.apparent_temperature)}°`}
        loading={false}
        animationKey={selectedOptions.temperature}
      />
      <WeatherInfoGridItem
        label="Humidity"
        value={`${Math.round(current.relative_humidity_2m)}%`}
        loading={false}
      />
      <WeatherInfoGridItem
        label="Wind"
        value={`${Math.round(current.wind_speed_10m)} ${selectedOptions.windSpeed}`}
        loading={false}
        animationKey={selectedOptions.windSpeed}
      />
      <WeatherInfoGridItem
        label="Precipitation"
        value={`${Math.round(current.precipitation)} ${selectedOptions.precipitation}`}
        loading={false}
        animationKey={selectedOptions.precipitation}
      />
      <WeatherInfoGridItem
        label="UV Index"
        value={`${Math.round(current.uv_index)}`}
        loading={false}
      />
      <WeatherInfoGridItem
        label="Visibility"
        value={`${getVisibilityScale(current.visibility)}/10`}
        loading={false}
      />
      <WeatherInfoGridItem
        label="Air Pressure"
        value={`${Math.round(current.pressure_msl)}\u00A0hPa`}
        loading={false}
      />
    </motion.div>
  );
}

export default WeatherInfoGrid;
