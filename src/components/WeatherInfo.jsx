import ForecastGrid from "./ForecastGrid";
import HourlyForecast from "./HourlyForecast";
import InfoGrid from "./InfoGrid";
import SearchBar from "./SearchBar";

function WeatherInfo() {
  return (
    <div className="px-3 flex flex-col gap-2 mb-20">
      <SearchBar />
      <button className="w-full bg-blue-500 h-12 rounded-xl">Search</button>

      <div
        className="flex flex-col items-center justify-center text-center bg-contain bg-center bg-no-repeat w-full aspect-square"
        style={{
          backgroundImage: 'url("/images/bg-today-small.svg")',
        }}
      >
        <h2 className="font-family-dm-sans text-2xl font-[600]">
          Berlin, Germany
        </h2>
        <p className="text-neutral-300 text-sm">Tuesday, Aug 5 2025</p>
        <div className="flex items-center justify-center  w-full italic">
          <img
            src="/images/icon-sunny.webp"
            alt="Sunny"
            className="w-30 h-30"
          />
          <p className="text-7xl">20°</p>
        </div>
      </div>

      <InfoGrid />
      <h2 className="mt-2">Daily forecast</h2>
      <ForecastGrid />
      <HourlyForecast />
    </div>
  );
}

export default WeatherInfo;
