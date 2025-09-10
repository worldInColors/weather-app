import DailyForecastGridItem from "./DailyForecastGridItem";
const getDayName = (dateString, index) => {
  const date = new Date(dateString);
  const today = new Date();

  // If it's today, show "Today"
  if (index === 0 && date.toDateString() === today.toDateString()) {
    return "Today";
  }

  // Otherwise, return the abbreviated day name
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

function DailyForecastGrid({ daily, loading }) {
  if (loading) {
    return (
      <div className="mt-5 grid grid-cols-3 items-end gap-4 gap-y-4 md:flex lg:justify-center">
        {Array.from({ length: 7 }).map((_, index) => (
          <DailyForecastGridItem key={index} loading={loading} />
        ))}
      </div>
    );
  }
  return (
    <div className="mt-5 grid grid-cols-3 items-end gap-4 gap-y-4 md:flex lg:justify-center">
      {daily?.time?.map((dateString, index) => (
        <DailyForecastGridItem
          key={dateString}
          day={getDayName(dateString, index)}
          icon="/images/icon-sunny.webp"
          tempMax={daily?.temperature_2m_max?.[index]}
          tempMin={daily?.temperature_2m_min?.[index]}
          loading={loading}
        />
      ))}
    </div>
  );
}

export default DailyForecastGrid;
