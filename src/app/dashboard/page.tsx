"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Wallet, MessageSquare, PiggyBank } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import NavMenu from "@/components/common/NavMenu";

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

  useEffect(() => {
    const u = getAuthenticatedUser();
    if (!u) {
      router.push("/");
    } else {
      setUser(u);
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.06) 0%, var(--bg-deep) 50%)" }}>
      <Navbar isDashboard rightContent={<NavMenu />} />

      <main className="max-w-2xl mx-auto p-4 pt-24 pb-20">
        {/* Welcome Hero */}
        <div className="mb-8 animate-fade-in">
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-[0.2em] mb-2 font-medium">
            Welcome back
          </p>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white">
            {user.charAt(0).toUpperCase() + user.slice(1)} <span className="text-[var(--text-muted)] font-light">Sensei</span>
          </h2>
        </div>

        {/* Branch Section */}
        <div className="space-y-4 animate-slide-up delay-1 mb-10">
          <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 ml-1">
            Student Management
          </p>

          {/* MPSC - Main Branch (Higher Revenue) */}
          <Link
            href="/students/MPSC"
            className="group relative overflow-hidden rounded-2xl h-32 flex items-center justify-between p-6 transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(59,130,246,0.3)"
            }}
          >
            <div className="relative z-10">
              <span className="text-blue-400 text-[10px] tracking-[0.2em] uppercase font-bold block mb-1">Main Branch</span>
              <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold text-white tracking-wider">MP SPORTS CLUB</h3>
            </div>
            <div className="relative z-10 w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-400">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          {/* Herohalli - Secondary Branch */}
          <Link
            href="/students/Herohalli"
            className="group relative overflow-hidden rounded-2xl h-24 flex items-center justify-between p-6 transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(220,38,38,0.25)"
            }}
          >
            <div className="relative z-10">
              <span className="text-red-400 text-[10px] tracking-[0.2em] uppercase font-bold block mb-1">Secondary Branch</span>
              <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-white tracking-wider">HEROHALLI</h3>
            </div>
            <div className="relative z-10 w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center border border-red-500/30 group-hover:bg-red-600 group-hover:text-white transition-all text-red-400">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Quick Links Grid */}
        <div className="animate-slide-up delay-2">
          <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 ml-1 mb-4">
            Analytics & Tools
          </p>
          <div className="grid grid-cols-2 gap-3">
            {/* Financial Analytics */}
            <Link
              href="/finances"
              className="glass-card p-5 flex flex-col justify-between h-32 hover:border-green-500/50 hover:bg-green-500/5 transition-all group"
            >
              <div className="bg-green-500/20 w-10 h-10 rounded-lg flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-space)] text-sm font-bold text-white leading-tight mb-1">
                  Financial Analytics
                </h3>
                <p className="text-[10px] text-[var(--text-muted)]">Reconciliation & Overview</p>
              </div>
            </Link>

            {/* Development Fund */}
            <Link
              href="/development"
              className="glass-card p-5 flex flex-col justify-between h-32 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group"
            >
              <div className="bg-amber-500/20 w-10 h-10 rounded-lg flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <PiggyBank className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-space)] text-sm font-bold text-white leading-tight mb-1">
                  Development Fund
                </h3>
                <p className="text-[10px] text-[var(--text-muted)]">30% Fund Allocation</p>
              </div>
            </Link>

            {/* Message Center */}
            <Link
              href="/messages"
              className="glass-card p-5 flex flex-col justify-between h-32 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group col-span-2 sm:col-span-1"
            >
              <div className="bg-cyan-500/20 w-10 h-10 rounded-lg flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-space)] text-sm font-bold text-white leading-tight mb-1">
                  Message Center
                </h3>
                <p className="text-[10px] text-[var(--text-muted)]">Fee Reminders & Alerts</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[var(--text-muted)] text-[10px] mt-12 opacity-50 tracking-widest uppercase">
          Sports Karate-do Fitness & Self Defence Association ®
        </p>
      </main>
    </div>
  );
}
