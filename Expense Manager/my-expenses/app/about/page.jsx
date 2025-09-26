import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#ddf7d5] via-white to-[#e6fff5] px-4 py-8 text-gray-900 overflow-y-auto">
      {/* Heading */}
      <div className="sticky top-0 z-10 bg-opacity-80 backdrop-blur-md mb-8">
        <Link href="/about" className="text-[#10B981] text-4xl font-extrabold m-2 mb-2 px-3 py-2 rounded hover:text-white hover:bg-[#10B981] transition-all duration-300 shadow-lg">
          About.
        </Link>
        <div className="w-full h-1 bg-[#10B981] mt-3 rounded"></div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Section: Overview */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2 text-[#10B981] flex items-center gap-2">📌 Overview</h2>
          <p className="text-base leading-relaxed">
            Welcome to <span className="font-semibold text-[#10B981]">Money Tracker</span> – your personal finance assistant designed to simplify the way you manage your money. This app helps you stay in control with clear visuals, transaction summaries, and a simple, fast interface.
          </p>
        </section>

        {/* Section: Why Use This App */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2 text-[#10B981] flex items-center gap-2">💡 Why Use This App?</h2>
          <p className="text-base leading-relaxed">
            Whether you're tracking daily expenses or planning a monthly budget, Money Tracker lets you easily record, edit, and analyze your financial activity. It's perfect for students, professionals, or anyone building better money habits.
          </p>
        </section>

        {/* Section: Tech Stack */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2 text-[#10B981] flex items-center gap-2">🛠️ Tech Stack</h2>
          <p className="text-base leading-relaxed">
            This project is built with the <span className="font-semibold text-[#10B981]">MERN Stack</span> — MongoDB, Express.js, React, and Node.js. There are two versions:
            <br />• <span className="text-green-600 font-semibold">Offline Version</span> using Local Storage
            <br />• <span className="text-blue-600 font-semibold">Online Version</span> using MongoDB for permanent data storage
          </p>
        </section>

        {/* Section: Our Goal */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2 text-[#10B981] flex items-center gap-2">🎯 Our Goal</h2>
          <p className="text-base leading-relaxed">
            Our mission is to help you spend smarter, save consistently, and build a healthier financial future. This app is free, easy to use, and created with passion for productivity.
          </p>
        </section>

        {/* Section: How It Works */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2 text-[#10B981] flex items-center gap-2">⚙️ How It Works</h2>
          <p className="text-base leading-relaxed">
            It's super simple! Just go to the <span className="font-semibold text-[#10B981]">Manage Transactions</span> page and:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-800">
            <li>Add a transaction by entering the amount, description, date, category, and type (income/expense).</li>
            <li>Your data is instantly saved either in <span className="text-green-600 font-semibold">Local Storage</span> or <span className="text-blue-600 font-semibold">MongoDB</span>.</li>
            <li>You can easily <span className="text-yellow-500 font-semibold">edit</span> or <span className="text-red-500 font-semibold">delete</span> any transaction anytime.</li>
            <li>On the homepage, you can view the <span className="font-semibold text-[#10B981]">latest transactions</span>, check your <span className="font-semibold text-[#10B981]">total balance</span>, and see a summary of <span className="text-green-600">income</span> vs <span className="text-red-500">expenses</span>.</li>
          </ul>
          <p className="mt-2">
            Everything is fast, responsive, and fully dynamic — no reloads needed. Start tracking now!
          </p>
        </section>
      </div>
    </div>
  )
}

export default page
