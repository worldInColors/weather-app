import clsx from "clsx";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionValueEvent,
} from "motion/react";
import { useEffect, useState } from "react";
import LoadingDots from "./LoadingDots";
import { getWeatherIconPath } from "../utils/weatherIcons";
import { Bookmark } from "lucide-react";

function AnimatedTemperature({ temperature }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  // Animate toward the new temperature
  useEffect(() => {
    const controls = animate(motionValue, temperature, {
      duration: 1.5,
      type: "spring",
      stiffness: 60,
      damping: 20,
      delay: 0.5,
    });
    return () => controls.stop();
  }, [temperature, motionValue]);

  useMotionValueEvent(rounded, "change", setDisplayValue);

  return <span>{displayValue}°</span>;
}

function WeatherImageInfo({
  current,
  location,
  loading,
  bookmarks,
  setBookmarks,
}) {
  const iconPath = getWeatherIconPath(
    current?.weather_code,
    new Date().getHours() >= 6 && new Date().getHours() < 18,
  );

  const isBookmarked =
    location &&
    bookmarks?.some(
      (b) => b.city === location.city && b.country === location.country,
    );

  const handleBookmark = () => {
    if (!location) return;
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const bookmark = {
      name: location.city,
      city: location.city,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
    };
    const exists = saved.some(
      (b) => b.city === location.city && b.country === location.country,
    );
    let updated;
    if (exists) {
      updated = saved.filter(
        (b) => !(b.city === location.city && b.country === location.country),
      );
    } else {
      updated = [...saved, bookmark];
    }
    console.log(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setBookmarks(updated);
  };

  return (
    <motion.div
      className={clsx(
        "mt-8 mb-5 flex w-full flex-col items-center justify-center p-2 text-center",
        "aspect-square rounded-[20px]",
        "bg-[url('/images/bg-today-small.svg')] bg-cover bg-center bg-no-repeat",
        "md:aspect-[16/9] md:max-h-[300px] md:flex-row md:justify-between md:bg-[url('/images/bg-today-large.svg')] md:p-6 lg:mb-8",
        loading && "!bg-neutral-800 !bg-none",
      )}
    >
      {loading ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <LoadingDots />
          <p className="text-preset-6">Loading…</p>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut",
              },
            }}
            className="mb-4 flex flex-col items-center md:mb-0 md:flex-2 md:items-start"
          >
            <div className="flex items-center gap-2">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.4 },
                }}
                className="text-preset-4"
              >
                {location.city}, {location.country}
              </motion.h2>
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 0.4,
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200,
                  },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer rounded-full p-1 transition-colors hover:bg-white/10"
                onClick={handleBookmark}
                aria-label="Bookmark this location"
              >
                <Bookmark
                  className={`h-5 w-5 text-white/70 transition-colors group-hover:text-white ${
                    isBookmarked ? "fill-white" : ""
                  }`}
                />
              </motion.button>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5, duration: 0.4 },
              }}
              className="text-preset-6 mt-3 text-neutral-0/80"
            >
              {new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date())}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut",
              },
            }}
            className="flex w-full items-center justify-center gap-5 px-6 md:flex-1 md:justify-end"
          >
            <motion.img
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
                transition: {
                  delay: 0.4,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 120,
                },
              }}
              src={iconPath}
              alt="Weather icon"
              className="h-30 w-30"
            />
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 0.5,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 150,
                },
              }}
              className="text-preset-1"
            >
              <AnimatedTemperature temperature={current.temperature_2m} />
            </motion.p>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default WeatherImageInfo;
