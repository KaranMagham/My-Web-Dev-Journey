"use client";
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { Edit2, Trash2, Plus, TrendingUp, TrendingDown, Calendar, DollarSign, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ManageTransactions = () => {
  const router = useRouter();
  const [showTransaction, setShowTransaction] = useState(false);
  const [savedTransactions, setsavedTransactions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getTransaction = async () => {
    try {
      const res = await fetch("/api/transactions", { credentials: "same-origin" });
      if (res.status === 401) return router.push('/login');
      const data = await res.json();
      setsavedTransactions(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setsavedTransactions([]);
    }
  }

  useEffect(() => {
    if (!hasMounted.current) {
      getTransaction();
      hasMounted.current = true;
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (index) => {
    const entry = savedTransactions[index];
    setEditIndex(index);
    setEditingTransactionId(entry._id);
    setValue("amount", entry.amount);
    setValue("description", entry.description);
    setValue("date", entry.date);
    setValue("type", entry.type);
    setValue("radio", entry.radio);
  };

  const handleDelete = async (index) => {
    const entryToDelete = savedTransactions[index];
    try {
      const res = await fetch(`/api/transactions/${entryToDelete._id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (res.status === 401) return router.push('/login');
      if (!res.ok) throw Error("Failed to delete entry from backend");
      setsavedTransactions(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const onSubmit = async (data) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    
    const timestamp = new Date().toISOString();
    const newEntry = {
      amount: data.amount,
      description: data.description,
      date: data.date,
      type: data.type,
      radio: data.radio,
      time: timestamp,
    };

    if (editIndex !== null && editingTransactionId) {
      try {
        const res = await fetch(`/api/transactions/${editingTransactionId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify(newEntry),
        });
        if (res.status === 401) return router.push('/login');

        const responseData = await res.json();

        if (!res.ok) {
          throw new Error(`Failed to update entry: ${responseData.error || 'Unknown error'}`);
        }

        setsavedTransactions(prev => 
          prev.map(txn => 
            txn._id === editingTransactionId 
              ? { ...txn, ...newEntry, _id: editingTransactionId }
              : txn
          )
        );

        setEditIndex(null);
        setEditingTransactionId(null);
        reset({
          amount: "",
          description: "",
          date: "",
          type: "",
          radio: "",
        });
      } catch (error) {
        console.error("Error updating entry:", error);
        alert(`Update failed: ${error.message}`);
      }
    } else {
      try {
        const res = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify(newEntry),
        });
        if (res.status === 401) return router.push('/login');
        const data = await res.json();
        if (!res.ok) {
          console.error("API error:", data);
          throw new Error("Failed to save entry");
        }

        if (data.success && data.data) {
          setsavedTransactions(prev => [data.data, ...prev]);
        }
      } catch (error) {
        console.error("Error saving entry:", error);
      }
    }

    setIsSubmitting(false);
    reset({
      amount: "",
      description: "",
      date: "",
      type: "",
      radio: "",
    });
  };

  // Calculate summary stats
  const totalIncome = savedTransactions
    .filter(txn => txn.radio === "income")
    .reduce((sum, txn) => sum + parseFloat(txn.amount || 0), 0);

  const totalExpense = savedTransactions
    .filter(txn => txn.radio === "expense")
    .reduce((sum, txn) => sum + parseFloat(txn.amount || 0), 0);

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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#ddf7d5] via-white to-[#e6fff5] overflow-y-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 via-transparent to-[#16d495]/10 animate-pulse"></div>
        
        {/* Header */}
        <div className="sticky top-0 bg-opacity-90 backdrop-blur-md z-10 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <Link 
              href="/transactions" 
              className="text-[#10B981] text-4xl font-extrabold px-6 py-3 rounded-xl hover:text-white hover:bg-[#10B981] transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Manage Transactions.
            </Link>
            <div className="w-full h-1 bg-gradient-to-r from-[#10B981] to-[#16d495] mt-4 rounded-full"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Track Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#16d495]">
                Financial Journey
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Add, edit, and manage your transactions with ease. Stay on top of your finances with our intuitive transaction management system.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                <span className="text-3xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</span>
              </div>
              <p className="text-gray-600 font-semibold">Total Income</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingDown className="w-8 h-8 text-red-500 mr-3" />
                <span className="text-3xl font-bold text-red-600">₹{totalExpense.toLocaleString()}</span>
              </div>
              <p className="text-gray-600 font-semibold">Total Expenses</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
              <div className="flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-[#10B981] mr-3" />
                <span className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{balance.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 font-semibold">Net Balance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Transaction Form */}
          <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#10B981] to-[#16d495] rounded-full mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#10B981] mb-4">
                {editIndex !== null ? "Edit Transaction" : "Add New Transaction"}
              </h2>
              <p className="text-gray-600">
                {editIndex !== null ? "Update your transaction details" : "Enter the details of your new transaction"}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Amount */}
              <div>
                <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  autoComplete="amount"
                  placeholder="Enter amount"
                  {...register("amount", { required: "This field is required.", min: { value: 1, message: "Amount must be at least ₹1." } })}
                  className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 bg-[#f6fff9]"
                  suppressHydrationWarning
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Description */}
                <div>
                  <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Description *
                  </label>
                  <input
                    type="text"
                    autoComplete="description"
                    placeholder="Add a short description"
                    {...register("description", { required: "This field is required." })}
                    className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 bg-[#f6fff9]"
                    suppressHydrationWarning
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date *
                  </label>
                  <input
                    type="date"
                    autoComplete="date"
                    placeholder="Enter todays date"
                    {...register("date", { required: "This field is required." })}
                    className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 bg-[#f6fff9]"
                    suppressHydrationWarning
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register("type", { required: "This field is required." })}
                    className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 bg-[#f6fff9]"
                    defaultValue=""
                    suppressHydrationWarning
                  >
                    <option value="" disabled>Select category</option>
                    <optgroup label="Income">
                      <option value="salary">Salary</option>
                      <option value="bonus">Bonus</option>
                      <option value="freelance">Freelance</option>
                      <option value="investment">Investment</option>
                    </optgroup>
                    <optgroup label="Expense">
                      <option value="grocery">Grocery</option>
                      <option value="food">Food</option>
                      <option value="rent">Rent</option>
                      <option value="transport">Transport</option>
                      <option value="entertainment">Entertainment</option>
                    </optgroup>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                  )}
                </div>

                {/* Transaction Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    {...register("radio", { required: "This field is required." })}
                    className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 bg-[#f6fff9]"
                    defaultValue=""
                    suppressHydrationWarning
                  >
                    <option value="" disabled>Select transaction type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  {errors.radio && (
                    <p className="text-red-500 text-sm mt-1">{errors.radio.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#10B981] to-[#16d495] text-white hover:shadow-lg'
                }`}
                suppressHydrationWarning
              >
                {isSubmitting 
                  ? "Processing..." 
                  : editIndex !== null 
                    ? "Update Transaction" 
                    : "Add Transaction"
                }
              </button>
            </form>
          </div>

          {/* Transactions List */}
          <div className="space-y-8">
            {/* Transactions Header */}
            <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#10B981] mb-2">
                  Your Transactions ({savedTransactions.length})
                </h3>
                <p className="text-gray-600">
                  Manage and track all your financial activities
                </p>
              </div>

              {/* Transactions List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {savedTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-500 text-lg">
                      No transactions yet. Add your first transaction!
                    </p>
                  </div>
                ) : (
                  savedTransactions.map((entry, index) => (
                    <div 
                      key={entry._id} 
                      className="bg-gradient-to-r from-[#f6fff9] to-white p-6 rounded-2xl border border-[#10B981]/20 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="text-3xl">{getTransactionIcon(entry.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-gray-800 text-lg">{entry.description}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                entry.radio === 'income' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {entry.radio}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                              <div>
                                <span className="font-semibold">Amount:</span> 
                                <span className={`ml-2 font-bold ${
                                  entry.radio === 'income' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  ₹{entry.amount}
                                </span>
                              </div>
                              <div>
                                <span className="font-semibold">Category:</span> 
                                <span className="ml-2 capitalize">{entry.type}</span>
                              </div>
                              <div>
                                <span className="font-semibold">Date:</span> 
                                <span className="ml-2">{entry.date}</span>
                              </div>
                              <div>
                                <span className="font-semibold">Added:</span> 
                                <span className="ml-2 text-xs">
                                  {new Date(entry.time).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <button
                            type="button"
                            onClick={() => handleEdit(index)}
                            disabled={isSubmitting}
                            className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                              isSubmitting 
                                ? "bg-gray-300 cursor-not-allowed" 
                                : "bg-[#10B981] hover:bg-[#16d495] text-white shadow-lg"
                            }`}
                            title="Edit transaction"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            disabled={isSubmitting}
                            className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                              isSubmitting 
                                ? "bg-gray-300 cursor-not-allowed" 
                                : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                            }`}
                            title="Delete transaction"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
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
            Made by <span className="text-[#10B981] font-semibold">Karan Magham</span> © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ManageTransactions;