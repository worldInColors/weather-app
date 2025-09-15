/**
 * Get weather description from weather code
 * @param {number} code - Weather code
 * @returns {string} Weather description
 */
const getWeatherDescription = (code) => {
  const descriptions = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Slight Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    95: "Thunderstorm",
    96: "Thunderstorm with Hail",
    99: "Heavy Thunderstorm with Hail",
  };

  return descriptions[code] || "Unknown Weather";
};

/**
 * Updates the document meta tags for rich social media embeds
 * @param {Object} params - Parameters for meta tag update
 * @param {Object} params.location - Location object with city, country
 * @param {Object} params.current - Current weather data
 * @param {string} params.selectedOptions - Selected temperature unit options
 */
export const updateMetaTags = ({ location, current, selectedOptions }) => {
  if (!location || !current) return;

  const { city, country } = location;
  const temperature = Math.round(current.temperature_2m);
  const unit = selectedOptions?.temperature === "fahrenheit" ? "°F" : "°C";
  const weatherDesc = getWeatherDescription(current.weather_code);

  // Create dynamic content
  const title = `${temperature}${unit} ${weatherDesc} in ${city}, ${country}`;
  const description = `Current weather in ${city}, ${country}: ${temperature}${unit} and ${weatherDesc.toLowerCase()}. Check the full forecast and more details.`;
  const currentUrl = window.location.href;

  // Determine weather icon for embed
  const iconMap = {
    0: "sunny", // Clear sky
    1: "partly-cloudy", // Mainly clear
    2: "partly-cloudy", // Partly cloudy
    3: "overcast", // Overcast
    45: "fog", // Fog
    48: "fog", // Depositing rime fog
    51: "drizzle", // Light drizzle
    53: "drizzle", // Moderate drizzle
    55: "drizzle", // Dense drizzle
    61: "rain", // Slight rain
    63: "rain", // Moderate rain
    65: "rain", // Heavy rain
    71: "snow", // Slight snow
    73: "snow", // Moderate snow
    75: "snow", // Heavy snow
    95: "storm", // Thunderstorm
    96: "storm", // Thunderstorm with slight hail
    99: "storm", // Thunderstorm with heavy hail
  };

  const weatherIcon = iconMap[current.weather_code] || "sunny";
  const imageUrl = `${window.location.origin}/images/icon-${weatherIcon}.webp`;

  // Update title
  document.title = title;

  // Update meta tags
  updateMetaTag("og:title", title);
  updateMetaTag("og:description", description);
  updateMetaTag("og:url", currentUrl);
  updateMetaTag("og:image", imageUrl);

  updateMetaTag("twitter:title", title);
  updateMetaTag("twitter:description", description);
  updateMetaTag("twitter:url", currentUrl);
  updateMetaTag("twitter:image", imageUrl);

  // Update standard meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", description);
  }
};

/**
 * Helper function to update or create a meta tag
 * @param {string} property - The property attribute value
 * @param {string} content - The content to set
 */
const updateMetaTag = (property, content) => {
  let meta = document.querySelector(`meta[property="${property}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
};
