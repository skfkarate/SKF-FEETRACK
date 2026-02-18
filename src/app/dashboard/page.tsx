"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Wallet, MessageSquare } from "lucide-react";
import MonthSelector from "@/components/common/MonthSelector";

function getAuthenticatedUser(): string | null {
  if (typeof window === "undefined") return null;
  const storedUser = localStorage.getItem("skf_user");
  const loginTime = localStorage.getItem("skf_login_time");
  if (!storedUser || !loginTime || Date.now() - parseInt(loginTime) > 30 * 60 * 1000) {
    return null;
  }
  return storedUser;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  // Load selected month from session storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("skf_selected_month");
      if (saved !== null) {
        setSelectedMonth(parseInt(saved));
      }
      setIsStorageLoaded(true);
    }
  }, []);

  // Save selected month to session storage when it modifies, but only after initial load
  useEffect(() => {
    if (isStorageLoaded && typeof window !== "undefined") {
      sessionStorage.setItem("skf_selected_month", selectedMonth.toString());
    }
  }, [selectedMonth, isStorageLoaded]);

  useEffect(() => {
    const u = getAuthenticatedUser();
    if (!u) {
      router.push("/");
      return;
    }
    if (u !== user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(u);
    }
  }, [router, user]);

  const handleLogout = () => {
    localStorage.removeItem("skf_user");
    localStorage.removeItem("skf_login_time");
    router.push("/");
  };

  if (!user) return null;

  const branches = [
    { id: "Herohalli", name: "HEROHALLI", subtitle: "Main Branch" },
    { id: "MPSC", name: "MP SPORTS CLUB", subtitle: "Secondary Branch" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.06) 0%, var(--bg-deep) 50%)" }}>
      {/* Header */}
      <header className="header-glass px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://skfkarate.github.io/SKF-FEETRACK/logo.png"
              alt="SKF"
              width={36}
              height={36}
              className="w-9 h-9 object-contain rounded-full border border-white/10"
            />
            <h1 className="font-[family-name:var(--font-oswald)] text-xl font-bold tracking-[0.15em]">
              SKF <span className="text-red-500">KARATE</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-[var(--text-muted)] hover:text-white text-xs tracking-wider uppercase transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {/* Welcome */}
        <div className="text-center py-8 animate-fade-in">
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-[0.2em] mb-2">
            Welcome back
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-wider gradient-text">
            {user.charAt(0).toUpperCase() + user.slice(1)} Sensei
          </h2>
        </div>

        {/* Month Selection */}
        <div className="mb-8 animate-slide-up delay-1">
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-[0.15em] mb-3 text-center font-medium">
            Select Month
          </p>
          <MonthSelector
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            className="max-w-xs mx-auto"
          />
        </div>

        {/* Branch Cards */}
        <div className="space-y-3 animate-slide-up delay-2">
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-[0.15em] text-center font-medium">
            Select Branch
          </p>
          {branches.map((branch) => (
            <Link
              key={branch.id}
              href={`/students/${branch.id}?month=${selectedMonth}`}
              className="glass-card block p-5 group relative overflow-hidden
                         hover:border-red-600/40 transition-all duration-300"
            >
              {/* Left accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600
                              transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-r" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-oswald)] text-lg tracking-wider text-white">
                    {branch.name}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5">{branch.subtitle}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-red-500 transition-all duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Finance & Tracking */}
        <div className="mt-10 space-y-3 animate-slide-up delay-3">
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-[0.15em] text-center font-medium">
            Finance & Tracking
          </p>

          <Link
            href="/finances"
            className="glass-card block p-5 group relative overflow-hidden
                       hover:border-green-600/40 transition-all duration-300"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500
                            transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-r" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-oswald)] text-lg tracking-wider text-green-400 flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  FINANCIAL SUMMARY
                </h3>
                <p className="text-[var(--text-muted)] text-xs mt-0.5">Bank Reconciliation & Overview</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-green-400 transition-all duration-300 group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/messages"
            className="glass-card block p-5 group relative overflow-hidden
                       hover:border-cyan-600/40 transition-all duration-300"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500
                            transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-r" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-oswald)] text-lg tracking-wider text-cyan-400 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  MESSAGE CENTER
                </h3>
                <p className="text-[var(--text-muted)] text-xs mt-0.5">WhatsApp Fee Reminders</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-cyan-400 transition-all duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-[var(--text-muted)] text-[10px] mt-10 mb-4 tracking-wider uppercase">
          Sports Karate-do Fitness & Self Defence Association ®
        </p>
      </main>
    </div>
  );
}
