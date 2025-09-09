function WeatherInfoGridItem() {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-neutral-600 bg-neutral-800 p-5 md:flex-1">
      <h3 className="text-preset-6">Feels Like</h3>
      <p className="text-preset-3">18°</p>
    </div>
  );
}

export default WeatherInfoGridItem;
