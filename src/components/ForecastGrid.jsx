import ForecastGridItem from "./ForecastGridItem";

function ForecastGrid() {
  return (
    <div className="grid grid-cols-3 gap-2 gap-y-4">
      <ForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <ForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <ForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <ForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <ForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
      <ForecastGridItem
        day="Wed"
        icon="/images/icon-sunny.webp"
        temp1="22°"
        temp2="18°"
      />
    </div>
  );
}

export default ForecastGrid;
