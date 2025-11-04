import React from "react";
import { useSelector } from "react-redux";
import { TrendingUp } from "lucide-react";

const colorMap = {
  green: "bg-green-100 text-green-800 border-green-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
};

const SmartAdvice = () => {
  const tips = useSelector((state) => state.farmer.smartAdvice.tips);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-emerald-200 backdrop-blur md:p-8">
      <header className="space-y-1 mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-slate-700" />
          <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
            General Farming Tips
          </h2>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className={`rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md ${
              colorMap[tip.color] || colorMap.green
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl" aria-hidden>
                {tip.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {tip.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SmartAdvice;
