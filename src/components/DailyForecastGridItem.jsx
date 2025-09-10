function DailyForecastGridItem({ day, icon, tempMax, tempMin, loading }) {
  if (loading) {
    return (
      <div className="flex min-h-[158px] flex-1 flex-col items-center rounded-xl border border-neutral-600 bg-neutral-800 px-[10px] py-4">
        {/* Empty card with same dimensions - min-height matches loading state */}
      </div>
    );
  }
  return (
    <div className="flex min-h-[158px] flex-1 flex-col items-center rounded-xl border border-neutral-600 bg-neutral-800 px-[10px] py-4">
      <h3>{day}</h3>
      <img src={icon} alt={day} className="h-15 w-15" />
      <div className="mt-2 flex w-full justify-between text-sm">
        <p className="text-preset-7">{Math.round(tempMax)}°</p>
        <p className="text-preset-7">{Math.round(tempMin)}°</p>
      </div>
    </div>
  );
}

export default DailyForecastGridItem;
