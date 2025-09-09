import WeatherInfoGridItem from "./WeatherInfoGridItem";

function WeatherInfoGrid({ current }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:gap-5">
      <WeatherInfoGridItem
        label="Feels Like"
        value={`${Math.round(current.apparent_temperature)}°`}
      />
      <WeatherInfoGridItem
        label="Humidity"
        value={`${Math.round(current.relative_humidity_2m)}%`}
      />
      <WeatherInfoGridItem
        label="Wind"
        value={`${Math.round(current.wind_speed_10m)} km/h`}
      />
      <WeatherInfoGridItem
        label="Precipitation"
        value={`${Math.round(current.precipitation)} mm`}
      />
    </div>
  );
}

export default WeatherInfoGrid;
