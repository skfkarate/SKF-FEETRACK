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
import MonthSelector from "@/components/common/MonthSelector";

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

  // Track previous month to detect actual month changes (for cache invalidation)
  const prevMonthRef = useRef(month);

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

  const loadStudents = useCallback(async (forceRefresh = false) => {
    if (!branch) return;
    setLoading(true);
    setError("");
    try {
      const data = await getStudents(branch, month, forceRefresh);
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load students");
    } finally {
      setLoading(false);
    }
  }, [branch, month]);

  // Force-refresh when month changes to prevent stale data from wrong month
  useEffect(() => {
    const monthChanged = prevMonthRef.current !== month;
    prevMonthRef.current = month;
    loadStudents(monthChanged);
  }, [loadStudents, month]);

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
              {branchName}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <MonthSelector
                selectedMonth={month}
                onMonthChange={(m: number) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("month", m.toString());
                  router.push(`/students/${branch}?${params.toString()}`);
                }}
                className="!p-1 !bg-transparent border-none shadow-none text-xs"
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-400 font-bold text-lg font-[family-name:var(--font-oswald)]">{stats.paidCount}</p>
            <p className="text-[var(--text-muted)] text-xs">/ {stats.totalStudents}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {/* Stats Dashboard */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-in">
            <div className="glass-card p-4">
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1">
                Expected
              </p>
              <p className="font-[family-name:var(--font-oswald)] text-xl text-white">
                ₹{stats.expectedAmount.toLocaleString()}
              </p>
            </div>
            <div className="glass-card p-4" style={{ borderColor: "rgba(34, 197, 94, 0.25)" }}>
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1">
                Collected
              </p>
              <p className="font-[family-name:var(--font-oswald)] text-xl text-green-400">
                ₹{stats.collectedAmount.toLocaleString()}
              </p>
            </div>
            <div className="glass-card p-4" style={{ borderColor: "rgba(245, 158, 11, 0.25)" }}>
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1">
                Pending
              </p>
              <p className="font-[family-name:var(--font-oswald)] text-xl text-amber-400">
                ₹{stats.pendingAmount.toLocaleString()}
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1">
                Rate
              </p>
              <p
                className={`font-[family-name:var(--font-oswald)] text-xl ${stats.collectionRate >= 80
                  ? "text-green-400"
                  : stats.collectionRate >= 50
                    ? "text-yellow-400"
                    : "text-red-400"
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
            className="input-field"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowPendingOnly(!showPendingOnly)}
              className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 font-medium tracking-wide ${showPendingOnly
                ? "bg-red-600 border-red-500 text-white"
                : "bg-transparent border-[var(--border)] text-[var(--text-secondary)] hover:border-red-600/50"
                }`}
            >
              {showPendingOnly ? "✓ Pending" : "Pending Only"}
            </button>
            <button
              onClick={() => {
                setNewStudent({ ...newStudent, joinMonth: month });
                setShowAddModal(true);
              }}
              className="px-4 py-2 text-sm rounded-lg border border-green-600/50 text-green-400 hover:bg-green-600 hover:text-white transition-all duration-200 font-medium tracking-wide"
            >
              + Add Student
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="spinner mx-auto mb-4" />
            <p className="text-[var(--text-muted)] text-sm">Loading students...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-400 mb-4 text-sm">{error}</p>
            <button
              onClick={() => loadStudents(true)}
              className="btn-primary text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Student List */}
        {!loading && !error && (
          <div className="space-y-2">
            {sortedStudents.length === 0 ? (
              <p className="text-center text-[var(--text-muted)] py-16 text-sm">
                No students found
              </p>
            ) : (
              sortedStudents.map((student, index) => {
                const isBreak = student.monthStatus === "Break";
                const isDiscontinued = student.monthStatus === "Discontinued";
                const isInactive = isBreak || isDiscontinued;

                return (
                  <div
                    key={student.id}
                    className={`glass-card p-4 transition-all duration-200 animate-slide-up ${isDiscontinued
                      ? "opacity-35"
                      : isBreak
                        ? "opacity-50"
                        : ""
                      }`}
                    style={{ animationDelay: `${Math.min(index * 30, 300)}ms`, animationFillMode: "backwards" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-[family-name:var(--font-oswald)] text-base tracking-wide truncate">
                            {student.name}
                          </h3>
                          {isBreak && (
                            <span className="status-break text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wider">
                              BREAK
                            </span>
                          )}
                          {isDiscontinued && (
                            <span className="status-discontinued text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wider">
                              LEFT
                            </span>
                          )}
                        </div>
                        <p className="text-[var(--text-muted)] text-xs font-mono mt-0.5">
                          {student.id}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-[var(--text-secondary)] text-sm">₹{student.fee}</p>
                          {(student.creditApplied || 0) > 0 && (
                            <span className="flex items-center gap-1 text-[10px] bg-purple-900/40 text-purple-400 px-1.5 py-0.5 rounded-full border border-purple-500/30">
                              <Gift className="w-3 h-3" />
                              -₹{student.creditApplied}
                            </span>
                          )}
                        </div>
                      </div>
                      {student.monthStatus === "Paid" ? (
                        <button
                          onClick={() => setReceiptStudent(student)}
                          className="status-paid px-3 py-1.5 rounded-lg font-[family-name:var(--font-oswald)] text-xs tracking-wider hover:brightness-110 transition-all cursor-pointer"
                        >
                          ✓ PAID
                        </button>
                      ) : isInactive ? (
                        <span
                          className={`px-3 py-1.5 font-[family-name:var(--font-oswald)] text-xs tracking-wider rounded-lg ${isBreak ? "status-break" : "status-discontinued"
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
                          className="btn-primary !px-3 !py-1.5 font-[family-name:var(--font-oswald)] text-xs tracking-wider disabled:opacity-50 select-none"
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
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <div className="p-6">
              <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center">
                CONFIRM PAYMENT
              </h2>
              <div className="glass-surface p-4 mb-4">
                <p className="text-[var(--text-muted)] text-xs mb-1">Student</p>
                <p className="font-[family-name:var(--font-oswald)] text-lg">
                  {confirmStudent.name}
                </p>
                <p className="text-[var(--text-muted)] text-xs font-mono">
                  {confirmStudent.id}
                </p>
                <div className="mt-3 pt-3 border-t border-[var(--border)]">
                  <p className="text-[var(--text-muted)] text-xs mb-1">Original Fee</p>
                  <p className="text-xl font-bold text-white">
                    ₹{confirmStudent.fee}
                  </p>
                </div>

                {/* Referral Credit Section */}
                {loadingCredits ? (
                  <div className="mt-3 pt-3 border-t border-[var(--border)]">
                    <p className="text-[var(--text-muted)] text-sm">
                      Checking for credits...
                    </p>
                  </div>
                ) : studentCredits && studentCredits.credits.length > 0 ? (
                  <div className="mt-3 pt-3 border-t border-[var(--border)]">
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
                          className="w-4 h-4 accent-purple-600 rounded"
                        />
                        <span className="text-sm text-[var(--text-secondary)]">Apply</span>
                      </label>
                    </div>
                    <p className="text-purple-400 font-bold">
                      -₹{studentCredits.totalAvailable}
                    </p>
                    {studentCredits.credits[0].reason && (
                      <p className="text-[var(--text-muted)] text-xs mt-1">
                        {studentCredits.credits[0].reason}
                      </p>
                    )}
                  </div>
                ) : null}

                <div className="mt-3 pt-3 border-t border-[var(--border)]">
                  <p className="text-[var(--text-muted)] text-xs mb-1">Amount to Collect</p>
                  <p className="text-2xl font-bold text-green-400">
                    ₹
                    {selectedCreditId && studentCredits
                      ? Math.max(
                        0,
                        confirmStudent.fee - studentCredits.totalAvailable,
                      )
                      : confirmStudent.fee}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[var(--border)]">
                  <p className="text-[var(--text-muted)] text-xs mb-1">Month</p>
                  <p className="text-white">{MONTHS[month]} 2026</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] text-center text-sm mb-4">
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
                  className="btn-ghost flex-1 font-[family-name:var(--font-oswald)] tracking-wider text-sm"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleConfirmPaid}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-oswald)] tracking-wider text-sm hover:bg-green-500 transition-colors"
                >
                  ✓ CONFIRM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <div className="p-6">
              <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-6 text-center">
                ADD NEW STUDENT
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
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
                    className="input-field font-mono"
                  />
                </div>

                <div>
                  <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
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
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newStudent.phone}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, phone: e.target.value })
                    }
                    placeholder="Optional"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
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
                    className="input-field"
                  >
                    {MONTHS.map((m, i) => (
                      <option key={i} value={i}>
                        {m} 2026
                      </option>
                    ))}
                  </select>
                  <p className="text-[var(--text-muted)] text-xs mt-2">
                    Fees will only be calculated from this month onwards
                  </p>
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
                  onClick={handleAddStudent}
                  disabled={adding || !newStudent.name.trim()}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-oswald)] tracking-wider text-sm hover:bg-green-500 transition-colors disabled:opacity-50"
                >
                  {adding ? "..." : "+ ADD"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Long Press Status Menu */}
      {showStatusMenu && longPressStudent && (
        <div
          className="glass-modal-overlay"
          onClick={() => setShowStatusMenu(false)}
        >
          <div
            className="glass-modal !max-w-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider p-4 border-b border-[var(--border)]">
              {longPressStudent.name}
            </p>
            <button
              onClick={handleBreakClick}
              className="w-full text-left px-4 py-4 text-amber-400 hover:bg-white/5 transition-colors flex items-center gap-3"
            >
              <span className="text-xl">⏸</span>
              <div>
                <p className="font-[family-name:var(--font-oswald)] tracking-wider text-sm">
                  MARK AS BREAK
                </p>
                <p className="text-[var(--text-muted)] text-xs">
                  Student on leave this month
                </p>
              </div>
            </button>
            <button
              onClick={handleDiscontinuedClick}
              className="w-full text-left px-4 py-4 text-gray-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]"
            >
              <span className="text-xl">⛔</span>
              <div>
                <p className="font-[family-name:var(--font-oswald)] tracking-wider text-sm">
                  DISCONTINUED
                </p>
                <p className="text-[var(--text-muted)] text-xs">
                  Student left permanently
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Confirm Break Modal */}
      {confirmBreakStudent && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <div className="p-6">
              <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center text-amber-400">
                MARK AS BREAK
              </h2>
              <div className="glass-surface p-4 mb-6">
                <p className="text-[var(--text-muted)] text-xs mb-1">Student</p>
                <p className="font-[family-name:var(--font-oswald)] text-lg">
                  {confirmBreakStudent.name}
                </p>
                <p className="text-[var(--text-muted)] text-xs font-mono">
                  {confirmBreakStudent.id}
                </p>
                <div className="mt-3 pt-3 border-t border-[var(--border)]">
                  <p className="text-[var(--text-muted)] text-xs mb-1">Month</p>
                  <p className="text-white">{MONTHS[month]} 2026</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] text-center text-sm mb-6">
                This student will not be counted in pending fees for this month.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmBreakStudent(null)}
                  className="btn-ghost flex-1 font-[family-name:var(--font-oswald)] tracking-wider text-sm"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleConfirmBreak}
                  className="flex-1 py-3 bg-amber-600 text-white rounded-lg font-[family-name:var(--font-oswald)] tracking-wider text-sm hover:bg-amber-500 transition-colors"
                >
                  ⏸ CONFIRM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Discontinued Modal */}
      {confirmDiscontinuedStudent && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <div className="p-6">
              <h2 className="font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center text-gray-400">
                MARK AS DISCONTINUED
              </h2>
              <div className="glass-surface p-4 mb-6">
                <p className="text-[var(--text-muted)] text-xs mb-1">Student</p>
                <p className="font-[family-name:var(--font-oswald)] text-lg">
                  {confirmDiscontinuedStudent.name}
                </p>
                <p className="text-[var(--text-muted)] text-xs font-mono">
                  {confirmDiscontinuedStudent.id}
                </p>
                <div className="mt-3 pt-3 border-t border-[var(--border)]">
                  <p className="text-[var(--text-muted)] text-xs mb-1">From Month</p>
                  <p className="text-white">{MONTHS[month]} 2026</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] text-center text-sm mb-6">
                This student will be marked as discontinued and moved to the
                bottom of the list.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDiscontinuedStudent(null)}
                  className="btn-ghost flex-1 font-[family-name:var(--font-oswald)] tracking-wider text-sm"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleConfirmDiscontinued}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-[family-name:var(--font-oswald)] tracking-wider text-sm hover:bg-gray-500 transition-colors"
                >
                  ⛔ CONFIRM
                </button>
              </div>
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

