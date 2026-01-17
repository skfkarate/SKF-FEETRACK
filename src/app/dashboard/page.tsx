"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Wallet } from "lucide-react";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const storedUser = localStorage.getItem("skf_user");
    const loginTime = localStorage.getItem("skf_login_time");

    // Check session (30 min expiry)
    if (
      !storedUser ||
      !loginTime ||
      Date.now() - parseInt(loginTime) > 30 * 60 * 1000
    ) {
      router.push("/");
      return;
    }
    setUser(storedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("skf_user");
    localStorage.removeItem("skf_login_time");
    router.push("/");
  };

  if (!user) return null;

  const branches = [
    { id: "Herohalli", name: "HEROHALLI" },
    { id: "MPSC", name: "MP SPORTS CLUB" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#333] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="SKF" className="w-8 h-8 object-contain" />
            <h1 className="font-[family-name:var(--font-oswald)] text-xl font-bold tracking-wider">
              SKF <span className="text-red-600">KARATE</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {/* Welcome */}
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">
            Welcome back
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-wider">
            {user.charAt(0).toUpperCase() + user.slice(1)} Sensei
          </h2>
        </div>

        {/* Month Selection */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-3 text-center">
            Select Month
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {MONTHS.map((month, idx) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(idx)}
                className={`py-3 font-[family-name:var(--font-oswald)] text-sm tracking-wider uppercase 
                           transition-all duration-200 border
                           ${
                             selectedMonth === idx
                               ? "bg-red-600 border-red-600 text-white"
                               : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-red-600 hover:text-white"
                           }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Branch Cards */}
        <div className="space-y-3">
          <p className="text-gray-500 text-sm uppercase tracking-wider text-center">
            Select Branch
          </p>
          {branches.map((branch) => (
            <Link
              key={branch.id}
              href={`/students/${branch.id}?month=${selectedMonth}`}
              className="block bg-[#1a1a1a] border border-[#333] p-6 
                         hover:border-red-600 hover:bg-[#202020] transition-all duration-200
                         group relative overflow-hidden"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 
                              transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200"
              />
              <h3 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider">
                {branch.name}
              </h3>
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-red-600 
                               transition-colors text-2xl"
              >
                <ArrowRight className="w-6 h-6" />
              </span>
            </Link>
          ))}
        </div>

        {/* Finance & Tracking Section */}
        <div className="mt-8">
          <p className="text-gray-500 text-sm uppercase tracking-wider text-center mb-3">
            Finance & Tracking
          </p>
          <Link
            href="/finances"
            className="block bg-gradient-to-r from-[#1a2a1a] to-[#1a1a1a] border-2 border-green-600 p-6 
                       hover:bg-[#202020] transition-all duration-200
                       group relative overflow-hidden mb-3"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 
                            transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200"
            />
            <h3 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider text-green-400 flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              FINANCIAL SUMMARY
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Bank Reconciliation & Overview
            </p>
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-green-400 
                             transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </span>
          </Link>
          <Link
            href="/development"
            className="block bg-[#1a1a1a] border border-[#333] p-6 
                       hover:border-green-600 hover:bg-[#202020] transition-all duration-200
                       group relative overflow-hidden"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-green-600 
                            transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200"
            />
            <h3 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider">
              DEVELOPMENT FUND
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              30% Fee Allocation & Branch Expenses
            </p>
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-green-600 
                             transition-colors text-2xl"
            >
              →
            </span>
          </Link>
        </div>

        {/* Referral Credits Section */}
        <div className="mt-4">
          <Link
            href="/referrals"
            className="block bg-[#1a1a1a] border border-[#333] p-6 
                       hover:border-purple-600 hover:bg-[#202020] transition-all duration-200
                       group relative overflow-hidden"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 
                            transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200"
            />
            <h3 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider">
              REFERRAL CREDITS
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Track ₹500 Referral Bonuses
            </p>
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-purple-600 
                             transition-colors text-2xl"
            >
              →
            </span>
          </Link>
        </div>

        {/* Current Date */}
        <p className="text-center text-gray-600 text-sm mt-8">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </main>
    </div>
  );
}
