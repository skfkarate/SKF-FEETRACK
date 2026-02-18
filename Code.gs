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

  // Create Development Fund sheets for tracking 30% allocation expenses
  createSheetIfNotExists(ss, "DevFund_Herohalli", [
    "Expense_ID",
    "Month",
    "Year",
    "Description",
    "Amount",
    "Date_Added",
  ]);
  createSheetIfNotExists(ss, "DevFund_MP", [
    "Expense_ID",
    "Month",
    "Year",
    "Description",
    "Amount",
    "Date_Added",
  ]);

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

/**
 * Helper: Get the active spreadsheet with a clear error if unavailable.
 * In a container-bound script, getActiveSpreadsheet() should always work.
 * If it fails, it means the script is not bound to a sheet or was run from a standalone context.
 */
function getSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error(
      "No active spreadsheet found. Ensure this script is bound to a Google Sheet (Extensions > Apps Script)."
    );
  }
  return ss;
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

    // Column indices for 11-column structure:
    // 0=SKF_ID, 1=Student_Name, 2=Parent_Guardian, 3=Status, 4=Monthly_Fee,
    // 5=Phone, 6=WhatsApp, 7=Date_of_Birth, 8=Email, 9=JoinMonth, 10=EndMonth
    const joinMonth = parseInt(row[9]) || 0;
    const endMonth =
      row[10] !== "" && row[10] !== undefined ? parseInt(row[10]) : -1;

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
      status: row[3] || "Active",
      fee: finalFee, // Reduced fee
      originalFee: originalFee, // Track original
      creditApplied: creditAmount, // Track credit
      phone: row[5] || "",
      whatsapp: row[6] || "",
      dateOfBirth: row[7] || "",
      email: row[8] || "",
      paid: isPaid,
      monthStatus: monthStatus,
      joinMonth: joinMonth,
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
  const students = getStudentsWithPaymentStatus(branch, month);
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

// ============================================
// FINANCIAL SUMMARY FUNCTION
// ============================================

/**
 * Get comprehensive financial summary for bank reconciliation
 */
function getFinancialSummary(branch, month) {
  const ss = getSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  // 1. Calculate Credits Calculation FIRST to use in Dev Fund
  const refSheet = ss.getSheetByName(config.refCredits);
  const creditsMap = {}; // month -> totalCreditAmount
  let totalCreditsAllTime = 0;
  let creditsApplied = 0; // For the requested period
  const creditDetails = [];

  if (refSheet) {
    const refData = refSheet.getDataRange().getValues();
    for (let i = 1; i < refData.length; i++) {
      const usedInMonth = refData[i][6];
      if (
        usedInMonth !== "" &&
        usedInMonth !== undefined &&
        usedInMonth !== null
      ) {
        const m = parseInt(usedInMonth);
        const amount = Number(refData[i][3]) || 0;
        
        // Add to map
        if (!creditsMap[m]) creditsMap[m] = 0;
        creditsMap[m] += amount;
        totalCreditsAllTime += amount;

        // If specific period matched
        if (month === -1 || m === month) {
          creditsApplied += amount;
          creditDetails.push({
            studentName: refData[i][2],
            amount: amount,
            date: refData[i][7], // Used date
          });
        }
      }
    }
  }

  // 2. Fees and Dev Fund Allocation
  const feesSheet = ss.getSheetByName(config.fees);
  let devFundAllocation = 0;
  let cumulativeAllocation = 0;
  const limitMonth = month === -1 ? 11 : month; // Iterate up to current request
  
  if (feesSheet) {
    const feesJanColIndex = getJanColumnIndex(feesSheet);
    const feesData = feesSheet.getDataRange().getValues();

    for (let m = 0; m <= limitMonth; m++) {
      let monthCollected = 0;
      const monthCol = feesJanColIndex + m;

      for (let i = 1; i < feesData.length; i++) {
        const value = String(feesData[i][monthCol] || "").trim();
        if (value === "Paid" || value === "PAID") {
          monthCollected += Number(feesData[i][2]) || 0;
        }
      }

      // SUBTRACT CREDITS for this month to get Actual Cash
      const monthCredits = creditsMap[m] || 0;
      const monthCash = Math.max(0, monthCollected - monthCredits);

      const allocation = Math.round(monthCash * CONFIG.devFundPercent);
      cumulativeAllocation += allocation;

      if (month !== -1 && m === month) {
        devFundAllocation = allocation;
      }
    }

    if (month === -1) {
      devFundAllocation = cumulativeAllocation;
    }
  }

  // 3. Dev Fund Expenses
  const devFundSheet = ss.getSheetByName(config.devFund);
  let devFundSpent = 0;
  let cumulativeExpenses = 0;
  let devFundBalance = 0;

  // Replaced with getAllDevelopmentExpenses logic
  const allExpenses = getAllDevelopmentExpenses();
  
  // Calculate expenses for this branch/period

  allExpenses.forEach(expense => {
    const expMonth = expense.month;
    const expAmount = expense.amount;
    const expScope = expense.scope || "Herohalli"; // Default to Herohalli if missing (legacy)
    
    // Determine cost share based on scope
    let share = 0;
    if (expScope === branch) {
      share = 1; // 100%
    } else if (expScope === "Both" || expScope === "Others" || !["Herohalli", "MPSC"].includes(expScope)) {
      share = 0.5; // 50% split for shared
    } else {
      share = 0; // belongs to other branch
    }
    
    const weightedAmount = expAmount * share;

    // For balance: Cumulative up to limit month
    if (expMonth <= limitMonth) {
       cumulativeExpenses += weightedAmount;
    }

    // For "spent this period"
    if (month === -1) {
       devFundSpent += weightedAmount; // YTD
    } else if (expMonth === month) {
       devFundSpent += weightedAmount;
    }
  });

  devFundBalance = cumulativeAllocation - cumulativeExpenses;

  // 4. Student Payment Stats (Live Calculation for display)
  let expected = 0;
  let collected = 0;
  let activeCount = 0;
  let paidCount = 0;

  if (month === -1) {
    // Overall Stats
    const students = getStudentsWithPaymentStatus(branch, 0); 
    const active = students.filter((s) => s.status === "Active");
    activeCount = active.length;
    
    let totalPaidRecords = 0;
    
    const feesLookup = {};
    if (feesSheet) {
      const feesData = feesSheet.getDataRange().getValues();
      for (let i = 1; i < feesData.length; i++) {
        const sid = String(feesData[i][0]).trim();
        if (sid && String(feesData[i][3]).trim() === CONFIG.year) {
          feesLookup[sid] = feesData[i];
        }
      }
    }

    const currentMonthIndex = new Date().getMonth();
    const feesJanColIndex = feesSheet ? getJanColumnIndex(feesSheet) : CONFIG.monthStart;

    active.forEach((student) => {
      const baseFee = student.originalFee || student.fee || 500;
      const joinedAt = student.joinMonth || 0;
      const feeRow = feesLookup[student.id];

      for (let m = 0; m <= currentMonthIndex; m++) {
        if (m < joinedAt) continue;
        expected += baseFee;

        if (feeRow) {
          const colIndex = feesJanColIndex + m;
          const status = String(feeRow[colIndex] || "").trim();
          if (status === "Paid" || status === "PAID") {
            collected += baseFee;
            totalPaidRecords++;
          }
        }
      }
    });
    paidCount = totalPaidRecords;
  } else {
    // Specific Month
    const students = getStudentsWithPaymentStatus(branch, month);
    const active = students.filter((s) => s.status === "Active");
    const paid = active.filter((s) => s.paid);
    activeCount = active.length;
    paidCount = paid.length;
    expected = active.reduce((sum, s) => sum + (s.originalFee || s.fee || 0), 0);
    collected = paid.reduce((sum, s) => sum + (s.originalFee || s.fee || 0), 0);
  }

  // Actual received is collected fees minus credits used
  const actualReceived = collected - creditsApplied;

  return {
    month: month,
    branch: branch,
    activeStudents: activeCount,
    paidStudents: paidCount,
    pendingStudents: activeCount - paidCount,
    expected: expected,
    collected: collected,
    pending: expected - collected,
    creditsApplied: creditsApplied,
    creditDetails: creditDetails,
    actualReceived: actualReceived,
    devFundAllocation: devFundAllocation,
    devFundSpent: devFundSpent,
    devFundBalance: devFundBalance,
  };
}

// ============================================
// DEVELOPMENT FUND FUNCTIONS
// ============================================

/**
 * HELPER: Get all development expenses from all sources (Unified)
 */
function getAllDevelopmentExpenses() {
  const ss = getSpreadsheet();
  const allExpenses = [];
  const branches = ["Herohalli", "MPSC"];
  
  // Track processed IDs to avoid duplicates if we ever merge sheets
  // Currently sheets are separate, so no ID collision expected unless manually duplicated
  
  for (const branch of branches) {
    const config = CONFIG.branches[branch];
    if (!config) continue;
    
    const devFundSheet = ss.getSheetByName(config.devFund);
    if (!devFundSheet) continue;
    
    const devData = devFundSheet.getDataRange().getValues();
    // Detect new format (8 columns) vs old (6 columns)
    // New: ID, Month, Year, Title, Desc, Scope, Amount, Date
    // Old: ID, Month, Year, Desc, Amount, Date
    const headers = devData[0] || [];
    const isNewFormat = headers.length >= 8 && String(headers[5]).toLowerCase().includes('scope');
    
    for (let i = 1; i < devData.length; i++) {
      const row = devData[i];
      const expenseId = String(row[0]).trim();
      if (!expenseId) continue;

      const expenseMonth = parseInt(row[1]) || 0;
      const expenseYear = String(row[2]).trim();
      
      if (expenseYear !== CONFIG.year) continue; // Filter by current year context

      let amount = 0;
      let title = "";
      let description = "";
      let scope = branch; // Default to source branch
      let dateAdded = "";
      
      if (isNewFormat) {
        title = row[3] || "";
        description = row[4] || "";
        scope = row[5] || branch;
        amount = Number(row[6]) || 0;
        dateAdded = row[7] || "";
      } else {
        description = row[3] || "";
        amount = Number(row[4]) || 0;
        dateAdded = row[5] || "";
        scope = branch; // Legacy data inherits branch from sheet name
      }
      
      // Fallback amount check
      if (amount === 0) amount = Number(row[6]) || Number(row[4]) || 0;

      allExpenses.push({
        id: expenseId,
        month: expenseMonth,
        year: expenseYear,
        title: title || description, // Fallback title
        description: description,
        scope: scope,
        amount: amount,
        dateAdded: dateAdded,
        sourceSheet: config.devFund, // metadata for debug/deletion if needed
        rowIndex: i + 1
      });
    }
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
    } else if (expScope === "Both" || expScope === "Others" || !["Herohalli", "MPSC"].includes(expScope)) {
      // For shared expenses, only count half for this branch's specific view
      // This is a design choice for how a "branch specific" view should handle shared costs.
      // For simplicity, we'll include them fully here and let the unified view handle the split.
      // Or, for a true "branch specific" view, we might only show expenses explicitly scoped to it.
      // Let's stick to the original intent of this function: what *this branch* spent.
      // So, only expenses explicitly for this branch, or half of "Both" if we want to attribute.
      // For now, let's assume this function is for *direct* expenses of the branch.
      // If "Both" means 50/50, then this branch's view should reflect its 50% share.
      return false; // This function is for direct expenses, not shared.
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
  const config = CONFIG.branches["Herohalli"]; // Store all in Herohalli sheet

  let devFundSheet = ss.getSheetByName(config.devFund);

  // Create sheet if it doesn't exist with updated columns
  if (!devFundSheet) {
    devFundSheet = ss.insertSheet(config.devFund);
    devFundSheet
      .getRange(1, 1, 1, 8)
      .setValues([
        [
          "Expense_ID",
          "Month",
          "Year",
          "Title",
          "Description",
          "Scope",
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
  devFundSheet.appendRow([
    newId,
    month,
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
 * Delete a development expense (only within 24 hours of creation)
 */
function deleteDevelopmentExpense(expenseId) {
  const ss = getSpreadsheet();

  // Search in both branch sheets
  const branches = ["Herohalli", "MPSC"];
  for (const branch of branches) {
    const config = CONFIG.branches[branch];
    if (!config) continue;

    const devFundSheet = ss.getSheetByName(config.devFund);
    if (!devFundSheet) continue;

    const data = devFundSheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === expenseId) {
        // Check if within 24 hours
        const dateAddedStr = data[i][7] || data[i][5]; // New format col 7, old format col 5
        const dateAdded = new Date(dateAddedStr);
        const now = new Date();
        const hoursDiff = (now.getTime() - dateAdded.getTime()) / (1000 * 60 * 60);

        if (hoursDiff > 24) {
          throw new Error(
            "Cannot delete expense. Expenses can only be deleted within 24 hours of creation.",
          );
        }

        // Delete the row
        devFundSheet.deleteRow(i + 1);

        return { success: true, id: expenseId };
      }
    }
  }

  throw new Error("Expense not found: " + expenseId);
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
      .getRange(1, 1, 1, 8)
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
        ],
      ]);
    refSheet.getRange(1, 1, 1, 8).setFontWeight("bold");
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
    .addToUi();
}
