export const getWeatherIconPath = (weatherCode, isDay = true) => {
  const iconMap = {
    0: isDay ? "/icons/clear-day.svg" : "/icons/clear-night.svg",
    1: isDay
      ? "/icons/partly-cloudy-day.svg"
      : "/icons/partly-cloudy-night.svg",
    2: isDay
      ? "/icons/partly-cloudy-day.svg"
      : "/icons/partly-cloudy-night.svg",
    3: "/icons/overcast.svg",
    45: "/icons/fog.svg",
    48: "/icons/fog.svg",
    51: "/icons/drizzle.svg",
    53: "/icons/drizzle.svg",
    55: "/icons/drizzle.svg",
    56: "/icons/sleet.svg",
    57: "/icons/sleet.svg",
    61: "/icons/rain.svg",
    63: "/icons/rain.svg",
    65: "/icons/rain.svg",
    66: "/icons/sleet.svg",
    67: "/icons/sleet.svg",
    71: "/icons/snow.svg",
    73: "/icons/snow.svg",
    75: "/icons/snow.svg",
    77: "/icons/snow.svg",
    80: isDay
      ? "/icons/partly-cloudy-day-rain.svg"
      : "/icons/partly-cloudy-night-rain.svg",
    81: "/icons/rain.svg",
    82: "/icons/rain.svg",
    85: isDay
      ? "/icons/partly-cloudy-day-snow.svg"
      : "/icons/partly-cloudy-night-snow.svg",
    86: "/icons/snow.svg",
    95: "/icons/thunderstorms.svg",
    96: "/icons/thunderstorms.svg",
    99: "/icons/thunderstorms.svg",
  };

  return iconMap[weatherCode] || "/icons/not-available.svg";
};

export const allIcons = [
  "/icons/clear-day.svg",
  "/icons/clear-night.svg",
  "/icons/partly-cloudy-day.svg",
  "/icons/partly-cloudy-night.svg",
  "/icons/overcast.svg",
  "/icons/fog.svg",
  "/icons/drizzle.svg",
  "/icons/sleet.svg",
  "/icons/rain.svg",
  "/icons/snow.svg",
  "/icons/partly-cloudy-day-rain.svg",
  "/icons/partly-cloudy-night-rain.svg",
  "/icons/partly-cloudy-day-snow.svg",
  "/icons/partly-cloudy-night-snow.svg",
  "/icons/thunderstorms.svg",
  "/icons/not-available.svg",
  "/images/bg-today-small.svg",
  "/images/bg-today-large.svg",
];
