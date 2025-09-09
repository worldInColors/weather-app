import WeatherInfoGridItem from "./WeatherInfoGridItem";

function WeatherInfoGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:gap-5">
      <WeatherInfoGridItem />
      <WeatherInfoGridItem />
      <WeatherInfoGridItem />
      <WeatherInfoGridItem />
    </div>
  );
}

export default WeatherInfoGrid;
