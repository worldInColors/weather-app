# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Development progress](#development-progress)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (mm)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements

### Screenshot

![](./screenshot.jpg)

_Add your screenshot here once ready._

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

---

## My process

### Built with

- React + Vite
- Tailwind CSS
- Mobile-first workflow

---

### Development progress

#### Day 1

- Set up project structure with React + Vite
- Configured Tailwind CSS with custom color palette and typography
- Created initial components: `WeatherInfo`, `SearchBar`, `Logo`, `Navbar`, `Dropdown`
- Added custom font loading for DM Sans and Bricolage Grotesque
- Built basic weather display layout with temperature and weather icon

#### Day 2

- Added `InfoGrid`, `InfoGridItem`, `ForecastGrid`, `ForecastGridItem`, `HourlyForecast`
- Added "Feels like", "Humidity", and other metrics
- Added "Daily forecast" and "Hourly forecast"
- Started making the `Dropdown` component reusable
- Added functionality to switch between metric/imperial units
- Added hover and selected states to dropdowns
- Added dropdown for weekdays and search bar

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

#### Day 3

- Rewrote most of the UI to match the Figma design
- Made layout responsive for mobile, tablet, and desktop
- Fixed heading breaking at weird places in small viewports
- Learned to use `&nbsp;` to prevent weird line breaks

#### Day 4

- Added hardcoded API integeration
- Fixed some responsive issues
- Made the search give search results in the dropdown
- Added loading state
- Made the search functional when you click on a result

#### Day 5

- Made images and icons pre-load so they dont flicker
- Made icons work depending on weather
- Made the dropdown in the hourlyforecast show the current day at the first option to improve UX
- Made the DailyForecast show Today's weather as Today instead of the day name

---

### What I learned

- When to avoid over-engineering reusability (e.g., units dropdown)
- Faster responsive layouts with Tailwind utilities
- Small typography tricks like `&nbsp;` for better control

---

### Continued development

- Improve icon handling and states
- Add more functionality/edge cases
- Revisit dropdown reusability for specific contexts

---

### Useful resources

- [Tailwind Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev/)

---

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)

---

## Acknowledgments

Thanks to the Frontend Mentor community for inspiration and feedback.

## TODO:

- Fix the hourly forecast
- Make the daily and hourly forecast work
- ~~Fix the resizing thing since its pissing me off (probably by resizing the left column instead of the right)~~
- Fix this classes monstrosity
