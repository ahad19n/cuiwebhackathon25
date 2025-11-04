import React from "react";

const tabs = [
  { id: "market-prices", label: "Market Prices", icon: "🛒" },
  { id: "weather", label: "Weather", icon: "☁️" },
  { id: "smart-advice", label: "Smart Advice", icon: "💡" },
  { id: "community", label: "Community", icon: "💬" },
];

const Tooltip = ({ activeTab = "market-prices" }) => {
  return (
    <nav className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white/90 p-3 shadow-sm ring-1 ring-emerald-100 backdrop-blur md:flex-nowrap">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              className={`flex w-full min-w-[140px] flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-all md:min-w-[150px] ${
                isActive
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-transparent text-slate-600 hover:bg-emerald-50"
              }`}
            >
              <span className="text-lg" aria-hidden>
                {tab.icon}
              </span>
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Tooltip;
