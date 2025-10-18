"use client";
import React, { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [sending, setSending] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const phrases = [
    "Welcome to WealthWise 💰",
    "Manage your finances smartly!",
    "Track. Save. Grow. Repeat. 🚀",
  ];

  // ✅ Typing animation with smooth pause
  useEffect(() => {
    let idx = 0;
    let char = 0;
    let forward = true;
    let pause = false;

    const type = () => {
      if (pause) return;

      const phrase = phrases[idx];
      setTypingText(phrase.slice(0, char));

      if (forward) {
        if (char < phrase.length) {
          char++;
        } else {
          forward = false;
          pause = true;
          setTimeout(() => (pause = false), 1000); // 1s pause after full phrase
        }
      } else {
        if (char > 0) {
          char--;
        } else {
          forward = true;
          idx = (idx + 1) % phrases.length;
        }
      }
    };

    const interval = setInterval(type, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // fake login delay for UX
    setTimeout(() => {
      setSending(false);
      router.push("/main"); // ✅ smooth redirect after delay
    }, 1200);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/main" });
  };

  const handleGithubLogin = async () => {
    await signIn("github", { callbackUrl: "/main" });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gradient-to-br from-green-50 to-white dark:from-zinc-500 dark:to-zinc-700 transition-all duration-700">
      
      {/* ===== Left Section ===== */}
      <div className="relative w-full lg:w-1/2 h-1/3 lg:h-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-10 animate-pulse"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 mb-3">
            {typingText}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            A modern way to manage wealth and achieve goals.
          </p>
        </div>
      </div>

      {/* ===== Right Section ===== */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-2xl transition-all duration-700">
        <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 p-8 rounded-2xl shadow-lg bg-white/60 dark:bg-zinc-800/70 border border-gray-100 dark:border-zinc-700 transition-all duration-500">
          
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700 dark:text-green-400 transition-all duration-700">
            {isSignup ? "Create Account" : "Login to Continue"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5 transition-opacity duration-500">
            {isSignup && (
              <input
                type="text"
                placeholder="Full Name"
                required
                className="border p-3 rounded-lg bg-white/70 dark:bg-zinc-800/60 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              required
              className="border p-3 rounded-lg bg-white/70 dark:bg-zinc-800/60 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="border p-3 w-full rounded-lg bg-white/70 dark:bg-zinc-800/60 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300 cursor-pointer select-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 disabled:opacity-70 transition-all duration-300"
            >
              {sending ? "Loading..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 mt-6 text-gray-500 dark:text-gray-300">
            <span>or continue with</span>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleGoogleLogin}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-700 transition-all"
            >
              Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-700 transition-all"
            >
              GitHub
            </button>
          </div>

          <p className="mt-6 text-center text-gray-700 dark:text-gray-300">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-green-600 dark:text-green-400 cursor-pointer hover:underline"
            >
              {isSignup ? "Login" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
