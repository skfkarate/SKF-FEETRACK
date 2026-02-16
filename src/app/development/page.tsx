"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  PiggyBank,
  Save,
  TrendingUp,
  X,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import {
  getDevelopmentFundData,
  addDevelopmentExpense,
  deleteDevelopmentExpense,
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

const SCOPE_OPTIONS = [
  { value: "Herohalli", label: "Herohalli" },
  { value: "MPSC", label: "MP Sports Club" },
  { value: "Both", label: "Both Branches" },
  { value: "Others", label: "Others" },
];

export default function DevelopmentFundPage() {
  const router = useRouter();
  const [data, setData] = useState<DevelopmentFundData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Expense Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    month: new Date().getMonth(),
    title: "",
    description: "",
    scope: "Both",
    scopeOther: "",
    amount: 0,
  });
  const [adding, setAdding] = useState(false);

  // Confirmation Modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Detail Modal
  const [selectedExpense, setSelectedExpense] = useState<DevExpense | null>(
    null
  );
  const [deleting, setDeleting] = useState(false);

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
      const result = await getDevelopmentFundData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddExpenseClick = () => {
    // Validate before showing confirmation
    if (!newExpense.title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!newExpense.description.trim()) {
      alert("Please enter a description");
      return;
    }
    if (newExpense.scope === "Others" && !newExpense.scopeOther.trim()) {
      alert("Please specify the scope");
      return;
    }
    if (newExpense.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    // Show confirmation
    setShowConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    setAdding(true);
    try {
      const finalScope =
        newExpense.scope === "Others"
          ? newExpense.scopeOther.trim()
          : newExpense.scope;

      await addDevelopmentExpense(
        newExpense.month,
        newExpense.title.trim(),
        newExpense.description.trim(),
        finalScope,
        newExpense.amount
      );
      setShowConfirmModal(false);
      setShowAddModal(false);
      setNewExpense({
        month: new Date().getMonth(),
        title: "",
        description: "",
        scope: "Both",
        scopeOther: "",
        amount: 0,
      });
      loadData(); // Reload to get updated data
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add expense");
    } finally {
      setAdding(false);
    }
  };

  const canDeleteExpense = (expense: DevExpense): boolean => {
    // Check if expense is within 24 hours of creation
    const addedDate = new Date(expense.dateAdded);
    const now = new Date();
    const hoursDiff =
      (now.getTime() - addedDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff <= 24;
  };

  const handleDeleteExpense = async () => {
    if (!selectedExpense) return;

    if (!canDeleteExpense(selectedExpense)) {
      alert(
        "This expense cannot be deleted. Expenses can only be deleted within 24 hours of creation."
      );
      return;
    }

    setDeleting(true);
    try {
      await deleteDevelopmentExpense(selectedExpense.id);
      setSelectedExpense(null);
      loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete expense");
    } finally {
      setDeleting(false);
    }
  };

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

  const getScopeLabel = (scope: string): string => {
    const option = SCOPE_OPTIONS.find((o) => o.value === scope);
    return option ? option.label : scope;
  };

  const getScopeBadgeColor = (scope: string): string => {
    switch (scope) {
      case "Herohalli":
        return "bg-blue-600/20 text-blue-400 border-blue-600/50";
      case "MPSC":
        return "bg-purple-600/20 text-purple-400 border-purple-600/50";
      case "Both":
        return "bg-green-600/20 text-green-400 border-green-600/50";
      default:
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600/50";
    }
  };

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
            <p className="text-gray-500 text-sm">All Branches • 30% Allocation</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {/* Filter */}
        <div className="mb-6">
          <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
            Expense Filter
          </label>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value === "all" ? "all" : parseInt(e.target.value)
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
                          (m) => m.collected === 0 && m.spent === 0
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
                        onClick={() => setSelectedExpense(expense)}
                        className="bg-[#1a1a1a] border border-[#333] p-4 cursor-pointer hover:border-red-600/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-[family-name:var(--font-oswald)] tracking-wide truncate">
                                {expense.title || expense.description}
                              </p>
                              <span
                                className={`text-xs px-2 py-0.5 border rounded ${getScopeBadgeColor(expense.scope || "Both")}`}
                              >
                                {getScopeLabel(expense.scope || "Both")}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {MONTHS[expense.month]} {expense.year} •{" "}
                              {expense.dateAdded}
                            </p>
                          </div>
                          <p className="font-[family-name:var(--font-oswald)] text-lg text-orange-400 ml-4">
                            -₹{expense.amount.toLocaleString()}
                          </p>
                        </div>
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
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider">
                ADD EXPENSE
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Scope *
                </label>
                <select
                  value={newExpense.scope}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      scope: e.target.value,
                    })
                  }
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                >
                  {SCOPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {newExpense.scope === "Others" && (
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                    Specify Scope *
                  </label>
                  <input
                    type="text"
                    value={newExpense.scopeOther}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        scopeOther: e.target.value,
                      })
                    }
                    placeholder="e.g., Tournament, Training Camp..."
                    className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                  />
                </div>
              )}

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
                  Title *
                </label>
                <input
                  type="text"
                  value={newExpense.title}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g., Karate Equipment, Practice Mats..."
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Description *
                </label>
                <textarea
                  value={newExpense.description}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      description: e.target.value,
                    })
                  }
                  placeholder="Provide detailed description of the expense..."
                  rows={3}
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none resize-none"
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
                onClick={handleAddExpenseClick}
                className="flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700"
              >
                REVIEW & SAVE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[110] p-4">
          <div className="bg-[#1a1a1a] border border-yellow-600/50 w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider">
                CONFIRM EXPENSE
              </h2>
            </div>

            <p className="text-gray-400 mb-4">
              Please review the expense details before saving:
            </p>

            <div className="bg-[#0a0a0a] border border-[#333] p-4 space-y-3 mb-6">
              <div>
                <p className="text-gray-500 text-xs uppercase">Scope</p>
                <p className="text-white">
                  {newExpense.scope === "Others"
                    ? newExpense.scopeOther
                    : getScopeLabel(newExpense.scope)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Month</p>
                <p className="text-white">{MONTHS[newExpense.month]} 2026</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Title</p>
                <p className="text-white">{newExpense.title}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Description</p>
                <p className="text-white text-sm">{newExpense.description}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Amount</p>
                <p className="text-orange-400 font-[family-name:var(--font-oswald)] text-xl">
                  ₹{newExpense.amount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={adding}
                className="flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444] disabled:opacity-50"
              >
                GO BACK
              </button>
              <button
                onClick={handleConfirmSave}
                disabled={adding}
                className="flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700 disabled:opacity-50"
              >
                {adding ? (
                  "SAVING..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> CONFIRM
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expense Detail Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider">
                EXPENSE DETAILS
              </h2>
              <button
                onClick={() => setSelectedExpense(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 border rounded ${getScopeBadgeColor(selectedExpense.scope || "Both")}`}
                >
                  {getScopeLabel(selectedExpense.scope || "Both")}
                </span>
                <span className="text-gray-500 text-sm">
                  {MONTHS[selectedExpense.month]} {selectedExpense.year}
                </span>
              </div>

              <div>
                <p className="text-gray-500 text-xs uppercase mb-1">Title</p>
                <p className="font-[family-name:var(--font-oswald)] text-lg tracking-wide">
                  {selectedExpense.title || selectedExpense.description}
                </p>
              </div>

              {selectedExpense.description &&
                selectedExpense.title !== selectedExpense.description && (
                  <div>
                    <p className="text-gray-500 text-xs uppercase mb-1">
                      Description
                    </p>
                    <p className="text-gray-300">{selectedExpense.description}</p>
                  </div>
                )}

              <div>
                <p className="text-gray-500 text-xs uppercase mb-1">Amount</p>
                <p className="font-[family-name:var(--font-oswald)] text-2xl text-orange-400">
                  ₹{selectedExpense.amount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs uppercase mb-1">
                  Date Added
                </p>
                <p className="text-gray-300">{selectedExpense.dateAdded}</p>
              </div>

              <div className="text-gray-600 text-xs">
                ID: {selectedExpense.id}
              </div>
            </div>

            {/* Delete Section */}
            <div className="border-t border-[#333] pt-4">
              {canDeleteExpense(selectedExpense) ? (
                <button
                  onClick={handleDeleteExpense}
                  disabled={deleting}
                  className="w-full py-3 bg-red-600/20 border border-red-600 text-red-500 font-[family-name:var(--font-oswald)] tracking-wider hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  {deleting ? "DELETING..." : "DELETE EXPENSE"}
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-2">
                    ⚠️ Delete not available
                  </p>
                  <p className="text-gray-600 text-xs">
                    Expenses can only be deleted within 24 hours of creation to
                    prevent corruption.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
