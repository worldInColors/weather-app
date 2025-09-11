import { useEffect, useState } from "react";
import { DropdownButton as Button } from "./DropdownButton";
import { SearchIcon } from "lucide-react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedResult = results[0];
    if (selectedResult) {
      fetchWeatherData(selectedResult.latitude, selectedResult.longitude, {
        name: selectedResult.name,
        country: selectedResult.country,
      });
      setQuery("");
    }
  };
  return (
    <div className="mt-12 flex flex-col gap-4 md:flex-row lg:max-w-[700px] lg:min-w-[660px] lg:flex-shrink-0 lg:grow lg:items-center lg:self-center">
      <form onSubmit={handleSubmit} className="contents">
        <div className="relative flex items-center gap-3 rounded-xl bg-neutral-700 p-3 text-neutral-200 outline-none focus-within:ring-2 focus-within:ring-neutral-0 md:flex-1">
          <div className="contents outline-none focus:ring-2 focus:ring-neutral-0">
            <SearchIcon className="h-5 w-5 opacity-70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for a place..."
              className="text-preset-5 flex-1 cursor-pointer bg-transparent outline-none md:flex-1"
            />
          </div>

          {query && (
            <div className="absolute top-full right-0 z-10 mt-1 w-[200px] min-w-full rounded-xl bg-neutral-800 p-2 shadow-lg">
              <div className="mb-4 space-y-1">
                {results.length > 0 ? (
                  results.map((result) => (
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
                  ))
                ) : (
                  <div className="text-preset-6 px-3 py-2 pb-0 text-sm">
                    No search results found!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="text-preset-5-md w-full cursor-pointer rounded-xl bg-blue-500 px-6 py-4 text-neutral-0 transition-colors outline-none hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 md:w-auto md:flex-shrink-0"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
