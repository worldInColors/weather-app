function DailyForecastGridItem({ day, icon, temp1, temp2 }) {
  return (
    <div className="flex flex-col items-center bg-neutral-800 p-4  rounded-xl">
      <h3>{day}</h3>
      <img src={icon} alt={day} className="w-14 h-14" />
      <div className="flex justify-between w-full text-sm mt-2">
        <p>{temp1}</p>
        <p>{temp2}</p>
      </div>
    </div>
  );
}

export default DailyForecastGridItem;
