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
  Wallet,
  TrendingDown,
  TrendingUp,
  Landmark,
  X,
} from "lucide-react";

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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#333] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex-1">
            <h1 className="font-[family-name:var(--font-oswald)] text-lg font-bold tracking-wider">
              FINANCIAL SUMMARY
            </h1>
            <p className="text-gray-500 text-sm">
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
            className={`flex-1 py-3 font-[family-name:var(--font-oswald)] text-sm tracking-wider uppercase transition-all border ${
              branch === "Herohalli"
                ? "bg-red-600 border-red-600 text-white"
                : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-red-600"
            }`}
          >
            Herohalli
          </button>
          <button
            onClick={() => setBranch("MPSC")}
            className={`flex-1 py-3 font-[family-name:var(--font-oswald)] text-sm tracking-wider uppercase transition-all border ${
              branch === "MPSC"
                ? "bg-red-600 border-red-600 text-white"
                : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-red-600"
            }`}
          >
            MP Sports Club
          </button>
        </div>

        {/* Month Filter */}
        <div className="mb-6">
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
            Select Month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none font-[family-name:var(--font-oswald)] tracking-wider"
          >
            <option value={-1}>ALL TIME (OVERALL)</option>
            {MONTHS.map((m, i) => (
              <option key={i} value={i}>
                {m} 2026
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading financial data...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={loadData}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Data Display */}
        {!loading && !error && data && (
          <>
            {/* Collection Overview */}
            <div className="mb-6">
              <p className="text-gray-500 text-xs uppercase tracking-wider text-center mb-3">
                Collections
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1a1a1a] border border-blue-600/50 p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" /> Expected
                  </p>
                  <p className="font-[family-name:var(--font-oswald)] text-2xl text-blue-400">
                    ₹{data.expected.toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {data.activeStudents} active students
                  </p>
                </div>
                <div className="bg-[#1a1a1a] border border-green-600/50 p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Collected
                  </p>
                  <p className="font-[family-name:var(--font-oswald)] text-2xl text-green-400">
                    ₹{data.collected.toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {data.paidStudents} students paid
                  </p>
                </div>
                <div className="bg-[#1a1a1a] border border-orange-600/50 p-4">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Pending
                  </p>
                  <p className="font-[family-name:var(--font-oswald)] text-2xl text-orange-400">
                    ₹{data.pending.toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {data.pendingStudents} students pending
                  </p>
                </div>
                <div
                  className="bg-[#1a1a1a] border border-purple-600/50 p-4 cursor-pointer hover:bg-[#2a2a2a] transition-colors relative group"
                  onClick={() => setShowCreditDetails(true)}
                >
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Gift className="w-3 h-3" /> Credits Applied
                  </p>
                  <p className="font-[family-name:var(--font-oswald)] text-2xl text-purple-400">
                    -₹{data.creditsApplied.toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-xs group-hover:text-purple-400 transition-colors">
                    Click to view details
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Reconciliation */}
            <div className="mb-6">
              <p className="text-gray-500 text-xs uppercase tracking-wider text-center mb-3">
                Bank Reconciliation
              </p>
              <div className="bg-gradient-to-b from-[#1a2a1a] to-[#1a1a1a] border-2 border-green-600 p-6">
                <p className="text-gray-400 text-sm mb-2 text-center">
                  Amount in Bank (This Month)
                </p>
                <p className="font-[family-name:var(--font-oswald)] text-4xl text-green-400 text-center">
                  ₹{data.actualReceived.toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm text-center mt-2">
                  Collected (₹{data.collected.toLocaleString()}) - Credits (₹
                  {data.creditsApplied.toLocaleString()})
                </p>
              </div>
            </div>

            {/* Development Fund */}
            <div className="mb-6">
              <p className="text-gray-500 text-xs uppercase tracking-wider text-center mb-3">
                Development Fund (30%)
              </p>
              <div className="space-y-3">
                <div className="bg-[#1a1a1a] border border-[#333] p-4 flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm">30% Allocation</p>
                    <p className="text-gray-600 text-xs">
                      From this month's collection
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-oswald)] text-xl text-white">
                    +₹{data.devFundAllocation.toLocaleString()}
                  </p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#333] p-4 flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm">
                      Expenses (This Month)
                    </p>
                    <p className="text-gray-600 text-xs">
                      Branch development costs
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-oswald)] text-xl text-red-400">
                    -₹{data.devFundSpent.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-b from-[#1a1a2a] to-[#1a1a1a] border-2 border-blue-600 p-4 flex justify-between items-center">
                  <div>
                    <p className="text-blue-400 text-sm font-bold">
                      Dev Fund Balance
                    </p>
                    <p className="text-gray-600 text-xs">
                      Cumulative (all months)
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-oswald)] text-2xl text-blue-400">
                    ₹{data.devFundBalance.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/development"
                className="bg-[#1a1a1a] border border-[#333] p-4 text-center hover:border-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <p className="text-green-400 text-sm flex items-center gap-1">
                  Manage Dev Fund <ArrowRight className="w-4 h-4" />
                </p>
              </Link>
              <Link
                href="/referrals"
                className="bg-[#1a1a1a] border border-[#333] p-4 text-center hover:border-purple-600 transition-colors flex items-center justify-center gap-2"
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-md rounded-lg p-6 relative">
            <button
              onClick={() => setShowCreditDetails(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="font-[family-name:var(--font-oswald)] text-xl font-bold mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-500" />
              CREDITS APPLIED
            </h2>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {data.creditDetails && data.creditDetails.length > 0 ? (
                data.creditDetails.map((credit, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-[#111] p-3 border border-[#333] rounded-md"
                  >
                    <div>
                      <p className="font-bold text-white">
                        {credit.studentName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Date: {credit.date}
                      </p>
                    </div>
                    <span className="font-[family-name:var(--font-oswald)] text-purple-400">
                      -₹{credit.amount}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No credits applied in this period.
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#333] flex justify-between items-center">
              <p className="text-gray-400 text-sm">Total Applied</p>
              <p className="font-[family-name:var(--font-oswald)] text-xl text-purple-400">
                ₹{data.creditsApplied.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
