import WeatherImageInfo from "./components/WeatherImageInfo";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherInfoGrid from "./components/WeatherInfoGrid";
import DailyForecastGrid from "./components/DailyForecastGrid";
import HourlyForecast from "./components/HourlyForecast";
import { useEffect, useState, useCallback, useMemo } from "react";
import { convertWeatherData } from "./utils/unitConverters";
const baseOptions = {
  temperature: "celsius",
  windSpeed: "kmh",
  precipitation: "mm",
};
function App() {
  const [rawData, setRawData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    system: "metric",
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  });

  const fetchWeatherData = useCallback(
    async (lat, lng, locationInfo = null) => {
      setLoading(true);
      setError(null);

      if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        console.error("Invalid coordinates provided");
        setError("Invalid location coordinates");
        setLoading(false);
        return;
      }
      const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_min,temperature_2m_max&hourly=temperature_2m&current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,wind_speed_10m&wind_speed_unit=${baseOptions.windSpeed}&temperature_unit=${baseOptions.temperature}&precipitation_unit=${baseOptions.precipitation}`;

      try {
        const weatherResponse = await fetch(WEATHER_URL);
        if (!weatherResponse.ok) {
          throw new Error(`Weather API error: ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();
        setRawData(weatherData);

        if (locationInfo) {
          setLocation({
            city: locationInfo.name,
            country: locationInfo.country,
          });
        } else {
          try {
            const GEOCODING_URL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
            const locationResponse = await fetch(GEOCODING_URL);

            if (locationResponse.ok) {
              const locationData = await locationResponse.json();
              setLocation({
                city:
                  locationData.address?.city ||
                  locationData.address?.town ||
                  locationData.address?.village ||
                  "Unknown City",
                country: locationData.address?.country || "Unknown Country",
              });
            } else {
              setLocation({ city: "Unknown City", country: "Unknown Country" });
            }
          } catch (geocodingError) {
            console.error("Geocoding error:", geocodingError);
            setLocation({ city: "Unknown City", country: "Unknown Country" });
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error.message);
        setLoading(false);
      }
    },
    [],
  );

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
            console.log("Falling back to default location: Cairo");
            fetchWeatherData(30.0444, 31.2357);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 600000,
          },
        );
      } else {
        console.error("Geolocation is not supported by this browser");
        fetchWeatherData(30.0444, 31.2357);
      }
    };

    getCurrentLocation();
  }, [fetchWeatherData]);

  const data = useMemo(() => {
    if (!rawData) return null;
    return convertWeatherData(rawData, baseOptions, selectedOptions);
  }, [rawData, selectedOptions]);

  const { current, daily, hourly } = data || {};

  if (error) {
    return (
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col items-center justify-center p-4">
        <h2 className="text-preset-3 mb-4 text-red-600">
          Error loading weather data
        </h2>
        <p className="text-preset-6 text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col p-4 pb-12 md:p-6 md:pb-20 lg:px-28">
      <Navbar
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
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
            selectedOptions={selectedOptions}
          />
          <WeatherInfoGrid
            current={current}
            loading={loading}
            selectedOptions={selectedOptions}
          />
          <div className="lg:flex lg:min-w-[657px] lg:flex-1 lg:flex-col lg:justify-end">
            <h2 className="text-preset-5 mt-8 lg:mb-0">Daily forecast</h2>
            <DailyForecastGrid
              loading={loading}
              daily={daily}
              selectedOptions={selectedOptions}
            />
          </div>
        </div>
        <div className="lg:flex-1">
          <HourlyForecast
            hourly={hourly}
            loading={loading}
            selectedOptions={selectedOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
