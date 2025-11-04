import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MessageCircle, Trash2 } from "lucide-react";
import {
  toggleCommunityModal,
  fetchForumPosts,
  deleteForumPost,
} from "../../../redux/Slices/FarmerSlice";
import CommunityModal from "./CommunityModal";
import useAuth from "../../../hooks/useAuth";

const Community = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [deletingPostId, setDeletingPostId] = useState(null);
  const { posts, isModalOpen, loading } = useSelector(
    (state) => state.farmer.community
  );

  useEffect(() => {
    dispatch(fetchForumPosts());
  }, [dispatch]);

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setDeletingPostId(postId);
    try {
      await dispatch(deleteForumPost(postId)).unwrap();
    } catch (error) {
      alert(error || "Failed to delete post");
    } finally {
      setDeletingPostId(null);
    }
  };

  return (
    <>
      <section className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-emerald-200 backdrop-blur md:p-8">
        <header className="flex items-start justify-between mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-slate-700" />
              <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
                Community Forum
              </h2>
            </div>
            <p className="text-sm text-slate-500 md:text-base">
              Connect with fellow farmers, share experiences, and ask questions
            </p>
          </div>

          <button
            onClick={() => dispatch(toggleCommunityModal())}
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-900 transition-colors"
          >
            <span className="text-lg">+</span>
            <span className="font-medium">New Post</span>
          </button>
        </header>

        {loading ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mb-4"></div>
            <p className="text-base text-slate-700">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-12 text-center shadow-inner">
            <MessageCircle className="mb-4 h-12 w-12 text-emerald-400" />
            <p className="text-base font-medium text-slate-700 md:text-lg">
              No posts yet. Be the first to start a discussion!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-800 flex-1">
                    {post.title}
                  </h3>
                  {user && post.author?._id === user.id && (
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      disabled={deletingPostId === post._id}
                      className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {post.content}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium">
                    {post.author?.name || "Anonymous"}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <CommunityModal open={isModalOpen} />
    </>
  );
};

export default Community;
