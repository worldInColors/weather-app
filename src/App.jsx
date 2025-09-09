import WeatherImageInfo from "./components/WeatherImageInfo";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherInfoGrid from "./components/WeatherInfoGrid";
import DailyForecastGrid from "./components/DailyForecastGrid";
import HourlyForecast from "./components/HourlyForecast";
import { useEffect, useState } from "react";
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=30.0444&longitude=31.2357&daily=temperature_2m_min,temperature_2m_max&hourly=temperature_2m&current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,wind_speed_10m";

const GEOCODING_URL =
  "https://nominatim.openstreetmap.org/reverse?lat=30.0444&lon=31.2357&format=json";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch both weather data and location simultaneously
    Promise.all([
      fetch(WEATHER_URL).then((response) => response.json()),
      fetch(GEOCODING_URL).then((response) => response.json()),
    ])
      .then(([weatherData, locationData]) => {
        setData(weatherData);
        setLocation({
          city:
            locationData.address.city ||
            locationData.address.town ||
            locationData.address.village,
          country: locationData.address.country,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  const { current, daily } = data;
  console.log(current, location, data, daily);
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
          <WeatherImageInfo current={current} location={location} />
          <WeatherInfoGrid current={current} />
          <div className="lg:flex lg:flex-1 lg:flex-col lg:justify-end">
            <h2 className="text-preset-5 mt-8 lg:mt-0 lg:mb-5">
              Daily forecast
            </h2>
            <DailyForecastGrid daily={daily} />
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
