import React from "react";

/**
 * Simple Card component for dashboard metrics.
 * Props:
 * - title: string
 * - value: string | number
 * - subtitle: string
 */
const Card = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between min-h-[120px]">
      <div className="flex items-start justify-between">
        <h3 className="text-sm text-gray-600">{title}</h3>
        {/* placeholder small icon */}
        <div className="text-gray-300">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12h18"
              stroke="#D1D5DB"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {subtitle && (
          <div className="text-xs text-gray-400 mt-2">{subtitle}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
