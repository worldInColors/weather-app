import { BookmarkIcon, CopyMinus, MapPin, X } from "lucide-react";
import { FocusTrap } from "focus-trap-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { dropDownAnimation } from "../animations/motionVariants";
import { useOutsideClick } from "../utils/hooks/useClickOutside";
function BookmarkDropdown({ bookmarks, setBookmarks, fetchWeatherData }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group focus-ring flex cursor-pointer items-center gap-2 rounded-md bg-neutral-800 px-3 py-2 transition-colors outline-none hover:bg-neutral-700"
        aria-label="Bookmarks"
      >
        <BookmarkIcon
          className={`h-5 w-5 group-hover:text-white ${isOpen ? "fill-neutral-0" : "fill-transparent"} transition duration-200`}
        />
        <span className="text-preset-7 hidden text-neutral-200 group-hover:text-white sm:inline">
          Bookmarks
        </span>
        <span className="hidden rounded-full bg-neutral-600 px-2 py-1 text-xs text-neutral-200 sm:inline">
          {bookmarks?.length}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dropdown */}
            <FocusTrap
              focusTrapOptions={{
                initialFocus: false,
                allowOutsideClick: true,
              }}
            >
              <motion.div
                variants={dropDownAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full right-0 z-20 mt-2 w-[250px] rounded-xl border border-neutral-600 bg-neutral-800 shadow-xl sm:w-[300px]"
              >
                {/* Header */}
                <div className="border-b border-neutral-600 px-4 py-3">
                  <h3 className="text-preset-5-md text-white">
                    Saved Locations
                  </h3>
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
                      {bookmarks.map((bookmark, index) => (
                        <motion.div
                          key={`${bookmark.city}-${bookmark.country}`}
                          className="group focus-ring relative flex cursor-pointer items-center justify-between overflow-hidden rounded-lg p-3 transition-colors"
                          onClick={() => handleSelectBookmark(bookmark)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleSelectBookmark(bookmark);
                            }
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.03,
                            duration: 0.2,
                          }}
                        >
                          <div className="absolute inset-0 -translate-x-full transform bg-neutral-700 transition-transform duration-300 ease-out group-hover:translate-x-0" />

                          <div className="relative flex min-w-0 flex-1 items-center gap-3">
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
                            className="focus-ring relative flex-shrink-0 cursor-pointer rounded-full p-1 text-neutral-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-neutral-600 hover:text-red-400"
                            aria-label={`Remove ${bookmark.city} from bookmarks`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </FocusTrap>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
export default BookmarkDropdown;
