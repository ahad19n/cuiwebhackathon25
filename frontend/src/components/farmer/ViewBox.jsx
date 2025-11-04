import React, { useState } from "react";

const regions = [
  "All Regions",
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
];
const categories = [
  "All Categories",
  "Vegetables",
  "Fruits",
  "Grains",
  "Livestock",
];

const ViewBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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

      <form className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(2,1fr)]">
        <label className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-slate-500 shadow-sm focus-within:ring-2 focus-within:ring-emerald-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            placeholder="Search items..."
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <label className="relative flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-slate-600 shadow-sm focus-within:ring-2 focus-within:ring-emerald-400">
          <span className="font-medium">Region</span>
          <select
            className="w-full bg-transparent text-right text-slate-700 focus:outline-none"
            value={selectedRegion}
            onChange={(event) => setSelectedRegion(event.target.value)}
          >
            {regions.map((region) => (
              <option key={region}>{region}</option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 h-4 w-4 text-emerald-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.585l3.71-3.354a.75.75 0 1 1 1.02 1.1l-4.22 3.82a.75.75 0 0 1-1.02 0l-4.22-3.82a.75.75 0 0 1 .02-1.1Z" />
          </svg>
        </label>

        <label className="relative flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-slate-600 shadow-sm focus-within:ring-2 focus-within:ring-emerald-400 sm:col-span-2 lg:col-span-1">
          <span className="font-medium">Category</span>
          <select
            className="w-full bg-transparent text-right text-slate-700 focus:outline-none"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 h-4 w-4 text-emerald-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.585l3.71-3.354a.75.75 0 1 1 1.02 1.1l-4.22 3.82a.75.75 0 0 1-1.02 0l-4.22-3.82a.75.75 0 0 1 .02-1.1Z" />
          </svg>
        </label>
      </form>

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
          No items found matching your filters.
        </p>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          Adjust your filters or check back soon for the latest market updates
          curated for farmers.
        </p>
      </div>
    </section>
  );
};

export default ViewBox;
