import { BookmarkIcon } from "lucide-react";
import UnitsDropdown from "./UnitsDropdown";
import BookmarkDropdown from "./BookmarkDropdown";

function Navbar({
  selectedOptions,
  setSelectedOptions,
  bookmarks,
  setBookmarks,
  fetchWeatherData,
}) {
  return (
    <div className="flex items-center justify-between">
      <img src="/logo.svg" />
      <div className="flex items-center gap-4">
        <BookmarkDropdown
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
          fetchWeatherData={fetchWeatherData}
        />
        <UnitsDropdown
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
    </div>
  );
}

export default Navbar;
