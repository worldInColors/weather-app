function WeatherInfoGridItem({ label, value, className = "" }) {
  return (
    <div
      className={`flex flex-col gap-6 rounded-xl border border-neutral-600 bg-neutral-800 p-5 md:flex-1 ${className}`}
    >
      <h3 className="text-preset-6">{label}</h3>
      <p className="text-preset-3">{value}</p>
    </div>
  );
}

export default WeatherInfoGridItem;
