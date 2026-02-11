"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, Zap, TrendingUp, Plus, Clock, Target } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    completionPercentage: 0
  });

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
      calculateStats(parsedTasks);
      getTodayTasks(parsedTasks);
      getRecentTasks(parsedTasks);
    }
  }, []);

  const calculateStats = (taskList) => {
    const totalTasks = taskList.length;
    const completedTasks = taskList.filter((t) => t.completed).length;
    const overdueTasks = taskList.filter(
      (t) => !t.completed && isOverdue(t.dueDate)
    ).length;
    const completionPercentage =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    setStats({
      totalTasks,
      completedTasks,
      overdueTasks,
      completionPercentage
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && 
           new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const isToday = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate).toDateString() === new Date().toDateString();
  };

  const getTodayTasks = (taskList) => {
    const today = taskList.filter((t) => isToday(t.dueDate));
    setTodayTasks(today);
  };

  const getRecentTasks = (taskList) => {
    const recent = taskList
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      )
      .slice(0, 5);
    setRecentTasks(recent);
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      work: "bg-blue-100 text-blue-700",
      personal: "bg-purple-100 text-purple-700",
      college: "bg-orange-100 text-orange-700",
      health: "bg-green-100 text-green-700",
      shopping: "bg-pink-100 text-pink-700"
    };
    return colors[categoryId] || "bg-gray-100 text-gray-700";
  };

  const getCategoryLabel = (categoryId) => {
    const labels = {
      work: "Work",
      personal: "Personal",
      college: "College",
      health: "Health",
      shopping: "Shopping"
    };
    return labels[categoryId] || "Other";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ddf7d5] via-white to-[#e6fff5] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#10B981] to-[#16d495] bg-clip-text text-transparent mb-4">
            Welcome to Progressa
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Your AI-powered productivity companion. Organize tasks, track progress, and achieve your goals effortlessly.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Tasks */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 font-semibold">Total Tasks</h3>
              <Target size={24} className="text-[#10B981]" />
            </div>
            <div className="text-4xl font-bold text-[#10B981] mb-2">
              {stats.totalTasks}
            </div>
            <p className="text-sm text-gray-600">
              {stats.totalTasks === 1 ? "task" : "tasks"} to accomplish
            </p>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 font-semibold">Completed</h3>
              <CheckCircle2 size={24} className="text-green-500" />
            </div>
            <div className="text-4xl font-bold text-green-500 mb-2">
              {stats.completedTasks}
            </div>
            <p className="text-sm text-gray-600">
              {stats.completionPercentage}% complete
            </p>
          </div>

          {/* Overdue Tasks */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 font-semibold">Overdue</h3>
              <Clock size={24} className="text-red-500" />
            </div>
            <div className="text-4xl font-bold text-red-500 mb-2">
              {stats.overdueTasks}
            </div>
            <p className="text-sm text-gray-600">
              {stats.overdueTasks > 0 ? "needs attention" : "all on track"}
            </p>
          </div>

          {/* Progress */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 font-semibold">Progress</h3>
              <TrendingUp size={24} className="text-blue-500" />
            </div>
            <div className="text-4xl font-bold text-blue-500 mb-2">
              {stats.completionPercentage}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#10B981] to-[#16d495] h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Today's Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Calendar size={28} className="text-[#10B981]" />
                  Today's Tasks
                </h2>
                <span className="bg-[#10B981]/10 text-[#10B981] px-3 py-1 rounded-full font-semibold">
                  {todayTasks.length} task{todayTasks.length !== 1 ? "s" : ""}
                </span>
              </div>

              {todayTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">✨</div>
                  <p className="text-gray-600">No tasks scheduled for today!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    You're all set. Create a task to get started.
                  </p>
                  <Link
                    href="/task"
                    className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-[#10B981] to-[#16d495] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <Plus size={20} />
                    Add Task
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                        task.completed
                          ? "bg-green-50 border-green-200"
                          : "bg-amber-50 border-amber-200"
                      }`}
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                          ? "bg-green-500 border-green-500"
                          : "border-amber-400"
                      }`}>
                        {task.completed && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}>
                          {task.title}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                          {getCategoryLabel(task.category)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 flex flex-col">
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-2 flex-1">
                <Link
                  href="/task"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#10B981]/10 transition-colors duration-200 text-gray-700 hover:text-[#10B981] font-medium"
                >
                  <Plus size={20} />
                  My Tasks
                </Link>
                <Link
                  href="/insights"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#10B981]/10 transition-colors duration-200 text-gray-700 hover:text-[#10B981] font-medium"
                >
                  <TrendingUp size={20} />
                  Insights
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#10B981]/10 transition-colors duration-200 text-gray-700 hover:text-[#10B981] font-medium"
                >
                  <span className="text-lg">💬</span>
                  Feedback
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#10B981] to-[#16d495] rounded-2xl p-8 shadow-lg text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-3">Create with AI</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Let our AI assistant generate smart, actionable tasks based on your goals.
                </p>
              </div>
              <Link
                href="/smart-task"
                className="bg-white text-[#10B981] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center shadow-lg flex items-center justify-center gap-2"
              >
                <Zap size={20} />
                Create Task with AI
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        {recentTasks.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Tasks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                    task.completed
                      ? "bg-green-50/50 border-green-200"
                      : isOverdue(task.dueDate)
                      ? "bg-red-50/50 border-red-300"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className={`font-semibold flex-1 ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}>
                      {task.title}
                    </h4>
                    {task.completed && (
                      <span className="text-green-600 text-lg">✓</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                      {getCategoryLabel(task.category)}
                    </span>
                    {task.dueDate && (
                      <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                        isOverdue(task.dueDate) && !task.completed
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        📅 {formatDate(task.dueDate)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
