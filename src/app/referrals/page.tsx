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
            <h1 className="font-[family-name:var(--font-oswald)] text-lg font-bold tracking-wider">
              REFERRAL CREDITS
            </h1>
            <p className="text-[var(--text-muted)] text-xs tracking-wider">{branchName}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {/* Branch Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setBranch("Herohalli")}
            className={`flex-1 py-3 rounded-lg font-[family-name:var(--font-oswald)] text-sm tracking-wider uppercase transition-all duration-200 border ${branch === "Herohalli"
              ? "bg-red-600 border-red-500 text-white"
              : "glass-card !rounded-lg text-[var(--text-secondary)] hover:border-red-600/50"
              }`}
          >
            Herohalli
          </button>
          <button
            onClick={() => setBranch("MPSC")}
            className={`flex-1 py-3 rounded-lg font-[family-name:var(--font-oswald)] text-sm tracking-wider uppercase transition-all duration-200 border ${branch === "MPSC"
              ? "bg-red-600 border-red-500 text-white"
              : "glass-card !rounded-lg text-[var(--text-secondary)] hover:border-red-600/50"
              }`}
          >
            MP Sports Club
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="spinner mx-auto mb-4" />
            <p className="text-[var(--text-muted)] text-sm">Loading referral credits...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-400 mb-4 text-sm">{error}</p>
            <button onClick={loadData} className="btn-primary text-sm">
              Retry
            </button>
          </div>
        )}

        {/* Data Display */}
        {!loading && !error && data && (
          <>
            {/* Credits List */}
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider">
                  All Credits
                </p>
                <button
                  onClick={openAddModal}
                  className="px-4 py-2 text-sm rounded-lg border border-green-600/50 text-green-400 hover:bg-green-600 hover:text-white transition-all duration-200 font-medium tracking-wide"
                >
                  + Add Credit
                </button>
              </div>
              <div className="space-y-2">
                {data.credits.length === 0 ? (
                  <div className="glass-card p-6 text-center text-[var(--text-muted)] text-sm">
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
                        className={`glass-card p-4 transition-all duration-200 ${credit.isUsed
                          ? "opacity-50"
                          : ""
                          }`}
                        style={!credit.isUsed ? { borderColor: "rgba(34, 197, 94, 0.3)" } : undefined}
                      >
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                          {/* Row 1: From -> To */}
                          <div>
                            <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-0.5">
                              Referred From
                            </p>
                            <p className="font-[family-name:var(--font-oswald)] tracking-wide text-white text-sm">
                              {credit.studentName}
                            </p>
                            <p className="text-[var(--text-muted)] text-xs font-mono">
                              {credit.studentId}
                            </p>
                          </div>
                          <div>
                            <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-0.5">
                              Referred To
                            </p>
                            <p className="font-[family-name:var(--font-oswald)] tracking-wide text-white text-sm">
                              {credit.reason || "-"}
                            </p>
                          </div>

                          {/* Row 2: Used In -> Amount */}
                          <div>
                            <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-0.5">
                              Used In
                            </p>
                            <p className="text-sm">
                              {credit.isUsed && credit.usedInMonth !== null ? (
                                <span className="text-amber-400 font-bold">
                                  {MONTHS[credit.usedInMonth]}
                                </span>
                              ) : (
                                <span className="text-[var(--text-muted)] italic">
                                  Not Used Yet
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-0.5">
                              Credit Amount
                            </p>
                            <p
                              className={`font-[family-name:var(--font-oswald)] text-xl ${credit.isUsed
                                ? "text-[var(--text-muted)]"
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
        <div className="glass-modal-overlay">
          <div className="glass-modal !max-w-sm">
            <div className="p-6">
              <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-6 text-center">
                ADD REFERRAL CREDIT
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
                    Referred From *
                  </label>
                  {loadingStudents ? (
                    <p className="text-[var(--text-muted)] text-sm">Loading students...</p>
                  ) : (
                    <select
                      value={newCredit.studentId}
                      onChange={(e) =>
                        setNewCredit({ ...newCredit, studentId: e.target.value })
                      }
                      className="input-field"
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
                  <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
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
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
                    Referred To (New Student Name) *
                  </label>
                  {loadingStudents ? (
                    <p className="text-[var(--text-muted)] text-sm">Loading students...</p>
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
                      className="input-field"
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
                  <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
                    Used In Month (Optional - For Past Data)
                  </label>
                  <select
                    value={newCredit.usedInMonth}
                    onChange={(e) =>
                      setNewCredit({ ...newCredit, usedInMonth: e.target.value })
                    }
                    className="input-field"
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
                  className="btn-ghost flex-1 font-[family-name:var(--font-oswald)] tracking-wider text-sm"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleAddCredit}
                  disabled={adding || !newCredit.studentId}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-oswald)] tracking-wider text-sm hover:bg-green-500 transition-colors disabled:opacity-50"
                >
                  {adding ? (
                    "..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> ADD CREDIT
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
