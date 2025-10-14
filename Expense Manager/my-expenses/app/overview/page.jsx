"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart as PieChartIcon, Calendar, RefreshCw, ArrowRight, Eye, Target, Zap, Award, Clock, Filter, Download, Share2, Bell, Settings, Plus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

const OverviewPage = () => {
    const [savedTransactions, setsavedTransactions] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsRefreshing(true);
                const res = await fetch("/api/transactions");
                const data = await res.json();
                
                if (data.success && Array.isArray(data.data)) {
                    const sorted = data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setsavedTransactions(sorted);
                } else {
                    setsavedTransactions([]);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setsavedTransactions([]);
            } finally {
                setIsRefreshing(false);
            }
        };
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

    // 🧾 Prepare Data for Chart (last 7 entries)
    const chartData = savedTransactions.slice(-7).map((txn, index, arr) => {
        const income = txn.radio === "income" ? parseFloat(txn.amount) : 0;
        const expense = txn.radio === "expense" ? parseFloat(txn.amount) : 0;

        // Calculate balance up to this transaction
        const balance = arr.slice(0, index + 1).reduce((acc, t) => {
            const amt = parseFloat(t.amount);
            return acc + (t.radio === "income" ? amt : -amt);
        }, 0);

        return {
            date: new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
            income,
            expense,
            balance
        };
    });

    const pieData = [
        { name: 'Income', value: totalIncome },
        { name: 'Expense', value: totalExpense },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4">
                    <p className="font-semibold text-gray-800 mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {`${entry.name}: ₹${entry.value.toLocaleString()}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const pieColors = ['#10B981', '#EF4444']; // Green for income, red for expense

    // 🎯 New Enhanced Analytics
    const getMonthlyData = () => {
        const monthlyData = {};
        savedTransactions.forEach(txn => {
            const month = new Date(txn.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            if (!monthlyData[month]) {
                monthlyData[month] = { income: 0, expense: 0, balance: 0 };
            }
            const amount = parseFloat(txn.amount);
            if (txn.radio === 'income') {
                monthlyData[month].income += amount;
                monthlyData[month].balance += amount;
            } else {
                monthlyData[month].expense += amount;
                monthlyData[month].balance -= amount;
            }
        });
        return Object.entries(monthlyData).map(([month, data]) => ({ month, ...data }));
    };

    const getCategoryBreakdown = () => {
        const categoryData = {};
        savedTransactions.forEach(txn => {
            const category = txn.type;
            if (!categoryData[category]) {
                categoryData[category] = { amount: 0, count: 0 };
            }
            categoryData[category].amount += parseFloat(txn.amount);
            categoryData[category].count += 1;
        });
        return Object.entries(categoryData).map(([category, data]) => ({
            category: category.charAt(0).toUpperCase() + category.slice(1),
            amount: data.amount,
            count: data.count
        })).sort((a, b) => b.amount - a.amount);
    };

    const getSavingsRate = () => {
        if (totalIncome === 0) return 0;
        return ((balance / totalIncome) * 100).toFixed(1);
    };

    const getAverageTransaction = () => {
        if (savedTransactions.length === 0) return 0;
        return (totalIncome + totalExpense) / savedTransactions.length;
    };

    const getTopCategory = () => {
        const categories = getCategoryBreakdown();
        return categories.length > 0 ? categories[0] : null;
    };

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
    const monthlyData = getMonthlyData();
    const categoryBreakdown = getCategoryBreakdown();
    const savingsRate = getSavingsRate();
    const averageTransaction = getAverageTransaction();
    const topCategory = getTopCategory();

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
                                href="/overview"
                                className="text-[#10B981] text-4xl font-extrabold px-6 py-3 rounded-xl hover:text-white hover:bg-[#10B981] transition-all duration-300 shadow-lg transform hover:scale-105"
                            >
                                Financial Overview.
                            </Link>
                            <button
                                onClick={() => window.location.reload()}
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
                            Financial
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#16d495]">
                                Analytics
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Get detailed insights into your financial patterns with interactive charts and comprehensive analytics.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Total Balance Card */}
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
                </div>

                {/* Charts Section */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Line Chart */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-[#10B981] mb-2">Trend Analysis</h3>
                                <p className="text-gray-600">Income vs Expenses over time</p>
                            </div>
                            <div className="p-3 bg-[#10B981]/10 rounded-xl">
                                <BarChart3 className="w-8 h-8 text-[#10B981]" />
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <XAxis 
                                        dataKey="date" 
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        axisLine={{ stroke: '#e5e7eb' }}
                                    />
                                    <YAxis 
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        axisLine={{ stroke: '#e5e7eb' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line 
                                        type="monotone" 
                                        dataKey="income" 
                                        stroke="#10B981" 
                                        strokeWidth={3} 
                                        name="Income" 
                                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="expense" 
                                        stroke="#EF4444" 
                                        strokeWidth={3} 
                                        name="Expense" 
                                        dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="balance" 
                                        stroke="#F59E0B" 
                                        strokeWidth={3} 
                                        name="Balance" 
                                        dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-[#10B981] mb-2">Income vs Expense</h3>
                                <p className="text-gray-600">Distribution breakdown</p>
                            </div>
                            <div className="p-3 bg-[#10B981]/10 rounded-xl">
                                <PieChartIcon className="w-8 h-8 text-[#10B981]" />
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie 
                                        data={pieData} 
                                        cx="50%" 
                                        cy="50%" 
                                        innerRadius={60} 
                                        outerRadius={120} 
                                        fill="#8884d8" 
                                        paddingAngle={5}
                                        dataKey="value" 
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Enhanced Analytics Section */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Monthly Trends */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-[#10B981] mb-2">Monthly Trends</h3>
                                <p className="text-gray-600">Income vs Expenses by month</p>
                            </div>
                            <div className="p-3 bg-[#10B981]/10 rounded-xl">
                                <Calendar className="w-8 h-8 text-[#10B981]" />
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyData}>
                                    <XAxis 
                                        dataKey="month" 
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        axisLine={{ stroke: '#e5e7eb' }}
                                    />
                                    <YAxis 
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        axisLine={{ stroke: '#e5e7eb' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar dataKey="income" fill="#10B981" name="Income" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="expense" fill="#EF4444" name="Expense" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-[#10B981] mb-2">Category Breakdown</h3>
                                <p className="text-gray-600">Top spending categories</p>
                            </div>
                            <div className="p-3 bg-[#10B981]/10 rounded-xl">
                                <Target className="w-8 h-8 text-[#10B981]" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            {categoryBreakdown.slice(0, 5).map((category, index) => (
                                <div key={category.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">{getTransactionIcon(category.category.toLowerCase())}</div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{category.category}</p>
                                            <p className="text-sm text-gray-600">{category.count} transactions</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-[#10B981]">₹{category.amount.toLocaleString()}</p>
                                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                            <div 
                                                className="bg-[#10B981] h-2 rounded-full" 
                                                style={{ 
                                                    width: `${(category.amount / categoryBreakdown[0].amount) * 100}%` 
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Financial Insights */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
                        <div className="text-3xl mb-3">🎯</div>
                        <div className="text-2xl font-bold text-[#10B981] mb-1">{savingsRate}%</div>
                        <div className="text-gray-600 text-sm">Savings Rate</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
                        <div className="text-3xl mb-3">📊</div>
                        <div className="text-2xl font-bold text-[#10B981] mb-1">₹{averageTransaction.toLocaleString()}</div>
                        <div className="text-gray-600 text-sm">Avg Transaction</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
                        <div className="text-3xl mb-3">🏆</div>
                        <div className="text-lg font-bold text-[#10B981] mb-1">
                            {topCategory ? topCategory.category : 'N/A'}
                        </div>
                        <div className="text-gray-600 text-sm">Top Category</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center">
                        <div className="text-3xl mb-3">⚡</div>
                        <div className="text-2xl font-bold text-[#10B981] mb-1">
                            {savedTransactions.length > 0 ? Math.round(savedTransactions.length / 30) : 0}
                        </div>
                        <div className="text-gray-600 text-sm">Transactions/Day</div>
                    </div>
                </div>

                {/* Financial Goals & Insights */}
                <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-[#10B981] mb-4">Financial Insights & Recommendations</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            AI-powered insights to help you make better financial decisions
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-500 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-bold text-green-800">Income Growth</h4>
                            </div>
                            <p className="text-green-700 text-sm">
                                {totalIncome > 0 ? 
                                    `You've earned ₹${totalIncome.toLocaleString()} this period. Consider setting up automatic savings!` :
                                    "Start tracking your income to see growth patterns."
                                }
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-red-500 rounded-lg">
                                    <TrendingDown className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-bold text-red-800">Expense Control</h4>
                            </div>
                            <p className="text-red-700 text-sm">
                                {totalExpense > 0 ? 
                                    `You've spent ₹${totalExpense.toLocaleString()}. ${topCategory ? `Consider reducing ${topCategory.category.toLowerCase()} expenses.` : 'Track your spending patterns.'}` :
                                    "No expenses recorded yet. Start tracking to identify spending patterns."
                                }
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-bold text-blue-800">Savings Goal</h4>
                            </div>
                            <p className="text-blue-700 text-sm">
                                {balance > 0 ? 
                                    `Great job! You're saving ${savingsRate}% of your income. Keep it up!` :
                                    "Focus on increasing your savings rate. Aim for at least 20% of your income."
                                }
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500 rounded-lg">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-bold text-purple-800">Transaction Frequency</h4>
                            </div>
                            <p className="text-purple-700 text-sm">
                                {savedTransactions.length > 0 ? 
                                    `You're averaging ${Math.round(savedTransactions.length / 30)} transactions per day. Consider batch processing for efficiency.` :
                                    "Start tracking your daily transactions to understand your spending habits."
                                }
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-yellow-500 rounded-lg">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-bold text-yellow-800">Financial Health</h4>
                            </div>
                            <p className="text-yellow-700 text-sm">
                                {balance > 0 ? 
                                    "Your financial health is excellent! You're building wealth effectively." :
                                    "Focus on reducing expenses and increasing income to improve your financial health."
                                }
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl border border-indigo-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-500 rounded-lg">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-bold text-indigo-800">Consistency</h4>
                            </div>
                            <p className="text-indigo-700 text-sm">
                                {savedTransactions.length > 10 ? 
                                    "You're consistently tracking your finances. This habit will pay off long-term!" :
                                    "Build the habit of regular financial tracking. Consistency is key to success."
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-[#10B981] to-[#16d495] rounded-3xl p-8 mb-16 text-white">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold mb-4">Quick Actions</h3>
                        <p className="text-white/90 max-w-2xl mx-auto">
                            Manage your finances efficiently with these quick actions
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href="/transactions"
                            className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                        >
                            <Plus className="w-8 h-8 mx-auto mb-3" />
                            <p className="font-semibold">Add Transaction</p>
                        </Link>
                        
                        <Link
                            href="/transactions"
                            className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                        >
                            <Eye className="w-8 h-8 mx-auto mb-3" />
                            <p className="font-semibold">View All</p>
                        </Link>
                        
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                        >
                            <RefreshCw className="w-8 h-8 mx-auto mb-3" />
                            <p className="font-semibold">Refresh Data</p>
                        </button>
                        
                        <Link
                            href="/main"
                            className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                        >
                            <BarChart3 className="w-8 h-8 mx-auto mb-3" />
                            <p className="font-semibold">Dashboard</p>
                        </Link>
                    </div>
                </div>

                {/* Recent Transactions */}
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
                                <div className="text-8xl mb-6">📊</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Data Available</h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    Start adding transactions to see your financial analytics and insights.
                                </p>
                                <Link
                                    href="/transactions"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#16d495] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <Eye className="w-5 h-5" />
                                    Add Transactions
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
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
                        )}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
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
                        Made by <span className="text-[#10B981] font-semibold">Karan Magham</span> © 2025
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default OverviewPage;