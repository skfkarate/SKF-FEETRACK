// SKF Karate API - Connect to Google Sheets

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw1liGOq7-6mWTfgw3QsoTKvHl7MIqzn96XPx43JwGcEciv2tP4hSedoemyt0f_ZXEYzw/exec"; // <-- PASTE YOUR SCRIPT URL HERE

interface StudentData {
  id: string;
  name: string;
  status: string;
  fee: number;
  phone: string;
  joinMonth: number;
}

// Empty mock data - real data comes from Google Sheets
const MOCK_STUDENTS: Record<string, StudentData[]> = {
  Herohalli: [],
  MPSC: [],
};

// Track paid status changes in memory
const paidStatus: Record<string, boolean> = {};

export interface Student {
  id: string;
  name: string;
  parentName: string;
  status: string;
  fee: number;
  phone: string;
  whatsapp: string;
  dateOfBirth: string;
  email: string;
  paid: boolean;
  monthStatus: "Paid" | "Pending" | "Break" | "Discontinued" | "N/A";
  joinMonth: number;
  originalFee?: number;
  creditApplied?: number;
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  paidCount: number;
  pendingCount: number;
  collectionRate: number;
  totalCollected: number;
  pendingAmount: number;
}

const useMockData = () => !SCRIPT_URL;

// ============================================
// API FUNCTIONS
// ============================================

export async function getStudents(
  branch: string,
  month: number,
): Promise<Student[]> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 500));
    const allStudents = MOCK_STUDENTS[branch] || MOCK_STUDENTS["Herohalli"];

    // Only return students who joined on or before this month
    const students = allStudents.filter((s) => s.joinMonth <= month);

    return students.map((s) => ({
      ...s,
      parentName: "",
      whatsapp: s.phone,
      dateOfBirth: "",
      email: "",
      paid:
        paidStatus[`${branch}-${month}-${s.id}`] ??
        (month === 0
          ? s.id.includes("001") ||
            s.id.includes("002") ||
            s.id.includes("005") ||
            s.id.includes("007")
          : false),
      monthStatus: (paidStatus[`${branch}-${month}-${s.id}`]
        ? "Paid"
        : "Pending") as Student["monthStatus"],
    }));
  }

  const response = await fetch(`${SCRIPT_URL}?branch=${branch}&month=${month}`);
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.students;
}

export async function markPaid(
  id: string,
  branch: string,
  month: number,
): Promise<void> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    paidStatus[`${branch}-${month}-${id}`] = true;
    return;
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "mark_paid", id, branch, month }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
}

export async function markBreak(
  id: string,
  branch: string,
  month: number,
): Promise<void> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    // In mock mode, just simulate the action
    return;
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "mark_break", id, branch, month }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
}

export async function markDiscontinued(
  id: string,
  branch: string,
  month: number,
): Promise<void> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    // In mock mode, just simulate the action
    return;
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "mark_discontinued", id, branch, month }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
}

export async function getDashboardStats(
  branch: string,
  month: number,
): Promise<DashboardStats> {
  const students = await getStudents(branch, month);
  const active = students.filter((s) => s.status === "Active");
  const paid = active.filter((s) => s.paid);

  return {
    totalStudents: students.length,
    activeStudents: active.length,
    paidCount: paid.length,
    pendingCount: active.length - paid.length,
    collectionRate:
      active.length > 0 ? Math.round((paid.length / active.length) * 100) : 0,
    totalCollected: paid.reduce((sum, s) => sum + s.fee, 0),
    pendingAmount: active
      .filter((s) => !s.paid)
      .reduce((sum, s) => sum + s.fee, 0),
  };
}

export async function addStudent(
  branch: string,
  skfId: string,
  name: string,
  fee: number,
  phone: string,
  joinMonth: number,
): Promise<{ id: string }> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    const students = MOCK_STUDENTS[branch] || MOCK_STUDENTS["Herohalli"];

    // Check if ID already exists
    if (students.some((s) => s.id === skfId)) {
      throw new Error("SKF ID already exists: " + skfId);
    }

    students.push({
      id: skfId,
      name,
      status: "Active",
      fee,
      phone,
      joinMonth,
    });
    return { id: skfId };
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "add_student",
      branch,
      id: skfId,
      name,
      fee,
      phone,
      joinMonth,
    }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function getBranchCounts(): Promise<{
  herohalli: number;
  mp: number;
}> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 200));
    return {
      herohalli: MOCK_STUDENTS["Herohalli"].length,
      mp: MOCK_STUDENTS["MPSC"].length,
    };
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "get_branch_counts" }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

// ============================================
// DEVELOPMENT FUND TYPES & FUNCTIONS
// ============================================

export interface MonthlyDevFund {
  month: number;
  year: string;
  collected: number; // Total fees collected
  devFund: number; // 30% allocation
  spent: number; // Expenses this month
  carryForward: number; // Running balance
}

export interface DevExpense {
  id: string;
  month: number;
  year: string;
  description: string;
  amount: number;
  dateAdded: string;
}

export interface DevelopmentFundData {
  branch: string;
  monthlyBreakdown: MonthlyDevFund[];
  expenses: DevExpense[];
  totalContributions: number;
  totalSpent: number;
  availableBalance: number;
}

// Mock data for development fund
const MOCK_DEV_FUND_DATA: DevelopmentFundData = {
  branch: "Herohalli",
  monthlyBreakdown: Array.from({ length: 12 }, (_, i) => ({
    month: i,
    year: "2026",
    collected: 0,
    devFund: 0,
    spent: 0,
    carryForward: 0,
  })),
  expenses: [],
  totalContributions: 0,
  totalSpent: 0,
  availableBalance: 0,
};

export async function getDevelopmentFundData(
  branch: string,
): Promise<DevelopmentFundData> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    return { ...MOCK_DEV_FUND_DATA, branch };
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "get_dev_fund", branch }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function addDevelopmentExpense(
  branch: string,
  month: number,
  description: string,
  amount: number,
): Promise<DevExpense> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    const newExpense: DevExpense = {
      id: `DEV-${Date.now()}`,
      month,
      year: "2026",
      description,
      amount,
      dateAdded: new Date().toISOString().split("T")[0],
    };
    return newExpense;
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "add_dev_expense",
      branch,
      month,
      description,
      amount,
    }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

// ============================================
// REFERRAL CREDITS TYPES & FUNCTIONS
// ============================================

export interface ReferralCredit {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  reason: string;
  dateEarned: string;
  usedInMonth: number | null;
  usedDate: string;
  isUsed: boolean;
}

export interface ReferralCreditsData {
  credits: ReferralCredit[];
  totalUnused: number;
  totalUsed: number;
}

export interface StudentCredits {
  credits: { id: string; amount: number; reason: string; dateEarned: string }[];
  totalAvailable: number;
}

export async function getReferralCredits(
  branch: string,
): Promise<ReferralCreditsData> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    return { credits: [], totalUnused: 0, totalUsed: 0 };
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "get_referral_credits", branch }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function addReferralCredit(
  branch: string,
  studentId: string,
  amount: number,
  reason: string,
  usedInMonth?: number,
  usedDate?: string,
): Promise<{
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  reason: string;
  dateEarned: string;
  isUsed: boolean;
}> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 500));
    return {
      id: "REF-MOCK-" + Math.floor(Math.random() * 1000),
      studentId: studentId,
      studentName: "Mock Student",
      amount: amount,
      reason: reason,
      dateEarned: new Date().toISOString().split("T")[0],
      isUsed: usedInMonth !== undefined,
    };
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "add_referral_credit",
      branch,
      studentId,
      amount,
      reason,
      usedInMonth,
      usedDate,
    }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function getStudentAvailableCredits(
  studentId: string,
  branch: string,
): Promise<StudentCredits> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    return { credits: [], totalAvailable: 0 };
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "get_student_credits", studentId, branch }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}

export async function markPaidWithCredit(
  id: string,
  branch: string,
  month: number,
  creditId: string,
): Promise<void> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    return;
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "mark_paid_with_credit",
      id,
      branch,
      month,
      creditId,
    }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
}

// ============================================
// FINANCIAL SUMMARY
// ============================================

export interface FinancialSummary {
  month: number;
  branch: string;
  activeStudents: number;
  paidStudents: number;
  pendingStudents: number;
  expected: number;
  collected: number;
  pending: number;
  creditsApplied: number;
  creditDetails?: {
    studentName: string;
    amount: number;
    date: string;
  }[];
  actualReceived: number;
  devFundAllocation: number;
  devFundSpent: number;
  devFundBalance: number;
}

export async function getFinancialSummary(
  branch: string,
  month: number,
): Promise<FinancialSummary> {
  if (useMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    return {
      month,
      branch,
      activeStudents: 42,
      paidStudents: 35,
      pendingStudents: 7,
      expected: 21000,
      collected: 17500,
      pending: 3500,
      creditsApplied: 1000,
      actualReceived: 16500,
      devFundAllocation: 5250,
      devFundSpent: 2000,
      devFundBalance: 3250,
    };
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "get_financial_summary", branch, month }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  return data.data;
}
