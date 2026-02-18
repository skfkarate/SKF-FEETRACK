"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getFinancialSummary, FinancialSummary } from "@/lib/api";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Gift,
  X,
  PiggyBank,
  Wallet,
} from "lucide-react";

import MonthSelector from "@/components/common/MonthSelector";
import Navbar from "@/components/common/Navbar";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function FinancesPage() {
  const router = useRouter();
  const [branch, setBranch] = useState("Herohalli");
  const [month, setMonth] = useState(new Date().getMonth());
  const [data, setData] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreditDetails, setShowCreditDetails] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("skf_user");
    const loginTime = localStorage.getItem("skf_login_time");
    if (
      !storedUser ||
      !loginTime ||
      Date.now() - parseInt(loginTime) > 30 * 60 * 1000
    ) {
      router.push("/");
    }
  }, [router]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getFinancialSummary(branch, month);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [branch, month]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const branchName = branch === "MPSC" ? "MP SPORTS CLUB" : "HEROHALLI";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-deep)" }}>
      {/* Header */}
      <Navbar
        title="FINANCIAL ANALYTICS"
        showBack
        rightContent={
          <div className="scale-90 origin-right">
            <MonthSelector
              selectedMonth={month}
              onMonthChange={setMonth}
            />
          </div>
        }
      />

      <main className="max-w-2xl mx-auto p-4 pt-24">
        {/* Branch Toggle */}
        <div className="flex p-1 bg-black/20 rounded-xl w-full max-w-md mx-auto border border-white/5 mb-6">
          <button
            onClick={() => setBranch("Herohalli")}
            className={`flex-1 py-2 rounded-lg text-sm font-[family-name:var(--font-space)] tracking-wider transition-all duration-300 ${branch === "Herohalli"
              ? "bg-red-600/90 text-white shadow-lg shadow-red-900/20 border border-white/10"
              : "text-[var(--text-muted)] hover:text-white"
              }`}
          >
            HEROHALLI
          </button>
          <button
            onClick={() => setBranch("MPSC")}
            className={`flex-1 py-2 rounded-lg text-sm font-[family-name:var(--font-space)] tracking-wider transition-all duration-300 ${branch === "MPSC"
              ? "bg-blue-600/90 text-white shadow-lg shadow-blue-900/20 border border-white/10"
              : "text-[var(--text-muted)] hover:text-white"
              }`}
          >
            MP SPORTS CLUB
          </button>
        </div>



        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="spinner mx-auto mb-4" />
            <p className="text-[var(--text-muted)] text-sm">Loading analytics...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-400 mb-4 text-sm">{error}</p>
            <button
              onClick={loadData}
              className="btn-primary text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Data Display */}
        {!loading && !error && data && (
          <>
            {/* Collection Overview */}
            <div className="mb-6 animate-fade-in">
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-3 ml-1">
                Collection Metrics
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="glass-card p-4 relative overflow-hidden" style={{ borderColor: "rgba(59, 130, 246, 0.25)" }}>
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <BarChart3 className="w-12 h-12 text-blue-400" />
                  </div>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" /> Expected
                  </p>
                  <p className="font-[family-name:var(--font-space)] text-lg sm:text-xl text-blue-400">
                    ₹{data.expected.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1 opacity-70">
                    {data.activeStudents} active students
                  </p>
                </div>

                <div className="glass-card p-4 relative overflow-hidden" style={{ borderColor: "rgba(34, 197, 94, 0.25)" }}>
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                  </div>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Collected
                  </p>
                  <p className="font-[family-name:var(--font-space)] text-lg sm:text-xl text-green-400">
                    ₹{data.collected.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1 opacity-70">
                    {data.paidStudents} students paid
                  </p>
                </div>

                <div className="glass-card p-4 relative overflow-hidden" style={{ borderColor: "rgba(245, 158, 11, 0.25)" }}>
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Clock className="w-12 h-12 text-amber-400" />
                  </div>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Pending
                  </p>
                  <p className="font-[family-name:var(--font-space)] text-lg sm:text-xl text-amber-400">
                    ₹{data.pending.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1 opacity-70">
                    {data.pendingStudents} students pending
                  </p>
                </div>

                <div
                  className="glass-card p-4 relative overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all duration-200 group"
                  style={{ borderColor: "rgba(168, 85, 247, 0.25)" }}
                  onClick={() => setShowCreditDetails(true)}
                >
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Gift className="w-12 h-12 text-purple-400" />
                  </div>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Gift className="w-3 h-3" /> Credits
                  </p>
                  <p className="font-[family-name:var(--font-space)] text-lg sm:text-xl text-purple-400">
                    -₹{data.creditsApplied.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1 opacity-70 group-hover:text-purple-300 transition-colors">
                    Tap to view details
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Reconciliation */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-3 ml-1">
                Net Position
              </p>
              <div className="glass-card p-6 relative overflow-hidden group"
                style={{
                  borderColor: "rgba(34, 197, 94, 0.4)",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(34,197,94,0.05) 100%)"
                }}>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Wallet className="w-32 h-32 text-green-400" />
                </div>

                <div className="relative z-10 text-center">
                  <p className="text-[var(--text-secondary)] text-xs uppercase tracking-widest mb-2 font-medium">
                    Actual Bank Deposit
                  </p>
                  <p className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl text-green-400 mb-2 drop-shadow-lg">
                    ₹{data.actualReceived.toLocaleString()}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-[var(--text-muted)]">
                    <span>Collected (₹{data.collected.toLocaleString()})</span>
                    <span>-</span>
                    <span>Credits (₹{data.creditsApplied.toLocaleString()})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Development Fund */}
            <div className="mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-between mb-3 ml-1">
                <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider">
                  Development Fund (30%)
                </p>
                <Link href="/development" className="text-[10px] text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
                  View Full Report <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-2">
                <div className="glass-card p-4 flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm font-medium group-hover:text-blue-200 transition-colors">30% Allocation</p>
                    <p className="text-[var(--text-muted)] text-[10px] opacity-70">
                      From this month&apos;s collection
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-space)] text-xl text-white">
                    +₹{data.devFundAllocation.toLocaleString()}
                  </p>
                </div>

                <div className="glass-card p-4 flex justify-between items-center group hover:border-red-500/30 transition-colors">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm font-medium group-hover:text-red-200 transition-colors">
                      Expenses
                    </p>
                    <p className="text-[var(--text-muted)] text-[10px] opacity-70">
                      This month&apos;s spending
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-space)] text-xl text-red-400">
                    -₹{data.devFundSpent.toLocaleString()}
                  </p>
                </div>

                <div className="glass-card p-4 flex justify-between items-center"
                  style={{
                    borderColor: "rgba(59, 130, 246, 0.4)",
                    background: "rgba(59, 130, 246, 0.05)"
                  }}>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <PiggyBank className="w-4 h-4 text-blue-400" />
                      <p className="text-blue-400 text-sm font-bold tracking-wide">
                        Dev Fund Balance
                      </p>
                    </div>
                    <p className="text-[var(--text-muted)] text-[10px] opacity-80">
                      Cumulative available fund
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-space)] text-xl sm:text-2xl text-blue-400">
                    ₹{data.devFundBalance.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link
                href="/development"
                className="glass-card p-4 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="p-2 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                    <Wallet className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm font-medium flex items-center gap-1 group-hover:text-white transition-colors">
                    Manage Expenses
                  </p>
                </div>
              </Link>

              <Link
                href="/referrals"
                className="glass-card p-4 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="p-2 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    <Gift className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm font-medium flex items-center gap-1 group-hover:text-white transition-colors">
                    Manage Credits
                  </p>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>

      {/* Credit Details Modal */}
      {showCreditDetails && data && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <div className="p-6 relative">
              <button
                onClick={() => setShowCreditDetails(false)}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="font-[family-name:var(--font-space)] text-xl font-bold mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-400" />
                CREDITS APPLIED
              </h2>

              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                {data.creditDetails && data.creditDetails.length > 0 ? (
                  data.creditDetails.map((credit, idx) => (
                    <div
                      key={idx}
                      className="glass-surface flex justify-between items-center p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-bold text-white text-sm">
                          {credit.studentName}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          Date: {credit.date}
                        </p>
                      </div>
                      <span className="font-[family-name:var(--font-space)] text-purple-400">
                        -₹{credit.amount}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[var(--text-muted)] text-center py-8 text-sm">
                    No credits applied in this period.
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)] flex justify-between items-center">
                <p className="text-[var(--text-secondary)] text-sm">Total Applied</p>
                <p className="font-[family-name:var(--font-space)] text-xl text-purple-400">
                  ₹{data.creditsApplied.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

