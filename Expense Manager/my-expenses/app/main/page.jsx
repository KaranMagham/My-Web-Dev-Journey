"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, DollarSign, RefreshCw, ArrowRight, Calendar, FileText, Plus, Eye } from 'lucide-react';

const MoneyBrief = () => {
  const [savedTransactions, setsavedTransactions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      console.log("Fetching transactions...");
      const res = await fetch('/api/transactions', { cache: 'no-store' });
      const response = await res.json();
      console.log("API Response:", response);

      if (response.success && Array.isArray(response.data)) {
        const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log("Sorted transactions:", sorted);
        setsavedTransactions(sorted);
      } else {
        console.warn("No valid data found in response:", response);
        setsavedTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setsavedTransactions([]);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 💰 Calculations
  const totalIncome = savedTransactions
    .filter((item) => item.radio === "income")
    .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

  const totalExpense = savedTransactions
    .filter((item) => item.radio === "expense")
    .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

  const balance = totalIncome - totalExpense;

  const getTransactionIcon = (type) => {
    const iconMap = {
      salary: "💼",
      bonus: "🎁",
      freelance: "💻",
      investment: "📈",
      grocery: "🛒",
      food: "🍽️",
      rent: "🏠",
      transport: "🚗",
      entertainment: "🎬"
    };
    return iconMap[type] || "💰";
  };

  const getBalanceStatus = () => {
    if (balance > 0) return { text: "Great job! You're saving money.", color: "text-green-600", icon: "🎉" };
    if (balance < 0) return { text: "You're running a deficit! Time to save more.", color: "text-red-500", icon: "⚠️" };
    return { text: "Your income equals your expenses.", color: "text-yellow-600", icon: "⚖️" };
  };

  const balanceStatus = getBalanceStatus();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#ddf7d5] via-white to-[#e6fff5] overflow-y-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 via-transparent to-[#16d495]/10 animate-pulse"></div>
        
        {/* Header */}
        <div className="sticky top-0 bg-opacity-90 backdrop-blur-md z-10 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-[#10B981] text-4xl font-extrabold px-6 py-3 rounded-xl hover:text-white hover:bg-[#10B981] transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                MoneyBrief.
              </Link>
              <button
                onClick={() => fetchData()}
                disabled={isRefreshing}
                className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  isRefreshing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#10B981] to-[#16d495] hover:shadow-lg'
                }`}
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-[#10B981] to-[#16d495] mt-4 rounded-full"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Your Financial
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#16d495]">
                Dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get a comprehensive overview of your financial health. Track your income, expenses, and savings all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Total Income Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-green-100 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-green-600 font-semibold text-sm">INCOME</p>
                <p className="text-green-600 font-bold text-3xl">₹{totalIncome.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Total Income</span>
              <span className="text-green-600 font-semibold">💰</span>
            </div>
          </div>

          {/* Total Expense Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-red-100 rounded-2xl">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-right">
                <p className="text-red-600 font-semibold text-sm">EXPENSES</p>
                <p className="text-red-600 font-bold text-3xl">₹{totalExpense.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Total Expenses</span>
              <span className="text-red-600 font-semibold">💸</span>
            </div>
          </div>

          {/* Net Balance Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl ${balance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <DollarSign className={`w-8 h-8 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>BALANCE</p>
                <p className={`font-bold text-3xl ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{balance.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Net Balance</span>
              <span className={`font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>⚖️</span>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <p className={`text-sm font-medium ${balanceStatus.color} flex items-center gap-2`}>
                <span>{balanceStatus.icon}</span>
                {balanceStatus.text}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 overflow-hidden">
          <div className="bg-gradient-to-r from-[#10B981] to-[#16d495] p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Recent Transactions</h2>
                <p className="text-white/90">Your latest financial activities</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{savedTransactions.length}</p>
                <p className="text-white/90 text-sm">Total Transactions</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {savedTransactions.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">📝</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Transactions Yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Start tracking your finances by adding your first transaction. It's easy and takes just a few seconds!
                </p>
                <Link
                  href="/transactions"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#16d495] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Transaction
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {savedTransactions.slice(0, 5).map((txn) => (
                    <div 
                      key={txn._id} 
                      className="bg-gradient-to-r from-[#f6fff9] to-white p-6 rounded-2xl border border-[#10B981]/20 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{getTransactionIcon(txn.type)}</div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-lg">{txn.description}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(txn.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="w-4 h-4" />
                                <span className="capitalize">{txn.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className={`text-xl font-bold ${
                              txn.radio === "income" ? "text-green-600" : "text-red-500"
                            }`}>
                              {txn.radio === "income" ? "+" : "-"}₹{parseFloat(txn.amount).toLocaleString()}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              txn.radio === 'income' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {txn.radio}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/transactions"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#16d495] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Eye className="w-5 h-5" />
                    View All Transactions
                  </Link>
                  <Link
                    href="/transactions"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#10B981] text-[#10B981] font-bold rounded-xl hover:bg-[#10B981] hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Transaction
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
            <div className="text-3xl mb-3">📊</div>
            <div className="text-2xl font-bold text-[#10B981] mb-1">{savedTransactions.length}</div>
            <div className="text-gray-600 text-sm">Total Transactions</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
            <div className="text-3xl mb-3">📈</div>
            <div className="text-2xl font-bold text-green-600 mb-1">
              {savedTransactions.filter(t => t.radio === 'income').length}
            </div>
            <div className="text-gray-600 text-sm">Income Records</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
            <div className="text-3xl mb-3">📉</div>
            <div className="text-2xl font-bold text-red-600 mb-1">
              {savedTransactions.filter(t => t.radio === 'expense').length}
            </div>
            <div className="text-gray-600 text-sm">Expense Records</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
            <div className="text-3xl mb-3">💳</div>
            <div className="text-2xl font-bold text-[#10B981] mb-1">
              {new Set(savedTransactions.map(t => t.type)).size}
            </div>
            <div className="text-gray-600 text-sm">Categories Used</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold text-[#10B981] mb-4">MoneyBrief</div>
          <p className="text-gray-400 mb-6">
            Built with ❤️ using React, Next.js, MongoDB, and Tailwind CSS
          </p>
          <p className="text-sm text-gray-500">
            Made by <span className="text-[#10B981] font-semibold">Karan Magham</span> — BSC CS Student & Web Developer © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MoneyBrief;