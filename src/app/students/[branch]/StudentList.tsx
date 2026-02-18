"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Gift,
  Users,
  IndianRupee,
  Target,
  TrendingDown,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Ticket,
  Shirt,
  Phone,
  MessageCircle,
  X,
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
  markNonRecurringFeePaid,
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
    admissionFee: 1000, // Default Admission Fee
    admissionPaid: true,
    dressFee: 1500, // Default Dress Fee
    dressCost: 1000, // Default Dress Cost
    dressPaid: true,
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

  // New Fee Payment Confirmation
  const [confirmFeePayment, setConfirmFeePayment] = useState<{
    student: Student;
    type: "Admission" | "Dress";
  } | null>(null);

  const [markingStatus, setMarkingStatus] = useState<string | null>(null);

  // Detail Modal
  const [detailStudent, setDetailStudent] = useState<Student | null>(null);

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

  const handleMarkNonRecurringPaid = async () => {
    if (!confirmFeePayment) return;
    setMarkingStatus(confirmFeePayment.student.id);
    const { student, type } = confirmFeePayment;
    setConfirmFeePayment(null);

    try {
      await markNonRecurringFeePaid(student.id, branch, type);
      setStudents((prev) =>
        prev.map((s) => {
          if (s.id === student.id) {
            if (type === "Admission") return { ...s, admissionStatus: "Paid" };
            if (type === "Dress") return { ...s, dressStatus: "Paid" };
          }
          return s;
        })
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to mark as paid");
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
        newStudent.admissionFee,
        newStudent.admissionPaid,
        newStudent.dressFee,
        newStudent.dressCost,
        newStudent.dressPaid
      );
      setShowAddModal(false);
      setNewStudent({
        skfId: "",
        name: "",
        fee: 500,
        phone: "",
        joinMonth: month,
        admissionFee: 1000,
        admissionPaid: true,
        dressFee: 1500,
        dressCost: 1000,
        dressPaid: true,
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student..."
              className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-white/15 transition-all placeholder:text-[var(--text-muted)]"
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
                    onClick={() => setDetailStudent(student)}
                    className={`glass-card p-4 transition-all duration-200 animate-slide-up hover:border-white/10 group cursor-pointer ${isDiscontinued
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

                        <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs">
                          <span className="font-mono opacity-70">{student.id}</span>
                          <span className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" /> ₹{student.fee}
                          </span>
                        </div>

                        {(student.creditApplied || 0) > 0 && (
                          <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] bg-purple-500/10 text-purple-300 px-2 py-1 rounded-md border border-purple-500/20">
                            <Gift className="w-3 h-3" />
                            <span>Credit Applied: ₹{student.creditApplied}</span>
                          </div>
                        )}

                        {/* Pending Admission/Dress Badges */}
                        {(student.admissionStatus === "Pending" || student.dressStatus === "Pending") && (
                          <div className="mt-2 flex gap-2 flex-wrap">
                            {student.admissionStatus === "Pending" && (
                              <div className="inline-flex items-center gap-1.5 text-[10px] bg-blue-500/10 text-blue-300 px-2 py-1 rounded-md border border-blue-500/20">
                                <Ticket className="w-3 h-3" />
                                <span>Adm Due</span>
                              </div>
                            )}
                            {student.dressStatus === "Pending" && (
                              <div className="inline-flex items-center gap-1.5 text-[10px] bg-pink-500/10 text-pink-300 px-2 py-1 rounded-md border border-pink-500/20">
                                <Shirt className="w-3 h-3" />
                                <span>Dress Due</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        {student.monthStatus === "Paid" ? (
                          <button
                            onClick={() => setReceiptStudent(student)}
                            className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-400 transition-all shadow-md shadow-green-900/40"
                            title="View Receipt"
                          >
                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </button>
                        ) : isInactive ? (
                          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[var(--text-muted)]">
                            <AlertCircle className="w-4 h-4" />
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
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all select-none ${markingPaid === student.id || markingStatus === student.id
                              ? "bg-white/5 text-[var(--text-muted)]"
                              : "bg-white text-black hover:bg-gray-200 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                              }`}
                            title="Mark Paid"
                          >
                            {markingPaid === student.id || markingStatus === student.id ? (
                              <div className="spinner !w-4 !h-4" />
                            ) : (
                              <IndianRupee className="w-4 h-4" />
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

                {/* Admission Fee */}
                <div className="flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex-1">
                    <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
                      Admission Fee
                    </label>
                    <input
                      type="number"
                      value={newStudent.admissionFee}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          admissionFee: parseInt(e.target.value) || 0,
                        })
                      }
                      className="input-field"
                    />
                  </div>
                  <div className="flex items-end mb-2">
                    <label className="flex items-center gap-2 cursor-pointer bg-black/40 px-3 py-2 rounded-md border border-white/10 hover:bg-black/60 transition-colors">
                      <input
                        type="checkbox"
                        checked={newStudent.admissionPaid}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            admissionPaid: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-green-500 rounded cursor-pointer"
                      />
                      <span className="text-sm">Paid Now?</span>
                    </label>
                  </div>
                </div>

                {/* Dress Fee */}
                <div className="flex flex-col gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
                        Dress Fee
                      </label>
                      <input
                        type="number"
                        value={newStudent.dressFee}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            dressFee: parseInt(e.target.value) || 0,
                          })
                        }
                        className="input-field"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium text-amber-500">
                        Dress Cost
                      </label>
                      <input
                        type="number"
                        value={newStudent.dressCost}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            dressCost: parseInt(e.target.value) || 0,
                          })
                        }
                        className="input-field !border-amber-500/30 focus:!border-amber-500/60"
                        placeholder="Cost"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <label className="flex items-center gap-2 cursor-pointer bg-black/40 px-3 py-2 rounded-md border border-white/10 hover:bg-black/60 transition-colors">
                      <input
                        type="checkbox"
                        checked={newStudent.dressPaid}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            dressPaid: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-green-500 rounded cursor-pointer"
                      />
                      <span className="text-sm">Paid Now?</span>
                    </label>
                  </div>
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

      {/* Student Detail Modal */}
      {detailStudent && (
        <div className="glass-modal-overlay" onClick={() => setDetailStudent(null)}>
          <div className="glass-modal" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-[family-name:var(--font-space)] text-xl tracking-wider text-white">
                  {detailStudent.name}
                </h2>
                <p className="text-[var(--text-muted)] text-sm font-mono mt-1">
                  {detailStudent.id}
                </p>
              </div>
              <button
                onClick={() => setDetailStudent(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Contact Actions */}
              <div className="flex gap-3 mb-6">
                <a
                  href={`tel:${detailStudent.phone}`}
                  className="flex-1 py-3 bg-green-600/20 border border-green-600/50 text-green-400 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600/30 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a
                  href={`https://wa.me/${(detailStudent.whatsapp || detailStudent.phone).replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] rounded-lg flex items-center justify-center gap-2 hover:bg-[#25D366]/30 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>

              <div className="glass-surface p-4 space-y-3">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[var(--text-muted)] text-sm">Parent</span>
                  <span className="text-white text-sm font-medium">{detailStudent.parentName || "-"}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[var(--text-muted)] text-sm">DOB</span>
                  <span className="text-white text-sm font-medium">{detailStudent.dateOfBirth ? new Date(detailStudent.dateOfBirth).toLocaleDateString() : "-"}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[var(--text-muted)] text-sm">Join Month</span>
                  <span className="text-white text-sm font-medium">{MONTHS[detailStudent.joinMonth]}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[var(--text-muted)] text-sm">Monthly Fee</span>
                  <span className="text-white text-sm font-medium">₹{detailStudent.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)] text-sm">Status</span>
                  <span className={`text-sm font-medium ${detailStudent.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>{detailStudent.status}</span>
                </div>
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

            {longPressStudent.admissionStatus === "Pending" && (
              <button
                onClick={() => {
                  setShowStatusMenu(false);
                  setConfirmFeePayment({ student: longPressStudent, type: "Admission" });
                }}
                className="w-full text-left px-4 py-4 text-blue-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]"
              >
                <Ticket className="w-5 h-5" />
                <div>
                  <p className="font-[family-name:var(--font-space)] tracking-wider text-sm">
                    MARK ADMISSION PAID
                  </p>
                  <p className="text-[var(--text-muted)] text-xs">
                    Collect ₹{longPressStudent.admissionFee || 0}
                  </p>
                </div>
              </button>
            )}

            {longPressStudent.dressStatus === "Pending" && (
              <button
                onClick={() => {
                  setShowStatusMenu(false);
                  setConfirmFeePayment({ student: longPressStudent, type: "Dress" });
                }}
                className="w-full text-left px-4 py-4 text-pink-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]"
              >
                <Shirt className="w-5 h-5" />
                <div>
                  <p className="font-[family-name:var(--font-space)] tracking-wider text-sm">
                    MARK DRESS PAID
                  </p>
                  <p className="text-[var(--text-muted)] text-xs">
                    Collect ₹{longPressStudent.dressFee || 0}
                  </p>
                </div>
              </button>
            )}

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
      {/* Confirm Fee Payment Modal */}
      {confirmFeePayment && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <div className="p-6">
              <h2 className="font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center">
                CONFIRM {confirmFeePayment.type.toUpperCase()} FEE
              </h2>
              <div className="glass-surface p-4 mb-6">
                <p className="text-[var(--text-muted)] text-xs mb-1">Student</p>
                <p className="font-[family-name:var(--font-space)] text-lg">
                  {confirmFeePayment.student.name}
                </p>
                <div className="mt-4 pt-4 border-t border-[var(--border)]">
                  <p className="text-[var(--text-muted)] text-xs mb-1">Amount to Collect</p>
                  <p className="text-2xl font-bold text-green-400">
                    ₹{confirmFeePayment.type === "Admission" ? confirmFeePayment.student.admissionFee : confirmFeePayment.student.dressFee}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmFeePayment(null)}
                  className="btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleMarkNonRecurringPaid}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors"
                >
                  ✓ CONFIRM PAID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

