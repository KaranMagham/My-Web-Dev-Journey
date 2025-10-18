"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const texts = [
    "Manage your finances",
    "Track your expenses", 
    "Achieve your goals",
    "Build your wealth"
  ];


  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < texts[textIndex].length) {
        setCurrentText(texts[textIndex].substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(texts[textIndex].substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === texts[textIndex].length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ddf7d5] via-white to-[#e6fff5] overflow-y-auto">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-20">
        <div className="max-w-4xl">
          {/* Animated Logo */}
          <div className="relative mb-8">
            <Image 
              src="/wealth.gif" 
              alt="WealthFlow Logo" 
              unoptimized={true}
              width={140} 
              height={140} 
              className="mx-auto rounded-full hover:scale-110 transition-transform duration-500 cursor-pointer"
            />
            <div className="absolute -inset-4 bg-[#10B981]/20 rounded-full animate-pulse"></div>
          </div>

          {/* Animated Title */}
          <h1 className="text-7xl md:text-8xl font-extrabold text-[#10B981] mb-6 hover:scale-105 transition-transform duration-300">
            WealthFlow
          </h1>

          {/* Typing Animation */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
              {currentText}
              <span className="animate-pulse text-[#10B981]">|</span>
            </h2>
          </div>

          {/* Enhanced Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your personal finance tracker to manage income, expenses, and savings —
            all in one place. <span className="font-bold text-[#10B981]">Simple. Fast. Secure.</span>
          </p>

          {/* Enhanced Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/login"
              className="group px-8 py-4 rounded-2xl bg-[#10B981] text-white font-semibold shadow-lg hover:bg-[#16d495] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/signup"
              className="group px-8 py-4 rounded-2xl border-2 border-[#10B981] text-[#10B981] font-semibold hover:bg-[#ddf7d5] hover:border-[#16d495] hover:text-[#16d495] transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                Learn More
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <p className="text-gray-600 font-medium">Active Users</p>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2 group-hover:scale-110 transition-transform duration-300">
                ₹50M+
              </div>
              <p className="text-gray-600 font-medium">Tracked</p>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <p className="text-gray-600 font-medium">Uptime</p>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <p className="text-gray-600 font-medium">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#10B981] mb-4">
              Why Choose WealthFlow?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the power of modern finance management with our intuitive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#10B981]/20">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📊</div>
              <h3 className="text-2xl font-bold text-[#10B981] mb-4 group-hover:text-[#16d495] transition-colors duration-300">
                Smart Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Keep a detailed record of all your income and expenses with intelligent categorization and automatic insights.
              </p>
              <div className="text-[#10B981] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                Learn More →
              </div>
            </div>

            <div className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#10B981]/20">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📈</div>
              <h3 className="text-2xl font-bold text-[#10B981] mb-4 group-hover:text-[#16d495] transition-colors duration-300">
                Visual Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                View beautiful charts and graphs to understand your spending patterns and make informed financial decisions.
              </p>
              <div className="text-[#10B981] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                Explore →
              </div>
            </div>

            <div className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#10B981]/20">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <h3 className="text-2xl font-bold text-[#10B981] mb-4 group-hover:text-[#16d495] transition-colors duration-300">
                Goal Achievement
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Set and track your savings goals with personalized recommendations to achieve financial freedom faster.
              </p>
              <div className="text-[#10B981] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                Get Started →
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-[#10B981] to-[#16d495] text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of users who are already taking control of their financial future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="group px-8 py-4 rounded-2xl bg-white text-[#10B981] font-bold shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                Start Free Trial
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/about"
              className="group px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-[#10B981] transition-all duration-300 transform hover:-translate-y-1"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#10B981] mb-2">WealthFlow</h3>
            <p className="text-gray-400">Your trusted partner in financial management</p>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400">
              Made with 💚 by <span className="text-[#10B981] font-medium">Karan Magham</span> — BSC CS Student & Web Developer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
