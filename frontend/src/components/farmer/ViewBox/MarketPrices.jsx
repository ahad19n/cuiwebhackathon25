import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPriceRange,
  setMarketItems,
} from "../../../redux/Slices/FarmerSlice";
import api from "../../../api/api";

const MarketPrices = () => {
  const dispatch = useDispatch();
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { priceRange } = useSelector((state) => state.farmer.marketPrices);

  useEffect(() => {
    const fetchMarketPrices = async () => {
      try {
        setLoading(true);
        const response = await api.getRates();
        if (
          response.data?.success &&
          Array.isArray(response.data?.data?.rates)
        ) {
          // Normalize to ensure latest rate appears first for each vegetable
          const normalized = response.data.data.rates.map((item) => ({
            ...item,
            rates: [...(item.rates || [])].sort(
              (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
            ),
          }));
          setMarketData(normalized);

          // Store in Redux for AI advice
          const flattenedItems = normalized.map((item) => ({
            vegetable: item.name || item.vegetable || "Unknown",
            rate: item.rates[0]?.rate || 0,
            region: item.rates[0]?.region || "N/A",
            date: item.rates[0]?.date || new Date().toISOString(),
          }));
          console.log(
            "MarketPrices - Dispatching items to Redux:",
            flattenedItems
          );
          console.log("MarketPrices - Sample item structure:", normalized[0]);
          dispatch(setMarketItems(flattenedItems));
        } else {
          setMarketData([]);
          dispatch(setMarketItems([]));
        }
      } catch (error) {
        console.error("Error fetching market prices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketPrices();
  }, [dispatch]);

  // Filter items based on price range
  const filteredItems = useMemo(() => {
    if (!marketData.length) return [];

    const hasMin = priceRange?.min !== undefined && priceRange.min !== "";
    const hasMax = priceRange?.max !== undefined && priceRange.max !== "";
    const minPrice = hasMin ? Number(priceRange.min) : 0;
    const maxPrice = hasMax ? Number(priceRange.max) : Infinity;

    return marketData
      .map((item) => {
        const rates = Array.isArray(item.rates) ? item.rates : [];

        const filteredRates = rates.filter((rate) => {
          const value =
            typeof rate.rate === "number" ? rate.rate : parseFloat(rate.rate);

          if (Number.isNaN(value)) return false;
          return value >= minPrice && value <= maxPrice;
        });

        if (!filteredRates.length) return null;
        return { ...item, rates: filteredRates };
      })
      .filter(Boolean);
  }, [marketData, priceRange]);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-emerald-200 backdrop-blur md:p-8">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
          Market Prices
        </h2>
        <p className="text-sm text-slate-500 md:text-base">
          Real-time vegetable and fruit prices across Pakistan
        </p>
      </header>

      <form className="mt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Price Range (PKR)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-emerald-400">
              <span className="text-sm text-slate-500">Min</span>
              <input
                type="number"
                placeholder="0"
                min="0"
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                value={priceRange?.min || ""}
                onChange={(e) =>
                  dispatch(
                    setPriceRange({ ...priceRange, min: e.target.value })
                  )
                }
              />
            </label>
            <label className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-emerald-400">
              <span className="text-sm text-slate-500">Max</span>
              <input
                type="number"
                placeholder="∞"
                min="0"
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                value={priceRange?.max || ""}
                onChange={(e) =>
                  dispatch(
                    setPriceRange({ ...priceRange, max: e.target.value })
                  )
                }
              />
            </label>
          </div>
        </div>
      </form>

      {loading ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-8 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          <p className="mt-4 text-sm text-slate-500">
            Loading market prices...
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-8 text-center shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mb-4 h-12 w-12 text-emerald-400"
            aria-hidden
          >
            <path d="M12 4v16" />
            <path d="m17 9-5-5-5 5" />
          </svg>
          <p className="text-base font-medium text-slate-700 md:text-lg">
            No items found matching your price range.
          </p>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            Try adjusting your price range or check back soon for the latest
            market updates curated for farmers.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl bg-linear-to-br from-emerald-50 to-white p-6 shadow-md ring-1 ring-emerald-100 transition-all hover:shadow-lg"
            >
              <h3 className="mb-4 text-lg font-semibold text-slate-800">
                {item.name}
              </h3>
              <div className="space-y-3">
                {item.rates.map((rate, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-emerald-100"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700">
                        {index === 0 ? "Latest update" : `Update #${index + 1}`}
                      </p>
                      {rate.date && (
                        <p className="mt-1 text-xs text-slate-500">
                          {new Date(rate.date).toLocaleString("en-PK", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-600">
                        Rs. {Number(rate.rate).toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500">per kg</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MarketPrices;
