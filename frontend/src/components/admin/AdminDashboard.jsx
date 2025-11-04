import React from "react";
import Card from "./Cards";
import ViewBox from "./ViewBox";

const AdminDashboard = () => {
  return (
    <main className="p-6 md:p-8 lg:p-10">
      {/* Top metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Total Items"
          value={0}
          subtitle="Market entries in database"
        />
        <Card
          title="Average Price"
          value={"Rs. 0"}
          subtitle="Per kilogram across all items"
        />
        <Card
          title="Regions Covered"
          value={0}
          subtitle="Different regions tracked"
        />
      </div>

      {/* View box / management area */}
      <div className="mt-6">
        <ViewBox />
      </div>
    </main>
  );
};

export default AdminDashboard;
