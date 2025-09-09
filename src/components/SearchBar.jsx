import { useEffect, useState } from "react";
import { DropdownButton as Button } from "./DropdownButton";

function SearchBar({ fetchWeatherData }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (query.length === 0) return;
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`,
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the search results
        console.log(data);
        setResults(data.results || []);
      });
  }, [query]);

  const formatLocation = (result) => {
    const parts = [result.name];

    if (result.admin1) {
      parts.push(result.admin1);
    }

    if (result.country) {
      parts.push(result.country);
    }

    return parts.join(", ");
  };
  return (
    <div className="mt-12 flex flex-col gap-4 md:flex-row lg:max-w-[700px] lg:min-w-[660px] lg:flex-shrink-0 lg:grow lg:items-center lg:self-center">
      <div className="relative flex items-center gap-3 rounded-xl bg-neutral-700 p-3 text-neutral-200 md:flex-1">
        <img
          src="/images/icon-search.svg"
          alt="Search"
          className="h-5 w-5 opacity-70"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for a place..."
          className="text-preset-5 plcaeholder:text-neutral-200 flex-1 bg-transparent outline-none md:flex-1"
        />

        {query && (
          <div className="absolute top-full right-0 z-10 mt-1 w-[200px] min-w-full rounded-xl bg-neutral-800 p-2 shadow-lg">
            <div className="mb-4 space-y-1">
              {results.map((result) => (
                <Button
                  onClick={() => {
                    console.log(result);
                    fetchWeatherData(result.latitude, result.longitude, {
                      name: result.name,
                      country: result.country,
                    });
                    setQuery("");
                  }}
                  key={result.id}
                >
                  {formatLocation(result)}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      <button className="text-preset-5-md w-full rounded-xl bg-blue-500 px-6 py-4 text-neutral-0 md:w-auto md:flex-shrink-0">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
