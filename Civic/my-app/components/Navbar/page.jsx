"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header className="w-full bg-black border-b-2 border-[#ffd300]">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h2 className="text-[#ffd300] text-3xl font-extrabold tracking-wide">
          EMP-Notes ⚡
        </h2>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4">
          <Link
            href="#"
            className="bg-[#ffd300] text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Summarizer
          </Link>
          <Link
            href="#"
            className="bg-[#ffd300] text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            My Notes
          </Link>
          <Link
            href="#"
            className="bg-[#ffd300] text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Settings
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#ffd300] font-bold"
          onClick={toggleMobileMenu}
        >
          {mobileOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-2 px-4 pb-4">
          <Link
            href="#"
            className="bg-[#ffd300] text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Summarizer
          </Link>
          <Link
            href="#"
            className="bg-[#ffd300] text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            My Notes
          </Link>
          <Link
            href="#"
            className="bg-[#ffd300] text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Settings
          </Link>
        </div>
      )}


      {/* Hero Section
      <section className="bg-black text-white py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#ffd300] mb-6">
          EMP-Notes ⚡
        </h1>
        <p className="text-lg md:text-xl mb-6">
          AI-powered personal note summarizer. Organize, summarize, and manage your ideas effortlessly.
        </p>
        <button className="bg-[#ffd300] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
          Get Started
        </button>
      </section> */}
    </header>
  );
};

export default Header;
