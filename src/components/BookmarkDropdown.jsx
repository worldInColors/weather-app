import { BookmarkIcon, MapPin, X } from "lucide-react";
import { useState } from "react";

function BookmarkDropdown({ bookmarks, setBookmarks, fetchWeatherData }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveBookmark = (e, bookmark) => {
    e.stopPropagation();
    const updated = bookmarks.filter(
      (b) => !(b.name === bookmark.name && b.country === bookmark.country),
    );
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const handleSelectBookmark = (bookmark) => {
    console.log(bookmark);
    fetchWeatherData(bookmark.lat, bookmark.lon, bookmark);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex cursor-pointer items-center gap-2 rounded-md bg-neutral-800 px-3 py-2 transition-colors hover:bg-neutral-700"
        aria-label="Bookmarks"
      >
        <BookmarkIcon className="h-5 w-5 text-neutral-200 group-hover:text-white" />
        <span className="text-preset-7 text-neutral-200 group-hover:text-white">
          Bookmarks
        </span>
        <span className="rounded-full bg-neutral-600 px-2 py-1 text-xs text-neutral-200">
          {bookmarks?.length}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 z-20 mt-2 w-[300px] rounded-xl border border-neutral-600 bg-neutral-800 shadow-xl">
            {/* Header */}
            <div className="border-b border-neutral-600 px-4 py-3">
              <h3 className="text-preset-5-md text-white">Saved Locations</h3>
            </div>

            {/* Content */}
            <div className="max-h-[300px] overflow-y-auto">
              {bookmarks.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-4 py-8">
                  <MapPin className="mb-2 h-8 w-8 text-neutral-500" />
                  <p className="text-preset-6 text-center text-neutral-400">
                    No bookmarks yet
                  </p>
                  <p className="mt-1 text-center text-xs text-neutral-500">
                    Click the bookmark icon next to any location to save it
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {bookmarks.map((bookmark) => (
                    <div
                      key={`${bookmark.city}-${bookmark.country}`}
                      className="group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-neutral-700"
                      onClick={() => handleSelectBookmark(bookmark)}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <MapPin className="h-4 w-4 flex-shrink-0 text-neutral-400" />
                        <div className="min-w-0 flex-1">
                          <p className="text-preset-5 truncate text-white">
                            {bookmark.city}
                          </p>
                          <p className="truncate text-xs text-neutral-400">
                            {bookmark.country}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleRemoveBookmark(e, bookmark)}
                        className="flex-shrink-0 rounded-full p-1 text-neutral-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-neutral-600 hover:text-red-400"
                        aria-label={`Remove ${bookmark.city} from bookmarks`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default BookmarkDropdown;
