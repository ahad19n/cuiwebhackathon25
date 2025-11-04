import React from "react";
import Tooltip from "./Tooltip";
import ViewBox from "./ViewBox";

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 py-10 px-4">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <Tooltip />
        <ViewBox />
      </div>
    </div>
  );
};

export default FarmerDashboard;
