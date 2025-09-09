import WeatherInfoGridItem from "./WeatherInfoGridItem";

function WeatherInfoGrid({ current, loading }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:gap-5">
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
        value={loading ? "–" : `${Math.round(current.wind_speed_10m)} km/h`}
      />
      <WeatherInfoGridItem
        label="Precipitation"
        value={loading ? "–" : `${Math.round(current.precipitation)} mm`}
      />
    </div>
  );
}

export default WeatherInfoGrid;
