function WeatherImageInfo() {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-[url('/images/bg-today-small.svg')] bg-center bg-no-repeat w-full aspect-square">
      <h2 className="text-preset-4">Berlin, Germany</h2>
      <p className="text-preset-6 mt-3 text-neutral-0/80">
        Tuesday, Aug 5 2025
      </p>
      <div className="flex items-center gap-5 w-full px-6">
        <img src="/images/icon-sunny.webp" alt="Sunny" className="w-30 h-30" />
        <p className="text-preset-1">20°</p>
      </div>
    </div>
  );
}

export default WeatherImageInfo;
