"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SignUpWithEmailPass,
  SignInWithGoogle,
} from "@/lib/firebase/auth_database";
import { Card, Button, TextField, CircularProgress, Divider } from "actify";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

import { motion } from "framer-motion";
import { useApplyStoredTheme } from "@/components/DarkConfig";

export default function Signup() {
  useApplyStoredTheme();
  
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await SignUpWithEmailPass(email, password, username);

    if (result.success) {
      console.log("User created successfully, redirecting to home page");
      setTimeout(() => {
        router.push("/home");
      }, 700);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await SignInWithGoogle();
    if (result.success) {
      setTimeout(() => {
        router.push("/home");
      }, 700);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-primary to-secondary p-4">
      <Navbar />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-grow w-full h-full flex flex-col items-center justify-center p-6"
        >
      <Card className="w-full max-w-md bg-surface-container text-on-surface rounded-xl shadow-lg p-6 space-y-6">
        <p className="text-center text-primary font-bold text-2xl mb-4">
          Create an Account
        </p>

        <form onSubmit={handleSignup} className="space-y-3 mb-5">
          <TextField
            label="Username"
            type="text"
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            className="w-full"
            required
          />
          <div className="h-2"></div>
          <TextField
            label="Email"
            type="email"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
          <div className="h-2"></div>
          <TextField
            label="Password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            className="w-full"
            required
          />
          <div className="h-2"></div>
          <Button
            type="submit"
            variant="filled"
            className="w-full rounded-lg text-lg"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                isIndeterminate={true}
                className="mr-2 text-inverse-on-surface"
              />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <Button
          onClick={handleGoogleSignIn}
          variant="filled"
          color="primary"
          className="w-full flex items-center justify-center rounded-lg text-lg"
        >
          <FcGoogle className="mr-2 text-2xl" />
          Sign up with Google
        </Button>

        {error && <p className="text-error text-sm text-center">{error}</p>}

        <p className="text-sm text-center text-on-surface-variant mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-medium hover:underline">
            Login
          </a>
        </p>
      </Card>
      </motion.div>
    </div>
  );
}
