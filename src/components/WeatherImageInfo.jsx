import clsx from "clsx";

function WeatherImageInfo() {
  return (
    <div
      className={clsx(
        "mt-8 mb-5 p-2",

        "flex w-full flex-col items-center justify-center text-center",

        "aspect-square rounded-[20px]",

        "bg-[url('/images/bg-today-small.svg')] bg-cover bg-center bg-no-repeat",

        "md:aspect-[16/9] md:max-h-[300px] md:flex-row md:justify-between md:bg-[url('/images/bg-today-large.svg')] md:p-6 lg:mb-8",
      )}
    >
      <div className="mb-4 flex min-w-[200px] flex-col items-center md:items-start">
        <h2 className="text-preset-4">Berlin, Germany</h2>
        <p className="text-preset-6 mt-3 text-neutral-0/80">
          Tuesday, Aug 5 2025
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-5 px-6 md:justify-end">
        <img src="/images/icon-sunny.webp" alt="Sunny" className="h-30 w-30" />
        <p className="text-preset-1">20°</p>
      </div>
    </div>
  );
}

export default WeatherImageInfo;
