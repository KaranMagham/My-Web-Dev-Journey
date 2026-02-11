"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

const SupportPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset status after 3 seconds
        setTimeout(() => setSubmitStatus(null), 3000);
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const socialLinks = [
    {
      name: "Email",
      icon: "📧",
      href: "mailto:karanmagham09@gmail.com",
      color: "from-red-400 to-red-600",
      description: "karanmagham09@gmail.com"
    },
    {
      name: "GitHub",
      icon: "💻",
      href: "https://github.com/KaranMagham",
      color: "from-gray-600 to-gray-800",
      description: "github.com/KaranMagham"
    },
    {
      name: "LinkedIn",
      icon: "💼",
      href: "https://www.linkedin.com/in/karanmaghamb099/",
      color: "from-blue-500 to-blue-700",
      description: "linkedin.com/in/karanmaghamb099"
    },
    {
      name: "Instagram",
      icon: "📸",
      href: "https://www.instagram.com/king_coder_emp/",
      color: "from-pink-400 to-purple-600",
      description: "@king_coder_emp"
    }
  ];

  const contactMethods = [
    {
      icon: "🤖",
      title: "AI Feedback",
      description: "Help us improve AI-generated task suggestions"
    },
    {
      icon: "🐞",
      title: "Report Issues",
      description: "Found a bug? Let us know so we can fix it"
    },
    {
      icon: "💡",
      title: "Feature Requests",
      description: "Suggest improvements or new ideas for Progressa"
    },
    {
      icon: "📩",
      title: "Get Support",
      description: "Need help using Progressa? We're here to assist"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#ddf7d5] via-white to-[#e6fff5] overflow-y-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 via-transparent to-[#16d495]/10 animate-pulse"></div>

        {/* Header */}
        <div className="sticky top-4 z-10 mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative group">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/20 to-[#16d495]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Header container */}
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="animate-bounce" style={{animationDuration: '3s'}}>
                      <MessageCircle size={48} className="text-[#10B981]" strokeWidth={1.5} />
                    </div>
                    {/* Text content */}
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#10B981] to-[#16d495] bg-clip-text text-transparent">
                        Support & Feedback
                      </h1>
                      <p className="text-sm text-gray-600 mt-1">We're here to listen and improve</p>
                    </div>
                  </div>
                  
                  {/* Decorative element
                  <div className="hidden md:flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-[#16d495] animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div> */}
                </div>
                
                {/* Enhanced gradient underline */}
                <div className="mt-4 h-1 bg-gradient-to-r from-[#10B981] via-[#16d495] to-[#10B981] rounded-full shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Need Help or
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#16d495]">
                Have Feedback?
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you! Report issues, suggest features, or share feedback to help us improve Progressa and make your productivity journey better.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Contact Progressa?</h2>
          <p className="text-xl text-gray-600">
            Your feedback directly helps us improve AI features, fix bugs, and build the productivity tool you need
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-[#10B981]/20 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{method.icon}</div>
              <h3 className="text-xl font-bold text-[#10B981] mb-3">{method.title}</h3>
              <p className="text-gray-600 leading-relaxed">{method.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#10B981] mb-4">Send Your Feedback</h2>
              <p className="text-gray-600">
                Share your thoughts, report issues, or request features to help us improve Progressa
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject * <span className="text-xs text-gray-500">(Bug Report / Feature Request / Feedback / Support)</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                  placeholder="e.g., AI task quality issue"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Please provide detailed feedback, steps to reproduce bugs, or describe your feature request..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#10B981] to-[#16d495] text-white hover:shadow-lg'
                  }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
                  ✅ Thank you! Your feedback has been received. We'll review it and get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                  ❌ Please fill out all fields correctly and try again.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8">
              <h3 className="text-2xl font-bold text-[#10B981] mb-6">Support Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#10B981]/10 p-3 rounded-xl">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Support Email</p>
                    <a
                      href="mailto:support@progressa.app"
                      className="text-[#10B981] hover:underline"
                    >
                      support@progressa.app
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#10B981]/10 p-3 rounded-xl">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Response Time</p>
                    <p className="text-gray-600">We typically respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#10B981]/10 p-3 rounded-xl">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Priority</p>
                    <p className="text-gray-600">Critical issues are addressed faster</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8">
              <h3 className="text-2xl font-bold text-[#10B981] mb-6">Feedback Categories</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#10B981]/5 rounded-lg">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <p className="font-semibold text-gray-800">AI Features</p>
                    <p className="text-sm text-gray-600">Task generation quality, suggestions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#10B981]/5 rounded-lg">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="font-semibold text-gray-800">User Experience</p>
                    <p className="text-sm text-gray-600">Interface, navigation, usability</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#10B981]/5 rounded-lg">
                  <span className="text-2xl">🔧</span>
                  <div>
                    <p className="font-semibold text-gray-800">Technical Issues</p>
                    <p className="text-sm text-gray-600">Bugs, crashes, performance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me */}
            <div className="bg-gradient-to-r from-[#10B981] to-[#16d495] rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">About Progressa</h3>
              <p className="leading-relaxed mb-4">
                Progressa is an AI-powered productivity assistant designed to help you plan, organize, and complete tasks more efficiently. Our mission is to combine intelligent task generation with intuitive task management to boost your productivity and help you achieve your goals.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">AI-Powered</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Smart Planning</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Real-time Insights</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Built for Productivity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#10B981]/5 to-[#16d495]/5 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Feedback Drives Our Innovation</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Every suggestion, bug report, and piece of feedback helps us build a better Progressa.
            We're committed to continuously improving your productivity experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-[#10B981] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#16d495] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/main"
              className="border-2 border-[#10B981] text-[#10B981] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#10B981] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Create Task with AI
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold text-[#10B981] mb-4">Progressa</div>
          <p className="text-gray-400 mb-6">
            AI Productivity Assistant | Built with ❤️ for better task management
          </p>
          <p className="text-sm text-gray-500">
            Thank you for helping us improve Progressa © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SupportPage;