import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  toggleCommunityModal,
  addCommunityPost,
} from "../../../redux/Slices/FarmerSlice";

const CommunityModal = ({ open }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!open) return null;

  const onSubmit = (data) => {
    const newPost = {
      id: Date.now(),
      title: data.title,
      content: data.content,
      timestamp: new Date().toISOString(),
    };
    dispatch(addCommunityPost(newPost));
    reset();
    dispatch(toggleCommunityModal());
  };

  const handleClose = () => {
    reset();
    dispatch(toggleCommunityModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-2xl mx-4 md:mx-0 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Create New Post
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Share your thoughts, questions, or experiences with the community
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="What's on your mind?"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              rows={6}
              placeholder="Share your thoughts..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 resize-none"
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 10,
                  message: "Content must be at least 10 characters",
                },
              })}
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityModal;
