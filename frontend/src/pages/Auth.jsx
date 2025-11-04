import React, { useState } from "react";
import { Info, Sprout, BarChart2, CloudSun, MessageCircle } from "lucide-react";

function Auth() {
  const [tab, setTab] = useState("signin");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white shadow px-3 py-4 rounded-xl">
            <div className="bg-green-600 text-white rounded-xl p-1.5">
              <Sprout size={25} />
            </div>
            <span className="text-sm font-medium text-green-700">
              Smart Agriculture
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Empowering Pakistan's Farmers
          </h1>
          <p className="text-gray-600 text-lg max-w-md">
            Access real-time market rates, weather insights, and connect with
            the farming community. Make informed decisions for better yields.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0 cursor-pointer">
            <FeatureCard
              icon={<BarChart2 size={20} />}
              label="Live Market Prices"
            />
            <FeatureCard
              icon={<CloudSun size={20} />}
              label="Weather Updates"
            />
            <FeatureCard
              icon={<MessageCircle size={20} />}
              label="Community Forum"
            />
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-dark-800 mb-2 text-center">
            Welcome
          </h2>
          <p className="text-gray-500 mb-4 text-center">
            Sign in to your account or create a new one
          </p>

          {/* Tabs */}
          <div className="flex mb-4 bg-gray-100 rounded-xl overflow-hidden ">
            <button
              className={`flex-1 py-2 font-medium cursor-pointer ${
                tab === "signin"
                  ? "bg-white shadow text-dark-700"
                  : "text-gray-500"
              }`}
              onClick={() => setTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 font-medium cursor-pointer ${
                tab === "signup"
                  ? "bg-white shadow text-dark-700"
                  : "text-gray-500"
              }`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Demo Info */}
          {tab === "signin" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-blue-800 mb-4">
              <div className="flex gap-2">
                <Info size={16} className="mt-0.5 text-blue-600" />
                <div>
                  <p>
                    Don't have an account yet? Switch to the{" "}
                    <span className="font-semibold">Sign Up</span> tab to create
                    one.
                  </p>
                  <p className="text-xs mt-1">
                    Demo: admin@test.com / farmer@test.com (password: test123)
                  </p>
                  <button className="mt-2 bg-white border border-blue-300 w-100 text-dark-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-green-100 mx-auto block">
                    Initialize Demo Accounts
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Auth Forms */}
          {tab === "signin" ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="mt-1 w-full bg-gray-100 border rounded-md p-2 focus:ring-green-600 focus:border-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 w-full border bg-gray-100 rounded-md p-2 focus:ring-green-600 focus:border-green-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 cursor-pointer"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Ali Khan"
                  className="mt-1 w-full border bg-gray-100 rounded-md p-2 focus:ring-green-600 focus:border-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select className="mt-1 w-full border bg-gray-100 rounded-md p-2 focus:ring-green-600 focus:border-green-600">
                  <option>Farmer</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="mt-1 w-full border rounded-md p-2 bg-gray-100 focus:ring-green-600 focus:border-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="mt-1 w-full border rounded-md p-2 bg-gray-100 focus:ring-green-600 focus:border-green-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-700 cursor-pointer"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default Auth;

function FeatureCard({ icon, label }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition">
      <div className="bg-green-100 p-2 rounded-lg text-green-700">{icon}</div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
}
