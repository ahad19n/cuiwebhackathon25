import React from "react";
import { useSelector } from "react-redux";
import { Cloud, CloudRain, Sun } from "lucide-react";

const getWeatherIcon = (condition) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("rain")) return <CloudRain size={32} />;
  if (lowerCondition.includes("cloud")) return <Cloud size={32} />;
  if (lowerCondition.includes("sun") || lowerCondition.includes("hot"))
    return <Sun size={32} />;
  return <Cloud size={32} />;
};

const getWeatherColor = (condition) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("rain")) return "bg-blue-100 text-blue-700";
  if (lowerCondition.includes("cloud")) return "bg-teal-100 text-teal-700";
  if (lowerCondition.includes("sun")) return "bg-yellow-100 text-yellow-800";
  if (lowerCondition.includes("hot")) return "bg-orange-100 text-orange-800";
  return "bg-teal-100 text-teal-700";
};

const Weather = () => {
  const cities = useSelector((state) => state.farmer.weather.cities);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-emerald-200 backdrop-blur md:p-8">
      <header className="space-y-1 mb-6">
        <div className="flex items-center gap-2">
          <Cloud className="h-6 w-6 text-slate-700" />
          <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
            Weather Updates
          </h2>
        </div>
        <p className="text-sm text-slate-500 md:text-base">
          Real-time weather conditions across major Pakistani cities
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cities.map((city, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 shadow-sm transition-all hover:shadow-md ${getWeatherColor(
              city.condition
            )}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <h3 className="font-semibold text-base">{city.name}</h3>
              </div>
              <div className="opacity-70">{getWeatherIcon(city.condition)}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{city.temp}°</span>
                <span className="text-sm">C</span>
              </div>
              <p className="text-sm font-medium">{city.condition}</p>
              <div className="flex items-center gap-1 text-xs opacity-75">
                <svg
                  className="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                <span>{city.humidity}% Humidity</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Weather;
