import clsx from "clsx";
import LoadingDots from "./LoadingDots";
import { getWeatherIconPath } from "../utils/weatherIcons";

function WeatherImageInfo({ current, location, loading }) {
  const iconPath = getWeatherIconPath(
    current?.weather_code,
    new Date().getHours() >= 6 && new Date().getHours() < 18,
  );

  return (
    <div
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
          <div className="mb-4 flex flex-col items-center md:mb-0 md:flex-2 md:items-start">
            <h2 className="text-preset-4">
              {location.city}, {location.country}
            </h2>
            <p className="text-preset-6 mt-3 text-neutral-0/80">
              {new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date())}
            </p>
          </div>
          <div className="flex w-full items-center justify-center gap-5 px-6 md:flex-1 md:justify-end">
            <img src={iconPath} alt="Sunny" className="h-30 w-30" />
            <p className="text-preset-1">
              {Math.round(current.temperature_2m)}°
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherImageInfo;
