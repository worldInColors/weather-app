import Navbar from "./components/Navbar";
import WeatherInfo from "./components/WeatherInfo";

function App() {
  return (
    <div className="flex flex-col px-2 min-h-screen">
      <Navbar />
      <h1 className="self-center px-16 text-4xl text-center mt-5  font-family-bricolage">
        How's the sky looking today?
      </h1>
      <WeatherInfo />
    </div>
  );
}

export default App;
