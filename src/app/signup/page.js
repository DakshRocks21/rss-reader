// Daksh wrote this
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  SignUpWithEmailPass,
  SignInWithGoogle,
} from "@/lib/firebase/auth_database";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Added username state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await SignUpWithEmailPass(email, password, username); // Pass username

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
      setTimeout(() => {
        window.location.href = "/home";
      }, 700); // Small delay to ensure cookies are set
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state
              className="w-full px-4 py-2 text-gray-700 border rounded-lg"
              required
            />
          </div>
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
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
        >
          Sign up with Google
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
