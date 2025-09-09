# Weather App - Frontend Mentor Challenge

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app). Built with React, Vite, and Tailwind CSS.

## Development Progress

### Day 1

- Set up project structure with React + Vite
- Configured Tailwind CSS with custom color palette and typography
- Created initial components: `WeatherInfo`, `SearchBar`, `Logo`, `Navbar`, `Dropdown`
- Added custom font loading for DM Sans and Bricolage Grotesque fonts
- Built basic weather display layout with temperature and weather icon

### Day 2

- Added `InfoGrid`, `InfoGridItem`, `ForecastGrid`, `ForecastGridItem`, `HourlyForecast`
- Added the "Feels like", "Humidity", etc.
- Added the "Daily forecast" and "Hourly forecast"
- In the process of making the `Dropdown` component re-usable
- Added functionality to the "Switch to Imperial" button
- Added hover and selected states to the dropdowns
  -# Future me, so, trying to make `Dropdown` re-usable was probably pretty stupid since the added complexity isnt worth it, I might try to make another dropdown and make it re-usable for the days and search one, but making the Units one re-usable isn't worth it in my opinion.
  This was somewhat a challenging part:
- Added Dropdown for weekdays and for the Searchbar

```jsx
const handleUnitSwitch = () => {
  if (selectedOptions.system === "metric") {
    setSelectedOptions((prev) => ({
      ...prev,
      system: "imperial",
      temperature: "fahrenheit",
      windSpeed: "mph",
      precipitation: "inches",
    }));
  } else {
    setSelectedOptions((prev) => ({
      ...prev,
      system: "metric",
      temperature: "celsius",
      windSpeed: "kmh",
      precipitation: "mm",
    }));
  }
};
```

### Day 3

- We got figma file so i ended up re-writing everything to match the design better
- Made it responsive to work on mobile, tablet and desktop
- Small fix for the heading getting too big

## TODO:

- Fix Icons
  -~~ Fix responsive-ness~~
- ~~Fix searchbar~~
- ~~Resizing issue (not that big of a deal )~~
- ~~Fix Daily forecast cards being too small~~
- Work on functionality

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
