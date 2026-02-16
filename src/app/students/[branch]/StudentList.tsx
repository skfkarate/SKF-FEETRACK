"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Gift } from "lucide-react";

import {
  getStudents,
  markPaid,
  markBreak,
  markDiscontinued,
  addStudent,
  getStudentAvailableCredits,
  markPaidWithCredit,
  Student,
  StudentCredits,
} from "@/lib/api";

import MonthlyFeeReceipt from "@/components/receipts/MonthlyFeeReceipt";

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

export default function StudentList({ branch }: { branch: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // branch is passed as prop, so no state needed for it, but we used it in logic.
  // Actually, let's keep it simple. It's passed as prop.

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [markingPaid, setMarkingPaid] = useState<string | null>(null);
  const [confirmStudent, setConfirmStudent] = useState<Student | null>(null);

  // Referral credit state for payment modal
  const [studentCredits, setStudentCredits] = useState<StudentCredits | null>(
    null,
  );
  const [loadingCredits, setLoadingCredits] = useState(false);
  const [selectedCreditId, setSelectedCreditId] = useState<string | null>(null);

  // Add Student Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    skfId: "",
    name: "",
    fee: 500,
    phone: "",
    joinMonth: 0,
  });
  const [adding, setAdding] = useState(false);

  // Receipt Modal
  const [receiptStudent, setReceiptStudent] = useState<Student | null>(null);

  // Long-press menu state
  const [longPressStudent, setLongPressStudent] = useState<Student | null>(
    null,
  );
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  // Break/Discontinued confirmation state
  const [confirmBreakStudent, setConfirmBreakStudent] =
    useState<Student | null>(null);
  const [confirmDiscontinuedStudent, setConfirmDiscontinuedStudent] =
    useState<Student | null>(null);
  const [markingStatus, setMarkingStatus] = useState<string | null>(null);

  const month = parseInt(
    searchParams.get("month") || new Date().getMonth().toString(),
  );

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

  const loadStudents = useCallback(async () => {
    if (!branch) return;
    setLoading(true);
    setError("");
    try {
      const data = await getStudents(branch, month);
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load students");
    } finally {
      setLoading(false);
    }
  }, [branch, month]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Stats calculation - exclude Break and Discontinued from pending
  const stats = useMemo(() => {
    const active = students.filter((s) => s.status === "Active");
    const paid = active.filter((s) => s.monthStatus === "Paid");
    const pending = active.filter((s) => s.monthStatus === "Pending");
    const onBreak = active.filter((s) => s.monthStatus === "Break");
    const discontinued = active.filter((s) => s.monthStatus === "Discontinued");
    return {
      totalStudents: active.length,
      paidCount: paid.length,
      pendingCount: pending.length,
      onBreakCount: onBreak.length,
      discontinuedCount: discontinued.length,
      expectedAmount:
        pending.reduce((sum, s) => sum + (s.fee || 0), 0) +
        paid.reduce((sum, s) => sum + (s.fee || 0), 0),
      collectedAmount: paid.reduce((sum, s) => sum + (s.fee || 0), 0),
      pendingAmount: pending.reduce((sum, s) => sum + (s.fee || 0), 0),
      collectionRate:
        pending.length + paid.length > 0
          ? Math.round((paid.length / (pending.length + paid.length)) * 100)
          : 0,
    };
  }, [students]);

  const handleMarkPaidClick = async (student: Student) => {
    setConfirmStudent(student);
    setStudentCredits(null);
    setSelectedCreditId(null);
    setLoadingCredits(true);
    try {
      const credits = await getStudentAvailableCredits(student.id, branch);
      setStudentCredits(credits);
      // Auto-select first credit if available
      if (credits.credits.length > 0) {
        setSelectedCreditId(credits.credits[0].id);
      }
    } catch {
      // No credits or error - continue without
    } finally {
      setLoadingCredits(false);
    }
  };

  const handleConfirmPaid = async () => {
    if (!confirmStudent) return;
    setMarkingPaid(confirmStudent.id);
    setConfirmStudent(null);
    try {
      if (selectedCreditId) {
        await markPaidWithCredit(
          confirmStudent.id,
          branch,
          month,
          selectedCreditId,
        );
      } else {
        await markPaid(confirmStudent.id, branch, month);
      }
      setStudents((prev) =>
        prev.map((s) =>
          s.id === confirmStudent.id
            ? { ...s, paid: true, monthStatus: "Paid" as const }
            : s,
        ),
      );

      // Auto-show receipt
      setReceiptStudent(confirmStudent);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to mark as paid");
    } finally {
      setMarkingPaid(null);
      setSelectedCreditId(null);
      setStudentCredits(null);
    }
  };

  // Long-press handlers
  const handleLongPressStart = (student: Student) => {
    longPressTimerRef.current = setTimeout(() => {
      setLongPressStudent(student);
      setShowStatusMenu(true);
    }, 3000); // 3 seconds
  };

  const handleLongPressEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleBreakClick = () => {
    setShowStatusMenu(false);
    setConfirmBreakStudent(longPressStudent);
  };

  const handleDiscontinuedClick = () => {
    setShowStatusMenu(false);
    setConfirmDiscontinuedStudent(longPressStudent);
  };

  const handleConfirmBreak = async () => {
    if (!confirmBreakStudent) return;
    setMarkingStatus(confirmBreakStudent.id);
    setConfirmBreakStudent(null);
    try {
      await markBreak(confirmBreakStudent.id, branch, month);
      setStudents((prev) =>
        prev.map((s) =>
          s.id === confirmBreakStudent.id
            ? { ...s, paid: false, monthStatus: "Break" as const }
            : s,
        ),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to mark as break");
    } finally {
      setMarkingStatus(null);
    }
  };

  const handleConfirmDiscontinued = async () => {
    if (!confirmDiscontinuedStudent) return;
    setMarkingStatus(confirmDiscontinuedStudent.id);
    setConfirmDiscontinuedStudent(null);
    try {
      await markDiscontinued(confirmDiscontinuedStudent.id, branch, month);
      setStudents((prev) =>
        prev.map((s) =>
          s.id === confirmDiscontinuedStudent.id
            ? { ...s, paid: false, monthStatus: "Discontinued" as const }
            : s,
        ),
      );
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to mark as discontinued",
      );
    } finally {
      setMarkingStatus(null);
    }
  };

  // Add new student
  const handleAddStudent = async () => {
    if (!newStudent.skfId.trim()) {
      alert("Please enter SKF ID");
      return;
    }
    if (!newStudent.name.trim()) {
      alert("Please enter student name");
      return;
    }
    setAdding(true);
    try {
      await addStudent(
        branch,
        newStudent.skfId,
        newStudent.name,
        newStudent.fee,
        newStudent.phone,
        newStudent.joinMonth,
      );
      setShowAddModal(false);
      setNewStudent({
        skfId: "",
        name: "",
        fee: 500,
        phone: "",
        joinMonth: month,
      });
      loadStudents(); // Reload list
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add student");
    } finally {
      setAdding(false);
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchesPending = !showPendingOnly || s.monthStatus === "Pending";
    const isActive = s.status === "Active";
    return matchesSearch && matchesPending && isActive;
  });

  // Sort students: First by SKF ID, then by status (Pending -> Paid -> Break -> Discontinued)
  const sortedStudents = useMemo(() => {
    const statusOrder: Record<string, number> = {
      Pending: 0,
      Paid: 1,
      Break: 2,
      Discontinued: 3,
      "N/A": 4,
    };
    return [...filteredStudents].sort((a, b) => {
      // First sort by SKF ID
      const idCompare = a.id.localeCompare(b.id, undefined, {
        numeric: true,
        sensitivity: "base",
      });
      if (idCompare !== 0) return idCompare;
      // Then by status
      const aOrder = statusOrder[a.monthStatus] ?? 4;
      const bOrder = statusOrder[b.monthStatus] ?? 4;
      return aOrder - bOrder;
    });
  }, [filteredStudents]);

  const branchName =
    branch === "MPSC" ? "MP SPORTS CLUB" : branch?.toUpperCase();

  // Generate and download PDF receipt logic moved to MonthlyFeeReceipt.tsx

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
              {branchName}
            </h1>
            <p className="text-gray-500 text-sm">{MONTHS[month]} 2026</p>
          </div>
          <div className="text-right">
            <p className="text-green-500 font-bold">{stats.paidCount}</p>
            <p className="text-gray-600 text-xs">/ {stats.totalStudents}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {/* Stats Dashboard */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#1a1a1a] border border-[#333] p-4">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                Expected
              </p>
              <p className="font-[family-name:var(--font-oswald)] text-2xl text-white">
                ₹{stats.expectedAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-[#1a1a1a] border border-green-600/50 p-4">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                Collected
              </p>
              <p className="font-[family-name:var(--font-oswald)] text-2xl text-green-500">
                ₹{stats.collectedAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-[#1a1a1a] border border-orange-600/50 p-4">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                Pending
              </p>
              <p className="font-[family-name:var(--font-oswald)] text-2xl text-orange-500">
                ₹{stats.pendingAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#333] p-4">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                Rate
              </p>
              <p
                className={`font-[family-name:var(--font-oswald)] text-2xl ${stats.collectionRate >= 80
                    ? "text-green-500"
                    : stats.collectionRate >= 50
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
              >
                {stats.collectionRate}%
              </p>
            </div>
          </div>
        )}

        {/* Search & Actions */}
        <div className="mb-4 space-y-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or SKF ID..."
            className="w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none placeholder:text-gray-600"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowPendingOnly(!showPendingOnly)}
              className={`px-4 py-2 text-sm border transition-all ${showPendingOnly
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-transparent border-[#333] text-gray-400 hover:border-red-600"
                }`}
            >
              {showPendingOnly ? "✓ Pending" : "Pending Only"}
            </button>
            <button
              onClick={() => {
                setNewStudent({ ...newStudent, joinMonth: month });
                setShowAddModal(true);
              }}
              className="px-4 py-2 text-sm border border-green-600 text-green-500 hover:bg-green-600 hover:text-white transition-all"
            >
              + Add Student
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading students...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={loadStudents}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Student List */}
        {!loading && !error && (
          <div className="space-y-3">
            {sortedStudents.length === 0 ? (
              <p className="text-center text-gray-500 py-12">
                No students found
              </p>
            ) : (
              sortedStudents.map((student) => {
                const isBreak = student.monthStatus === "Break";
                const isDiscontinued = student.monthStatus === "Discontinued";
                const isInactive = isBreak || isDiscontinued;

                return (
                  <div
                    key={student.id}
                    className={`bg-[#1a1a1a] border border-[#333] p-4 transition-opacity ${isDiscontinued
                        ? "opacity-40"
                        : isBreak
                          ? "opacity-50"
                          : ""
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-[family-name:var(--font-oswald)] text-lg tracking-wide">
                            {student.name}
                          </h3>
                          {isBreak && (
                            <span className="text-xs bg-orange-600/30 text-orange-400 px-2 py-0.5 rounded">
                              BREAK
                            </span>
                          )}
                          {isDiscontinued && (
                            <span className="text-xs bg-gray-600/30 text-gray-400 px-2 py-0.5 rounded">
                              DISCONTINUED
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm font-mono">
                          SKF: {student.id}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-gray-400">₹{student.fee}</p>
                          {(student.creditApplied || 0) > 0 && (
                            <span className="flex items-center gap-1 text-[10px] bg-purple-900/50 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/30">
                              <Gift className="w-3 h-3" />
                              -₹{student.creditApplied}
                            </span>
                          )}
                        </div>
                      </div>
                      {student.monthStatus === "Paid" ? (
                        <button
                          onClick={() => {
                            setReceiptStudent(student);
                          }}
                          className="bg-green-600/20 text-green-500 px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider hover:bg-green-600/30 transition-colors cursor-pointer"
                        >
                          ✓ PAID
                        </button>
                      ) : isInactive ? (
                        <span
                          className={`px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider ${isBreak ? "text-orange-500" : "text-gray-500"
                            }`}
                        >
                          {isBreak ? "ON BREAK" : "LEFT"}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMarkPaidClick(student)}
                          onMouseDown={() => handleLongPressStart(student)}
                          onMouseUp={handleLongPressEnd}
                          onMouseLeave={handleLongPressEnd}
                          onTouchStart={() => handleLongPressStart(student)}
                          onTouchEnd={handleLongPressEnd}
                          disabled={
                            markingPaid === student.id ||
                            markingStatus === student.id
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider disabled:opacity-50 select-none"
                        >
                          {markingPaid === student.id ||
                            markingStatus === student.id
                            ? "..."
                            : "MARK PAID"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>

      {/* Confirm Payment Modal */}
      {confirmStudent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6">
            <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center">
              CONFIRM PAYMENT
            </h2>
            <div className="bg-[#0a0a0a] border border-[#333] p-4 mb-4">
              <p className="text-gray-400 text-sm mb-1">Student</p>
              <p className="font-[family-name:var(--font-oswald)] text-lg">
                {confirmStudent.name}
              </p>
              <p className="text-gray-600 text-sm font-mono">
                SKF: {confirmStudent.id}
              </p>
              <div className="mt-3 pt-3 border-t border-[#333]">
                <p className="text-gray-400 text-sm mb-1">Original Fee</p>
                <p className="text-xl font-bold text-white">
                  ₹{confirmStudent.fee}
                </p>
              </div>

              {/* Referral Credit Section */}
              {loadingCredits ? (
                <div className="mt-3 pt-3 border-t border-[#333]">
                  <p className="text-gray-500 text-sm">
                    Checking for credits...
                  </p>
                </div>
              ) : studentCredits && studentCredits.credits.length > 0 ? (
                <div className="mt-3 pt-3 border-t border-[#333]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-purple-400 text-sm">
                      <Gift className="w-3 h-3" /> Referral Credit Available
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!selectedCreditId}
                        onChange={(e) =>
                          setSelectedCreditId(
                            e.target.checked
                              ? studentCredits.credits[0].id
                              : null,
                          )
                        }
                        className="w-4 h-4 accent-purple-600"
                      />
                      <span className="text-sm text-gray-400">Apply</span>
                    </label>
                  </div>
                  <p className="text-purple-400 font-bold">
                    -₹{studentCredits.totalAvailable}
                  </p>
                  {studentCredits.credits[0].reason && (
                    <p className="text-gray-500 text-xs mt-1">
                      {studentCredits.credits[0].reason}
                    </p>
                  )}
                </div>
              ) : null}

              <div className="mt-3 pt-3 border-t border-[#333]">
                <p className="text-gray-400 text-sm mb-1">Amount to Collect</p>
                <p className="text-2xl font-bold text-green-500">
                  ₹
                  {selectedCreditId && studentCredits
                    ? Math.max(
                      0,
                      confirmStudent.fee - studentCredits.totalAvailable,
                    )
                    : confirmStudent.fee}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-[#333]">
                <p className="text-gray-400 text-sm mb-1">Month</p>
                <p className="text-white">{MONTHS[month]} 2026</p>
              </div>
            </div>
            <p className="text-gray-400 text-center text-sm mb-4">
              {selectedCreditId && studentCredits
                ? `Collect ₹${Math.max(0, confirmStudent.fee - studentCredits.totalAvailable)} (₹${studentCredits.totalAvailable} credit applied)`
                : `Collect ₹${confirmStudent.fee}?`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setConfirmStudent(null);
                  setSelectedCreditId(null);
                  setStudentCredits(null);
                }}
                className="flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmPaid}
                className="flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700"
              >
                ✓ CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6">
            <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-6 text-center">
              ADD NEW STUDENT
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  SKF ID *
                </label>
                <input
                  type="text"
                  value={newStudent.skfId}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      skfId: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="e.g., HERO-001 or MP-001"
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Student Name *
                </label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Monthly Fee (₹)
                </label>
                <input
                  type="number"
                  value={newStudent.fee}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      fee: parseInt(e.target.value) || 500,
                    })
                  }
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newStudent.phone}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, phone: e.target.value })
                  }
                  placeholder="Optional"
                  className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">
                  Joining Month *
                </label>
                <select
                  value={newStudent.joinMonth}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      joinMonth: parseInt(e.target.value),
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
                <p className="text-gray-600 text-xs mt-2">
                  Fees will only be calculated from this month onwards
                </p>
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
                onClick={handleAddStudent}
                disabled={adding || !newStudent.name.trim()}
                className="flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700 disabled:opacity-50"
              >
                {adding ? "..." : "+ ADD"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Long Press Status Menu */}
      {showStatusMenu && longPressStudent && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4"
          onClick={() => setShowStatusMenu(false)}
        >
          <div
            className="bg-[#1a1a1a] border border-[#333] w-full max-w-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-gray-400 text-xs uppercase tracking-wider p-4 border-b border-[#333]">
              {longPressStudent.name}
            </p>
            <button
              onClick={handleBreakClick}
              className="w-full text-left px-4 py-4 text-orange-400 hover:bg-[#252525] transition-colors flex items-center gap-3"
            >
              <span className="text-xl">⏸</span>
              <div>
                <p className="font-[family-name:var(--font-oswald)] tracking-wider">
                  MARK AS BREAK
                </p>
                <p className="text-gray-500 text-xs">
                  Student on leave this month
                </p>
              </div>
            </button>
            <button
              onClick={handleDiscontinuedClick}
              className="w-full text-left px-4 py-4 text-gray-400 hover:bg-[#252525] transition-colors flex items-center gap-3 border-t border-[#333]"
            >
              <span className="text-xl">⛔</span>
              <div>
                <p className="font-[family-name:var(--font-oswald)] tracking-wider">
                  DISCONTINUED
                </p>
                <p className="text-gray-500 text-xs">
                  Student left permanently
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Confirm Break Modal */}
      {confirmBreakStudent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6">
            <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center text-orange-400">
              MARK AS BREAK
            </h2>
            <div className="bg-[#0a0a0a] border border-[#333] p-4 mb-6">
              <p className="text-gray-400 text-sm mb-1">Student</p>
              <p className="font-[family-name:var(--font-oswald)] text-lg">
                {confirmBreakStudent.name}
              </p>
              <p className="text-gray-600 text-sm font-mono">
                SKF: {confirmBreakStudent.id}
              </p>
              <div className="mt-3 pt-3 border-t border-[#333]">
                <p className="text-gray-400 text-sm mb-1">Month</p>
                <p className="text-white">{MONTHS[month]} 2026</p>
              </div>
            </div>
            <p className="text-gray-400 text-center text-sm mb-6">
              This student will not be counted in pending fees for this month.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmBreakStudent(null)}
                className="flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmBreak}
                className="flex-1 py-3 bg-orange-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-orange-700"
              >
                ⏸ CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Discontinued Modal */}
      {confirmDiscontinuedStudent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6">
            <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center text-gray-400">
              MARK AS DISCONTINUED
            </h2>
            <div className="bg-[#0a0a0a] border border-[#333] p-4 mb-6">
              <p className="text-gray-400 text-sm mb-1">Student</p>
              <p className="font-[family-name:var(--font-oswald)] text-lg">
                {confirmDiscontinuedStudent.name}
              </p>
              <p className="text-gray-600 text-sm font-mono">
                SKF: {confirmDiscontinuedStudent.id}
              </p>
              <div className="mt-3 pt-3 border-t border-[#333]">
                <p className="text-gray-400 text-sm mb-1">From Month</p>
                <p className="text-white">{MONTHS[month]} 2026</p>
              </div>
            </div>
            <p className="text-gray-400 text-center text-sm mb-6">
              This student will be marked as discontinued and moved to the
              bottom of the list.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDiscontinuedStudent(null)}
                className="flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmDiscontinued}
                className="flex-1 py-3 bg-gray-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-gray-700"
              >
                ⛔ CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Preview Modal */}
      {receiptStudent && (
        <MonthlyFeeReceipt
          student={receiptStudent}
          month={month}
          branch={branch}
          onClose={() => {
            setReceiptStudent(null);
          }}
        />
      )}
    </div>
  );
}
