import { Dropdown } from "./Dropdown";

function HourlyForecast() {
  const hourlyData = [
    { time: "12 AM", temp: "16°", icon: "/images/icon-sunny.webp" },
    { time: "1 AM", temp: "16°", icon: "/images/icon-sunny.webp" },
    { time: "2 AM", temp: "15°", icon: "/images/icon-sunny.webp" },
    { time: "3 AM", temp: "15°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "4 AM", temp: "15°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "5 AM", temp: "14°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "6 AM", temp: "14°", icon: "/images/icon-fog.webp" },
    { time: "7 AM", temp: "15°", icon: "/images/icon-fog.webp" },
    { time: "8 AM", temp: "16°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "9 AM", temp: "17°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "10 AM", temp: "18°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "11 AM", temp: "19°", icon: "/images/icon-sunny.webp" },
    { time: "12 PM", temp: "20°", icon: "/images/icon-sunny.webp" },
    { time: "1 PM", temp: "20°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "2 PM", temp: "20°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "3 PM", temp: "20°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "4 PM", temp: "20°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "5 PM", temp: "20°", icon: "/images/icon-sunny.webp" },
    { time: "6 PM", temp: "19°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "7 PM", temp: "18°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "8 PM", temp: "18°", icon: "/images/icon-fog.webp" },
    { time: "9 PM", temp: "17°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "10 PM", temp: "17°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "11 PM", temp: "16°", icon: "/images/icon-sunny.webp" },
  ];

  return (
    <div className="mt-8 max-h-[700px] w-full min-w-[300px] overflow-y-auto rounded-xl bg-neutral-800 p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-dm-semibold text-lg text-white">Hourly forecast</h2>
        <Dropdown label="Tuesday" />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 rounded-lg border border-neutral-600 bg-neutral-700 p-3 transition-colors"
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
