"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState(null);
  const [typingText, setTypingText] = useState("");
  const phrases = ["Track expenses.", "Save smarter.", "Build wealth."];

  // typing animation
  useEffect(() => {
    let idx = 0;
    let char = 0;
    let forward = true;
    const interval = setInterval(() => {
      const phrase = phrases[idx];
      if (forward) {
        char++;
        if (char > phrase.length) {
          forward = false;
          setTimeout(() => {}, 1000);
        }
      } else {
        char--;
        if (char < 0) {
          forward = true;
          idx = (idx + 1) % phrases.length;
        }
      }
      setTypingText(phrase.slice(0, char));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.email) return "Email is required.";
    if (!form.password) return "Password is required.";
    if (mode === "signup") {
      if (!form.name) return "Name is required.";
      if (form.password.length < 6) return "Password must be at least 6 characters.";
      if (form.password !== form.confirmPassword) return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const v = validate();
    if (v) return setMsg({ type: "error", text: v });
    setSending(true);
    try {
      const url = mode === "login" ? "/api/login" : "/api/signup";
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        return setMsg({ type: "error", text: data?.error || "Something went wrong." });

      setMsg({
        type: "success",
        text: mode === "login" ? "Logged in — redirecting…" : "Account created — redirecting…",
      });
      setTimeout(() => router.push("/main"), 1000);
    } catch (err) {
      setMsg({ type: "error", text: "Network error. Try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfdf5] to-white flex flex-col items-center justify-center px-6 py-12 gap-10">
      <div className="w-[90%] sm:w-[70%] md:w-[40%] flex flex-col gap-6">
        
        {/* ---------- Brand Section ---------- */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <Image src="/wealth.gif" alt="WealthFlow" width={48} height={48} />
          <div>
            <h1 className="text-3xl font-extrabold text-[#065f46]">WealthFlow</h1>
            <p className="text-sm text-gray-600">{typingText}&nbsp;<span className="text-[#10B981]">|</span></p>
          </div>
        </div>

        {/* ---------- OAuth Box ---------- */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl shadow-md p-4">
          <h3 className="text-center text-gray-700 font-medium mb-3">Continue with</h3>
          <div className="flex gap-3">
            <button
              onClick={() => signIn("google")}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-200 hover:shadow-md transition"
            >
              <svg width="18" height="18" viewBox="0 0 533.5 544.3">
                <path fill="#4285f4" d="M533.5 278.4c0-17.7-1.4-34.6-4.2-51H272v96.6h146.9c-6.3 34-25 62.8-53.4 82.1v68.1h86.3c50.6-46.6 82.7-115.4 82.7-195.8z" />
                <path fill="#34a853" d="M272 544.3c72.9 0 134.3-24.2 179.1-65.6l-86.3-68.1c-24 16.2-54.8 25.8-92.8 25.8-71 0-131.2-47.9-152.7-112.1H31.1v70.6C75 488.9 168 544.3 272 544.3z" />
                <path fill="#fbbc04" d="M119.3 324.3c-10.7-32-10.7-66.4 0-98.4V155.3H31.1c-38.3 75.5-38.3 164.8 0 240.3l88.2-71.3z" />
                <path fill="#ea4335" d="M272 107.8c39.6 0 75.4 13.6 103.5 40.2l77.6-77.6C405.8 24.3 344.4 0 272 0 168 0 75 55.4 31.1 137.9l88.2 70.1C140.8 155.7 201 107.8 272 107.8z" />
              </svg>
              Google
            </button>

            <button
              onClick={() => signIn("github")}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-900 text-white hover:shadow-md transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.73.5.75 5.48.75 11.8c0 4.9 3.18 9.06 7.6 10.52.56.1.76-.24.76-.53 0-.26-.01-.95-.02-1.86-3.09.68-3.74-1.48-3.74-1.48-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.08-.67.08-.67 1.1.08 1.68 1.12 1.68 1.12.97 1.67 2.55 1.19 3.17.91.1-.72.38-1.19.69-1.46-2.47-.28-5.07-1.23-5.07-5.48 0-1.21.43-2.2 1.13-2.98-.11-.28-.49-1.42.11-2.96 0 0 .92-.3 3.02 1.14a10.5 10.5 0 012.75-.39c.93 0 1.86.13 2.74.39 2.09-1.44 3.01-1.14 3.01-1.14.61 1.54.23 2.68.12 2.96.7.78 1.13 1.77 1.13 2.98 0 4.26-2.6 5.2-5.08 5.47.39.34.73 1.02.73 2.06 0 1.48-.01 2.68-.01 3.04 0 .29.2.63.77.52 4.42-1.47 7.58-5.62 7.58-10.52C23.25 5.48 18.27.5 12 .5z" />
              </svg>
              GitHub
            </button>
          </div>
        </div>

        {/* ---------- Login / Signup Form ---------- */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h3>
            <button
              onClick={() => { setMode((m) => (m === "login" ? "signup" : "login")); setMsg(null); }}
              className="text-sm text-[#10B981] hover:underline"
            >
              {mode === "login" ? "Sign up" : "login"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#10B981] outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@gmail.com"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#10B981] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#10B981] outline-none"
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Confirm password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#10B981] outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#10B981] text-white py-2 rounded-md hover:bg-[#0ea46b] transition disabled:opacity-60"
            >
              {sending ? (mode === "login" ? "Signing in..." : "Creating...") : (mode === "login" ? "Sign in" : "Create account")}
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full mt-2 px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
            >
              Back Home
            </button>

            {msg && (
              <div className={`mt-2 p-2 rounded-md text-sm ${msg.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {msg.text}
              </div>
            )}
          </form>

          {mode === "login" && (
            <p className="text-center text-sm text-gray-600 mt-4">
              Not a member?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-[#10B981] hover:underline"
              >
                Sign up here
              </button>
            </p>
          )}

          <div className="mt-4 text-xs text-gray-500 text-center">
            By continuing you agree to our{" "}
            <a href="#" className="text-[#10B981] underline">Terms</a> and{" "}
            <a href="#" className="text-[#10B981] underline">Privacy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
