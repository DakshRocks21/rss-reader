// This file is written by Daksh
"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import {
  LoginWithEmailPass,
  SignInWithGoogle,
} from "@/lib/firebase/auth_database";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await LoginWithEmailPass(email, password);

    if (result.success) {
      console.log("User created successfully, redirecting to home page");
      setTimeout(() => {
        window.location.href = "/home";
      }, 700); // Small delay to ensure cookies are set
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const result = await SignInWithGoogle();
    if (result.success) {
      console.log("User created successfully, redirecting to home page");
      setTimeout(() => {
        window.location.href = "/home";
      }, 700); // Small delay to ensure cookies are set
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
        >
          Sign in with Google
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
