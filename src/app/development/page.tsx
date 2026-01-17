"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, PiggyBank, Save, TrendingUp } from "lucide-react";
import {
  getDevelopmentFundData,
  addDevelopmentExpense,
  DevelopmentFundData,
  DevExpense,
} from "@/lib/api";

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

export default function DevelopmentFundPage() {
  const router = useRouter();
  const [branch, setBranch] = useState("Herohalli");
  const [data, setData] = useState<DevelopmentFundData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Expense Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    month: new Date().getMonth(),
    description: "",
    amount: 0,
  });
  const [adding, setAdding] = useState(false);

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
      const result = await getDevelopmentFundData(branch);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [branch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddExpense = async () => {
    if (!newExpense.description.trim()) {
      alert("Please enter a description");
      return;
    }
    if (newExpense.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setAdding(true);
    try {
      await addDevelopmentExpense(
        branch,
        newExpense.month,
        newExpense.description,
        newExpense.amount,
      );
      setShowAddModal(false);
      setNewExpense({
        month: new Date().getMonth(),
        description: "",
        amount: 0,
      });
      loadData(); // Reload to get updated data
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add expense");
    } finally {
      setAdding(false);
    }
  };

  const branchName =
    branch === "MPSC" ? "MP SPORTS CLUB" : branch.toUpperCase();

  const [filter, setFilter] = useState<number | "all">("all");

  const filteredExpenses = useMemo(() => {
    if (!data) return [];
    if (filter === "all") return data.expenses;
    return data.expenses.filter((e) => e.month === filter);
  }, [data, filter]);

  const filteredStats = useMemo(() => {
    if (!data) return { allocated: 0, spent: 0, balance: 0 };

    if (filter === "all") {
      return {
        allocated: data.totalContributions,
        spent: data.totalSpent,
        balance: data.availableBalance,
      };
    }

    const monthData = data.monthlyBreakdown.find((m) => m.month === filter);
    return {
      allocated: monthData ? monthData.devFund : 0,
      spent: monthData ? monthData.spent : 0,
      balance: monthData ? monthData.devFund - monthData.spent : 0,
    };
  }, [data, filter]);

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
              DEVELOPMENT FUND
            </h1>
            <p className="text-gray-500 text-sm">{branchName}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {/* Branch Toggle */}
        <div className="flex gap-2 mb-6">
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

        {/* Filter */}
        <div className="mb-6">
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
            Expense Filter
          </label>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value === "all" ? "all" : parseInt(e.target.value),
              )
            }
            className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none font-[family-name:var(--font-oswald)] tracking-wider"
          >
            <option value="all">ALL TIME (OVERALL)</option>
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
            <p className="text-gray-500">Loading development fund...</p>
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
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-[#1a1a1a] border border-blue-600/50 p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
                  <PiggyBank className="w-4 h-4" /> 30% Fund
                </p>
                <p className="font-[family-name:var(--font-oswald)] text-xl text-blue-400">
                  ₹{filteredStats.allocated.toLocaleString()}
                </p>
              </div>
              <div className="bg-[#1a1a1a] border border-orange-600/50 p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Package className="w-4 h-4" /> Spent
                </p>
                <p className="font-[family-name:var(--font-oswald)] text-xl text-orange-400">
                  ₹{filteredStats.spent.toLocaleString()}
                </p>
              </div>
              <div className="bg-[#1a1a1a] border border-green-600/50 p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Balance
                </p>
                <p className="font-[family-name:var(--font-oswald)] text-xl text-green-400">
                  ₹{filteredStats.balance.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Monthly Breakdown - ONLY show if filter is ALL */}
            {filter === "all" && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-500 text-sm uppercase tracking-wider">
                    Monthly Breakdown
                  </p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#333] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#333] text-gray-500 text-xs uppercase tracking-wider">
                          <th className="text-left p-3">Month</th>
                          <th className="text-right p-3">Collected</th>
                          <th className="text-right p-3">30% Fund</th>
                          <th className="text-right p-3">Spent</th>
                          <th className="text-right p-3">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.monthlyBreakdown
                          .filter((m) => m.collected > 0 || m.spent > 0)
                          .map((m) => (
                            <tr
                              key={m.month}
                              className="border-b border-[#333]/50 hover:bg-[#252525]"
                            >
                              <td className="p-3 font-[family-name:var(--font-oswald)] tracking-wider">
                                {MONTHS[m.month]}
                              </td>
                              <td className="p-3 text-right text-gray-400">
                                ₹{m.collected.toLocaleString()}
                              </td>
                              <td className="p-3 text-right text-blue-400">
                                ₹{m.devFund.toLocaleString()}
                              </td>
                              <td className="p-3 text-right text-orange-400">
                                {m.spent > 0
                                  ? `₹${m.spent.toLocaleString()}`
                                  : "-"}
                              </td>
                              <td className="p-3 text-right text-green-400 font-medium">
                                ₹{(m.devFund - m.spent).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        {data.monthlyBreakdown.every(
                          (m) => m.collected === 0 && m.spent === 0,
                        ) && (
                          <tr>
                            <td
                              colSpan={5}
                              className="p-6 text-center text-gray-500"
                            >
                              No fee payments or expenses recorded yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Expenses Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-500 text-sm uppercase tracking-wider">
                  Expenses{" "}
                  {filter !== "all" ? `(${MONTHS[filter]})` : "(All Time)"}
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 text-sm border border-green-600 text-green-500 hover:bg-green-600 hover:text-white transition-all"
                >
                  + Add Expense
                </button>
              </div>
              <div className="space-y-2">
                {filteredExpenses.length === 0 ? (
                  <div className="bg-[#1a1a1a] border border-[#333] p-6 text-center text-gray-500">
                    No expenses recorded for this period
                  </div>
                ) : (
                  filteredExpenses
                    .sort((a, b) => b.id.localeCompare(a.id))
                    .map((expense) => (
                      <div
                        key={expense.id}
                        className="bg-[#1a1a1a] border border-[#333] p-4 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-[family-name:var(--font-oswald)] tracking-wide">
                            {expense.description}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {MONTHS[expense.month]} {expense.year} •{" "}
                            {expense.dateAdded}
                          </p>
                        </div>
                        <p className="font-[family-name:var(--font-oswald)] text-lg text-orange-400">
                          -₹{expense.amount.toLocaleString()}
                        </p>
                      </div>
                    ))
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6">
            <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-6 text-center">
              ADD EXPENSE
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Month *
                </label>
                <select
                  value={newExpense.month}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      month: parseInt(e.target.value),
                    })
                  }
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                >
                  {MONTHS.map((m, i) => (
                    <option key={i} value={i}>
                      {m} 2026
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      description: e.target.value,
                    })
                  }
                  placeholder="e.g., Practice Mats, Karate Equipment..."
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  value={newExpense.amount || ""}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      amount: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter amount"
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]"
              >
                CANCEL
              </button>
              <button
                onClick={handleAddExpense}
                disabled={
                  adding ||
                  !newExpense.description.trim() ||
                  newExpense.amount <= 0
                }
                className="flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700 disabled:opacity-50"
              >
                {adding ? (
                  "..."
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" /> SAVE
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
