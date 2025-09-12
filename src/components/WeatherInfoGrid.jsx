import WeatherInfoGridItem from "./WeatherInfoGridItem";

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
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
      <WeatherInfoGridItem
        label="Feels Like"
        value={loading ? "–" : `${Math.round(current.apparent_temperature)}°`}
      />
      <WeatherInfoGridItem
        label="Humidity"
        value={loading ? "–" : `${Math.round(current.relative_humidity_2m)}%`}
      />
      <WeatherInfoGridItem
        label="Wind"
        value={
          loading
            ? "–"
            : `${Math.round(current.wind_speed_10m)} ${selectedOptions.windSpeed}`
        }
      />
      <WeatherInfoGridItem
        label="Precipitation"
        value={
          loading
            ? "–"
            : `${Math.round(current.precipitation)} ${selectedOptions.precipitation}`
        }
      />
      <WeatherInfoGridItem
        label="UV Index"
        value={loading ? "–" : `${Math.round(current.uv_index)}`}
      />
      <WeatherInfoGridItem
        label="Visibility"
        value={loading ? "–" : `${getVisibilityScale(current.visibility)}/10`}
      />
      <WeatherInfoGridItem
        label="Air Pressure"
        value={loading ? "–" : `${Math.round(current.pressure_msl)}\u00A0hPa`}
      />
    </div>
  );
}

export default WeatherInfoGrid;
