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
} from "lucide-react";

import MonthSelector from "@/components/common/MonthSelector";

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
      <header className="header-glass px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-[var(--text-muted)] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-[family-name:var(--font-space)] text-lg font-bold tracking-wider">
              FINANCIAL SUMMARY
            </h1>
            <p className="text-[var(--text-muted)] text-xs tracking-wider">
              {branchName} • {MONTHS[month]} 2026
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {/* Branch Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setBranch("Herohalli")}
            className={`flex-1 py-3 rounded-lg font-[family-name:var(--font-space)] text-sm tracking-wider uppercase transition-all duration-200 border ${branch === "Herohalli"
              ? "bg-red-600 border-red-500 text-white"
              : "glass-card !rounded-lg text-[var(--text-secondary)] hover:border-red-600/50"
              }`}
          >
            Herohalli
          </button>
          <button
            onClick={() => setBranch("MPSC")}
            className={`flex-1 py-3 rounded-lg font-[family-name:var(--font-space)] text-sm tracking-wider uppercase transition-all duration-200 border ${branch === "MPSC"
              ? "bg-red-600 border-red-500 text-white"
              : "glass-card !rounded-lg text-[var(--text-secondary)] hover:border-red-600/50"
              }`}
          >
            MP Sports Club
          </button>
        </div>

        {/* Month Filter */}
        <div className="mb-6">
          <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
            Select Month
          </label>
          <MonthSelector
            selectedMonth={month}
            onMonthChange={setMonth}
            className="w-full"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="spinner mx-auto mb-4" />
            <p className="text-[var(--text-muted)] text-sm">Loading financial data...</p>
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
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider text-center mb-3">
                Collections
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card p-4" style={{ borderColor: "rgba(59, 130, 246, 0.25)" }}>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" /> Expected
                  </p>
                  <p className="font-[family-name:var(--font-space)] text-xl text-blue-400">
                    ₹{data.expected.toLocaleString()}
                  </p>
                  <p className="text-[var(--text-muted)] text-xs">
                    {data.activeStudents} active students
                  </p>
                </div>
                <div className="glass-card p-4" style={{ borderColor: "rgba(34, 197, 94, 0.25)" }}>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Collected
                  </p>
                  <p className="font-[family-name:var(--font-space)] text-xl text-green-400">
                    ₹{data.collected.toLocaleString()}
                  </p>
                  <p className="text-[var(--text-muted)] text-xs">
                    {data.paidStudents} students paid
                  </p>
                </div>
                <div className="glass-card p-4" style={{ borderColor: "rgba(245, 158, 11, 0.25)" }}>
                  <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Pending
                  </p>
                  <p className="font-[family-name:var(--font-space)] text-xl text-amber-400">
                    ₹{data.pending.toLocaleString()}
                  </p>
                  <p className="text-[var(--text-muted)] text-xs">
                    {data.pendingStudents} students pending
                  </p>
                </div>
                <div
                  className="glass-card p-4 cursor-pointer hover:border-purple-500/50 transition-all duration-200 group"
                  style={{ borderColor: "rgba(168, 85, 247, 0.25)" }}
                  onClick={() => setShowCreditDetails(true)}
                >
                  <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Gift className="w-3 h-3" /> Credits
                  </p>
                  <p className="font-[family-name:var(--font-space)] text-xl text-purple-400">
                    -₹{data.creditsApplied.toLocaleString()}
                  </p>
                  <p className="text-[var(--text-muted)] text-xs group-hover:text-purple-400 transition-colors">
                    Click to view details
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Reconciliation */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider text-center mb-3">
                Bank Reconciliation
              </p>
              <div className="glass-card p-6 text-center" style={{ borderColor: "rgba(34, 197, 94, 0.4)", borderWidth: "2px" }}>
                <p className="text-[var(--text-secondary)] text-sm mb-2">
                  Amount in Bank (This Month)
                </p>
                <p className="font-[family-name:var(--font-space)] text-4xl text-green-400">
                  ₹{data.actualReceived.toLocaleString()}
                </p>
                <p className="text-[var(--text-muted)] text-sm mt-2">
                  Collected (₹{data.collected.toLocaleString()}) - Credits (₹
                  {data.creditsApplied.toLocaleString()})
                </p>
              </div>
            </div>

            {/* Development Fund */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider text-center mb-3">
                Development Fund (30%)
              </p>
              <div className="space-y-2">
                <div className="glass-card p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm">30% Allocation</p>
                    <p className="text-[var(--text-muted)] text-xs">
                      From this month&apos;s collection
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-space)] text-xl text-white">
                    +₹{data.devFundAllocation.toLocaleString()}
                  </p>
                </div>
                <div className="glass-card p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Expenses (This Month)
                    </p>
                    <p className="text-[var(--text-muted)] text-xs">
                      Branch development costs
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-space)] text-xl text-red-400">
                    -₹{data.devFundSpent.toLocaleString()}
                  </p>
                </div>
                <div className="glass-card p-4 flex justify-between items-center" style={{ borderColor: "rgba(59, 130, 246, 0.4)", borderWidth: "2px" }}>
                  <div>
                    <p className="text-blue-400 text-sm font-bold">
                      Dev Fund Balance
                    </p>
                    <p className="text-[var(--text-muted)] text-xs">
                      Cumulative (all months)
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-space)] text-2xl text-blue-400">
                    ₹{data.devFundBalance.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link
                href="/development"
                className="glass-card p-4 text-center hover:border-green-500/50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <p className="text-green-400 text-sm flex items-center gap-1">
                  Manage Dev Fund <ArrowRight className="w-4 h-4" />
                </p>
              </Link>
              <Link
                href="/referrals"
                className="glass-card p-4 text-center hover:border-purple-500/50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <p className="text-purple-400 text-sm flex items-center gap-1">
                  Manage Credits <ArrowRight className="w-4 h-4" />
                </p>
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

