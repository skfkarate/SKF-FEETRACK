"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import {
  getReferralCredits,
  addReferralCredit,
  getStudents,
  ReferralCreditsData,

  Student,
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

export default function ReferralCreditsPage() {
  const router = useRouter();
  const [branch, setBranch] = useState("Herohalli");
  const [data, setData] = useState<ReferralCreditsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Credit Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [newCredit, setNewCredit] = useState({
    studentId: "",
    amount: 500,
    reason: "",
    usedInMonth: "",
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
      const result = await getReferralCredits(branch);
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

  const openAddModal = async () => {
    setShowAddModal(true);
    setLoadingStudents(true);
    try {
      const studentList = await getStudents(branch, new Date().getMonth());
      setStudents(studentList.filter((s) => s.status === "Active"));
    } catch {
      alert("Failed to load students");
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleAddCredit = async () => {
    if (!newCredit.studentId) {
      alert("Please select a student");
      return;
    }
    if (newCredit.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setAdding(true);
    try {
      const usedMonth =
        newCredit.usedInMonth !== ""
          ? parseInt(newCredit.usedInMonth)
          : undefined;
      const usedDate =
        usedMonth !== undefined ? new Date().toISOString() : undefined;

      await addReferralCredit(
        branch,
        newCredit.studentId,
        newCredit.amount,
        newCredit.reason,
        usedMonth,
        usedDate,
      );
      setShowAddModal(false);
      setNewCredit({ studentId: "", amount: 500, reason: "", usedInMonth: "" });
      loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add credit");
    } finally {
      setAdding(false);
    }
  };

  const branchName =
    branch === "MPSC" ? "MP SPORTS CLUB" : branch.toUpperCase();

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
              REFERRAL CREDITS
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
            className={`flex-1 py-3 font-[family-name:var(--font-oswald)] text-sm tracking-wider uppercase transition-all border ${branch === "Herohalli"
              ? "bg-red-600 border-red-600 text-white"
              : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-red-600"
              }`}
          >
            Herohalli
          </button>
          <button
            onClick={() => setBranch("MPSC")}
            className={`flex-1 py-3 font-[family-name:var(--font-oswald)] text-sm tracking-wider uppercase transition-all border ${branch === "MPSC"
              ? "bg-red-600 border-red-600 text-white"
              : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-red-600"
              }`}
          >
            MP Sports Club
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading referral credits...</p>
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
            {/* Credits List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-500 text-sm uppercase tracking-wider">
                  All Credits
                </p>
                <button
                  onClick={openAddModal}
                  className="px-4 py-2 text-sm border border-green-600 text-green-500 hover:bg-green-600 hover:text-white transition-all"
                >
                  + Add Credit
                </button>
              </div>
              <div className="space-y-2">
                {data.credits.length === 0 ? (
                  <div className="bg-[#1a1a1a] border border-[#333] p-6 text-center text-gray-500">
                    No referral credits yet. Add one when a parent refers a new
                    student.
                  </div>
                ) : (
                  data.credits
                    .sort((a, b) =>
                      a.isUsed === b.isUsed
                        ? b.id.localeCompare(a.id)
                        : a.isUsed
                          ? 1
                          : -1,
                    )
                    .map((credit) => (
                      <div
                        key={credit.id}
                        className={`bg-[#1a1a1a] border p-4 ${credit.isUsed
                          ? "border-[#333] opacity-60"
                          : "border-green-600/50"
                          }`}
                      >
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                          {/* Row 1: From -> To */}
                          <div>
                            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">
                              Referred From
                            </p>
                            <p className="font-[family-name:var(--font-oswald)] tracking-wide text-white">
                              {credit.studentName}
                            </p>
                            <p className="text-gray-600 text-xs font-mono">
                              {credit.studentId}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">
                              Referred To
                            </p>
                            <p className="font-[family-name:var(--font-oswald)] tracking-wide text-white">
                              {credit.reason || "-"}
                            </p>
                          </div>

                          {/* Row 2: Used In -> Amount */}
                          <div>
                            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">
                              Used In
                            </p>
                            <p className="text-sm text-gray-300">
                              {credit.isUsed && credit.usedInMonth !== null ? (
                                <span className="text-orange-400 font-bold">
                                  {MONTHS[credit.usedInMonth]}
                                </span>
                              ) : (
                                <span className="text-gray-600 italic">
                                  Not Used Yet
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">
                              Credit Amount
                            </p>
                            <p
                              className={`font-[family-name:var(--font-oswald)] text-xl ${credit.isUsed
                                ? "text-gray-500"
                                : "text-green-400"
                                }`}
                            >
                              ₹{credit.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Add Credit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6">
            <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-6 text-center">
              ADD REFERRAL CREDIT
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Referred From *
                </label>
                {loadingStudents ? (
                  <p className="text-gray-500 text-sm">Loading students...</p>
                ) : (
                  <select
                    value={newCredit.studentId}
                    onChange={(e) =>
                      setNewCredit({ ...newCredit, studentId: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                  >
                    <option value="">Select student...</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.id})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Credit Amount (₹) *
                </label>
                <input
                  type="number"
                  value={newCredit.amount}
                  onChange={(e) =>
                    setNewCredit({
                      ...newCredit,
                      amount: parseInt(e.target.value) || 500,
                    })
                  }
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Referred To (New Student Name) *
                </label>
                {loadingStudents ? (
                  <p className="text-gray-500 text-sm">Loading students...</p>
                ) : (
                  <select
                    value={
                      students.find((s) => newCredit.reason.includes(s.id))
                        ?.id || ""
                    }
                    onChange={(e) => {
                      const selectedStudent = students.find(
                        (s) => s.id === e.target.value,
                      );
                      if (selectedStudent) {
                        setNewCredit({
                          ...newCredit,
                          reason: `${selectedStudent.name} (${selectedStudent.id})`,
                        });
                      } else {
                        setNewCredit({ ...newCredit, reason: "" });
                      }
                    }}
                    className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                  >
                    <option value="">Select new student...</option>
                    {students
                      .filter((s) => s.id !== newCredit.studentId) // Exclude the referrer
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.id})
                        </option>
                      ))}
                  </select>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Used In Month (Optional - For Past Data)
                </label>
                <select
                  value={newCredit.usedInMonth}
                  onChange={(e) =>
                    setNewCredit({ ...newCredit, usedInMonth: e.target.value })
                  }
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                >
                  <option value="">Not Used Yet</option>
                  {MONTHS.map((m, idx) => (
                    <option key={m} value={idx}>
                      {m} 2026
                    </option>
                  ))}
                </select>
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
                onClick={handleAddCredit}
                disabled={adding || !newCredit.studentId}
                className="flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700 disabled:opacity-50"
              >
                {adding ? (
                  "..."
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> ADD CREDIT
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
