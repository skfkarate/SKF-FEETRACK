"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  HelpCircle,
  X,
  Send,
  Eye,
  CheckSquare,
  Square,
  Users,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { getStudents, Student } from "@/lib/api";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_SHORT = [
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

// Placeholder definitions with descriptions
const PLACEHOLDERS = [
  {
    key: "{student_name}",
    label: "Student Name",
    description: "The name of the student",
    example: "Arjun Kumar",
  },
  {
    key: "{parent_name}",
    label: "Parent Name",
    description: "The name of the student's parent/guardian",
    example: "Mr. Sharma",
  },
  {
    key: "{pending_amount}",
    label: "Pending Amount",
    description: "The monthly fee amount that is pending",
    example: "₹500",
  },
  {
    key: "{month}",
    label: "Month",
    description: "The month for which fee is pending",
    example: "January",
  },
  {
    key: "{branch}",
    label: "Branch",
    description: "The branch name (Herohalli or MP Sports Club)",
    example: "HEROHALLI",
  },
  {
    key: "{skf_id}",
    label: "SKF ID",
    description: "The unique student ID",
    example: "HH-001",
  },
];

// Default message template
const DEFAULT_TEMPLATE = `Dear {parent_name},

This is a friendly reminder that the monthly training fee of {pending_amount} for {student_name} ({skf_id}) is pending for {month}.

Please clear the dues at your earliest convenience.

Thank you,
SKF Karate - {branch}`;

export default function MessagesPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [messageTemplate, setMessageTemplate] = useState(DEFAULT_TEMPLATE);
  const [selectedBranch, setSelectedBranch] = useState("Herohalli");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(
    new Set(),
  );
  const [selectAllPending, setSelectAllPending] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewStudent, setPreviewStudent] = useState<Student | null>(null);
  const [sending, setSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState({
    current: 0,
    total: 0,
  });

  // Auth check
  useEffect(() => {
    const storedUser = localStorage.getItem("skf_user");
    const loginTime = localStorage.getItem("skf_login_time");

    if (
      !storedUser ||
      !loginTime ||
      Date.now() - parseInt(loginTime) > 30 * 60 * 1000
    ) {
      router.push("/");
      return;
    }
    setUser(storedUser);
  }, [router]);

  // Fetch students when branch/month changes
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await getStudents(selectedBranch, selectedMonth);
        setStudents(data);
        // Auto-select pending students if toggle is on
        if (selectAllPending) {
          const pendingIds = new Set(
            data
              .filter(
                (s) => s.monthStatus === "Pending" && s.status === "Active",
              )
              .map((s) => s.id),
          );
          setSelectedStudents(pendingIds);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStudents();
    }
  }, [selectedBranch, selectedMonth, user, selectAllPending]);

  // Filter pending students - STRICT FILTER
  // ONLY show students where monthStatus is EXACTLY "Pending"
  // This automatically excludes: Paid, Break, Discontinued, N/A, or any other value
  const pendingStudents = useMemo(
    () =>
      students.filter((s) => {
        // Must have monthStatus exactly "Pending"
        if (s.monthStatus !== "Pending") return false;
        // Must have status exactly "Active" (not Discontinued, Break, etc.)
        if (s.status !== "Active") return false;
        return true;
      }),
    [students],
  );

  // Get selected students list
  const selectedStudentsList = useMemo(
    () => pendingStudents.filter((s) => selectedStudents.has(s.id)),
    [pendingStudents, selectedStudents],
  );

  // Calculate total pending amount for selected students
  const totalPendingAmount = useMemo(
    () => selectedStudentsList.reduce((sum, s) => sum + s.fee, 0),
    [selectedStudentsList],
  );

  // Replace placeholders in message
  const replacePlaceholders = (template: string, student: Student): string => {
    const branchName =
      selectedBranch === "Herohalli" ? "HEROHALLI" : "MP SPORTS CLUB";
    return template
      .replace(/{student_name}/g, student.name || "Student")
      .replace(/{parent_name}/g, student.parentName || "Parent")
      .replace(/{pending_amount}/g, `₹${student.fee}`)
      .replace(/{month}/g, MONTHS[selectedMonth])
      .replace(/{branch}/g, branchName)
      .replace(/{skf_id}/g, student.id);
  };

  // Check if message has unresolved placeholders
  const hasUnresolvedPlaceholders = (message: string): boolean => {
    return /{[^}]+}/g.test(message);
  };

  // Insert placeholder at cursor
  const insertPlaceholder = (placeholder: string) => {
    const textarea = document.getElementById(
      "message-template",
    ) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText =
        messageTemplate.substring(0, start) +
        placeholder +
        messageTemplate.substring(end);
      setMessageTemplate(newText);
      // Reset cursor position after state update
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + placeholder.length,
          start + placeholder.length,
        );
      }, 0);
    }
  };

  // Toggle student selection
  const toggleStudent = (studentId: string) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
    setSelectAllPending(false);
  };

  // Toggle select all pending
  const handleSelectAllToggle = () => {
    if (selectAllPending) {
      setSelectAllPending(false);
      setSelectedStudents(new Set());
    } else {
      setSelectAllPending(true);
      const pendingIds = new Set(pendingStudents.map((s) => s.id));
      setSelectedStudents(pendingIds);
    }
  };

  // Open WhatsApp Business with message
  // Using wa.me is faster and often defaults to correct app
  const openWhatsAppBusiness = (phone: string, message: string) => {
    // Clean phone number (remove spaces, dashes, etc.)
    let cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

    // Add India country code if not present
    if (!cleanPhone.startsWith("+")) {
      if (cleanPhone.startsWith("91")) {
        cleanPhone = "+" + cleanPhone;
      } else {
        cleanPhone = "+91" + cleanPhone;
      }
    }

    // Remove + for the URL
    const phoneNoPlus = cleanPhone.replace("+", "");

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Use wa.me short link - faster resolution
    const whatsappUrl = `https://wa.me/${phoneNoPlus}?text=${encodedMessage}`;

    // Validate valid window
    const newWindow = window.open(whatsappUrl, "_blank");
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      console.warn("Popup blocked for", phone);
    }
  };

  // Preview message for a student
  const handlePreview = () => {
    if (selectedStudentsList.length > 0) {
      setPreviewStudent(selectedStudentsList[0]);
      setShowPreviewModal(true);
    }
  };

  // Send messages to all selected students
  const handleSendAll = async () => {
    if (selectedStudentsList.length === 0) return;

    setSending(true);
    setSendingProgress({ current: 0, total: selectedStudentsList.length });

    // Iterate
    for (let i = 0; i < selectedStudentsList.length; i++) {
      const student = selectedStudentsList[i];
      const message = replacePlaceholders(messageTemplate, student);

      // Check for unresolved placeholders
      if (hasUnresolvedPlaceholders(message)) {
        // Skip alert for speed, just log
        console.warn(`Unresolved placeholders for ${student.name}`);
      }

      const phone = student.whatsapp || student.phone;
      if (phone) {
        openWhatsAppBusiness(phone, message);
      }

      setSendingProgress({
        current: i + 1,
        total: selectedStudentsList.length,
      });

      // Reduced delay for faster sending - 500ms
      // Just enough to allow browser to open tab without crashing
      if (i < selectedStudentsList.length - 1) {
        await new Promise((r) => setTimeout(r, 600));
      }
    }

    setSending(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#333] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-[family-name:var(--font-oswald)] text-xl font-bold tracking-wider flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-500" />
              MESSAGE CENTER
            </h1>
          </div>
          <button
            onClick={() => setShowHelpModal(true)}
            className="text-gray-400 hover:text-cyan-400 transition-colors p-2"
            title="Placeholder Guide"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Message Template Section */}
        <section className="bg-[#1a1a1a] border border-[#333] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-[family-name:var(--font-oswald)] text-lg tracking-wider text-gray-200">
              📝 COMPOSE MESSAGE
            </h2>
            <button
              onClick={() => setShowHelpModal(true)}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <HelpCircle className="w-4 h-4" />
              Placeholder Guide
            </button>
          </div>

          <textarea
            id="message-template"
            value={messageTemplate}
            onChange={(e) => setMessageTemplate(e.target.value)}
            className="w-full h-48 bg-[#0a0a0a] border border-[#444] rounded-lg p-3 text-gray-200 
                       focus:border-cyan-500 focus:outline-none resize-none font-mono text-sm"
            placeholder="Type your message here. Use placeholders like {student_name} to personalize..."
          />

          {/* Quick Insert Buttons */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Quick Insert:</p>
            <div className="flex flex-wrap gap-2">
              {PLACEHOLDERS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => insertPlaceholder(p.key)}
                  className="px-2 py-1 bg-[#2a2a2a] border border-[#444] rounded text-xs text-cyan-400 
                             hover:bg-[#333] hover:border-cyan-500 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Select Recipients Section */}
        <section className="bg-[#1a1a1a] border border-[#333] p-4 rounded-lg">
          <h2 className="font-[family-name:var(--font-oswald)] text-lg tracking-wider text-gray-200 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-500" />
            SELECT RECIPIENTS
          </h2>

          {/* Branch & Month Selection */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                Branch
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#444] rounded px-3 py-2 text-gray-200 
                           focus:border-cyan-500 focus:outline-none"
              >
                <option value="Herohalli">Herohalli</option>
                <option value="MPSC">MP Sports Club</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full bg-[#0a0a0a] border border-[#444] rounded px-3 py-2 text-gray-200 
                           focus:border-cyan-500 focus:outline-none"
              >
                {MONTHS_SHORT.map((m, i) => (
                  <option key={m} value={i}>
                    {m} 2026
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Select All Toggle */}
          <button
            onClick={handleSelectAllToggle}
            className={`w-full mb-4 p-3 border rounded-lg flex items-center justify-between transition-colors
                       ${
                         selectAllPending
                           ? "bg-cyan-900/30 border-cyan-600 text-cyan-400"
                           : "bg-[#0a0a0a] border-[#444] text-gray-400 hover:border-cyan-600"
                       }`}
          >
            <span className="flex items-center gap-2">
              {selectAllPending ? (
                <CheckSquare className="w-5 h-5" />
              ) : (
                <Square className="w-5 h-5" />
              )}
              All Pending Students
            </span>
            <span className="text-sm">({pendingStudents.length} students)</span>
          </button>

          {/* Student List */}
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading students...
            </div>
          ) : pendingStudents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No pending students for this month! 🎉
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto space-y-2 border border-[#333] rounded-lg p-2">
              {pendingStudents.map((student) => (
                <button
                  key={student.id}
                  onClick={() => toggleStudent(student.id)}
                  className={`w-full p-3 rounded-lg flex items-center justify-between transition-colors text-left
                             ${
                               selectedStudents.has(student.id)
                                 ? "bg-cyan-900/20 border border-cyan-700"
                                 : "bg-[#0a0a0a] border border-[#333] hover:border-[#555]"
                             }`}
                >
                  <div className="flex items-center gap-3">
                    {selectedStudents.has(student.id) ? (
                      <CheckSquare className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-600" />
                    )}
                    <div>
                      <p className="text-gray-200 font-medium">
                        {student.name}
                      </p>
                      <p className="text-xs text-gray-500">{student.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-mono">₹{student.fee}</p>
                    <p className="text-xs text-gray-500">
                      {student.whatsapp || student.phone || "No phone"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Selection Summary */}
          <div className="mt-4 p-3 bg-[#0a0a0a] rounded-lg border border-[#333]">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Selected Students:</span>
              <span className="text-cyan-400 font-bold">
                {selectedStudentsList.length}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">Total Pending:</span>
              <span className="text-cyan-400 font-mono font-bold">
                ₹{totalPendingAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handlePreview}
            disabled={selectedStudentsList.length === 0}
            className="p-4 bg-[#1a1a1a] border border-[#444] rounded-lg text-gray-200 
                       hover:border-cyan-500 hover:text-cyan-400 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Preview Message
          </button>
          <button
            onClick={handleSendAll}
            disabled={selectedStudentsList.length === 0 || sending}
            className="p-4 bg-gradient-to-r from-cyan-600 to-cyan-700 border border-cyan-500 rounded-lg 
                       text-white font-bold hover:from-cyan-500 hover:to-cyan-600 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {sending
              ? `Sending (${sendingProgress.current}/${sendingProgress.total})`
              : "Send via WhatsApp"}
          </button>
        </div>

        {/* Note about WhatsApp Business */}
        <p className="text-center text-xs text-gray-600">
          Messages will open in WhatsApp Business app on your device
        </p>
      </main>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-[#333] flex items-center justify-between sticky top-0 bg-[#1a1a1a]">
              <h3 className="font-[family-name:var(--font-oswald)] text-lg tracking-wider text-cyan-400">
                PLACEHOLDER GUIDE
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-gray-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-400">
                Use these placeholders in your message. They will be
                automatically replaced with actual student data when sending.
              </p>

              {PLACEHOLDERS.map((p) => (
                <div
                  key={p.key}
                  className="bg-[#0a0a0a] p-3 rounded-lg border border-[#333]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-cyan-400 text-sm font-mono">
                      {p.key}
                    </code>
                    <span className="text-xs text-gray-500">{p.label}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{p.description}</p>
                  <p className="text-xs text-gray-500">
                    Example: <span className="text-green-400">{p.example}</span>
                  </p>
                </div>
              ))}

              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-600/50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-400">
                    Make sure placeholders are typed exactly as shown, including
                    the curly braces. The preview will show you how the message
                    will look before sending.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && previewStudent && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg max-w-md w-full">
            <div className="p-4 border-b border-[#333] flex items-center justify-between">
              <h3 className="font-[family-name:var(--font-oswald)] text-lg tracking-wider text-cyan-400">
                MESSAGE PREVIEW
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-2">
                Preview for:{" "}
                <span className="text-cyan-400">{previewStudent.name}</span>
              </p>

              {/* Check for unresolved placeholders */}
              {hasUnresolvedPlaceholders(
                replacePlaceholders(messageTemplate, previewStudent),
              ) && (
                <div className="mb-3 p-3 bg-red-900/20 border border-red-600/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-400">
                      Warning: Your message contains unrecognized placeholders
                      that won&apos;t be replaced. Please check your template.
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-[#0a0a0a] p-4 rounded-lg border border-[#333] whitespace-pre-wrap text-gray-200 text-sm">
                {replacePlaceholders(messageTemplate, previewStudent)}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="flex-1 p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-gray-300 
                             hover:border-gray-500 transition-colors"
                >
                  Edit Template
                </button>
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    handleSendAll();
                  }}
                  className="flex-1 p-3 bg-gradient-to-r from-cyan-600 to-cyan-700 border border-cyan-500 
                             rounded-lg text-white font-bold hover:from-cyan-500 hover:to-cyan-600 transition-all
                             flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
