export const convertTemperature = (temp, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return temp;

  if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    return (temp * 9) / 5 + 32;
  }

  if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    return ((temp - 32) * 5) / 9;
  }

  return temp;
};

export const convertWindSpeed = (speed, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return speed;

  // Convert everything to m/s first, then to target unit
  let speedInMps = speed;

  // Convert from source unit to m/s
  switch (fromUnit) {
    case "kmh":
      speedInMps = speed / 3.6;
      break;
    case "mph":
      speedInMps = speed / 2.237;
      break;
    case "ms":
      speedInMps = speed;
      break;
    case "kn": // knots
      speedInMps = speed / 1.944;
      break;
  }

  // Convert from m/s to target unit
  switch (toUnit) {
    case "kmh":
      return speedInMps * 3.6;
    case "mph":
      return speedInMps * 2.237;
    case "ms":
      return speedInMps;
    case "kn":
      return speedInMps * 1.944;
    default:
      return speedInMps;
  }
};

export const convertPrecipitation = (amount, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return amount;

  // Convert mm to inches or vice versa
  if (fromUnit === "mm" && toUnit === "inch") {
    return amount / 25.4;
  }

  if (fromUnit === "inch" && toUnit === "mm") {
    return amount * 25.4;
  }

  return amount;
};

// Helper function to apply conversions to weather data
export const convertWeatherData = (data, fromOptions, toOptions) => {
  if (!data) return data;

  const convertedData = { ...data };

  // Convert current weather
  if (data.current) {
    convertedData.current = {
      ...data.current,
      temperature_2m: convertTemperature(
        data.current.temperature_2m,
        fromOptions.temperature,
        toOptions.temperature,
      ),
      apparent_temperature: convertTemperature(
        data.current.apparent_temperature,
        fromOptions.temperature,
        toOptions.temperature,
      ),
      wind_speed_10m: convertWindSpeed(
        data.current.wind_speed_10m,
        fromOptions.windSpeed,
        toOptions.windSpeed,
      ),
      precipitation: convertPrecipitation(
        data.current.precipitation,
        fromOptions.precipitation,
        toOptions.precipitation,
      ),
    };
  }

  // Convert daily forecast
  if (data.daily) {
    convertedData.daily = {
      ...data.daily,
      temperature_2m_min: data.daily.temperature_2m_min?.map((temp) =>
        convertTemperature(
          temp,
          fromOptions.temperature,
          toOptions.temperature,
        ),
      ),
      temperature_2m_max: data.daily.temperature_2m_max?.map((temp) =>
        convertTemperature(
          temp,
          fromOptions.temperature,
          toOptions.temperature,
        ),
      ),
    };
  }

  // Convert hourly forecast
  if (data.hourly) {
    convertedData.hourly = {
      ...data.hourly,
      temperature_2m: data.hourly.temperature_2m?.map((temp) =>
        convertTemperature(
          temp,
          fromOptions.temperature,
          toOptions.temperature,
        ),
      ),
    };
  }

  return convertedData;
};
