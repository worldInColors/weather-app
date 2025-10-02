import { useEffect, useState } from "react";
import { DropdownButton as Button } from "./DropdownButton";
import { SearchIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useDebounce } from "use-debounce";
import { useOutsideClick } from "../utils/hooks/useClickOutside";
import { dropDownAnimation } from "../animations/motionVariants";
import { useEscapeBlur } from "../utils/hooks/useEscapeBlur";
function SearchBar({ fetchWeatherData }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);
  const [isOpen, setIsOpen] = useState(false);
  useEscapeBlur();
  const searchbarRef = useOutsideClick(() => {
    setQuery("");
    setIsOpen(false);
  });

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setResults([]);
      setLoading(false);
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
    setLoading(true);
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${debouncedQuery}&count=5`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [debouncedQuery]);

  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return "";
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  const formatLocation = (result) => {
    const flag = getFlagEmoji(result.country_code);
    const parts = [result.name];
    if (result.admin1) {
      parts.push(result.admin1);
    }
    if (result.country) {
      parts.push(result.country);
    }
    return `${flag} ${parts.join(", ")}`;
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

  const handleSelect = (e, result) => {
    console.log(result);
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setQuery("");
    fetchWeatherData(result.latitude, result.longitude, {
      name: result.name,
      country: result.country,
    });
  };

  return (
    <div
      className="mt-12 flex flex-col gap-4 md:flex-row lg:max-w-[700px] lg:min-w-[660px] lg:flex-shrink-0 lg:grow lg:items-center lg:self-center"
      ref={searchbarRef}
    >
      <form onSubmit={handleSubmit} className="contents">
        <div className="relative flex items-center gap-3 rounded-xl bg-neutral-700 p-3 text-neutral-200 outline-none focus-within:ring-2 focus-within:ring-neutral-0 md:flex-1">
          <div className="focus-ring contents">
            <SearchIcon className="h-5 w-5 opacity-70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for a place..."
              className="text-preset-5 flex-1 cursor-pointer bg-transparent outline-none md:flex-1"
            />
          </div>

          {isOpen && (
            <motion.div
              variants={dropDownAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full right-0 z-10 mt-1 w-[200px] min-w-full rounded-xl bg-neutral-800 p-2 shadow-lg"
            >
              <div className="space-y-1">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-preset-6 mb-4 flex items-center gap-2 px-3 py-2 pb-0 text-sm text-neutral-400"
                  >
                    <div className="h-3 w-3 animate-spin rounded-full border border-neutral-500 border-t-transparent"></div>
                    Searching...
                  </motion.div>
                ) : results.length > 0 ? (
                  <AnimatePresence mode="popLayout">
                    {results.map((result) => (
                      <motion.div
                        key={result.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.15,
                            ease: "easeOut",
                          },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.1 },
                        }}
                      >
                        <Button onClick={(e) => handleSelect(e, result)}>
                          {formatLocation(result)}
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : debouncedQuery.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-preset-6 mb-4 px-3 py-2 pb-0 text-sm"
                  >
                    No search results found!
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
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
