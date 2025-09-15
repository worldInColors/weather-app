import WeatherImageInfo from "./components/WeatherImageInfo";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import WeatherInfoGrid from "./components/WeatherInfoGrid";
import DailyForecastGrid from "./components/DailyForecastGrid";
import HourlyForecast from "./components/HourlyForecast";
import { useEffect, useState, useCallback, useMemo } from "react";
import { convertWeatherData } from "./utils/unitConverters";
import { usePreloadImages } from "./utils/hooks/usePreloadImage";
import { allIcons } from "./utils/weatherIcons";
import { updateMetaTags } from "./utils/metaTags";
import { RefreshCw } from "lucide-react";

// URL utility functions
const getCoordinatesFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const lat = urlParams.get("lat");
  const lng = urlParams.get("lng");

  if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  }
  return null;
};

const updateUrlWithCoordinates = (lat, lng) => {
  const url = new URL(window.location);
  url.searchParams.set("lat", lat);
  url.searchParams.set("lng", lng);
  window.history.replaceState({}, "", url);
};

const baseOptions = {
  temperature: "celsius",
  windSpeed: "kmh",
  precipitation: "mm",
};
function App() {
  usePreloadImages(allIcons);
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

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
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

      // Update URL with new coordinates
      updateUrlWithCoordinates(lat, lng);

      const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_min,temperature_2m_max,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,wind_speed_10m,weather_code,is_day,pressure_msl,uv_index,visibility&wind_speed_unit=${baseOptions.windSpeed}&temperature_unit=${baseOptions.temperature}&precipitation_unit=${baseOptions.precipitation}`;
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
            lat: lat,
            lon: lng,
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
                  locationData.address?.village,
                country: locationData.address?.country,
                lat: lat,
                lon: lng,
              });
            } else {
              setError("Unable to retrieve location");
            }
          } catch (geocodingError) {
            console.error("Geocoding error:", geocodingError);
            setError("Unable to retrieve location");
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
    // get coords form url if available
    const urlCoords = getCoordinatesFromUrl();
    if (urlCoords) {
      fetchWeatherData(urlCoords.lat, urlCoords.lng);
      return;
    }

    // if no url coords then try geolocation
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            updateUrlWithCoordinates(latitude, longitude);
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);

            setError(error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 25000,
            maximumAge: 600000,
          },
        );
      } else {
        console.error("Geolocation is not supported by this browser");
        setError("Geolocation is not supported by this browser");
      }
    };

    getCurrentLocation();
  }, [fetchWeatherData]);

  const data = useMemo(() => {
    if (!rawData) return null;
    return convertWeatherData(rawData, baseOptions, selectedOptions);
  }, [rawData, selectedOptions]);

  const { current, daily, hourly } = data || {};

  // Update meta tags for social sharing when data is available
  useEffect(() => {
    if (current && location && !loading) {
      updateMetaTags({
        location,
        current,
        selectedOptions,
      });
    }
  }, [current, location, selectedOptions, loading]);

  console.log(current, daily, hourly);

  if (error) {
    return (
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col p-4 pb-12 md:p-6 md:pb-20 lg:px-28">
        <Navbar fetchWeatherData={fetchWeatherData} />
        <div className="mt-16 flex flex-col items-center justify-center">
          <h2 className="text-preset-2 mb-6 text-center">
            Something went wrong
          </h2>
          <p className="text-preset-5-md text-neutral-200">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 flex cursor-pointer items-center gap-2 rounded bg-neutral-800 px-4 py-3"
          >
            <RefreshCw className="h-6 w-6" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col p-4 pb-12 md:p-6 md:pb-20 lg:px-28">
      <Navbar
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        fetchWeatherData={fetchWeatherData}
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
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
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
