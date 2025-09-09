import DailyForecastGridItem from "./DailyForecastGridItem";

function DailyForecastGrid() {
  return (
    <div className="mt-5 grid grid-cols-3 items-end gap-2 gap-y-4 md:flex md:gap-5 lg:justify-center">
      <DailyForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <DailyForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <DailyForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <DailyForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <DailyForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <DailyForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <DailyForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
    </div>
  );
}

export default DailyForecastGrid;
