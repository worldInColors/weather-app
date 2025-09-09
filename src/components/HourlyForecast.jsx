import { Dropdown } from "./Dropdown";

function HourlyForecast() {
  const hourlyData = [
    { time: "3 PM", temp: "20°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "4 PM", temp: "20°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "5 PM", temp: "20°", icon: "/images/icon-sunny.webp" },
    { time: "6 PM", temp: "19°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "7 PM", temp: "18°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "8 PM", temp: "18°", icon: "/images/icon-fog.webp" },
    { time: "9 PM", temp: "17°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "10 PM", temp: "17°", icon: "/images/icon-partly-cloudy.webp" },
  ];

  return (
    <div className="mt-8 min-w-[270px] rounded-xl bg-neutral-800 p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-dm-semibold text-lg text-white">Hourly forecast</h2>
        <Dropdown label="Tuesday" />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-neutral-600 bg-neutral-700 p-3 transition-colors"
          >
            <div className="flex flex-1 items-center">
              <img src={hour.icon} alt="Weather icon" className="h-10 w-10" />
              <p className="text-preset-5-md min-w-[50px]">{hour.time}</p>
            </div>
            <p className="text-right">{hour.temp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
