import React, { useCallback, useEffect, useMemo, useState } from "react";
import AddItem from "./AddItem";
import api from "../../api/api";

/**
 * ViewBox - market rate management surface for administrators.
 * Provides CRUD interactions for vegetable price entries.
 */
const ViewBox = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [editingRate, setEditingRate] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [editError, setEditError] = useState("");
  const [mutating, setMutating] = useState(false);
  const [deletingKey, setDeletingKey] = useState("");
  const [actionError, setActionError] = useState("");

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.getRates();
      if (response.data?.success && Array.isArray(response.data?.data?.rates)) {
        const normalized = response.data.data.rates.map((entry) => {
          const sortedRates = [...(entry.rates || [])].sort(
            (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
          );

          const mappedRates = sortedRates.map((rate) => {
            const value =
              typeof rate.rate === "number" ? rate.rate : Number(rate.rate);
            return {
              ...rate,
              rateValue: Number.isNaN(value) ? null : value,
            };
          });

          return {
            ...entry,
            name: entry.name,
            rates: mappedRates,
          };
        });

        setItems(normalized);
        setActionError("");
      } else {
        setItems([]);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load rates. Please try again.";
      setError(message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
    setSubmitError("");
  }, []);

  const handleStartEdit = useCallback((vegId, rateId, currentValue) => {
    setEditingRate({ vegId, rateId });
    setEditingValue(
      currentValue != null && !Number.isNaN(currentValue)
        ? currentValue.toString()
        : ""
    );
    setEditError("");
    setActionError("");
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingRate(null);
    setEditingValue("");
    setEditError("");
  }, []);

  const handleAddItem = useCallback(
    async ({ name, rate }) => {
      const trimmedName = (name || "").trim();
      const numericRate = Number(rate);

      if (!trimmedName || Number.isNaN(numericRate) || numericRate < 0) {
        const message = "Please provide a valid name and price.";
        setSubmitError(message);
        throw new Error(message);
      }

      setIsSubmitting(true);
      setSubmitError("");
      setActionError("");

      try {
        await api.addRate({ name: trimmedName, rate: numericRate });
        await fetchRates();
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to save rate. Please try again.";
        setSubmitError(message);
        throw new Error(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [fetchRates]
  );

  const handleSaveEdit = useCallback(async () => {
    if (!editingRate) return;

    const numericValue = Number(editingValue);
    if (Number.isNaN(numericValue) || numericValue < 0) {
      setEditError("Please enter a valid price.");
      return;
    }

    setMutating(true);
    setEditError("");
    setActionError("");

    try {
      await api.updateRate(editingRate.vegId, editingRate.rateId, {
        rate: numericValue,
      });
      await fetchRates();
      handleCancelEdit();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to update rate. Please try again.";
      setEditError(message);
    } finally {
      setMutating(false);
    }
  }, [editingRate, editingValue, fetchRates, handleCancelEdit]);

  const handleDeleteRate = useCallback(
    async (vegId, rateId) => {
      const key = `${vegId}:${rateId}`;
      const confirmDelete =
        typeof window === "undefined"
          ? true
          : window.confirm("Are you sure you want to delete this rate entry?");
      if (!confirmDelete) return;

      setDeletingKey(key);
      setActionError("");

      try {
        await api.deleteRate(vegId, rateId);
        if (
          editingRate &&
          editingRate.vegId === vegId &&
          editingRate.rateId === rateId
        ) {
          handleCancelEdit();
        }
        await fetchRates();
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to delete rate. Please try again.";
        setActionError(message);
      } finally {
        setDeletingKey("");
      }
    },
    [fetchRates, editingRate, handleCancelEdit]
  );

  const hasData = useMemo(
    () => items.some((item) => (item.rates || []).length > 0),
    [items]
  );

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
            onClick={() => {
              setSubmitError("");
              setOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-sm"
          >
            <span className="text-lg">+</span>
            <span className="font-medium">Add Item</span>
          </button>
        </div>
      </div>

      <div className="mt-8">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {actionError && !error && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            {actionError}
          </div>
        )}

        <div className="border border-dashed border-gray-100 rounded-xl p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-500" />
              <p className="mt-4 text-sm">Loading market prices...</p>
            </div>
          ) : !hasData ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400">
              <p>
                No market data available. Add your first item to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const latest = item.rates?.[0];
                const latestValue = latest?.rateValue;
                const latestTimestamp = latest?.date
                  ? new Date(latest.date).toLocaleString("en-PK", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : null;

                return (
                  <div
                    key={item._id}
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-2 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </p>
                        {latestValue != null ? (
                          <p className="text-xs text-gray-500">
                            Showing {item.rates.length} price
                            {item.rates.length === 1 ? " entry" : " entries"}.
                            {item.rates.length === 1 ? "y" : "ies"}.
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500">
                            No rates recorded yet for this item.
                          </p>
                        )}
                      </div>

                      {latestValue != null && (
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            Rs. {latestValue.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Updated {latestTimestamp}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 space-y-3">
                      {(item.rates || []).length === 0 ? (
                        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
                          No rate entries available.
                        </div>
                      ) : (
                        item.rates.map((rate, index) => {
                          const isEditing =
                            editingRate &&
                            editingRate.vegId === item._id &&
                            editingRate.rateId === rate._id;
                          const key = `${item._id}:${rate._id}`;
                          const isDeleting = deletingKey === key;
                          const timestamp = rate.date
                            ? new Date(rate.date).toLocaleString("en-PK", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Not available";

                          return (
                            <div
                              key={rate._id}
                              className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                            >
                              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">
                                    Entry {index + 1}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Last updated: {timestamp}
                                  </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                  {isEditing ? (
                                    <>
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-emerald-400 focus:outline-none"
                                        value={editingValue}
                                        onChange={(e) =>
                                          setEditingValue(e.target.value)
                                        }
                                        disabled={mutating}
                                      />
                                      <div className="flex gap-2">
                                        <button
                                          type="button"
                                          onClick={handleCancelEdit}
                                          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 disabled:opacity-60"
                                          disabled={mutating}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="button"
                                          onClick={handleSaveEdit}
                                          className="rounded-md bg-black px-3 py-2 text-sm text-white disabled:opacity-60"
                                          disabled={mutating}
                                        >
                                          {mutating ? "Saving..." : "Save"}
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-lg font-bold text-gray-900">
                                        {rate.rateValue != null
                                          ? `Rs. ${rate.rateValue.toFixed(2)}`
                                          : "Not set"}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleStartEdit(
                                            item._id,
                                            rate._id,
                                            rate.rateValue
                                          )
                                        }
                                        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:border-gray-400 disabled:opacity-60"
                                        disabled={mutating}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDeleteRate(item._id, rate._id)
                                        }
                                        className="rounded-md border border-red-300 px-3 py-2 text-sm text-red-600 hover:border-red-400 disabled:opacity-60"
                                        disabled={mutating || isDeleting}
                                      >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>

                              {isEditing && editError && (
                                <p className="mt-2 text-xs text-red-500">
                                  {editError}
                                </p>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AddItem
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleAddItem}
        isSubmitting={isSubmitting}
        errorMessage={submitError}
      />
    </section>
  );
};

export default ViewBox;
