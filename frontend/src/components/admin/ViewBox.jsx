import React, { useState } from "react";
import AddItem from "./AddItem";

/**
 * ViewBox - large panel for Market Data Management.
 * This component renders the Add Item button which opens the AddItem modal (UI-only).
 */
const ViewBox = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6 mt-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Market Data Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit, or delete vegetable and fruit market prices
          </p>
        </div>

        <div>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-sm"
          >
            <span className="text-lg">+</span>
            <span className="font-medium">Add Item</span>
          </button>
        </div>
      </div>

      <div className="mt-8 border border-dashed border-gray-100 rounded-xl p-12 flex items-center justify-center text-center">
        <div>
          <p className="text-gray-400">
            No market data available. Add your first item to get started.
          </p>
        </div>
      </div>

      {/* AddItem modal (UI-only) */}
      <AddItem
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          // UI-only: parent may handle data later. For now, just close.
          console.log("AddItem submit", data);
        }}
      />
    </section>
  );
};

export default ViewBox;
