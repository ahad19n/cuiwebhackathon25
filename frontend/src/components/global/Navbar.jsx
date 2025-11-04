import React, { useState } from "react";

const Navbar = ({ onSignOut, userName = "Farmer User", role = "FARMER" }) => {
  const [open, setOpen] = useState(false);

  function handleSignOut() {
    if (typeof onSignOut === "function") return onSignOut();
    try {
      localStorage.removeItem("token");
    } catch {
      /* ignore */
    }
    // safe default: navigate to root (app should handle routing to auth if needed)
    window.location.href = "/";
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-50">
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0" aria-hidden>
            {/* simple plant icon in green circle */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="6" fill="#2E8B57" />
              <path
                d="M12 6C11 8 9 9 8 10C11 10 12 12 12 12C12 12 13 10 16 10C15 9 13 8 12 6Z"
                fill="#fff"
              />
              <path
                d="M8 14C9.5 13.2 11 13 12 13C13 13 14.5 13.2 16 14C15.5 15.2 14 15.8 12 16C10 15.8 8.5 15.2 8 14Z"
                fill="#fff"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="font-semibold text-base text-gray-900">
              Smart Agriculture Market Tracker
            </div>
            <div className="text-sm text-gray-500 mt-1 hidden md:flex items-center gap-2">
              Welcome,{" "}
              <span className="font-medium text-gray-900">{userName}</span>
              <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold ml-2">
                {role}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleSignOut}
          aria-label="Sign out"
          className="hidden md:inline-flex items-center gap-2 border rounded-md px-3 py-2 bg-white text-gray-800 font-semibold"
        >
          <span>Sign Out</span>
          <svg
            className="ml-1"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 17L21 12L16 7"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12H9"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="inline-flex md:hidden p-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="#111"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 right-0 bg-white border-t p-3 flex flex-col gap-3 md:hidden"
        >
          <div>
            <div className="font-semibold text-base">
              Smart Agriculture Market Tracker
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Welcome, {userName}{" "}
              <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold ml-2">
                {role}
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSignOut}
              className="w-full md:w-auto px-3 py-2 bg-white border rounded-md text-gray-800 font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
