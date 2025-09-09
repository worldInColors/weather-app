import DailyForecastGridItem from "./DailyForecastGridItem";

function DailyForecastGrid({ daily }) {
  return (
    <div className="mt-5 grid grid-cols-3 items-end gap-2 gap-y-4 md:flex md:gap-5 lg:justify-center">
      <DailyForecastGridItem
        day="Tue"
        icon="/images/icon-sunny.webp"
        tempMax={daily.temperature_2m_max[0]}
        tempMin={daily.temperature_2m_min[0]}
      />
      <DailyForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        tempMax={daily.temperature_2m_max[1]}
        tempMin={daily.temperature_2m_min[1]}
      />
      <DailyForecastGridItem
        day="Thu"
        icon="/images/icon-sunny.webp"
        tempMax={daily.temperature_2m_max[2]}
        tempMin={daily.temperature_2m_min[2]}
      />
      <DailyForecastGridItem
        day="Fri"
        icon="/images/icon-sunny.webp"
        tempMax={daily.temperature_2m_max[3]}
        tempMin={daily.temperature_2m_min[3]}
      />
      <DailyForecastGridItem
        day="Sat"
        icon="/images/icon-sunny.webp"
        tempMax={daily.temperature_2m_max[4]}
        tempMin={daily.temperature_2m_min[4]}
      />
      <DailyForecastGridItem
        day="Sun"
        icon="/images/icon-sunny.webp"
        tempMax={daily.temperature_2m_max[5]}
        tempMin={daily.temperature_2m_min[5]}
      />
      <DailyForecastGridItem
        day="Mon"
        icon="/images/icon-sunny.webp"
        tempMax={daily.temperature_2m_max[6]}
        tempMin={daily.temperature_2m_min[6]}
      />
    </div>
  );
}

export default DailyForecastGrid;
