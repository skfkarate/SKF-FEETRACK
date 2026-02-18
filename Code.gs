/**
 * SKF KARATE 2026 - Complete Google Apps Script API
 * Auto-generates sheets and provides API for Next.js app
 * Supports: Students, Monthly Fees, Events, and Event Participants
 *
 * SETUP:
 * 1. Copy this to Google Sheets → Extensions → Apps Script
 * 2. Run "setupAllSheets" function once
 * 3. Deploy → New deployment → Web app → Anyone can access
 * 4. Copy the URL to your Next.js app's api.ts as SCRIPT_URL
 */

// ============================================
// AUTO SETUP - Run this once!
// ============================================
function setupAllSheets() {
  const ss = getSpreadsheet();

  // Create DB sheets with comprehensive student information
  createSheetIfNotExists(ss, "DB_Herohalli", [
    "SKF_ID",
    "Student_Name",
    "Parent_Guardian",
    "Status",
    "Monthly_Fee",
    "Phone",
    "WhatsApp",
    "Date_of_Birth",
    "Email",
    "JoinMonth",
    "EndMonth",
    "Admission_Fee",
    "Admission_Status",
    "Dress_Fee",
    "Dress_Cost",
    "Dress_Status",
  ]);
  createSheetIfNotExists(ss, "DB_MP", [
    "SKF_ID",
    "Student_Name",
    "Parent_Guardian",
    "Status",
    "Monthly_Fee",
    "Phone",
    "WhatsApp",
    "Date_of_Birth",
    "Email",
    "JoinMonth",
    "EndMonth",
    "Admission_Fee",
    "Admission_Status",
    "Dress_Fee",
    "Dress_Cost",
    "Dress_Status",
  ]);

  // Create Fees sheets
  createSheetIfNotExists(ss, "Fees_Herohalli", [
    "ID",
    "Name",
    "Fee",
    "Year",
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
  ]);
  createSheetIfNotExists(ss, "Fees_MP", [
    "ID",
    "Name",
    "Fee",
    "Year",
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
  ]);

  // Create Development Fund sheet (Unified)
  createSheetIfNotExists(ss, "DevFund", [
    "Expense_ID",
    "Month",
    "Year",
    "Title",
    "Description",
    "Branch", // Scope
    "Amount",
    "Date_Added",
  ]);

  // Create Development Fund sheets for tracking 30% allocation expenses - DEPRECATED but kept for reference if needed
  // createSheetIfNotExists(ss, "DevFund_Herohalli", ...);


  // Create Referral Credits sheets for tracking referral bonuses
  createSheetIfNotExists(ss, "ReferralCredits_Herohalli", [
    "Credit_ID",
    "Student_ID",
    "Student_Name",
    "Amount",
    "Reason",
    "Date_Earned",
    "Used_In_Month",
    "Used_Date",
  ]);
  createSheetIfNotExists(ss, "ReferralCredits_MP", [
    "Credit_ID",
    "Student_ID",
    "Student_Name",
    "Amount",
    "Reason",
    "Date_Earned",
    "Used_In_Month",
    "Used_Date",
  ]);

  // Sheets created - ready for real data
  try {
    SpreadsheetApp.getUi().alert(
      "✅ Setup Complete! All sheets created with headers. You can now add students through the app.",
    );
  } catch (e) {
    Logger.log("Setup Complete! All sheets created.");
  }
}

function createSheetIfNotExists(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#d32f2f");
  headerRange.setFontColor("#ffffff");

  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
  return sheet;
}

/**
 * Optional: Add sample data for testing
 * This function is empty - no sample data is added
 * You can add your own test data here if needed
 */
function addSampleData(ss) {
  // No sample data - start fresh with empty sheets
  // Add students via the app's "Add Student" feature
}
// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  year: "2026",
  monthStart: 4, // Column E (0-indexed: A=0, B=1, C=2, D=3, E=4) - fallback value
  devFundPercent: 0.30, // 30% of collected fees goes to development fund
  devFundSheet: "DevFund", // New unified sheet
  defaultReferralCredit: 500, // Default referral bonus amount
  branches: {
    Herohalli: {
      db: "DB_Herohalli",
      fees: "Fees_Herohalli",
      devFund: "DevFund_Herohalli",
      refCredits: "ReferralCredits_Herohalli",
      prefix: "HERO-",
    },
    MPSC: {
      db: "DB_MP",
      fees: "Fees_MP",
      devFund: "DevFund_MP",
      refCredits: "ReferralCredits_MP",
      prefix: "MP-",
    },
    MP: {
      db: "DB_MP",
      fees: "Fees_MP",
      devFund: "DevFund_MP",
      refCredits: "ReferralCredits_MP",
      prefix: "MP-",
    },
  },
  year: "2026",
  monthStart: 4, // Column E (0-indexed: A=0, B=1, C=2, D=3, E=4) - fallback value
  devFundPercent: 0.3, // 30% of collected fees goes to development fund
  defaultReferralCredit: 500, // Default referral bonus amount
};

// ============================================
// SPREADSHEET ID (REQUIRED for web app / trigger contexts)
// ============================================
// Paste your Google Sheet ID here (found in the sheet URL between /d/ and /edit)
// Example URL: https://docs.google.com/spreadsheets/d/YOUR_ID_HERE/edit
const SPREADSHEET_ID = ""; // <-- PASTE YOUR SPREADSHEET ID HERE

/**
 * Helper: Get the spreadsheet reliably in ANY context.
 * Tries getActiveSpreadsheet() first (works in container-bound scripts),
 * falls back to openById() for web app & trigger contexts.
 */
function getSpreadsheet() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) return ss;
  
  // Fallback: use SPREADSHEET_ID
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  
  throw new Error(
    "Cannot access spreadsheet. Either run this from the bound sheet, or set the SPREADSHEET_ID constant at the top of Code.gs."
  );
}

/**
 * Dynamically find the "Jan" column index in a fees sheet
 * This ensures correct month column mapping regardless of sheet structure
 */
function getJanColumnIndex(feesSheet) {
  // Use getDataRange to get the actual data region
  const data = feesSheet.getDataRange().getValues();
  
  // Search first 5 rows for the header
  const limit = Math.min(data.length, 5);
  
  for (let r = 0; r < limit; r++) {
    const row = data[r];
    for (let c = 0; c < row.length; c++) {
      const cell = String(row[c]).trim().toLowerCase();
      if (cell === "jan" || cell === "january") {
        return c; // 0-indexed column index
      }
    }
  }
  
  return CONFIG.monthStart; // fallback to config
}

// ============================================
// API ENDPOINTS
// ============================================
function doGet(e) {
  try {
    const branch = e.parameter.branch || "Herohalli";
    
    // Fix: Handle 0 (Jan) correctly. undefined/null/empty string invalidates it, but 0 is valid.
    let month;
    if (e.parameter.month !== undefined && e.parameter.month !== "") {
      month = parseInt(e.parameter.month);
    } else {
      month = new Date().getMonth();
    }

    const result = getStudentsWithPaymentStatus(branch, month);
    return jsonResponse({ 
      success: true, 
      students: result.students,
      debug: {
        receivedParams: e.parameter,
        parsedMonth: month,
        janColumnIndex: result.janColIndex,
        usedMonthColumn: result.monthCol,
        configFallback: CONFIG.monthStart
      }
    });
  } catch (error) {
    return jsonResponse({ success: false, error: error.message });
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    let result;

    switch (payload.action) {
      case "mark_paid":
        result = markStudentPaid(payload.id, payload.branch, payload.month);
        break;
      case "add_student":
        result = addNewStudent(payload);
        break;
      case "get_dashboard_stats":
        result = getDashboardStats(payload.branch, payload.month);
        break;
      case "get_branch_counts":
        result = getBranchCounts();
        break;

      // Break and Discontinued Actions
      case "mark_break":
        result = markStudentBreak(payload.id, payload.branch, payload.month);
        break;
      case "mark_discontinued":
        result = markStudentDiscontinued(
          payload.id,
          payload.branch,
          payload.month,
        );
        break;
      // Development Fund Actions
      case "get_dev_fund":
        result = getDevelopmentFundDataUnified();
        break;
      case "add_dev_expense":
        result = addDevelopmentExpense(
          payload.month,
          payload.title,
          payload.description,
          payload.scope,
          payload.amount,
        );
        break;
      case "delete_dev_expense":
        result = deleteDevelopmentExpense(payload.expenseId);
        break;
      // Referral Credits Actions
      case "get_referral_credits":
        result = getReferralCredits(payload.branch);
        break;
      case "add_referral_credit":
        result = addReferralCredit(
          payload.branch,
          payload.studentId,
          payload.amount,
          payload.reason,
          payload.usedInMonth,
          payload.usedDate,
          payload.description,
        );
        break;
      case "apply_referral_credit":
        result = applyReferralCredit(
          payload.creditId,
          payload.branch,
          payload.month,
        );
        break;
      case "get_student_credits":
        result = getStudentAvailableCredits(payload.studentId, payload.branch);
        break;
      case "mark_paid_with_credit":
        result = markStudentPaidWithCredit(
          payload.id,
          payload.branch,
          payload.month,
          payload.creditId,
        );
        break;
      // Financial Summary
      case "get_financial_summary":
        result = getFinancialSummary(payload.branch, payload.month);
        break;
      
      case "mark_non_recurring_paid":
        result = markNonRecurringFeePaid(
          payload.studentId,
          payload.branch,
          payload.feeType
        );
        break;

      // Birthday Actions
      case "get_upcoming_birthdays":
        result = getUpcomingBirthdays();
        break;
      
      // Debug - show raw fees data structure
      case "debug_fees":
        result = debugFeesSheet(payload.branch);
        break;
        
      default:
        throw new Error("Unknown action: " + payload.action);
    }

    return jsonResponse({ success: true, data: result });
  } catch (error) {
    return jsonResponse({ success: false, error: error.message });
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// ============================================
// STUDENT FUNCTIONS
// ============================================
function getStudentsWithPaymentStatus(branch, month) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  const dbSheet = ss.getSheetByName(config.db);
  const feesSheet = ss.getSheetByName(config.fees);
  const refSheet = ss.getSheetByName(config.refCredits);

  if (!dbSheet) throw new Error("DB sheet not found: " + config.db);
  if (!feesSheet) throw new Error("Fees sheet not found: " + config.fees);

  const dbData = dbSheet.getDataRange().getValues();
  const feesData = feesSheet.getDataRange().getValues();
  
  // DYNAMIC JAN COLUMN DETECTION - Use shared helper function
  const janColIndex = getJanColumnIndex(feesSheet);

  // Get Credits used in this month
  const creditsMap = {}; // studentId -> totalCreditAmount
  if (refSheet) {
    const refData = refSheet.getDataRange().getValues();
    for (let i = 1; i < refData.length; i++) {
      // Columns: 1=StudentId, 3=Amount, 6=UsedInMonth
      const cStudentId = String(refData[i][1]).trim();
      const cAmount = Number(refData[i][3]) || 0;
      const cUsedMonth = refData[i][6];

      // Check if used in this specific month
      if (
        cUsedMonth !== "" &&
        cUsedMonth !== undefined &&
        cUsedMonth !== null &&
        parseInt(cUsedMonth) === month
      ) {
        if (!creditsMap[cStudentId]) creditsMap[cStudentId] = 0;
        creditsMap[cStudentId] += cAmount;
      }
    }
  }

  // Build payment lookup
  const paymentLookup = {};
  for (let i = 1; i < feesData.length; i++) {
    const id = String(feesData[i][0]).trim();
    const year = String(feesData[i][3]).trim();
    if (id && year === CONFIG.year) {
      paymentLookup[id] = feesData[i];
    }
  }

  const students = [];
  // Use dynamically detected Jan column + month offset
  const monthCol = janColIndex + month;

  for (let i = 1; i < dbData.length; i++) {
    const row = dbData[i];
    const id = String(row[0]).trim();
    if (!id) continue;

    // 0=SKF_ID, 1=Student_Name, 2=Parent_Guardian, 3=Status, 4=Monthly_Fee,
    // 5=Phone, 6=WhatsApp, 7=Date_of_Birth, 8=Email, 9=JoinMonth, 10=EndMonth
    // 11=AdmFee, 12=AdmStatus, 13=DressFee, 14=DressCost, 15=DressStatus
    const joinMonth = parseInt(row[9]) || 0;
    const endMonth =
      row[10] !== "" && row[10] !== undefined ? parseInt(row[10]) : -1;
      
    // New Fee Data
    const admissionFee = Number(row[11]) || 0;
    const admissionStatus = String(row[12]).trim() || "Pending";
    const dressFee = Number(row[13]) || 0;
    const dressCost = Number(row[14]) || 0;
    const dressStatus = String(row[15]).trim() || "Pending";

    // Only include students who joined on or before this month
    if (joinMonth > month) continue;

    // Exclude discontinued students for months AFTER their discontinuation
    if (endMonth !== -1 && month > endMonth) continue;

    const feesRow = paymentLookup[id];
    const monthValue = feesRow ? String(feesRow[monthCol]).trim() : "Pending";
    const isPaid = monthValue === "Paid";
    const monthStatus = monthValue || "Pending";

    // Apply credit reduction
    const originalFee =
      row[4] !== undefined && row[4] !== "" ? Number(row[4]) : 500;
    const creditAmount = creditsMap[id] || 0;
    const finalFee = Math.max(0, originalFee - creditAmount);

    students.push({
      id: id,
      name: row[1] || "",
      parentName: row[2] || "",
      status: String(row[3]).trim() || "Active",
      fee: finalFee, // Reduced fee
      originalFee: originalFee, // Track original
      creditApplied: creditAmount, // Track credit
      phone: row[5] || "",
      whatsapp: row[6] || "",
      dateOfBirth: row[7] instanceof Date ? row[7].toISOString().split('T')[0] : String(row[7] || ""),
      email: row[8] || "",
      paid: isPaid,
      monthStatus: monthStatus,
      joinMonth: joinMonth,
      // New fields
      admissionFee: admissionFee,
      admissionStatus: admissionStatus,
      dressFee: dressFee,
      dressCost: dressCost,
      dressStatus: dressStatus,
    });
  }

  return {
    students: students,
    janColIndex: janColIndex,
    monthCol: monthCol
  };
}

function markStudentPaid(studentId, branch, month) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  const feesSheet = ss.getSheetByName(config.fees);
  if (!feesSheet) throw new Error("Fees sheet not found");

  const data = feesSheet.getDataRange().getValues();

  let studentRow = -1;
  for (let i = 1; i < data.length; i++) {
    const id = String(data[i][0]).trim();
    const year = String(data[i][3]).trim();
    if (id === studentId && year === CONFIG.year) {
      studentRow = i + 1;
      break;
    }
  }

  if (studentRow === -1) throw new Error("Student not found: " + studentId);

  // Use dynamic Jan column detection + 1 for 1-indexed getRange
  const janColIndex = getJanColumnIndex(feesSheet);
  const monthCol = janColIndex + 1 + month;
  feesSheet.getRange(studentRow, monthCol).setValue("Paid");

  return { id: studentId, month: month, status: "paid" };
}

function addNewStudent(payload) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[payload.branch];

  if (!config) throw new Error("Invalid branch: " + payload.branch);

  const dbSheet = ss.getSheetByName(config.db);
  const feesSheet = ss.getSheetByName(config.fees);

  // Use custom SKF ID from payload, or generate if not provided
  const dbData = dbSheet.getDataRange().getValues();
  let newId = payload.id;

  if (!newId) {
    // Auto-generate if no ID provided (fallback)
    let maxNum = 0;
    for (let i = 1; i < dbData.length; i++) {
      const id = String(dbData[i][0]);
      if (id.startsWith(config.prefix)) {
        const num = parseInt(id.replace(config.prefix, ""));
        if (num > maxNum) maxNum = num;
      }
    }
    newId = config.prefix + String(maxNum + 1).padStart(3, "0");
  }

  // Check if ID already exists
  for (let i = 1; i < dbData.length; i++) {
    if (String(dbData[i][0]).trim() === newId) {
      throw new Error("SKF ID already exists: " + newId);
    }
  }

  // Get join month (default to current month)
  const joinMonth =
    payload.joinMonth !== undefined ? payload.joinMonth : new Date().getMonth();

  // Add to DB: SKF_ID, Student_Name, Parent_Guardian, Status, Monthly_Fee, Phone, WhatsApp, Date_of_Birth, Email, JoinMonth, EndMonth
  dbSheet.appendRow([
    newId,
    payload.name,
    payload.parentName || "",
    "Active",
    payload.fee,
    payload.phone,
    payload.whatsapp || payload.phone || "", // WhatsApp defaults to phone
    payload.dateOfBirth || "",
    payload.email || "",
    joinMonth,
    "", // EndMonth - empty for new students
    payload.admissionFee || 0,
    payload.admissionPaid ? "Paid" : "Pending",
    payload.dressFee || 0,
    payload.dressCost || 0,
    payload.dressPaid ? "Paid" : "Pending",
  ]);

  // Add to Fees - mark months before joinMonth as "N/A" (not applicable)
  const feesRow = [newId, payload.name, payload.fee, CONFIG.year];
  for (let i = 0; i < 12; i++) {
    if (i < joinMonth) {
      feesRow.push("N/A"); // Student not enrolled yet
    } else {
      feesRow.push("Pending");
    }
  }
  feesSheet.appendRow(feesRow);

  return { id: newId, name: payload.name };
}

function getDashboardStats(branch, month) {
  const result = getStudentsWithPaymentStatus(branch, month);
  const students = result.students;
  const active = students.filter((s) => s.status === "Active");
  const paid = active.filter((s) => s.paid);

  return {
    totalStudents: students.length,
    activeStudents: active.length,
    paidCount: paid.length,
    pendingCount: active.length - paid.length,
    collectionRate:
      active.length > 0 ? Math.round((paid.length / active.length) * 100) : 0,
    totalCollected: paid.reduce((sum, s) => sum + (s.fee || 0), 0),
    pendingAmount: active
      .filter((s) => !s.paid)
      .reduce((sum, s) => sum + (s.fee || 0), 0),
  };
}

function getBranchCounts() {
  const ss = getSpreadsheet();
  const heroSheet = ss.getSheetByName("DB_Herohalli");
  const mpSheet = ss.getSheetByName("DB_MP");

  return {
    herohalli: heroSheet ? Math.max(0, heroSheet.getLastRow() - 1) : 0,
    mp: mpSheet ? Math.max(0, mpSheet.getLastRow() - 1) : 0,
  };
}

/**
 * Mark a student as on Break for a specific month
 */
function markStudentBreak(studentId, branch, month) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch] || CONFIG.branches["Herohalli"];
  const feesSheet = ss.getSheetByName(config.fees);
  const dbSheet = ss.getSheetByName(config.db);

  if (!feesSheet) throw new Error("Fees sheet not found for " + branch);

  // Find student in Fees sheet
  const feesData = feesSheet.getDataRange().getValues();
  let studentRow = -1;

  for (let i = 1; i < feesData.length; i++) {
    if (String(feesData[i][0]).trim() === studentId) {
      studentRow = i + 1;
      break;
    }
  }

  // If not found in fees, find in DB and add to fees
  if (studentRow === -1) {
    if (!dbSheet) throw new Error("DB sheet not found for " + branch);
    const dbData = dbSheet.getDataRange().getValues();
    let studentName = "";
    let studentFee = 500;
    let foundInDb = false;

    for (let i = 1; i < dbData.length; i++) {
      if (String(dbData[i][0]).trim() === studentId) {
        studentName = dbData[i][1];
        // Fee is at index 4
        const feeVal = dbData[i][4];
        studentFee =
          feeVal !== undefined && feeVal !== "" ? Number(feeVal) : 500;
        foundInDb = true;
        break;
      }
    }

    if (!foundInDb) throw new Error("Student not found in DB: " + studentId);

    // Create new fee row
    const newFeeRow = [studentId, studentName, studentFee, CONFIG.year];
    // Fill previous months with "N/A" or "Pending"?
    // Since we don't know history, let's mark current month "Break" and others "Pending"
    for (let i = 0; i < 12; i++) {
      newFeeRow.push("Pending");
    }
    feesSheet.appendRow(newFeeRow);
    studentRow = feesSheet.getLastRow();
  }

  // Mark status as "Break"
  const janColIndex = getJanColumnIndex(feesSheet);
  const monthCol = janColIndex + 1 + month;
  feesSheet.getRange(studentRow, monthCol).setValue("Break");

  return { id: studentId, month: month, status: "break" };
}

/**
 * Mark a student as Discontinued
 */
function markStudentDiscontinued(studentId, branch, month) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch] || CONFIG.branches["Herohalli"];
  const feesSheet = ss.getSheetByName(config.fees);
  const dbSheet = ss.getSheetByName(config.db);

  if (!feesSheet) throw new Error("Fees sheet not found for " + branch);
  if (!dbSheet) throw new Error("DB sheet not found for " + branch);

  // 1. Update Fees Sheet (find or create row)
  const feesData = feesSheet.getDataRange().getValues();
  let studentRow = -1;

  for (let i = 1; i < feesData.length; i++) {
    if (String(feesData[i][0]).trim() === studentId) {
      studentRow = i + 1;
      break;
    }
  }

  // If not in fees sheet, create a row so we can mark it Discontinued
  if (studentRow === -1) {
    // Find name/fee from DB for consistency
    const dbData = dbSheet.getDataRange().getValues();
    let studentName = "";
    let studentFee = 500;

    for (let i = 1; i < dbData.length; i++) {
      if (String(dbData[i][0]).trim() === studentId) {
        studentName = dbData[i][1];
        // Fee is at index 4
        const feeVal = dbData[i][4];
        studentFee =
          feeVal !== undefined && feeVal !== "" ? Number(feeVal) : 500;
        break;
      }
    }

    const newFeeRow = [
      studentId,
      studentName || "Unknown",
      studentFee,
      CONFIG.year,
    ];
    for (let i = 0; i < 12; i++) {
      newFeeRow.push("Pending");
    }
    feesSheet.appendRow(newFeeRow);
    studentRow = feesSheet.getLastRow();
  }

  // Mark the current month as Discontinued in Fees sheet
  const janColIndex = getJanColumnIndex(feesSheet);
  const monthCol = janColIndex + 1 + month;
  feesSheet.getRange(studentRow, monthCol).setValue("Discontinued");

  // 2. Update Status AND EndMonth in DB sheet
  const dbData = dbSheet.getDataRange().getValues();
  let dbRow = -1;

  for (let i = 1; i < dbData.length; i++) {
    if (String(dbData[i][0]).trim() === studentId) {
      dbRow = i + 1;
      // Column 4 is Status (1-based index for getRange)
      dbSheet.getRange(dbRow, 4).setValue("Discontinued");
      // Column 11 is EndMonth (1-based index for getRange)
      dbSheet.getRange(dbRow, 11).setValue(month);
      break;
    }
  }

  if (dbRow === -1) {
    throw new Error("Student not found in DB: " + studentId);
  }

  return { id: studentId, month: month, status: "discontinued" };
}
/**
 * Mark a non-recurring fee (Admission or Dress) as Paid
 */
function markNonRecurringFeePaid(studentId, branch, feeType) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch];
  
  if (!config) throw new Error("Invalid branch: " + branch);
  
  const dbSheet = ss.getSheetByName(config.db);
  if (!dbSheet) throw new Error("DB sheet not found");
  
  const data = dbSheet.getDataRange().getValues();
  const colIndex = feeType === "Admission" ? 12 : 15; // 12=AdmStatus, 15=DressStatus (0-indexed)
  
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === studentId) {
      dbSheet.getRange(i + 1, colIndex + 1).setValue("Paid"); // +1 for 1-based index
      return { success: true };
    }
  }
  
  throw new Error("Student not found");
}

// ============================================
// FINANCIAL SUMMARY FUNCTION
// ============================================

/**
 * Get comprehensive financial summary for bank reconciliation
 */
function getFinancialSummary(branch, month) {
  // Handle "Overall" request - Recursively aggregate both branches
  if (branch === "Overall" || branch === "Both") {
    const hStats = getFinancialSummary("Herohalli", month);
    const mStats = getFinancialSummary("MPSC", month);
    
    // Merge yearly breakdown
    const mergedBreakdown = [];
    for (let i = 0; i < 12; i++) {
        const hMonth = hStats.yearlyBreakdown[i] || {};
        const mMonth = mStats.yearlyBreakdown[i] || {};
        
        mergedBreakdown.push({
            month: hMonth.month || mMonth.month,
            revenue: (hMonth.revenue || 0) + (mMonth.revenue || 0),
            devFund: (hMonth.devFund || 0) + (mMonth.devFund || 0),
            expenses: (hMonth.expenses || 0) + (mMonth.expenses || 0),
            net: (hMonth.net || 0) + (mMonth.net || 0),
            cumulativeRevenue: (hMonth.cumulativeRevenue || 0) + (mMonth.cumulativeRevenue || 0),
            cumulativeBank: (hMonth.cumulativeBank || 0) + (mMonth.cumulativeBank || 0)
        });
    }

    return {
      month: month,
      branch: "Overall",
      expectedRevenue: hStats.expectedRevenue + mStats.expectedRevenue,
      actualReceived: hStats.actualReceived + mStats.actualReceived,
      devFundAllocation: hStats.devFundAllocation + mStats.devFundAllocation,
      devFundSpent: hStats.devFundSpent + mStats.devFundSpent,
      devFundBalance: hStats.devFundBalance + mStats.devFundBalance,
      availableBalance: hStats.availableBalance + mStats.availableBalance,
      totalContributions: hStats.totalContributions + mStats.totalContributions,
      admissionCollected: hStats.admissionCollected + mStats.admissionCollected,
      dressProfit: hStats.dressProfit + mStats.dressProfit,
      
      activeStudents: hStats.activeStudents + mStats.activeStudents,
      paidStudents: hStats.paidStudents + mStats.paidStudents,
      pendingStudents: hStats.pendingStudents + mStats.pendingStudents,
      expected: hStats.expected + mStats.expected,
      collected: hStats.collected + mStats.collected,
      pending: hStats.pending + mStats.pending,
      creditsApplied: hStats.creditsApplied + mStats.creditsApplied,
      
      // Merge details
      creditDetails: [...hStats.creditDetails, ...mStats.creditDetails],
      
      yearlyBreakdown: mergedBreakdown,
      admissionCollected: hStats.admissionCollected + mStats.admissionCollected,
      dressProfit: hStats.dressProfit + mStats.dressProfit
    };
  }

  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  // Initialize breakdown structure
  const monthlyStats = Array(12).fill(null).map((_, i) => ({
      revenue: 0,
      devFund: 0,
      expenses: 0
  }));

  // 1. Calculate Credits Calculation FIRST
  const refSheet = ss.getSheetByName(config.refCredits);
  const creditsMap = {}; // month -> totalCreditAmount
  let totalCreditsAllTime = 0;
  let creditsApplied = 0; // For the requested period
  const creditDetails = [];

  if (refSheet) {
    const refData = refSheet.getDataRange().getValues();
    for (let i = 1; i < refData.length; i++) {
        // ... (existing credit logic)
      const usedInMonth = refData[i][6];
      if (usedInMonth !== "" && usedInMonth !== undefined && usedInMonth !== null) {
        const m = parseInt(usedInMonth);
        const amount = Number(refData[i][3]) || 0;
        
        if (!creditsMap[m]) creditsMap[m] = 0;
        creditsMap[m] += amount;
        totalCreditsAllTime += amount;

        if (month === -1 || m <= limitMonth) {
          creditsApplied += amount;
          creditDetails.push({
            studentName: refData[i][2],
            amount: amount,
            reason: refData[i][4] || "",
            description: refData[i][8] || "",
            date: refData[i][7] instanceof Date 
              ? refData[i][7].toISOString().split('T')[0] 
              : String(refData[i][7]),
          });
        }
      }
    }
  }

  // 2. Fees and Dev Fund Allocation
  const feesSheet = ss.getSheetByName(config.fees);
  let devFundAllocation = 0;
  let cumulativeAllocation = 0;
  
  // Cumulative Totals
  let totalCollected = 0;
  let totalPending = 0;
  
  const limitMonth = month === -1 ? 11 : month;
  
  if (feesSheet) {
    const feesJanColIndex = getJanColumnIndex(feesSheet);
    const feesData = feesSheet.getDataRange().getValues();

    // Iterate ALL months for breakdown, but totals depend on limitMonth
    for (let m = 0; m < 12; m++) {
      let monthCollected = 0;
      let monthPending = 0;
      const monthCol = feesJanColIndex + m;

      for (let i = 1; i < feesData.length; i++) {
        const row = feesData[i];
        if (!row) continue;
        
        const value = String(row[monthCol] || "").trim().toLowerCase();
        const feeAmount = Number(row[2]) || 0;

        if (value === "paid") {
          monthCollected += feeAmount;
        } else if (value === "pending") {
           // Only count pending if student is active/joined? 
           // Usually the sheet cell "Pending" implies it is due.
           monthPending += feeAmount;
        }
      }

      const monthCredits = creditsMap[m] || 0;
      const monthCash = Math.max(0, monthCollected - monthCredits);
      const allocation = Math.round(monthCash * CONFIG.devFundPercent);

      // Track monthly stats
      monthlyStats[m].revenue = monthCash;
      monthlyStats[m].devFund = allocation;

      if (m <= limitMonth) {
          cumulativeAllocation += allocation;
          totalCollected += monthCollected;
          totalPending += monthPending;
      }

      if (month !== -1 && m === month) {
        devFundAllocation = allocation;
      }
    }

    if (month === -1) {
      devFundAllocation = cumulativeAllocation;
    }
  }

  // 3. Dev Fund Expenses
  let devFundSpent = 0;
  let cumulativeExpenses = 0;
  let devFundBalance = 0;

  const allExpenses = getAllDevelopmentExpenses();

  allExpenses.forEach(expense => {
    const expMonth = expense.month; // 0-based
    const expAmount = expense.amount;
    const expScope = expense.scope || "Herohalli";
    
    let share = 0;
    if (expScope === branch) {
      share = 1;
    } else if (expScope === "Both" || expScope === "Others" || !["Herohalli", "MPSC"].includes(expScope)) {
      share = 0.5;
    }
    
    const weightedAmount = expAmount * share;
    
    if (expMonth >= 0 && expMonth < 12) {
        monthlyStats[expMonth].expenses += weightedAmount;
    }

    if (expense.month <= limitMonth) {
       cumulativeExpenses += weightedAmount;
       // For "cumulative dev fund spent" in the cumulative view
       if (month !== -1) devFundSpent += weightedAmount;
    }

    if (month === -1) {
       devFundSpent += weightedAmount;
    } 
    // Note: Previously we only showed SINGLE month spent if month != -1.
    // Converting to CUMULATIVE:
    // If month selected is Feb, show Jan+Feb expenses.
    // The loop above `if (expense.month <= limitMonth)` handles this accumulation.
    // So `devFundSpent` should be `cumulativeExpenses`.
  });

  if (month !== -1) {
      devFundSpent = cumulativeExpenses; // Enforce cumulative
      devFundAllocation = cumulativeAllocation; // Enforce cumulative
  }

  devFundBalance = cumulativeAllocation - cumulativeExpenses;

  // 4. Calculate Admission & Dress Profit
  let admissionCollected = 0;
  let dressProfit = 0;
  
  const dbSheet = ss.getSheetByName(config.db);
  if (dbSheet) {
    const dbData = dbSheet.getDataRange().getValues();
    for (let i = 1; i < dbData.length; i++) {
        const row = dbData[i];
        const joinMonth = parseInt(row[9]);
        
        // CUMULATIVE LOGIC: Include if joinMonth <= limitMonth
        const matchesRequest = !isNaN(joinMonth) && joinMonth <= limitMonth;
        
        if (matchesRequest) {
            if (String(row[12]).trim() === "Paid") admissionCollected += Number(row[11]) || 0;
            if (String(row[15]).trim() === "Paid") dressProfit += (Number(row[13]) || 0) - (Number(row[14]) || 0);
        }
        
        // Breakdown logic (keeps monthly buckets)
        if (!isNaN(joinMonth) && joinMonth >= 0 && joinMonth < 12) {
             if (String(row[12]).trim() === "Paid") monthlyStats[joinMonth].revenue += Number(row[11]) || 0;
             if (String(row[15]).trim() === "Paid") monthlyStats[joinMonth].revenue += (Number(row[13]) || 0) - (Number(row[14]) || 0);
        }
    }
  }

  // 5. Construct Yearly Breakdown (Unchanged logic, just data source)
  const yearlyBreakdown = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let runRevenue = 0;
  let runBank = 0;

  for (let m = 0; m < 12; m++) {
      const s = monthlyStats[m];
      const netForBank = s.revenue - s.devFund;
      
      runRevenue += s.revenue;
      runBank += netForBank; 
      
      yearlyBreakdown.push({
          month: monthNames[m],
          revenue: s.revenue,
          devFund: s.devFund,
          expenses: s.expenses,
          net: netForBank,
          cumulativeRevenue: runRevenue,
          cumulativeBank: runBank
      });
  }

  // 6. Student Payment Stats (Live Counts)
  let activeCount = 0;
  let paidCount = 0;
  let pendingCount = 0;

  // For counts, we probably want the SNAPSHOT of the selected month
  // OR the "Number of students involved in this cumulative period"?
  // Typically "Active Students" means "Currently Active".
  // If I select "Feb", I want to know who is active in Feb.
  // Using `limitMonth` to get status:
  const studentsResult = getStudentsWithPaymentStatus(branch, limitMonth); 
  const students = studentsResult.students;
  const active = students.filter((s) => s.status === "Active");
  activeCount = active.length;
  
  // Paid/Pending COUNTS for the *snapshot* or cumulative?
  // User asked for "amounts" to be cumulative.
  // Let's stick to snapshot counts for meaningful "Headcount".
  // "How many paid in Feb" vs "How many paid YTD".
  // YTD Paid Students is count of distinct students?
  // Let's use the snapshot counts from `getStudentsWithPaymentStatus` for consistency with the list view
  // (which shows the selected month's status).
  paidCount = active.filter(s => s.monthStatus === "Paid").length;
  pendingCount = active.filter(s => s.monthStatus === "Pending").length;

  // Reserve Fund Logic (2025 Special)
  const RESERVE_CAP = 30000;
  let reserveUsed = 0;
  
  // Check if Dev Fund is in deficit
  if (devFundBalance < 0) {
      reserveUsed = Math.min(-devFundBalance, RESERVE_CAP);
      devFundBalance += reserveUsed; // Patch up the balance
  }

  // Override financials with CUMULATIVE values calculated above
  const totalExpected = totalCollected + totalPending;
  const totalActualReceived = (totalCollected - creditsApplied) + RESERVE_CAP; // Include Reserve in Bank Deposit
  
  return {
    month: month,
    branch: branch,
    activeStudents: activeCount,
    paidStudents: paidCount,
    pendingStudents: pendingCount,
    expected: totalExpected,
    collected: totalCollected,
    pending: totalPending,
    creditsApplied: creditsApplied, // This was already accumulatd above in Step 1 loop
    creditDetails: creditDetails,
    actualReceived: totalActualReceived,
    devFundAllocation: devFundAllocation,
    devFundSpent: devFundSpent,
    devFundBalance: devFundBalance,
    totalContributions: cumulativeAllocation, // Keep track of raw allocation
    availableBalance: devFundBalance, // same as balance
    yearlyBreakdown: yearlyBreakdown,
    admissionCollected: admissionCollected,
    dressProfit: dressProfit,
    reserveUsed: reserveUsed
  };
}



// ============================================
// DEVELOPMENT FUND FUNCTIONS
// ============================================

/**
 * Get all development expenses from the unified sheet
 */
function getAllDevelopmentExpenses() {
  const ss = getSpreadsheet();
  const devSheet = ss.getSheetByName(CONFIG.devFundSheet || "DevFund");
  const allExpenses = [];
  
  if (!devSheet) return [];
  
  const data = devSheet.getDataRange().getValues();
  // Header: Expense_ID, Month, Year, Title, Description, Branch, Amount, Date_Added
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const id = String(row[0]).trim();
    if (!id) continue;
    
    // Month is 1-based in sheet (1=Jan), 0-based in app (0=Jan)
    const month = (parseInt(row[1]) || 1) - 1;
    
    allExpenses.push({
      id: id,
      month: month,
      year: String(row[2]),
      title: String(row[3]),
      description: String(row[4]),
      scope: String(row[5]) || "Both", // Default to Both if missing
      amount: Number(row[6]) || 0,
      dateAdded: row[7] instanceof Date ? row[7].toISOString() : String(row[7]),
      sourceSheet: CONFIG.devFundSheet,
      rowIndex: i + 1
    });
  }
  
  return allExpenses;
}

/**
 * Get development fund data for a branch (Specific View)
 */
function getDevelopmentFundData(branch) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  const feesSheet = ss.getSheetByName(config.fees);
  const refSheet = ss.getSheetByName(config.refCredits);

  if (!feesSheet) throw new Error("Fees sheet not found: " + config.fees);

  const monthlyData = [];

  // Initialize monthly totals
  for (let m = 0; m < 12; m++) {
    monthlyData.push({
      month: m,
      year: CONFIG.year,
      collected: 0,
      creditsUsed: 0, // NEW field
      devFund: 0,
      spent: 0,
      carryForward: 0,
    });
  }

  // 1. Calculate collected amount per month
  const feesData = feesSheet.getDataRange().getValues();
  const janColIndex = getJanColumnIndex(feesSheet);
  
  for (let i = 1; i < feesData.length; i++) {
    const row = feesData[i];
    const year = String(row[3]).trim();
    if (year !== CONFIG.year) continue;

    const fee = Number(row[2]) || 0;

    for (let m = 0; m < 12; m++) {
      const monthCol = janColIndex + m;
      const status = String(row[monthCol]).trim();
      if (status === "Paid") {
        monthlyData[m].collected += fee;
      }
    }
  }

  // 2. Calculate Credits used per month
  if (refSheet) {
    const refData = refSheet.getDataRange().getValues();
    for (let i = 1; i < refData.length; i++) {
        const usedInMonth = refData[i][6];
        if (usedInMonth !== "" && usedInMonth !== undefined && usedInMonth !== null) {
            const m = parseInt(usedInMonth);
            // Ensure month is within current year context (basic check, data assumed 2026)
            if (m >= 0 && m < 12) {
                const amount = Number(refData[i][3]) || 0;
                monthlyData[m].creditsUsed += amount;
            }
        }
    }
  }

  // 3. Calculate 30% dev fund for each month (on CASH)
  for (let m = 0; m < 12; m++) {
    const cashCollected = Math.max(0, monthlyData[m].collected - monthlyData[m].creditsUsed); // Subtract credits
    monthlyData[m].devFund = Math.round(cashCollected * CONFIG.devFundPercent);
  }

  // 4. Get expenses from DevFund sheet (using helper and filtering for branch)
  const allExpenses = getAllDevelopmentExpenses();
  const branchExpenses = allExpenses.filter(expense => {
    const expScope = expense.scope || "Herohalli";
    if (expScope === branch) {
      return true; // 100% for this branch
    } else if (expScope === "Both" || expScope === "Others") {
      return true; // Shared expense — include in both branches (attributed at 50%)
    }
    return false; // Not for this branch
  });

  branchExpenses.forEach(expense => {
    if (expense.year === CONFIG.year && expense.month >= 0 && expense.month < 12) {
      let amountToAttribute = expense.amount;
      if (expense.scope === "Both" || expense.scope === "Others" || !["Herohalli", "MPSC"].includes(expense.scope)) {
        amountToAttribute = expense.amount * 0.5; // Attribute half of shared expenses
      }
      monthlyData[expense.month].spent += amountToAttribute;
    }
  });

  // 5. Calculate running carry-forward balance
  let runningBalance = 0;
  for (let m = 0; m < 12; m++) {
    runningBalance += monthlyData[m].devFund - monthlyData[m].spent;
    monthlyData[m].carryForward = runningBalance;
  }

  // Calculate totals
  const totalContributions = monthlyData.reduce((sum, m) => sum + m.devFund, 0);
  const totalSpent = monthlyData.reduce((sum, m) => sum + m.spent, 0);
  const availableBalance = totalContributions - totalSpent;

  return {
    branch: branch,
    monthlyBreakdown: monthlyData,
    expenses: branchExpenses, // Only show expenses relevant to this branch's direct view
    totalContributions: totalContributions,
    totalSpent: totalSpent,
    availableBalance: availableBalance,
  };
}

/**
 * Get unified development fund data combining both branches
 */
function getDevelopmentFundDataUnified() {
  const ss = getSpreadsheet();

  // Initialize monthly totals
  const monthlyData = [];
  for (let m = 0; m < 12; m++) {
    monthlyData.push({
      month: m,
      year: CONFIG.year,
      collected: 0,
      creditsUsed: 0, // NEW field
      devFund: 0,
      spent: 0,
      carryForward: 0,
    });
  }

  const allExpenses = getAllDevelopmentExpenses(); // Use the helper function

  // Process both branches for collected fees and credits
  const branches = ["Herohalli", "MPSC"];
  for (const branch of branches) {
    const config = CONFIG.branches[branch];
    if (!config) continue;

    const feesSheet = ss.getSheetByName(config.fees);
    const refSheet = ss.getSheetByName(config.refCredits);

    // 1. Calculate collected amount per month from fees sheet
    if (feesSheet) {
      const feesData = feesSheet.getDataRange().getValues();
      const janColIndex = getJanColumnIndex(feesSheet);
      
      for (let i = 1; i < feesData.length; i++) {
        const row = feesData[i];
        const year = String(row[3]).trim();
        if (year !== CONFIG.year) continue;

        const fee = Number(row[2]) || 0;
        for (let m = 0; m < 12; m++) {
          const monthCol = janColIndex + m;
          const status = String(row[monthCol]).trim();
          if (status === "Paid") {
            monthlyData[m].collected += fee;
          }
        }
      }
    }

    // 2. Calculate Credits used per month
    if (refSheet) {
        const refData = refSheet.getDataRange().getValues();
        for (let i = 1; i < refData.length; i++) {
            const usedInMonth = refData[i][6];
            if (usedInMonth !== "" && usedInMonth !== undefined && usedInMonth !== null) {
                const m = parseInt(usedInMonth);
                if (m >= 0 && m < 12) {
                    const amount = Number(refData[i][3]) || 0;
                    monthlyData[m].creditsUsed += amount;
                }
            }
        }
    }
  }

  // 3. Distribute expenses to monthly data (unified view)
  allExpenses.forEach(expense => {
    if (expense.year === CONFIG.year && expense.month >= 0 && expense.month < 12) {
      let amountToAttribute = expense.amount;
      const expScope = expense.scope || "Herohalli"; // Default to Herohalli if missing

      // For unified view, we need to sum up the actual expense, not a split.
      // The split logic is for individual branch views.
      // If an expense is "Both", it's still a single expense from the total fund.
      // So, we just add the full amount.
      monthlyData[expense.month].spent += amountToAttribute;
    }
  });

  // 4. Calculate 30% dev fund for each month (on CASH)
  for (let m = 0; m < 12; m++) {
    const cashCollected = Math.max(0, monthlyData[m].collected - monthlyData[m].creditsUsed);
    monthlyData[m].devFund = Math.round(cashCollected * CONFIG.devFundPercent);
  }

  // 5. Calculate running carry-forward balance
  let runningBalance = 0;
  for (let m = 0; m < 12; m++) {
    runningBalance += monthlyData[m].devFund - monthlyData[m].spent;
    monthlyData[m].carryForward = runningBalance;
  }

  // Calculate totals
  const totalContributions = monthlyData.reduce((sum, m) => sum + m.devFund, 0);
  const totalSpent = monthlyData.reduce((sum, m) => sum + m.spent, 0);
  const availableBalance = totalContributions - totalSpent;

  return {
    branch: "All",
    monthlyBreakdown: monthlyData,
    expenses: allExpenses,
    totalContributions: totalContributions,
    totalSpent: totalSpent,
    availableBalance: availableBalance,
  };
}

/**
 * Add a new expense to the development fund
 * Now stores in Herohalli DevFund sheet with scope field
 */
function addDevelopmentExpense(month, title, description, scope, amount) {
  const ss = getSpreadsheet();
  const devFundSheetName = CONFIG.devFundSheet || "DevFund";

  let devFundSheet = ss.getSheetByName(devFundSheetName);

  // Create sheet if it doesn't exist with updated columns
  if (!devFundSheet) {
    devFundSheet = ss.insertSheet(devFundSheetName);
    devFundSheet
      .getRange(1, 1, 1, 8)
      .setValues([
        [
          "Expense_ID",
          "Month",
          "Year",
          "Title",
          "Description",
          "Scope", // Changed from "Branch" to "Scope" for consistency
          "Amount",
          "Date_Added",
        ],
      ]);
    devFundSheet.getRange(1, 1, 1, 8).setFontWeight("bold");
  }

  // Generate new expense ID
  const data = devFundSheet.getDataRange().getValues();
  let maxNum = 0;
  const prefix = "DEV-";

  for (let i = 1; i < data.length; i++) {
    const id = String(data[i][0]);
    if (id.startsWith(prefix)) {
      const numPart = id.replace(/DEV-[A-Z]?-?/, "");
      const num = parseInt(numPart);
      if (num > maxNum) maxNum = num;
    }
  }

  const newId = prefix + String(maxNum + 1).padStart(3, "0");
  const dateAdded = new Date().toISOString().split("T")[0];

  // Add expense row with new structure
  // Month is 0-based in app, 1-based in sheet
  devFundSheet.appendRow([
    newId,
    month + 1, 
    CONFIG.year,
    title,
    description,
    scope,
    amount,
    dateAdded,
  ]);

  return {
    id: newId,
    month: month,
    year: CONFIG.year,
    title: title,
    description: description,
    scope: scope,
    amount: amount,
    dateAdded: dateAdded,
  };
}

/**
 * Delete a development expense
 */
function deleteDevelopmentExpense(expenseId) {
  const ss = getSpreadsheet();
  const devSheet = ss.getSheetByName(CONFIG.devFundSheet || "DevFund");
  
  if (!devSheet) throw new Error("Development Fund sheet not found");

  const data = devSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === expenseId) {
      devSheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  
  throw new Error("Expense not found");
}

// ============================================
// REFERRAL CREDITS FUNCTIONS
// ============================================

/**
 * Get all referral credits for a branch
 */
function getReferralCredits(branch) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  const refSheet = ss.getSheetByName(config.refCredits);
  if (!refSheet) {
    return { credits: [], totalUnused: 0, totalUsed: 0 };
  }

  const data = refSheet.getDataRange().getValues();
  const credits = [];
  let totalUnused = 0;
  let totalUsed = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const creditId = String(row[0]).trim();
    if (!creditId) continue;

    const amount = Number(row[3]) || 0;
    const usedInMonth = row[6];
    const isUsed =
      usedInMonth !== "" && usedInMonth !== undefined && usedInMonth !== null;

    if (isUsed) {
      totalUsed += amount;
    } else {
      totalUnused += amount;
    }

    credits.push({
      id: creditId,
      studentId: row[1] || "",
      studentName: row[2] || "",
      amount: amount,
      reason: row[4] || "",
      dateEarned: row[5] || "",
      usedInMonth: isUsed ? parseInt(usedInMonth) : null,
      usedDate: row[7] || "",
      isUsed: isUsed,
      description: row[8] || "",
    });
  }

  return {
    credits: credits,
    totalUnused: totalUnused,
    totalUsed: totalUsed,
  };
}

/**
 * Add a new referral credit for a student
 */
function addReferralCredit(
  branch,
  studentId,
  amount,
  reason,
  usedInMonth,
  usedDate,
  description,
) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  // Find student name from DB
  const dbSheet = ss.getSheetByName(config.db);
  if (!dbSheet) throw new Error("DB sheet not found");

  const dbData = dbSheet.getDataRange().getValues();
  let studentName = "";

  for (let i = 1; i < dbData.length; i++) {
    if (String(dbData[i][0]).trim() === studentId) {
      studentName = dbData[i][1] || "";
      break;
    }
  }

  if (!studentName) throw new Error("Student not found: " + studentId);

  // Get or create ref credits sheet
  let refSheet = ss.getSheetByName(config.refCredits);
  if (!refSheet) {
    refSheet = ss.insertSheet(config.refCredits);
    refSheet
      .getRange(1, 1, 1, 9)
      .setValues([
        [
          "Credit_ID",
          "Student_ID",
          "Student_Name",
          "Amount",
          "Reason",
          "Date_Earned",
          "Used_In_Month",
          "Used_Date",
          "Description",
        ],
      ]);
    refSheet.getRange(1, 1, 1, 9).setFontWeight("bold");
  }

  // Generate new credit ID
  const data = refSheet.getDataRange().getValues();
  let maxNum = 0;
  const prefix = branch === "Herohalli" ? "REF-H-" : "REF-M-";

  for (let i = 1; i < data.length; i++) {
    const id = String(data[i][0]);
    if (id.startsWith(prefix)) {
      const num = parseInt(id.replace(prefix, ""));
      if (num > maxNum) maxNum = num;
    }
  }

  const newId = prefix + String(maxNum + 1).padStart(3, "0");
  const dateEarned = new Date().toISOString().split("T")[0];
  const creditAmount = amount || CONFIG.defaultReferralCredit;

  // Handle used data
  const isUsed =
    usedInMonth !== undefined && usedInMonth !== null && usedInMonth !== "";
  const usedMonthVal = isUsed ? usedInMonth : "";
  const usedDateVal = isUsed ? usedDate || dateEarned : "";

  // Add credit row
  refSheet.appendRow([
    newId,
    studentId,
    studentName,
    creditAmount,
    reason || "",
    dateEarned,
    usedMonthVal,
    usedDateVal,
    description || "",
  ]);

  return {
    id: newId,
    studentId: studentId,
    studentName: studentName,
    amount: creditAmount,
    reason: reason || "",
    dateEarned: dateEarned,
    isUsed: isUsed,
  };
}

/**
 * Apply (use) a referral credit
 */
function applyReferralCredit(creditId, branch, month) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  const refSheet = ss.getSheetByName(config.refCredits);
  if (!refSheet) throw new Error("Referral credits sheet not found");

  const data = refSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === creditId) {
      // Check if already used
      if (
        data[i][6] !== "" &&
        data[i][6] !== undefined &&
        data[i][6] !== null
      ) {
        throw new Error("Credit already used in month " + data[i][6]);
      }

      const usedDate = new Date().toISOString().split("T")[0];
      refSheet.getRange(i + 1, 7).setValue(month); // Used_In_Month
      refSheet.getRange(i + 1, 8).setValue(usedDate); // Used_Date

      return {
        id: creditId,
        usedInMonth: month,
        usedDate: usedDate,
      };
    }
  }

  throw new Error("Credit not found: " + creditId);
}

/**
 * Get available (unused) credits for a specific student
 */
function getStudentAvailableCredits(studentId, branch) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  const refSheet = ss.getSheetByName(config.refCredits);
  if (!refSheet) {
    return { credits: [], totalAvailable: 0 };
  }

  const data = refSheet.getDataRange().getValues();
  const credits = [];
  let totalAvailable = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const rowStudentId = String(row[1]).trim();
    const creditId = String(row[0]).trim();

    if (!creditId || rowStudentId !== studentId) continue;

    // Check if unused
    const usedInMonth = row[6];
    const isUsed =
      usedInMonth !== "" && usedInMonth !== undefined && usedInMonth !== null;

    if (!isUsed) {
      const amount = Number(row[3]) || 0;
      totalAvailable += amount;

      credits.push({
        id: creditId,
        amount: amount,
        reason: row[4] || "",
        dateEarned: row[5] || "",
      });
    }
  }

  return {
    credits: credits,
    totalAvailable: totalAvailable,
  };
}

/**
 * Mark student as paid with a referral credit applied
 */
function markStudentPaidWithCredit(studentId, branch, month, creditId) {
  // First, mark the student as paid
  const paymentResult = markStudentPaid(studentId, branch, month);

  // Then, apply the credit
  if (creditId) {
    const creditResult = applyReferralCredit(creditId, branch, month);
    return {
      ...paymentResult,
      creditApplied: creditResult,
    };
  }

  return paymentResult;
}

// ============================================
// DEBUG FUNCTION - Check Fees Sheet Structure
// ============================================
function debugFeesSheet(branch) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch] || CONFIG.branches["Herohalli"];
  
  const feesSheet = ss.getSheetByName(config.fees);
  if (!feesSheet) {
    return { error: "Fees sheet not found: " + config.fees };
  }
  
  const feesData = feesSheet.getDataRange().getValues();
  const headers = feesData[0];
  
  // Find Jan column by looking at headers
  let janColIndex = -1;
  for (let i = 0; i < headers.length; i++) {
    if (String(headers[i]).trim().toLowerCase() === "jan") {
      janColIndex = i;
      break;
    }
  }
  
  // Get first 3 data rows with all their data
  const sampleRows = [];
  for (let i = 1; i < Math.min(4, feesData.length); i++) {
    const row = feesData[i];
    sampleRows.push({
      id: row[0],
      name: row[1],
      fee: row[2],
      year: row[3],
      col4_value: row[4],
      col5_value: row[5],
      janCol_value: janColIndex >= 0 ? row[janColIndex] : "not found"
    });
  }
  
  return {
    sheetName: config.fees,
    totalColumns: headers.length,
    headers: headers,
    configMonthStart: CONFIG.monthStart,
    janColumnIndex: janColIndex,
    expectedJanIndex: CONFIG.monthStart,
    mismatch: janColIndex !== CONFIG.monthStart,
    sampleRows: sampleRows
  };
}

// ============================================
// MENU FOR EASY ACCESS
// ============================================
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🥋 SKF Karate")
    .addItem("Setup All Sheets", "setupAllSheets")
    .addItem("Add Sample Data", "addSampleData")
    .addItem("Setup Birthday Notifications", "setupBirthdayTrigger") // Add menu item
    .addToUi();
}

// ============================================
// BIRTHDAY NOTIFICATIONS
// ============================================

function getUpcomingBirthdays() {
  const ss = getSpreadsheet();
  const today = new Date();
  // Normalize today to midnight for consistent comparison
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const results = [];
  const branches = ["Herohalli", "MPSC"];
  
  branches.forEach(branch => {
    const config = CONFIG.branches[branch];
    const dbSheet = ss.getSheetByName(config.db);
    if (!dbSheet) return;
    
    // Get all data
    const data = dbSheet.getDataRange().getValues();
    
    // 0=ID, 1=Name, 3=Status, 7=DOB
    for (let i = 1; i < data.length; i++) {
        const studentId = String(data[i][0]).trim();
        if (!studentId) continue;
        
        const status = String(data[i][3]).trim();
        // Only notify for Active students
        if (status !== 'Active') continue;
        
        const rawDOB = data[i][7];
        // Ensure it's a date object
        if (!rawDOB || !(rawDOB instanceof Date)) continue;
        
        const birthMonth = rawDOB.getMonth();
        const birthDate = rawDOB.getDate();
        
        // Calculate next birthday
        const currentYear = today.getFullYear();
        let nextBday = new Date(currentYear, birthMonth, birthDate);
        
        // If passed this year, look at next year
        if (nextBday < todayMid) {
            nextBday.setFullYear(currentYear + 1);
        }
        
        // Calculate diff in days
        const diffTime = nextBday - todayMid;
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
        
        // Check availability (within next 7 days)
        if (diffDays >= 0 && diffDays <= 7) {
            results.push({
                name: data[i][1],
                branch: branch,
                id: studentId,
                date: nextBday.toISOString(),
                originalDate: rawDOB.toISOString(),
                day: birthDate,
                month: nextBday.toLocaleString('en-US', { month: 'short' }),
                turningAge: nextBday.getFullYear() - rawDOB.getFullYear(),
                daysUntil: diffDays
            });
        }
    }
  });
  
  // Sort by closest first
  results.sort((a, b) => a.daysUntil - b.daysUntil);
  return results;
}

function checkBirthdaysAndNotify() {
  const upcoming = getUpcomingBirthdays();
  // Filter for: 7 days, 2 days, 0 days
  const notifyList = upcoming.filter(s => s.daysUntil === 7 || s.daysUntil === 2 || s.daysUntil === 0);
  
  if (notifyList.length === 0) return;
  
  // Send email to the effective user (script owner/runner)
  const recipient = Session.getActiveUser().getEmail();
  
  if (!recipient) {
    Logger.log("No recipient email found.");
    return;
  }
  
  let subject = `🎂 Upcoming Birthdays Alert - ${notifyList.length} Student(s)`;
  let body = "Upcoming Student Birthdays:\n\n";
  
  notifyList.forEach(s => {
      let timeline = "";
      if (s.daysUntil === 0) timeline = "TODAY! 🎉";
      else if (s.daysUntil === 1) timeline = "Tomorrow";
      else timeline = `in ${s.daysUntil} days`;
      
      body += `• ${s.name} (${s.branch}) - ${timeline} (Turning ${s.turningAge})\n`;
  });
  
  body += "\nSKF Feetracker System";
  
  MailApp.sendEmail(recipient, subject, body);
}

function setupBirthdayTrigger() {
  // Delete existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "checkBirthdaysAndNotify") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Create new daily trigger at 8 AM
  ScriptApp.newTrigger("checkBirthdaysAndNotify")
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
    
  return "Birthday notification trigger setup complete (Daily at 8 AM).";
}
