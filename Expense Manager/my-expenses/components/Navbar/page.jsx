'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const page = () => {
  const pathname = usePathname();
  return (
    <>
      <div className='h-screen w-[14vw] md:w-56 sm:w-40 bg-[#ddf7d5] border-r border-black flex flex-col justify-between fixed md:relative'>
        {/* Top: Title */}
        <div>
          <div className='flex text-xl font-bold px-6 py-6 items-center gap-3'>
            <Image src="/wealth.gif" alt="WealthFlow Logo" width={50} height={50} className='rounded-full'/>
            <Link href="/" className='text-[#10B981] hover:text-[#16d495] transition-all duration-300'>
              WealthFlow
            </Link>
          </div>
          <div className='w-full h-0.5 bg-black'></div>
        </div>
        {/* Middle: Main Links */}
        <div className='flex flex-col flex-grow justify-center'>
          <Link
            href="/main"
            className={`flex text-xl font-bold px-6 py-3 items-center gap-3 transition-all duration-300 ${
              pathname === "/main" ? "text-[#16d495]" : "text-[#10B981] hover:text-[#16d495]"
            }`}
          >
            Money Brief.
          </Link>
          <Link
            href="/transactions"
            className={`flex text-xl font-bold px-6 py-3 items-center gap-3 transition-all duration-300 ${
              pathname === "/transactions" ? "text-[#16d495]" : "text-[#10B981] hover:text-[#16d495]"
            }`}
          >
            Manage Transactions.
          </Link>
          <Link
            href="/overview"
            className={`flex text-xl font-bold px-6 py-3 items-center gap-3 transition-all duration-300 ${
              pathname === "/overview" ? "text-[#16d495]" : "text-[#10B981] hover:text-[#16d495]"
            }`}
          >
            Overview.
          </Link>
          <Link
            href="/"
            className={`flex text-xl font-bold px-6 py-3 items-center gap-3 transition-all duration-300 ${
              pathname === "/settings" ? "text-[#16d495]" : "text-[#10B981] hover:text-[#16d495]"
            }`}
          >
            Settings.
          </Link>
        </div>
        {/* Bottom: Login, About & Contact */}
<div className="mb-2 flex flex-col">
  <div className="w-full h-0.5 bg-black"></div>

  <Link
    href="/login"
    className={`flex text-xl font-bold px-6 py-3 items-center gap-3 transition-all duration-300 ${
      pathname === "/login" ? "text-[#16d495]" : "text-[#10B981] hover:text-[#16d495]"
    }`}
  >
    Login.
  </Link>

  <Link
    href="/about"
    className={`flex text-xl font-bold px-6 py-3 items-center gap-3 transition-all duration-300 ${
      pathname === "/about" ? "text-[#16d495]" : "text-[#10B981] hover:text-[#16d495]"
    }`}
  >
    About.
  </Link>

  <Link
    href="/contact"
    className={`flex text-xl font-bold px-6 py-3 items-center gap-3 transition-all duration-300 ${
      pathname === "/contact" ? "text-[#16d495]" : "text-[#10B981] hover:text-[#16d495]"
    }`}
  >
    Contact Me.
  </Link>
</div>

      </div>
    </>
  )
}

export default page
