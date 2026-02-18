"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Gift,
  Users,
  IndianRupee,
  Target,
  TrendingDown,
  Search,
  Filter,
  Phone,
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

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
import Navbar from "@/components/common/Navbar";

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
      <Navbar
        title={branchName}
        showBack
        rightContent={
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                {MONTHS[month]} 2026
              </span>
              <span className="text-green-400 font-bold text-xs font-[family-name:var(--font-space)]">
                {stats.paidCount}/{stats.totalStudents} Paid
              </span>
            </div>
            <MonthSelector
              selectedMonth={month}
              onMonthChange={(m: number) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("month", m.toString());
                router.push(`/students/${branch}?${params.toString()}`);
              }}
              className="scale-90 origin-right"
            />
          </div>
        }
      />

      <main className="max-w-2xl mx-auto p-4 pt-24">
        {/* Stats Dashboard */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-fade-in">
            {/* Expected */}
            <div className="glass-card p-4 relative overflow-hidden" style={{ borderColor: "rgba(59, 130, 246, 0.25)" }}>
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Target className="w-12 h-12 text-blue-400" />
              </div>
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                <Target className="w-3 h-3" /> Expected
              </p>
              <p className="font-[family-name:var(--font-space)] text-lg sm:text-xl text-blue-400">
                ₹{stats.expectedAmount.toLocaleString()}
              </p>
            </div>

            {/* Collected */}
            <div className="glass-card p-4 relative overflow-hidden" style={{ borderColor: "rgba(34, 197, 94, 0.25)" }}>
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </div>
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Collected
              </p>
              <p className="font-[family-name:var(--font-space)] text-lg sm:text-xl text-green-400">
                ₹{stats.collectedAmount.toLocaleString()}
              </p>
            </div>

            {/* Pending */}
            <div className="glass-card p-4 relative overflow-hidden" style={{ borderColor: "rgba(245, 158, 11, 0.25)" }}>
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Clock className="w-12 h-12 text-amber-400" />
              </div>
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Pending
              </p>
              <p className="font-[family-name:var(--font-space)] text-lg sm:text-xl text-amber-400">
                ₹{stats.pendingAmount.toLocaleString()}
              </p>
            </div>

            {/* Rate */}
            <div className="glass-card p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <TrendingDown className="w-12 h-12 text-white" />
              </div>
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> Efficiency
              </p>
              <p
                className={`font-[family-name:var(--font-space)] text-lg sm:text-xl ${stats.collectionRate >= 80
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
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student..."
              className="input-field pl-10 bg-black/20 border-white/5 focus:border-white/10 placeholder:text-[var(--text-muted)] text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowPendingOnly(!showPendingOnly)}
              className={`flex-1 px-4 py-2.5 text-sm rounded-lg border transition-all duration-200 font-medium tracking-wide flex items-center justify-center gap-2 ${showPendingOnly
                ? "bg-amber-600/20 border-amber-500/50 text-amber-400"
                : "bg-white/5 border-white/5 text-[var(--text-secondary)] hover:bg-white/10"
                }`}
            >
              <Filter className="w-3 h-3" />
              {showPendingOnly ? "Pending View" : "All Students"}
            </button>
            <button
              onClick={() => {
                setNewStudent({ ...newStudent, joinMonth: month });
                setShowAddModal(true);
              }}
              className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-green-600/30 bg-green-600/10 text-green-400 hover:bg-green-600 hover:text-white transition-all duration-200 font-medium tracking-wide flex items-center justify-center gap-2"
            >
              <span>+ Add Student</span>
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
                    className={`glass-card p-4 transition-all duration-200 animate-slide-up hover:border-white/10 group ${isDiscontinued
                      ? "opacity-40 grayscale"
                      : isBreak
                        ? "opacity-60"
                        : ""
                      }`}
                    style={{ animationDelay: `${Math.min(index * 30, 300)}ms`, animationFillMode: "backwards" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-[family-name:var(--font-space)] text-base tracking-wide text-white group-hover:text-amber-400 transition-colors truncate">
                            {student.name}
                          </h3>
                          {/* Status Tags */}
                          {isBreak && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded border border-yellow-500/50 text-yellow-500 uppercase tracking-wider">Break</span>
                          )}
                          {isDiscontinued && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded border border-red-500/50 text-red-500 uppercase tracking-wider">Left</span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-[var(--text-muted)] text-xs">
                          <span className="font-mono opacity-70">{student.id}</span>
                          <span className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" /> {student.fee}
                          </span>
                          {student.phone && (
                            <span className="flex items-center gap-1 opacity-70">
                              <Phone className="w-3 h-3" /> {student.phone}
                            </span>
                          )}
                        </div>

                        {(student.creditApplied || 0) > 0 && (
                          <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] bg-purple-500/10 text-purple-300 px-2 py-1 rounded-md border border-purple-500/20">
                            <Gift className="w-3 h-3" />
                            <span>Credit Applied: ₹{student.creditApplied}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        {student.monthStatus === "Paid" ? (
                          <button
                            onClick={() => setReceiptStudent(student)}
                            className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg font-[family-name:var(--font-space)] text-xs tracking-wider hover:bg-green-500/20 transition-all flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3 h-3" /> PAID
                          </button>
                        ) : isInactive ? (
                          <div className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-medium px-2 py-1">
                            {student.monthStatus}
                          </div>
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
                            className={`px-4 py-2 rounded-lg font-[family-name:var(--font-space)] text-xs tracking-wider transition-all border select-none flex items-center gap-2 ${markingPaid === student.id
                              ? "bg-white/5 text-[var(--text-muted)] border-white/5"
                              : "bg-white text-black border-white hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                              }`}
                          >
                            {markingPaid === student.id || markingStatus === student.id ? (
                              "..."
                            ) : (
                              <>
                                <span>MARK PAID</span>
                                <MoreVertical className="w-3 h-3 opacity-50" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>

      {/* Confirm Payment Modal (Keep existing logic, just check styles if needed) */}
      {confirmStudent && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <div className="p-6">
              <h2 className="font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center">
                CONFIRM PAYMENT
              </h2>
              <div className="glass-surface p-4 mb-4">
                <p className="text-[var(--text-muted)] text-xs mb-1">Student</p>
                <p className="font-[family-name:var(--font-space)] text-lg">
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
                  className="btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleConfirmPaid}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors"
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
              <h2 className="font-[family-name:var(--font-space)] text-xl tracking-wider mb-6 text-center">
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
                  className="btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleAddStudent}
                  disabled={adding || !newStudent.name.trim()}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors disabled:opacity-50"
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
                <p className="font-[family-name:var(--font-space)] tracking-wider text-sm">
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
                <p className="font-[family-name:var(--font-space)] tracking-wider text-sm">
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
              <h2 className="font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center text-amber-400">
                MARK AS BREAK
              </h2>
              <div className="glass-surface p-4 mb-6">
                <p className="text-[var(--text-muted)] text-xs mb-1">Student</p>
                <p className="font-[family-name:var(--font-space)] text-lg">
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
                  className="btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleConfirmBreak}
                  className="flex-1 py-3 bg-amber-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-amber-500 transition-colors"
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
              <h2 className="font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center text-gray-400">
                MARK AS DISCONTINUED
              </h2>
              <div className="glass-surface p-4 mb-6">
                <p className="text-[var(--text-muted)] text-xs mb-1">Student</p>
                <p className="font-[family-name:var(--font-space)] text-lg">
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
                  className="btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleConfirmDiscontinued}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-gray-500 transition-colors"
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

