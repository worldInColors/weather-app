import Dropdown from "./Dropdown";

function HourlyForecast() {
  const hourlyData = [
    { time: "3 PM", temp: "20°", icon: "/images/icon-sunny.webp" },
    { time: "4 PM", temp: "22°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "5 PM", temp: "19°", icon: "/images/icon-overcast.webp" },
    { time: "6 PM", temp: "18°", icon: "/images/icon-rain.webp" },
    { time: "7 PM", temp: "17°", icon: "/images/icon-rain.webp" },
    { time: "8 PM", temp: "16°", icon: "/images/icon-overcast.webp" },
    { time: "9 PM", temp: "15°", icon: "/images/icon-partly-cloudy.webp" },
    { time: "10 PM", temp: "14°", icon: "/images/icon-overcast.webp" },
  ];

  return (
    <div className="bg-neutral-800 p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-dm-semibold text-lg">Hourly Forecast</h2>
        <Dropdown label="Tuesday" />
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-neutral-700 p-4 rounded-xl min-w-[80px] text-center"
          >
            <p className="text-neutral-200 text-sm mb-2">{hour.time}</p>
            <img src={hour.icon} className="w-8 h-8 mb-2" alt="Weather icon" />
            <p className="text-white font-dm-medium">{hour.temp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
