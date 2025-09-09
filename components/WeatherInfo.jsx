import ForecastGrid from "./ForecastGrid";
import HourlyForecast from "./HourlyForecast";
import InfoGrid from "./InfoGrid";
import SearchBar from "./SearchBar";
import WeatherImageInfo from "./WeatherImageInfo";

function WeatherInfo() {
  return (
    <div className="px-3 flex flex-col gap-2 mb-20">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center mt-8 lg:justify-center lg:max-w-2xl lg:mx-auto">
        <SearchBar />
        <button className="w-full lg:w-auto lg:px-8 bg-blue-500 h-12 lg:h-10 rounded-xl">
          Search
        </button>
      </div>
      <div className="lg:flex lg:gap-6 items-center justify-between">
        <div className="mb-4 lg:flex-2">
          <WeatherImageInfo />
          <InfoGrid />
          <h2 className="mt-2">Daily forecast</h2>
          <ForecastGrid />
        </div>
        <div className="lg:flex-1">
          <HourlyForecast />
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
