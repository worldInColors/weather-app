function DailyForecastGridItem({ day, icon, tempMax, tempMin, loading }) {
  if (loading) {
    return (
      <div className="flex min-h-[158px] min-w-[100px] flex-col items-center rounded-xl border border-neutral-600 bg-neutral-800 px-4 py-5"></div>
    );
  }
  return (
    <div className="flex min-w-[100px] flex-col items-center rounded-xl border border-neutral-600 bg-neutral-800 px-4 py-5">
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
