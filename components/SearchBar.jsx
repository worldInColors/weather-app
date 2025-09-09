import { useState } from "react";
import { Button } from "./Button";

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <div className=" relative flex items-center bg-neutral-700 p-3 text-neutral-200 rounded-xl gap-3 mt-12 ">
      <img
        src="/images/icon-search.svg"
        alt="Search"
        className="w-5 h-5 opacity-70"
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search for a place..."
        className="bg-transparent outline-none flex-1 font-dm-sans placeholder:text-neutral-300"
      />
      <button className="w-full lg:w-auto lg:px-8 bg-blue-500 h-12 lg:h-10 rounded-xl">
        Search
      </button>
      {query && (
        <div className="absolute top-full mt-1 right-0 bg-neutral-800 p-2 rounded-xl shadow-lg z-10 min-w-full w-[200px]">
          <div className="mb-4 space-y-1">
            <Button>City name</Button>
            <Button>City name</Button>

            <Button>City name</Button>

            <Button>City name</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
