import { useState } from "react";
import { Search, MapPin, Droplets, Wind, Eye } from "lucide-react";

function ComparisonSearchBar({ onLocationSelect, label }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (value) => {
    setQuery(value);

    if (value.length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5`,
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (result) => {
    onLocationSelect({
      name: result.name,
      country: result.country,
      lat: result.latitude,
      lng: result.longitude,
    });
    setQuery("");
    setIsOpen(false);
  };

  const formatLocation = (result) => {
    const parts = [result.name];
    if (result.admin1) parts.push(result.admin1);
    if (result.country) parts.push(result.country);
    return parts.join(", ");
  };

  return (
    <div className="relative">
      <label className="mb-3 block text-sm font-medium text-neutral-200">
        {label}
      </label>

      <div className="relative flex items-center gap-3 rounded-xl bg-neutral-700 p-3 text-neutral-200">
        <Search className="h-5 w-5 opacity-70" />
        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search for a location..."
          className="flex-1 bg-transparent outline-none placeholder:text-neutral-400"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 left-0 z-10 mt-2 rounded-xl bg-neutral-800 p-2 shadow-lg">
          {loading ? (
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-400">
              <div className="h-3 w-3 animate-spin rounded-full border border-neutral-500 border-t-transparent"></div>
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-200 transition-colors hover:bg-neutral-700"
                >
                  {formatLocation(result)}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-2 text-sm text-neutral-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Compact weather card for comparison
function ComparisonWeatherCard({ location, weatherData, loading }) {
  if (loading) {
    return (
      <div className="rounded-xl bg-neutral-900 p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-900/50 p-6">
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <MapPin className="mb-3 h-12 w-12 text-neutral-600" />
          <p className="text-neutral-400">Select a location to compare</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-6">
      {/* Location header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">{location.name}</h3>
          <p className="text-sm text-neutral-400">{location.country}</p>
        </div>
        <MapPin className="h-5 w-5 text-neutral-500" />
      </div>

      {/* Main temperature display */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-6xl font-bold text-white">
            {weatherData?.temperature || "24"}°
          </p>
          <p className="mt-2 text-neutral-400">
            Feels like {weatherData?.feelsLike || "22"}°
          </p>
        </div>
        <div className="text-right">
          <p className="text-4xl">☀️</p>
          <p className="mt-2 text-sm text-neutral-400">Sunny</p>
        </div>
      </div>

      {/* Weather details grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-neutral-800/50 p-3">
          <div className="flex items-center gap-2 text-neutral-400">
            <Droplets className="h-4 w-4" />
            <span className="text-xs">Humidity</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-white">
            {weatherData?.humidity || "65"}%
          </p>
        </div>

        <div className="rounded-lg bg-neutral-800/50 p-3">
          <div className="flex items-center gap-2 text-neutral-400">
            <Wind className="h-4 w-4" />
            <span className="text-xs">Wind Speed</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-white">
            {weatherData?.windSpeed || "12"} km/h
          </p>
        </div>

        <div className="rounded-lg bg-neutral-800/50 p-3">
          <div className="flex items-center gap-2 text-neutral-400">
            <Eye className="h-4 w-4" />
            <span className="text-xs">Visibility</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-white">
            {weatherData?.visibility || "10"} km
          </p>
        </div>

        <div className="rounded-lg bg-neutral-800/50 p-3">
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="text-xs">Precipitation</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-white">
            {weatherData?.precipitation || "0"} mm
          </p>
        </div>
      </div>
    </div>
  );
}

// Demo page
export default function ComparePage() {
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-900 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          Compare Weather Locations
        </h1>

        {/* Search bars */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <ComparisonSearchBar
            label="Location 1"
            onLocationSelect={setLocation1}
          />
          <ComparisonSearchBar
            label="Location 2"
            onLocationSelect={setLocation2}
          />
        </div>

        {/* Weather cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <ComparisonWeatherCard location={location1} loading={false} />
          <ComparisonWeatherCard location={location2} loading={false} />
        </div>
      </div>
    </div>
  );
}
