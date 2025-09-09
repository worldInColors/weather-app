import WeatherImageInfo from "./components/WeatherImageInfo";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherInfoGrid from "./components/WeatherInfoGrid";
import DailyForecastGrid from "./components/DailyForecastGrid";
import HourlyForecast from "./components/HourlyForecast";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (lat, lng, locationInfo = null) => {
    const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_min,temperature_2m_max&hourly=temperature_2m&current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,wind_speed_10m`;

    try {
      const weatherData = await fetch(WEATHER_URL).then((response) =>
        response.json(),
      );
      setData(weatherData);

      // If locationInfo is provided (from search), use it
      if (locationInfo) {
        setLocation({
          city: locationInfo.name,
          country: locationInfo.country,
        });
      } else {
        // Otherwise, fetch location from reverse geocoding
        const GEOCODING_URL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
        const locationData = await fetch(GEOCODING_URL).then((response) =>
          response.json(),
        );
        setLocation({
          city:
            locationData.address.city ||
            locationData.address.town ||
            locationData.address.village,
          country: locationData.address.country,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 600000,
          },
        );
      } else {
        console.error("Geolocation is not supported by this browser");
        // Fall back to default coordinates (Cairo)
        fetchWeatherData(30.0444, 31.2357);
      }
    };

    getCurrentLocation();
  }, []);

  const { current, daily } = data || {};
  console.log(current, location, data, daily);

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col p-4 pb-12 md:p-6 md:pb-20 lg:px-28">
      <Navbar />
      {/* Prevent weird line breaks */}
      <h1 className="text-preset-2 mt-12 self-center px-4 text-center md:px-30">
        How's the sky&nbsp;looking today?
      </h1>
      <SearchBar fetchWeatherData={fetchWeatherData} />
      <div className="justify-center lg:flex lg:gap-8">
        <div className="lg:flex lg:flex-2 lg:flex-col">
          <WeatherImageInfo
            current={current}
            location={location}
            loading={loading}
          />
          <WeatherInfoGrid current={current} loading={loading} />
          <div className="lg:flex lg:flex-1 lg:flex-col lg:justify-end">
            <h2 className="text-preset-5 mt-8 lg:mb-0">Daily forecast</h2>
            <DailyForecastGrid loading={loading} daily={daily} />
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
