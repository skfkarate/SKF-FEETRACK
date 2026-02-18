// SKF Karate API - Connect to Google Sheets

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyV8zmUVUsY1vZRUoXEGhkeBzI-yLC_M36yLsC-leJHjwPOx8jqNYXa_au6mZ50mt36oQ/exec"; // <-- PASTE YOUR SCRIPT URL HERE

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
  // New Fee Fields
  admissionFee?: number;
  admissionStatus?: "Paid" | "Pending";
  dressFee?: number;
  dressCost?: number;
  dressStatus?: "Paid" | "Pending";
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

const isMockData = () => !SCRIPT_URL;

// ============================================
// FETCH HELPERS - Timeout & Retry
// ============================================

const DEFAULT_TIMEOUT = 8000; // 8 seconds - snappier error feedback
const MAX_RETRIES = 2;
const INITIAL_RETRY_DELAY = 300; // 300ms - faster retries

/**
 * Fetch with timeout support
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = DEFAULT_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch with retry logic and exponential backoff
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = MAX_RETRIES
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options);

      // If we get a response (even an error response), return it
      if (response.ok || response.status < 500) {
        return response;
      }

      // Server error - retry
      throw new Error(`Server error: ${response.status}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on abort (timeout) or if it's the last attempt
      if (attempt === retries) {
        break;
      }

      // Exponential backoff
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error("Request failed after retries");
}

// ============================================
// CACHE SYSTEM - Instant Repeat Loads
// ============================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// In-memory cache store
const cache = new Map<string, CacheEntry<unknown>>();

// Cache durations (in milliseconds)
const CACHE_TTL = {
  students: 60 * 1000,           // 1 minute - fast sync for fee tracking
  financial: 2 * 60 * 1000,     // 2 minutes
  devFund: 3 * 60 * 1000,       // 3 minutes
  referrals: 3 * 60 * 1000,     // 3 minutes
  branchCounts: 5 * 60 * 1000,  // 5 minutes - rarely changes
};

/**
 * Get TTL for a cache key based on prefix
 */
function getTTLForKey(key: string): number {
  if (key.startsWith('students:')) return CACHE_TTL.students;
  if (key.startsWith('financial:')) return CACHE_TTL.financial;
  if (key.startsWith('devFund:')) return CACHE_TTL.devFund;
  if (key.startsWith('referral:')) return CACHE_TTL.referrals;
  if (key.startsWith('branchCounts')) return CACHE_TTL.branchCounts;
  return CACHE_TTL.students;
}

/**
 * Get data from cache if available and fresh (simple TTL only — no stale data)
 */
function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;

  const age = Date.now() - entry.timestamp;
  if (age < getTTLForKey(key)) {
    return entry.data;
  }

  // Expired — remove and return null
  cache.delete(key);
  return null;
}

/**
 * Set cache entry
 */
function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Invalidate cache entries matching a pattern
 */
export function invalidateCache(pattern?: string): void {
  if (!pattern) {
    cache.clear();
    return;
  }

  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
}

/**
 * Simple cached fetch — returns fresh cache hit or fetches new data.
 * NO stale-while-revalidate to prevent showing wrong month's data.
 */
async function cachedFetch<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
): Promise<T> {
  const cachedData = getCached<T>(cacheKey);
  if (cachedData !== null) {
    return cachedData;
  }

  // No valid cache — fetch fresh
  const freshData = await fetcher();
  setCache(cacheKey, freshData);
  return freshData;
}

// ============================================
// API FUNCTIONS
// ============================================

export async function getStudents(
  branch: string,
  month: number,
  forceRefresh = false,
): Promise<Student[]> {
  if (isMockData()) {
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

  // No need to adjust month anymore, backend handles 0-based index correctly now
  const adjustedMonth = month;

  const cacheKey = `students:${branch}:${month}`; // Keep cache key based on requested month

  // Force-invalidate on month switch to prevent stale data from wrong month
  if (forceRefresh) {
    invalidateCache(cacheKey);
  }

  return cachedFetch(cacheKey, async () => {
    // Use adjustedMonth for the fetch
    const response = await fetchWithRetry(`${SCRIPT_URL}?branch=${branch}&month=${adjustedMonth}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to fetch students");
    return data.students;
  });
}

export async function markPaid(
  id: string,
  branch: string,
  month: number,
): Promise<void> {
  if (isMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    paidStatus[`${branch}-${month}-${id}`] = true;
    return;
  }

  const response = await fetchWithRetry(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "mark_paid", id, branch, month }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || "Failed to mark as paid");

  // Invalidate student and financial caches
  invalidateCache(`students:${branch}:${month}`);
  invalidateCache(`financial:${branch}`);
}

export async function markBreak(
  id: string,
  branch: string,
  month: number,
): Promise<void> {
  if (isMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    // In mock mode, just simulate the action
    return;
  }

  const response = await fetchWithRetry(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "mark_break", id, branch, month }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || "Failed to mark as break");

  // Invalidate caches - break affects this month's data
  invalidateCache(`students:${branch}:${month}`);
  invalidateCache(`financial:${branch}`);
}

export async function markDiscontinued(
  id: string,
  branch: string,
  month: number,
): Promise<void> {
  if (isMockData()) return;
  const formData = new FormData();
  formData.append("action", "mark_discontinued");
  formData.append("id", id);
  formData.append("branch", branch);
  formData.append("month", month.toString());
  await fetchWithRetry(SCRIPT_URL, { method: "POST", body: formData });

  // Invalidate ALL month caches for this branch - discontinued affects all future months
  invalidateCache(`students:${branch}`);
  invalidateCache(`financial:${branch}`);
}

/**
 * Mark a non-recurring fee (Admission or Dress) as Paid
 */
export async function markNonRecurringFeePaid(
  studentId: string,
  branch: string,
  feeType: "Admission" | "Dress"
): Promise<void> {
  if (isMockData()) return;
  const formData = new FormData();
  formData.append("action", "mark_non_recurring_paid");
  formData.append("studentId", studentId);
  formData.append("branch", branch);
  formData.append("feeType", feeType);
  await fetchWithRetry(SCRIPT_URL, { method: "POST", body: formData });
}

export async function getDashboardStats(
  branch: string,
  month: number,
  forceRefresh = false,
): Promise<DashboardStats> {
  const students = await getStudents(branch, month, forceRefresh);
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
  id: string,
  name: string,
  fee: number,
  phone: string,
  joinMonth: number,
  // New optional fields
  admissionFee?: number,
  admissionPaid?: boolean,
  dressFee?: number,
  dressCost?: number,
  dressPaid?: boolean,
): Promise<{ id: string; name: string }> {
  if (isMockData()) {
    // Mock implementation omitted for brevity
    return { id, name };
  }

  const formData = new FormData();
  formData.append("action", "add_student");
  formData.append("branch", branch);
  formData.append("id", id);
  formData.append("name", name);
  formData.append("fee", fee.toString());
  formData.append("phone", phone);
  formData.append("joinMonth", joinMonth.toString());

  if (admissionFee !== undefined) formData.append("admissionFee", admissionFee.toString());
  if (admissionPaid !== undefined) formData.append("admissionPaid", admissionPaid.toString());
  if (dressFee !== undefined) formData.append("dressFee", dressFee.toString());
  if (dressCost !== undefined) formData.append("dressCost", dressCost.toString());
  if (dressPaid !== undefined) formData.append("dressPaid", dressPaid.toString());

  const response = await fetchWithRetry(SCRIPT_URL, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || "Failed to add student");

  // Invalidate ALL student caches for this branch - new student appears in all months from joinMonth onwards
  invalidateCache(`students:${branch}`);
  invalidateCache(`financial:${branch}`);
  invalidateCache('branchCounts');

  return data.data;
}

export async function getBranchCounts(): Promise<{
  herohalli: number;
  mp: number;
}> {
  if (isMockData()) {
    await new Promise((r) => setTimeout(r, 200));
    return {
      herohalli: MOCK_STUDENTS["Herohalli"].length,
      mp: MOCK_STUDENTS["MPSC"].length,
    };
  }

  const cacheKey = 'branchCounts';

  return cachedFetch(cacheKey, async () => {
    const response = await fetchWithRetry(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "get_branch_counts" }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to get branch counts");
    return data.data;
  });
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
  title: string;
  description: string;
  scope: string; // "Herohalli" | "MPSC" | "Both" | custom string
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

export async function getDevelopmentFundData(): Promise<DevelopmentFundData> {
  if (isMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    return { ...MOCK_DEV_FUND_DATA, branch: "All" };
  }

  const cacheKey = 'devFund:all';

  return cachedFetch(cacheKey, async () => {
    const response = await fetchWithRetry(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "get_dev_fund" }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to get development fund data");
    return data.data;
  });
}

export async function addDevelopmentExpense(
  month: number,
  title: string,
  description: string,
  scope: string,
  amount: number,
): Promise<DevExpense> {
  if (isMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    const newExpense: DevExpense = {
      id: `DEV-${Date.now()}`,
      month,
      year: "2026",
      title,
      description,
      scope,
      amount,
      dateAdded: new Date().toISOString().split("T")[0],
    };
    return newExpense;
  }

  const response = await fetchWithRetry(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "add_dev_expense",
      month,
      title,
      description,
      scope,
      amount,
    }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || "Failed to add expense");

  // Invalidate dev fund and financial caches
  invalidateCache('devFund');
  invalidateCache('financial');

  return data.data;
}

export async function deleteDevelopmentExpense(
  expenseId: string,
): Promise<{ success: boolean }> {
  if (isMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    return { success: true };
  }

  const response = await fetchWithRetry(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "delete_dev_expense",
      expenseId,
    }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || "Failed to delete expense");

  // Invalidate dev fund and financial caches
  invalidateCache('devFund');
  invalidateCache('financial');

  return { success: true };
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
  description: string;
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
  if (isMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    return { credits: [], totalUnused: 0, totalUsed: 0 };
  }

  const response = await fetchWithRetry(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "get_referral_credits", branch }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || "Failed to get referral credits");
  return data.data;
}

export async function addReferralCredit(
  branch: string,
  studentId: string,
  amount: number,
  reason: string,
  description?: string,
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
  if (isMockData()) {
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

  const response = await fetchWithRetry(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "add_referral_credit",
      branch,
      studentId,
      amount,
      reason,
      description,
      usedInMonth,
      usedDate,
    }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || "Failed to add referral credit");
  return data.data;
}

export async function getStudentAvailableCredits(
  studentId: string,
  branch: string,
): Promise<StudentCredits> {
  if (isMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    return { credits: [], totalAvailable: 0 };
  }

  const response = await fetchWithRetry(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ action: "get_student_credits", studentId, branch }),
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error || "Failed to get student credits");
  return data.data;
}

export async function markPaidWithCredit(
  id: string,
  branch: string,
  month: number,
  creditId: string,
): Promise<void> {
  if (isMockData()) {
    await new Promise((r) => setTimeout(r, 300));
    return;
  }

  const response = await fetchWithRetry(SCRIPT_URL, {
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
  if (!data.success) throw new Error(data.error || "Failed to mark paid with credit");
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
    reason: string;
    description: string;
    date: string;
  }[];
  actualReceived: number;
  devFundAllocation: number;
  devFundSpent: number;
  devFundBalance: number; // calculated as allocation - spent
  totalContributions: number;
  availableBalance: number;
  yearlyBreakdown: any[];
  // New Fields
  admissionCollected?: number;
  dressProfit?: number;
}

export async function getFinancialSummary(
  branch: string,
  month: number,
  forceRefresh = false,
): Promise<FinancialSummary> {
  if (isMockData()) {
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
      devFundSpent: 1000,
      devFundBalance: 4250,
      totalContributions: 5250,
      availableBalance: 4250,
      yearlyBreakdown: [],
      admissionCollected: 5000,
      dressProfit: 2000,
    };
  }

  const cacheKey = `financial:${branch}:${month}`;

  if (forceRefresh) {
    invalidateCache(cacheKey);
  }

  return cachedFetch(cacheKey, async () => {
    const response = await fetchWithRetry(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "get_financial_summary", branch, month }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error || "Failed to get financial summary");
    return data.data;
  });
}
