import React from "react";
import { useSelector } from "react-redux";
import MarketPrices from "./MarketPrices";
import Weather from "./Weather";
import SmartAdvice from "./SmartAdvice";
import Community from "./Community";

const ViewBox = () => {
  const currentTab = useSelector((state) => state.farmer.currentTab);

  const renderView = () => {
    switch (currentTab) {
      case "marketPrices":
        return <MarketPrices />;
      case "weather":
        return <Weather />;
      case "smartAdvice":
        return <SmartAdvice />;
      case "community":
        return <Community />;
      default:
        return <MarketPrices />;
    }
  };

  return <>{renderView()}</>;
};

export default ViewBox;
