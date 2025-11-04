import React from "react";

/**
 * AddItem - Modal form UI for adding a new market item.
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - onSubmit: (formData) => void (optional)
 *
 * This component is UI-only. It calls onClose() or onSubmit(formData) but does not
 * perform any network or state management itself.
 */
const AddItem = ({ open = false, onClose = () => {}, onSubmit = () => {} }) => {
  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd);
    // UI-only: forward data to parent if provided
    try {
      onSubmit(data);
    } finally {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-2xl mx-4 md:mx-0 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Add New Item
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Enter the market data for vegetables or fruits
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Item Name</label>
            <input
              name="name"
              required
              className="w-full mt-2 rounded-md border border-gray-200 bg-gray-50 p-3"
              placeholder="e.g., Tomato, Potato"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Price (Rs.)</label>
              <input
                name="price"
                type="number"
                min="0"
                required
                className="w-full mt-2 rounded-md border border-gray-200 bg-gray-50 p-3"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Unit</label>
              <select
                name="unit"
                className="w-full mt-2 rounded-md border border-gray-200 bg-gray-50 p-3"
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="g">Gram (g)</option>
                <option value="box">Box</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Region</label>
              <select
                name="region"
                className="w-full mt-2 rounded-md border border-gray-200 bg-gray-50 p-3"
              >
                <option>-- Select region --</option>
                <option>Lahore</option>
                <option>Karachi</option>
                <option>Islamabad</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Category</label>
              <select
                name="category"
                className="w-full mt-2 rounded-md border border-gray-200 bg-gray-50 p-3"
              >
                <option>Vegetable</option>
                <option>Fruit</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-black text-white"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
