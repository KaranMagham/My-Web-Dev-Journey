'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const page = () => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(null);

  const navItems = [
    { href: "/", label: "Home", icon: "🏠", active: pathname === "/" },
    { href: "/main", label: "Money Brief", icon: "💰", active: pathname === "/main" },
    { href: "/transactions", label: "Manage Transactions", icon: "📊", active: pathname === "/transactions" },
    { href: "/overview", label: "Overview", icon: "📈", active: pathname === "/overview" },
    { href: "/settings", label: "Settings", icon: "⚙️", active: pathname === "/settings" },
  ];

  const bottomItems = [
    { href: "/about", label: "About", icon: "ℹ️", active: pathname === "/about" },
    { href: "/contact", label: "Contact Me", icon: "📞", active: pathname === "/contact" },
  ];

  return (
    <>
      <div className='fixed top-0 left-0 h-screen w-[14vw] sm:w-40 md:w-64 bg-gradient-to-b from-white to-[#f6fff9] border-r-2 border-[#10B981] flex flex-col justify-between z-10 shadow-2xl backdrop-blur-sm'>
        {/* Top: Logo & Brand */}
        <div className="relative">
          <div className='flex text-xl font-bold px-6 py-8 items-center gap-3 group'>
            <div className="relative">
              <Image 
                src="/wealth.gif" 
                alt="WealthFlow Logo" 
                width={55} 
                height={55} 
                className='rounded-full border-2 border-[#10B981] group-hover:border-[#16d495] transition-all duration-500 group-hover:scale-110 shadow-lg' 
              />
              <div className="absolute -inset-1 bg-[#10B981]/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <Link 
              href="/" 
              className='text-[#10B981] hover:text-[#16d495] transition-all duration-300 group-hover:scale-105 transform font-extrabold text-2xl'
            >
              WealthFlow
            </Link>
          </div>
          <div className='w-[90%] h-1 bg-gradient-to-r from-[#10B981] to-[#16d495] mx-2 rounded-full shadow-lg'></div>
        </div>

        {/* Middle: Main Navigation */}
        <div className='flex flex-col flex-grow justify-center px-2 py-4'>
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-4 px-4 py-3 mx-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  item.active 
                    ? 'bg-[#10B981] text-white shadow-lg shadow-[#10B981]/30' 
                    : 'text-[#10B981] hover:bg-[#e6fff5] hover:text-[#16d495] hover:shadow-md'
                }`}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Active indicator */}
                {item.active && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                )}
                
                {/* Icon with animation */}
                <span className={`text-2xl transition-all duration-300 ${
                  isHovered === index ? 'scale-110 rotate-12' : ''
                } ${item.active ? 'animate-pulse' : ''}`}>
                  {item.icon}
                </span>
                
                {/* Label */}
                <span className={`font-semibold text-lg transition-all duration-300 ${
                  isHovered === index ? 'translate-x-1' : ''
                }`}>
                  {item.label}
                </span>

                {/* Hover arrow */}
                <div className={`ml-auto transition-all duration-300 ${
                  isHovered === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Hover background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#10B981]/10 to-[#16d495]/10 rounded-xl transition-opacity duration-300 ${
                  isHovered === index && !item.active ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom: Secondary Links */}
        <div className="flex flex-col px-2 py-4">
          <div className="w-[90%] h-1 bg-gradient-to-r from-[#10B981] to-[#16d495] mx-2 mb-4 rounded-full shadow-lg"></div>
          
          <div className="space-y-2">
            {bottomItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-4 px-4 py-3 mx-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  item.active 
                    ? 'bg-[#10B981] text-white shadow-lg shadow-[#10B981]/30' 
                    : 'text-[#10B981] hover:bg-[#e6fff5] hover:text-[#16d495] hover:shadow-md'
                }`}
                onMouseEnter={() => setIsHovered(index + 10)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Active indicator */}
                {item.active && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                )}
                
                {/* Icon with animation */}
                <span className={`text-xl transition-all duration-300 ${
                  isHovered === index + 10 ? 'scale-110 rotate-12' : ''
                } ${item.active ? 'animate-pulse' : ''}`}>
                  {item.icon}
                </span>
                
                {/* Label */}
                <span className={`font-semibold transition-all duration-300 ${
                  isHovered === index + 10 ? 'translate-x-1' : ''
                }`}>
                  {item.label}
                </span>

                {/* Hover arrow */}
                <div className={`ml-auto transition-all duration-300 ${
                  isHovered === index + 10 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Hover background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#10B981]/10 to-[#16d495]/10 rounded-xl transition-opacity duration-300 ${
                  isHovered === index + 10 && !item.active ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </Link>
            ))}
          </div>

          {/* Footer credit */}
          <div className="mt-6 px-4 py-3 text-center">
            <p className="text-xs text-[#10B981]/70 font-medium">
              Made with 💚 by Karan
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
