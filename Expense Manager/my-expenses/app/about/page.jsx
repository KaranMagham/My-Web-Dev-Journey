"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    savings: 0,
    satisfaction: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats
    const animateStats = () => {
      setStats({
        users: 1250,
        transactions: 15420,
        savings: 89450,
        satisfaction: 98
      });
    };
    
    setTimeout(animateStats, 500);
  }, []);

  const features = [
    {
      icon: "💳",
      title: "Smart Categorization",
      description: "Automatically categorize your expenses and income with intelligent suggestions."
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Get instant insights into your spending patterns with beautiful charts."
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your financial data is encrypted and stored securely with industry standards."
    },
    {
      icon: "📱",
      title: "Cross-Platform",
      description: "Access your data anywhere, anytime with our responsive web application."
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built with modern technologies for instant loading and smooth performance."
    },
    {
      icon: "🎯",
      title: "Goal Tracking",
      description: "Set financial goals and track your progress with visual indicators."
    }
  ];

  const techStack = [
    { name: "React", icon: "⚛️", color: "from-blue-400 to-blue-600" },
    { name: "Next.js", icon: "▲", color: "from-gray-700 to-gray-900" },
    { name: "MongoDB", icon: "🍃", color: "from-green-400 to-green-600" },
    { name: "Tailwind", icon: "🎨", color: "from-cyan-400 to-cyan-600" },
    { name: "Node.js", icon: "🟢", color: "from-green-500 to-green-700" },
    { name: "Express", icon: "🚀", color: "from-yellow-400 to-orange-500" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Freelance Designer",
      content: "MoneyBrief has transformed how I track my finances. The interface is so intuitive and the analytics are incredibly helpful!",
      avatar: "👩‍💻"
    },
    {
      name: "Mike Johnson",
      role: "Student",
      content: "As a student, managing my budget was always a challenge. This app makes it simple and actually fun to track expenses.",
      avatar: "👨‍🎓"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      content: "The real-time insights and beautiful design make financial tracking a pleasure rather than a chore. Highly recommended!",
      avatar: "👩‍💼"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#ddf7d5] via-white to-[#e6fff5] overflow-y-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 via-transparent to-[#16d495]/10 animate-pulse"></div>
        
        {/* Header */}
        <div className="sticky top-4 bg-opacity-90 backdrop-blur-md z-10 py-2">
          <div className="max-w-7xl mx-auto px-4">
            <Link 
              href="/about" 
              className="text-[#10B981] text-4xl font-extrabold px-6 rounded-xl hover:text-white hover:bg-[#10B981] transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              About MoneyBrief.
            </Link>
            <div className="w-full h-1 bg-gradient-to-r from-[#10B981] to-[#16d495] mt-4 rounded-full"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Your Financial Journey
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#16d495]">
                Starts Here
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              MoneyBrief is more than just an expense tracker—it's your personal finance companion that helps you build better money habits, achieve your goals, and take control of your financial future.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: "Active Users", value: stats.users, suffix: "+", icon: "👥" },
              { label: "Transactions", value: stats.transactions, suffix: "+", icon: "💸" },
              { label: "Money Saved", value: stats.savings, suffix: "₹", icon: "💰" },
              { label: "Satisfaction", value: stats.satisfaction, suffix: "%", icon: "⭐" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-[#10B981]/20 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#10B981] mb-1">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose MoneyBrief?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the features that make managing your finances effortless and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-[#10B981]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#10B981] mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-gradient-to-r from-[#10B981]/5 to-[#16d495]/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Built with Modern Technology</h2>
            <p className="text-xl text-gray-600">
              Powered by cutting-edge technologies for the best user experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg border border-[#10B981]/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-3">{tech.icon}</div>
                <div className={`font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">
            Get started in minutes with our simple 3-step process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Add Transactions",
              description: "Record your income and expenses with our intuitive form. Add categories, descriptions, and amounts in seconds.",
              icon: "📝"
            },
            {
              step: "02", 
              title: "Track & Analyze",
              description: "View your financial data in beautiful charts and get insights into your spending patterns.",
              icon: "📊"
            },
            {
              step: "03",
              title: "Achieve Goals",
              description: "Set financial goals and watch your progress with real-time updates and motivational insights.",
              icon: "🎯"
            }
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-[#10B981] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                {step.step}
              </div>
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-[#10B981] mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-[#10B981]/5 to-[#16d495]/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who have transformed their financial habits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-[#10B981]/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{testimonial.avatar}</div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#10B981] to-[#16d495] rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Take Control?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your financial journey today and experience the difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/transactions"
              className="bg-white text-[#10B981] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Tracking Now
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#10B981] transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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

export default AboutPage;
