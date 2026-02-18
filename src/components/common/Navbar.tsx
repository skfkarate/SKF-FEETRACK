"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface NavbarProps {
    title?: string;
    showBack?: boolean;
    rightContent?: React.ReactNode;
    isDashboard?: boolean;
    className?: string;
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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDashboard ? "py-3" : "py-2"} ${className}`}
        >
            <div className="max-w-2xl mx-auto px-3">
                <div className="glass-surface rounded-2xl px-3 py-2.5 flex items-center justify-between shadow-2xl backdrop-blur-xl bg-[#0a0a0a]/80 border border-white/10">
                    {/* Left Section */}
                    <div className="flex items-center gap-2.5 min-w-0">
                        {showBack ? (
                            <Link
                                href="/dashboard"
                                className="p-1.5 rounded-full hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors flex-shrink-0"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                        ) : isDashboard ? (
                            <Image
                                src="https://skfkarate.github.io/SKF-FEETRACK/logo.png"
                                alt="SKF"
                                width={32}
                                height={32}
                                className="w-8 h-8 object-contain rounded-full flex-shrink-0"
                            />
                        ) : null}

                        {/* Title */}
                        {title && (
                            <h1 className={`font-[family-name:var(--font-space)] font-bold text-white tracking-wider truncate ${isDashboard ? "text-base" : "text-sm"}`}>
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

                    {/* Right Section */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {rightContent}
                    </div>
                </div>
            </div>
        </nav>
    );
}
