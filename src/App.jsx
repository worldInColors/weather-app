import WeatherImageInfo from "./components/WeatherImageInfo";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherInfoGrid from "./components/WeatherInfoGrid";
import DailyForecastGrid from "./components/DailyForecastGrid";
import HourlyForecast from "./components/HourlyForecast";
function App() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col p-4 pb-12 md:p-6 md:pb-20">
      <Navbar />
      {/* Prevent weird line breaks */}
      <h1 className="text-preset-2 mt-12 self-center px-4 text-center md:px-30">
        How's the sky&nbsp;looking today?
      </h1>
      <SearchBar />
      <div className="justify-center lg:flex lg:gap-8 lg:px-28">
        <div className="lg:flex lg:flex-2 lg:flex-col">
          <WeatherImageInfo />
          <WeatherInfoGrid />
          <div className="lg:flex lg:flex-1 lg:flex-col lg:justify-end">
            <h2 className="text-preset-5 mt-8 lg:mt-0 lg:mb-5">
              Daily forecast
            </h2>
            <DailyForecastGrid />
          </div>
        </div>
        <div className="lg:flex-1">
          <HourlyForecast />
        </div>
      </div>
    </div>
  );
}

export default App;
