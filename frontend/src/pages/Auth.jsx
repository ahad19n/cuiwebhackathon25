import { useState } from "react";
import { useForm } from "react-hook-form";
import { Info, Sprout, BarChart2, CloudSun, MessageCircle } from "lucide-react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [tab, setTab] = useState("signin");

  const navigate = useNavigate();

  // React Hook Form for Sign In
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn },
  } = useForm();

  // React Hook Form for Sign Up
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm();

  const onSignInSubmit = async (payload) => {
    console.log("Sign In Data:", payload);
    try {
      const res = await api.signIn(payload);

      // Fix: Check status as a property, not a function
      if (res.status === 201 || res.status === 200) {
        alert("Login Successful!");
        if(res.data.role === "Admin"){
          navigate("/admin");
        }else{
          // this takes us to the farmer's dashboard
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const onSignUpSubmit = async (payload) => {
    console.log("Sign Up Data:", payload);
    try {
      // Transform role to lowercase before sending to backend
      const transformedPayload = {
        ...payload,
        role: payload.role.toLowerCase(),
      };
      const res = await api.signUp(transformedPayload);
      console.log("Sign Up Response:", res);

      // Fix: Check status as a property, not a function
      if (res.status === 201 || res.status === 200) {
        alert("Account Created Successfully! Please Sign In.");
        setTab("signin");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Sign up failed. Please try again.");
    }
  };

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
            <form
              onSubmit={handleSubmitSignIn(onSignInSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="mt-1 w-full bg-gray-100 border rounded-md p-2 focus:ring-green-600 focus:border-green-600"
                  {...registerSignIn("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errorsSignIn.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignIn.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 w-full border bg-gray-100 rounded-md p-2 focus:ring-green-600 focus:border-green-600"
                  {...registerSignIn("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errorsSignIn.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignIn.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 cursor-pointer"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmitSignUp(onSignUpSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Ali Khan"
                  className="mt-1 w-full border bg-gray-100 rounded-md p-2 focus:ring-green-600 focus:border-green-600"
                  {...registerSignUp("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errorsSignUp.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignUp.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  className="mt-1 w-full border bg-gray-100 rounded-md p-2 focus:ring-green-600 focus:border-green-600"
                  {...registerSignUp("role", {
                    required: "Role is required",
                  })}
                >
                  <option value="Farmer">Farmer</option>
                  <option value="Admin">Admin</option>
                </select>
                {errorsSignUp.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignUp.role.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="mt-1 w-full border rounded-md p-2 bg-gray-100 focus:ring-green-600 focus:border-green-600"
                  {...registerSignUp("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errorsSignUp.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignUp.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="mt-1 w-full border rounded-md p-2 bg-gray-100 focus:ring-green-600 focus:border-green-600"
                  {...registerSignUp("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errorsSignUp.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsSignUp.password.message}
                  </p>
                )}
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
