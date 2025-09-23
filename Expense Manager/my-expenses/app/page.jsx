"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-200 text-center px-6">
      {/* Hero Section */}
      <div className="max-w-3xl">
        <Image 
          src="/wealth.gif" 
          alt="WealthFlow Logo" 
          width={120} 
          height={120} 
          className="mx-auto mb-6 rounded-full"
        />
        <h1 className="text-6xl font-extrabold text-[#10B981] mb-4">WealthFlow</h1>
        <p className="text-lg text-gray-600 max-w-xl italic mx-auto mb-8">
          Your personal finance tracker to manage income, expenses, and savings —
          all in one place. <span className="font-semibold">Simple. Fast. Secure.</span>
        </p>

        {/* Buttons */}
        <div className="flex gap-6 justify-center mb-12">
          <Link
            href="/login"
            className="px-6 py-3 rounded-2xl bg-[#10B981] text-white font-semibold shadow-md hover:bg-[#16d495] transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 rounded-2xl border-2 border-[#10B981] text-[#10B981] font-semibold hover:bg-[#ddf7d5] hover:border-[#16d495] hover:text-[#16d495] transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-[#10B981] mb-2">📊 Track</h2>
          <p className="text-gray-600">Keep a record of all your income and expenses in one place.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-[#10B981] mb-2">📈 Visualize</h2>
          <p className="text-gray-600">View charts & graphs to understand your spending habits.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-[#10B981] mb-2">🎯 Achieve</h2>
          <p className="text-gray-600">Set savings goals and achieve financial freedom faster.</p>
        </div>
      </div>
    </div>
  );
}
