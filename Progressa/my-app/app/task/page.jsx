"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, CheckCircle2, Circle, Edit2, Save, X, Calendar, Tag } from "lucide-react";

const CATEGORIES = [
  { id: "work", label: "Work", color: "bg-blue-100 border-blue-300 text-blue-700" },
  { id: "personal", label: "Personal", color: "bg-purple-100 border-purple-300 text-purple-700" },
  { id: "health", label: "Health", color: "bg-green-100 border-green-300 text-green-700" },
  { id: "shopping", label: "Shopping", color: "bg-pink-100 border-pink-300 text-pink-700" },
];

export default function TaskPage() {
  const [taskInput, setTaskInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("work");
  const [selectedDueDate, setSelectedDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingCategory, setEditingCategory] = useState("work");
  const [editingDueDate, setEditingDueDate] = useState("");
  const [deletedTask, setDeletedTask] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskInput,
        completed: false,
        category: selectedCategory,
        dueDate: selectedDueDate,
        createdAt: new Date().toISOString()
      },
    ]);

    setTaskInput("");
    setSelectedDueDate("");
    setSelectedCategory("work");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const startEdit = (id, title, category, dueDate) => {
    setEditingId(id);
    setEditingText(title);
    setEditingCategory(category || "work");
    setEditingDueDate(dueDate || "");
  };

  const saveEdit = (id) => {
    if (!editingText.trim()) return;
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
            ...task,
            title: editingText,
            category: editingCategory,
            dueDate: editingDueDate
          }
          : task
      )
    );
    setEditingId(null);
    setEditingText("");
    setEditingCategory("work");
    setEditingDueDate("");
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    setDeletedTask(taskToDelete);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const undoDelete = () => {
    if (deletedTask) {
      setTasks([...tasks, deletedTask]);
      setDeletedTask(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getCategoryColor = (categoryId) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    return category ? category.color : CATEGORIES[0].color;
  };

  const getCategoryLabel = (categoryId) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    return category ? category.label : "Other";
  };

  const filteredTasks = filterCategory === "all"
    ? tasks
    : tasks.filter((task) => task.category === filterCategory);

  const completedCount = filteredTasks.filter((t) => t.completed).length;
  const totalCount = filteredTasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ddf7d5] via-white to-[#e6fff5] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/20 to-[#16d495]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#10B981] to-[#16d495] bg-clip-text text-transparent mb-2">
                    My Tasks
                  </h1>
                  <p className="text-gray-600">
                    {totalCount === 0
                      ? "No tasks yet. Create one to get started!"
                      : `${completedCount} of ${totalCount} completed`}
                  </p>
                </div>
                {totalCount > 0 && (
                  <div className="text-right">
                    <div className="text-4xl font-bold text-[#10B981]">
                      {Math.round((completedCount / totalCount) * 100)}%
                    </div>
                    <p className="text-sm text-gray-600">Complete</p>
                  </div>
                )}
              </div>
              <div className="mt-4 h-1 bg-gradient-to-r from-[#10B981] via-[#16d495] to-[#10B981] rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Add Task */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="space-y-4">
              {/* Input row */}
              <div className="flex gap-3">
                <input
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What's your next task? (Press Enter to add)"
                  className="flex-1 bg-transparent border border-[#10B981]/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all placeholder-gray-400"
                />

                <button
                  onClick={addTask}
                  className="bg-gradient-to-r from-[#10B981] to-[#16d495] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Plus size={20} />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>

              {/* Category and Date row */}
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white border border-[#10B981]/30 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Due Date</label>
                  <input
                    type="date"
                    value={selectedDueDate}
                    onChange={(e) => setSelectedDueDate(e.target.value)}
                    className="w-full bg-white border border-[#10B981]/30 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Undo notification */}
        {deletedTask && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between animate-in slide-in-from-top">
            <div className="flex items-center gap-3">
              <span className="text-xl">⏱️</span>
              <p className="text-amber-800">Task deleted</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={undoDelete}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Undo
              </button>
              <button
                onClick={() => setDeletedTask(null)}
                className="text-amber-800 px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Category Filter */}
        {tasks.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${filterCategory === "all"
                  ? "bg-[#10B981] text-white shadow-lg"
                  : "bg-white/80 text-gray-700 border border-white/20 hover:bg-white"
                }`}
            >
              All Tasks
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${filterCategory === cat.id
                    ? `${cat.color} shadow-lg border-2`
                    : `${cat.color} opacity-60 hover:opacity-100 border-2`
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-12 text-center shadow-xl">
            <div className="text-6xl mb-4 opacity-50">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No tasks yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first task above to stay organized and productive
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={`bg-white/80 backdrop-blur-xl border rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-2 ${isOverdue(task.dueDate) && !task.completed
                    ? "border-red-300 bg-red-50/80"
                    : "border-white/20"
                  }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="flex-shrink-0 text-[#10B981] hover:text-[#16d495] transition-colors duration-200 mt-1"
                    >
                      {task.completed ? (
                        <CheckCircle2 size={24} className="fill-current" />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>

                    {/* Task content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        {editingId === task.id ? (
                          <input
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full bg-transparent border border-[#10B981]/30 rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-[#10B981]"
                            autoFocus
                          />
                        ) : (
                          <span
                            className={`block truncate text-lg font-medium ${task.completed
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                              }`}
                          >
                            {task.title}
                          </span>
                        )}
                      </div>

                      {/* Category and Date metadata */}
                      <div className="flex flex-wrap gap-2 items-center">
                        {editingId === task.id ? (
                          <>
                            <div className="flex-1 min-w-[150px]">
                              <select
                                value={editingCategory}
                                onChange={(e) => setEditingCategory(e.target.value)}
                                className="w-full bg-white border border-[#10B981]/30 rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-[#10B981]"
                              >
                                {CATEGORIES.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <input
                              type="date"
                              value={editingDueDate}
                              onChange={(e) => setEditingDueDate(e.target.value)}
                              className="bg-white border border-[#10B981]/30 rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-[#10B981]"
                            />
                          </>
                        ) : (
                          <>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(task.category)}`}>
                              <Tag size={12} className="inline mr-1" />
                              {getCategoryLabel(task.category)}
                            </span>
                            {task.dueDate && (
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${isOverdue(task.dueDate) && !task.completed
                                  ? "bg-red-200 text-red-700 border border-red-300"
                                  : "bg-blue-100 text-blue-700 border border-blue-300"
                                }`}>
                                <Calendar size={12} />
                                {formatDate(task.dueDate)}
                                {isOverdue(task.dueDate) && !task.completed && <span className="ml-1">⚠️</span>}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {editingId === task.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(task.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="Save"
                        >
                          <Save size={20} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          title="Cancel"
                        >
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(task.id, task.title, task.category, task.dueDate)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="Edit"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {tasks.length > 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-[#10B981]">{totalCount}</div>
                <p className="text-sm text-gray-600 mt-1">{filterCategory === "all" ? "Total" : "Filtered"} Tasks</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{completedCount}</div>
                <p className="text-sm text-gray-600 mt-1">Completed</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">{totalCount - completedCount}</div>
                <p className="text-sm text-gray-600 mt-1">Remaining</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
