import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TrendingUp, Sparkles, RefreshCw } from "lucide-react";
import { fetchSmartAdvice } from "../../../redux/Slices/FarmerSlice";

const colorMap = {
  green: "bg-green-100 text-green-800 border-green-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
};

const SmartAdvice = () => {
  const dispatch = useDispatch();
  const { tips, aiAdvice, loading, error } = useSelector(
    (state) => state.farmer.smartAdvice
  );
  const weatherData = useSelector((state) => state.farmer.weather.cities);
  const marketItems = useSelector((state) => state.farmer.marketPrices.items);
  const [hasWeatherBeenUsed, setHasWeatherBeenUsed] = React.useState(false);

  const handleFetchAdvice = () => {
    // Prepare weather data (use first city or mock data if not available)
    const weather =
      weatherData.length > 0
        ? weatherData[0]
        : {
            name: "Pakistan",
            temp: 25,
            condition: "Clear",
            humidity: 60,
          };

    // Prepare rates data
    const rates = marketItems.slice(0, 10); // Send top 10 items

    console.log("Fetching AI advice with data:", { weather, rates });

    if (rates.length > 0) {
      dispatch(fetchSmartAdvice({ weather, rates }));
      // Mark that we've used real weather data if available
      if (weatherData.length > 0) {
        setHasWeatherBeenUsed(true);
      }
    } else {
      console.log("Missing data - Rates count:", rates.length);
    }
  };

  useEffect(() => {
    console.log("SmartAdvice - Weather data:", weatherData);
    console.log("SmartAdvice - Market items:", marketItems);
    console.log("SmartAdvice - AI advice:", aiAdvice);

    // Fetch AI advice when market data is available and no advice exists yet
    if (marketItems.length > 0 && !aiAdvice && !loading) {
      console.log(
        "SmartAdvice - Triggering fetch because market data is ready"
      );
      handleFetchAdvice();
    }
    // If weather data arrives and we haven't used real weather yet, refresh
    else if (
      weatherData.length > 0 &&
      !hasWeatherBeenUsed &&
      aiAdvice &&
      !loading
    ) {
      console.log(
        "SmartAdvice - Real weather data now available, refreshing advice"
      );
      handleFetchAdvice();
    } else {
      console.log("SmartAdvice - Not fetching:", {
        hasWeather: weatherData.length > 0,
        hasMarket: marketItems.length > 0,
        hasAdvice: !!aiAdvice,
        isLoading: loading,
        hasWeatherBeenUsed,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData.length, marketItems.length]);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-emerald-200 backdrop-blur md:p-8">
      <header className="space-y-1 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-slate-700" />
            <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
              Smart Farming Advice
            </h2>
          </div>
          <button
            onClick={handleFetchAdvice}
            disabled={loading || marketItems.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Refresh AI advice"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </header>

      {/* AI Advice Section */}
      {loading && !aiAdvice && (
        <div className="mb-6 rounded-2xl bg-linear-to-r from-emerald-50 to-blue-50 p-6 border border-emerald-200">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-emerald-600 animate-pulse" />
            <p className="text-slate-700">Generating personalized advice...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl bg-red-50 p-6 border border-red-200">
          <p className="text-red-700 text-sm">
            {error}. Using general tips instead.
          </p>
        </div>
      )}

      {/* Show message if weather data is not available */}
      {weatherData.length === 0 && marketItems.length > 0 && (
        <div className="mb-6 rounded-2xl bg-blue-50 p-6 border border-blue-200">
          <p className="text-blue-800 text-sm">
            ℹ️ Weather data unavailable. AI advice will be based on market
            prices only.
          </p>
        </div>
      )}

      {/* Show message if market data is not available */}
      {marketItems.length === 0 && (
        <div className="mb-6 rounded-2xl bg-yellow-50 p-6 border border-yellow-200">
          <p className="text-yellow-800 text-sm">
            ⚠️ Waiting for market data to load...
          </p>
        </div>
      )}

      {aiAdvice && (
        <div className="mb-6 rounded-2xl bg-linear-to-r from-emerald-50 to-blue-50 p-6 border border-emerald-200 shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <Sparkles className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                AI-Powered Recommendations
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                  {aiAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Tips */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-slate-700 mb-4">
          General Farming Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className={`rounded-2xl p-5 shadow-sm border transition-all hover:shadow-md ${
                colorMap[tip.color] || colorMap.green
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl" aria-hidden>
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold mb-1">{tip.title}</h4>
                  <p className="text-xs leading-relaxed opacity-90">
                    {tip.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartAdvice;
