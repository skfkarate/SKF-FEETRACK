"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface NavbarProps {
    title?: string;
    showBack?: boolean;
    rightContent?: React.ReactNode;
    isDashboard?: boolean;
    className?: string; // Allow extra styles if needed
}

export default function Navbar({
    title,
    showBack = false,
    rightContent,
    isDashboard = false,
    className = "",
}: NavbarProps) {
    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDashboard ? "py-4" : "py-3"
                } ${className}`}
        >
            <div className="max-w-2xl mx-auto px-4">
                <div className="glass-surface rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl backdrop-blur-xl bg-[#0a0a0a]/80 border border-white/10">
                    {/* Left Section: Back Button or Brand */}
                    <div className="flex items-center gap-3">
                        {showBack ? (
                            <Link
                                href="/dashboard"
                                className="p-2 rounded-full hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                        ) : isDashboard ? (
                            <div className="flex items-center gap-3">
                                {/* Brand Logo or Icon could go here */}
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/50">
                                    <span className="font-bold text-white text-xs tracking-tighter">SKF</span>
                                </div>
                            </div>
                        ) : null}

                        {/* Title */}
                        {title && (
                            <h1 className={`font-[family-name:var(--font-space)] font-bold text-white tracking-wider ${isDashboard ? "text-lg" : "text-base"}`}>
                                {isDashboard ? (
                                    <span>
                                        SKF <span className="text-red-500">KARATE</span>
                                    </span>
                                ) : (
                                    title
                                )}
                            </h1>
                        )}
                    </div>

                    {/* Right Section: Actions/Menu */}
                    <div className="flex items-center gap-3">
                        {rightContent}
                    </div>
                </div>
            </div>
        </nav>
    );
}
