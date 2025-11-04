import React, { useEffect, useState } from "react";

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
const AddItem = ({
  open = false,
  onClose = () => {},
  onSubmit = () => Promise.resolve(),
  isSubmitting = false,
  errorMessage = "",
}) => {
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!open) setLocalError("");
  }, [open]);

  useEffect(() => {
    setLocalError(errorMessage || "");
  }, [errorMessage]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      name: fd.get("name")?.toString().trim() || "",
      rate: fd.get("rate")?.toString().trim() || "",
    };

    try {
      setLocalError("");
      await onSubmit(payload);
      e.target.reset();
      onClose();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to add item. Please try again.";
      setLocalError(message);
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

          <div>
            <label className="block text-sm text-gray-600">Price (Rs.)</label>
            <input
              name="rate"
              type="number"
              min="0"
              step="0.01"
              required
              className="w-full mt-2 rounded-md border border-gray-200 bg-gray-50 p-3"
              placeholder="100"
            />
          </div>

          {localError && (
            <p className="text-sm text-red-500" role="alert">
              {localError}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border bg-white"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-black text-white disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
