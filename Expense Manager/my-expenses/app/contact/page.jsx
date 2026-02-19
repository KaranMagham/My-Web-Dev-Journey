"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ContactPage = () => {
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
    setIsSubmitting(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_CONTACT_API || 'http://localhost:4000/api/contact';
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
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
      icon: "⚡",
      title: "Quick Response",
      description: "I typically respond within 24 hours"
    },
    {
      icon: "🌍",
      title: "Global Reach",
      description: "Available for remote collaboration worldwide"
    },
    {
      icon: "💡",
      title: "Tech Enthusiast",
      description: "Always excited to discuss new projects and ideas"
    },
    {
      icon: "🤝",
      title: "Open to Opportunities",
      description: "Looking for internships, collaborations, and networking"
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
              href="/contact" 
              className="text-[#10B981] text-4xl font-extrabold px-6 rounded-xl hover:text-white hover:bg-[#10B981] transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Let's Connect.
        </Link>
            <div className="w-full h-1 bg-gradient-to-r from-[#10B981] to-[#16d495] mt-4 rounded-full"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className={`max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Get in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#16d495]">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have a question, want to collaborate, or just want to say hello? I'd love to hear from you! 
              Let's create something amazing together.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Connect With Me?</h2>
          <p className="text-xl text-gray-600">
            I'm always excited to meet new people and explore opportunities
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
              <h2 className="text-3xl font-bold text-[#10B981] mb-4">Send me a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and I'll get back to you as soon as possible
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
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#10B981]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
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
                  placeholder="Tell me about your project, question, or just say hello..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#10B981] to-[#16d495] text-white hover:shadow-lg'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8">
              <h3 className="text-2xl font-bold text-[#10B981] mb-6">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#10B981]/10 p-3 rounded-xl">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
              <a
                href="mailto:karanmagham09@gmail.com"
                      className="text-[#10B981] hover:underline"
              >
                karanmagham09@gmail.com
              </a>
            </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#10B981]/10 p-3 rounded-xl">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Response Time</p>
                    <p className="text-gray-600">Usually within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#10B981]/10 p-3 rounded-xl">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Location</p>
                    <p className="text-gray-600">India • Available Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-3xl shadow-2xl border border-[#10B981]/20 p-8">
              <h3 className="text-2xl font-bold text-[#10B981] mb-6">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                    className={`bg-gradient-to-r ${social.color} text-white p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="text-3xl mb-3">{social.icon}</div>
                    <div className="font-bold text-sm mb-1">{social.name}</div>
                    <div className="text-xs opacity-90">{social.description}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* About Me */}
            <div className="bg-gradient-to-r from-[#10B981] to-[#16d495] rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">About Karan</h3>
              <p className="leading-relaxed mb-4">
                I'm a passionate BSC Computer Science student and web developer who loves creating 
                innovative solutions. When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with the community.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">React</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Next.js</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">MongoDB</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Node.js</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Tailwind</span>
              </div>
            </div>
          </div>
            </div>
          </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#10B981]/5 to-[#16d495]/5 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Let's Build Something Amazing</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you have a project idea, need help with development, or just want to chat about technology, 
            I'm always excited to connect with fellow developers and entrepreneurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/about"
              className="bg-[#10B981] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#16d495] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Learn More About Me
            </Link>
            <a 
              href="mailto:karanmagham09@gmail.com"
              className="border-2 border-[#10B981] text-[#10B981] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#10B981] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Send Email Now
            </a>
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

export default ContactPage;