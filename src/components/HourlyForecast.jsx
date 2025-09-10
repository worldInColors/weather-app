import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { getWeatherIconPath } from "../utils/weatherIcons";

function HourlyForecast({ hourly, loading }) {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const [selectedDay, setSelectedDay] = useState(dayName);

  if (loading) {
    return (
      <div className="mt-8 flex max-h-[693px] w-full min-w-[300px] flex-col rounded-xl bg-neutral-800 p-6">
        <div className="sticky top-0 z-10 bg-neutral-800 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="font-dm-semibold text-lg text-white">
              Hourly forecast
            </h2>
            <Dropdown
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
          {new Array(24).fill(null).map((_, index) => (
            <div
              key={index}
              className="flex min-h-[58px] items-center justify-between gap-4 rounded-lg border border-neutral-600 bg-neutral-700 p-3 py-2 transition-colors"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const hourlyWithDays = hourly.time.map((timeStr, index) => {
    const date = new Date(timeStr);
    const hour = date.getHours();
    const isDay = hour >= 6 && hour < 18;
    return {
      time: timeStr,
      dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
      formattedTime: date.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      temperature: Math.round(hourly.temperature_2m[index]),
      icon: getWeatherIconPath(hourly.weather_code[index], isDay),
    };
  });

  // Filter to only show hours for the selected day
  const selectedDayHours = hourlyWithDays.filter(
    (hour) => hour.dayName === selectedDay,
  );

  return (
    <div className="mt-8 flex max-h-[693px] w-full min-w-[300px] flex-col rounded-xl bg-neutral-800 p-6">
      <div className="sticky top-0 bg-neutral-800 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="font-dm-semibold text-lg text-white">
            Hourly forecast
          </h2>
          <Dropdown selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {selectedDayHours.map((hour, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 rounded-lg border border-neutral-600 bg-neutral-700 p-3 py-2 transition-colors"
          >
            <div className="flex flex-1 items-center">
              <img src={hour.icon} alt="Weather icon" className="h-10 w-10" />
              <p className="text-preset-5-md min-w-[50px]">
                {hour.formattedTime}
              </p>
            </div>
            <p className="text-right">{hour.temperature}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
