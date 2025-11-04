import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MessageCircle } from "lucide-react";
import { toggleCommunityModal } from "../../../redux/Slices/FarmerSlice";
import CommunityModal from "./CommunityModal";

const Community = () => {
  const dispatch = useDispatch();
  const { posts, isModalOpen } = useSelector((state) => state.farmer.community);

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

        {posts.length === 0 ? (
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
                key={post.id}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {post.content}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                  <span>{new Date(post.timestamp).toLocaleString()}</span>
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
