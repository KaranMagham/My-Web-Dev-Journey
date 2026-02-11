'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Sparkles,
    CheckSquare,
    BarChart3,
    Settings,
    Info,
    PlusCircle
} from "lucide-react";

const navItems = [
    {
        href: "/",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        href: "/main",
        label: "Smart Tasks",
        icon: Sparkles,
    },
    {
        href: "/task",
        label: "My Tasks",
        icon: CheckSquare,
    },
    {
        href: "/insights",
        label: "Insights",
        icon: BarChart3,
    },
    {
        href: "/settings",
        label: "Settings",
        icon: Settings,
    },
];

const Sidebar = () => {
    const pathname = usePathname();

    const isActive = (href) => {
        return href === "/" ? pathname === "/" : pathname.startsWith(href);
    };

    return (
        <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 flex-col justify-between 
                     bg-gradient-to-b from-white to-[#F0FDFA] 
                     border-r border-[#10b994]/40 shadow-xl z-50">

            {/* Logo */}
            <div>
                <div className="flex items-center gap-3 px-6 py-8">
                    <Image
                        src="/evolution.gif"
                        alt="Progressa Logo"
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-[#10b994]"
                    />
                    <div>
                        <Link href="/">
                            <h1 className="text-2xl font-extrabold text-[#10b994]">
                                Progressa
                            </h1>
                        </Link>
                        <p className="text-xs text-slate-500">
                            AI Productivity Assistant
                        </p>
                    </div>
                </div>

                <div className="mx-6 h-0.5 bg-gradient-to-r from-[#10b994] to-[#14B8A6]" />

                {/* Navigation */}
                <nav className="mt-6 space-y-2 px-3">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                className={`flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all
                        ${active
                                        ? "bg-[#10b994] text-white shadow-lg shadow-[#10b994]/30"
                                        : "text-[#0F172A] hover:bg-[#E6FFF5] hover:text-[#10b994]"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="px-4 pb-6 space-y-4">

                <Link
                    href="/hk"
                    className="flex items-center justify-center gap-3 rounded-2xl 
                     bg-gradient-to-r from-[#10b994] to-[#14B8A6] 
                     px-5 py-4 text-white font-bold 
                     shadow-xl shadow-[#10b994]/40
                     hover:scale-105 transition-all"
                >
                    <PlusCircle className="w-5 h-5 animate-pulse" />
                    Create Task with AI
                </Link>


                <Link
                    href="/contact"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl 
                     text-slate-600 hover:text-[#10b994] hover:bg-[#E6FFF5]"
                >
                    <Info className="w-5 h-5" />
                    Contact Karan
                </Link>


                <p className="text-center text-xs text-slate-400 mt-4">
                    Made with 💚 & 🤖 by Karan
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;
