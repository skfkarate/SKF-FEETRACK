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
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Check if spreadsheet is available
  if (!ss) {
    throw new Error(
      "No active spreadsheet found. Please make sure you're running this script from a Google Sheet (Extensions > Apps Script).",
    );
  }

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
 * Dynamically find the "Jan" column index in a fees sheet
 * This ensures correct month column mapping regardless of sheet structure
 */
function getJanColumnIndex(feesSheet) {
  const headers = feesSheet.getRange(1, 1, 1, feesSheet.getLastColumn()).getValues()[0];
  for (let i = 0; i < headers.length; i++) {
    const header = String(headers[i]).trim().toLowerCase();
    if (header === "jan" || header === "january") {
      return i; // 0-indexed for array access
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
    const month = parseInt(e.parameter.month) || new Date().getMonth();
    const students = getStudentsWithPaymentStatus(branch, month);
    return jsonResponse({ success: true, students: students });
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  const dbSheet = ss.getSheetByName(config.db);
  const feesSheet = ss.getSheetByName(config.fees);
  const refSheet = ss.getSheetByName(config.refCredits);

  if (!dbSheet) throw new Error("DB sheet not found: " + config.db);
  if (!feesSheet) throw new Error("Fees sheet not found: " + config.fees);

  const dbData = dbSheet.getDataRange().getValues();
  const feesData = feesSheet.getDataRange().getValues();
  
  // DYNAMIC JAN COLUMN DETECTION - Find 'Jan' header in fees sheet
  const feesHeaders = feesData[0];
  let janColIndex = CONFIG.monthStart; // fallback to config
  for (let i = 0; i < feesHeaders.length; i++) {
    const header = String(feesHeaders[i]).trim().toLowerCase();
    if (header === "jan" || header === "january") {
      janColIndex = i;
      break;
    }
  }

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

  return students;
}

function markStudentPaid(studentId, branch, month) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  // Calculate development fund metrics
  const devFundSheet = ss.getSheetByName(config.devFund);
  let devFundAllocation = 0;
  let devFundSpent = 0;
  let devFundBalance = 0;

  // Helper to calculate YTD allocation
  const feesSheet = ss.getSheetByName(config.fees);
  let cumulativeAllocation = 0;
  
  // DYNAMIC Jan column detection for feesSheet
  let feesJanColIndex = CONFIG.monthStart;
  if (feesSheet) {
    feesJanColIndex = getJanColumnIndex(feesSheet);
    const feesData = feesSheet.getDataRange().getValues();
    // Calculate till current month (or all months if month is -1)
    const limitMonth = month === -1 ? 11 : month;

    for (let m = 0; m <= limitMonth; m++) {
      let monthCollected = 0;
      const monthCol = feesJanColIndex + m;

      for (let i = 1; i < feesData.length; i++) {
        const value = String(feesData[i][monthCol] || "").trim();
        if (value === "Paid" || value === "PAID") {
          monthCollected += Number(feesData[i][2]) || 0;
        }
      }
      cumulativeAllocation += Math.round(
        monthCollected * CONFIG.devFundPercent,
      );

      // If specific month requested, set allocation for that month
      if (month !== -1 && m === month) {
        devFundAllocation = Math.round(monthCollected * CONFIG.devFundPercent);
      }
    }
    // If overall, allocation is the total cumulative
    if (month === -1) {
      devFundAllocation = cumulativeAllocation;
    }
  }

  if (devFundSheet) {
    const devData = devFundSheet.getDataRange().getValues();
    let cumulativeExpenses = 0;

    for (let i = 1; i < devData.length; i++) {
      const expMonth = Number(devData[i][1]);
      const expAmount = Number(devData[i][4]) || 0;

      // For balance, we always need cumulative expenses up to the limit month
      const limitMonth = month === -1 ? 11 : month;
      if (expMonth <= limitMonth) {
        cumulativeExpenses += expAmount;
      }

      // For "spent this period"
      if (month === -1) {
        devFundSpent += expAmount; // All expenses for YTD
      } else if (expMonth === month) {
        devFundSpent += expAmount; // Specific month expenses
      }
    }

    devFundBalance = cumulativeAllocation - cumulativeExpenses;
  }

  // Handle students and payment data
  let expected = 0;
  let collected = 0;
  let activeCount = 0;
  let paidCount = 0;

  if (month === -1) {
    // Overall / YTD Calculation
    const students = getStudentsWithPaymentStatus(branch, 0); // Using 0 as dummy month just to get list
    const active = students.filter((s) => s.status === "Active");

    activeCount = active.length;
    paidCount = 0;
    
    // Track unique paid student-months for proper counting
    let totalPaidRecords = 0;
    let totalExpectedRecords = 0;

    // Build fees lookup
    const feesLookup = {};
    const feesSheet = ss.getSheetByName(config.fees);

    if (feesSheet) {
      const feesData = feesSheet.getDataRange().getValues();
      for (let i = 1; i < feesData.length; i++) {
        const sid = String(feesData[i][0]).trim();
        const sYear = String(feesData[i][3]).trim();
        if (sid && sYear === CONFIG.year) {
          feesLookup[sid] = feesData[i];
        }
      }
    }

    const currentMonthIndex = new Date().getMonth();

    // Sum up for all active students
    active.forEach((student) => {
      // Use originalFee if available (from DB), else 500
      // Safe bet: use student.originalFee || student.fee
      const baseFee = student.originalFee || student.fee || 500;

      // Join month check
      const joinedAt = student.joinMonth || 0;

      const feeRow = feesLookup[student.id];

      for (let m = 0; m <= currentMonthIndex; m++) {
        // Skip months before joining
        if (m < joinedAt) continue;

        expected += baseFee;
        totalExpectedRecords++;

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
    
    // For YTD, paidCount represents the total number of paid month-records
    // and pendingStudents represents total unpaid month-records
    // We'll set paidCount to totalPaidRecords for accurate reporting
    paidCount = totalPaidRecords;
    // Note: pendingStudents will be calculated as totalExpectedRecords - totalPaidRecords
    // But since the return format expects student counts, we'll leave activeCount as active.length
    // The pending/pendingStudents calculation happens at the return statement
  } else {
    // Specific Month Calculation
    const students = getStudentsWithPaymentStatus(branch, month);
    const active = students.filter((s) => s.status === "Active");
    const paid = active.filter((s) => s.paid);

    activeCount = active.length;
    paidCount = paid.length;

    expected = active.reduce(
      (sum, s) => sum + (s.originalFee || s.fee || 0),
      0,
    );
    collected = paid.reduce((sum, s) => sum + (s.originalFee || s.fee || 0), 0);
  }

  // Get credits applied
  let creditsApplied = 0;
  const creditDetails = [];

  const refSheet = ss.getSheetByName(config.refCredits);
  if (refSheet) {
    const refData = refSheet.getDataRange().getValues();
    for (let i = 1; i < refData.length; i++) {
      const usedInMonth = refData[i][6];
      if (
        usedInMonth !== "" &&
        usedInMonth !== undefined &&
        usedInMonth !== null
      ) {
        // If month is -1, include all used credits. Else check specific month.
        if (month === -1 || parseInt(usedInMonth) === month) {
          const amount = Number(refData[i][3]) || 0;
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

  // Actual received = collected - credits (what should be in bank)
  const actualReceived = collected - creditsApplied;

  return {
    month: month,
    branch: branch,
    // Fee metrics
    activeStudents: activeCount,
    paidStudents: paidCount,
    pendingStudents: activeCount - paidCount,
    expected: expected,
    collected: collected,
    pending: expected - collected,
    // Credits
    creditsApplied: creditsApplied,
    creditDetails: creditDetails,
    // Bank reconciliation
    actualReceived: actualReceived,
    // Dev fund
    devFundAllocation: devFundAllocation,
    devFundSpent: devFundSpent,
    devFundBalance: devFundBalance,
  };
}

// ============================================
// DEVELOPMENT FUND FUNCTIONS
// ============================================

/**
 * Get development fund data for a branch
 * Calculates 30% of collected fees and tracks expenses
 */
function getDevelopmentFundData(branch) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const config = CONFIG.branches[branch];

  if (!config) throw new Error("Invalid branch: " + branch);

  const feesSheet = ss.getSheetByName(config.fees);
  const devFundSheet = ss.getSheetByName(config.devFund);

  if (!feesSheet) throw new Error("Fees sheet not found: " + config.fees);

  // Calculate collected fees per month
  const feesData = feesSheet.getDataRange().getValues();
  const monthlyData = [];

  // Initialize monthly totals
  for (let m = 0; m < 12; m++) {
    monthlyData.push({
      month: m,
      year: CONFIG.year,
      collected: 0,
      devFund: 0,
      spent: 0,
      carryForward: 0,
    });
  }

  // Calculate collected amount per month from fees sheet
  // Fee amount is in column 3 (index 2), months dynamically detected from Jan header
  const janColIndex = getJanColumnIndex(feesSheet);
  
  for (let i = 1; i < feesData.length; i++) {
    const row = feesData[i];
    const year = String(row[3]).trim();

    if (year !== CONFIG.year) continue;

    const fee = Number(row[2]) || 0;

    // Check each month column
    for (let m = 0; m < 12; m++) {
      const monthCol = janColIndex + m;
      const status = String(row[monthCol]).trim();

      if (status === "Paid") {
        monthlyData[m].collected += fee;
      }
    }
  }

  // Calculate 30% dev fund for each month
  for (let m = 0; m < 12; m++) {
    monthlyData[m].devFund = Math.round(
      monthlyData[m].collected * CONFIG.devFundPercent,
    );
  }

  // Get expenses from DevFund sheet
  const expenses = [];
  if (devFundSheet) {
    const devData = devFundSheet.getDataRange().getValues();
    
    // Detect new format (8 columns with Title, Description, Scope, Amount, Date_Added)
    // vs old format (6 columns with Description, Amount, Date_Added)
    const headers = devData[0] || [];
    const isNewFormat = headers.length >= 8 && String(headers[5]).toLowerCase().includes('scope');

    for (let i = 1; i < devData.length; i++) {
      const row = devData[i];
      const expenseId = String(row[0]).trim();
      if (!expenseId) continue;

      const expenseMonth = parseInt(row[1]) || 0;
      const expenseYear = String(row[2]).trim();
      
      // Handle both formats for amount
      let amount;
      if (isNewFormat) {
        // New format: Amount is at index 6
        amount = Number(row[6]) || 0;
      } else {
        // Old format: Amount is at index 4
        amount = Number(row[4]) || 0;
      }

      expenses.push({
        id: expenseId,
        month: expenseMonth,
        year: expenseYear,
        description: isNewFormat ? (row[3] || row[4] || "") : (row[3] || ""),
        amount: amount,
        dateAdded: isNewFormat ? (row[7] || "") : (row[5] || ""),
      });

      // Add to monthly spent if same year
      if (
        expenseYear === CONFIG.year &&
        expenseMonth >= 0 &&
        expenseMonth < 12
      ) {
        monthlyData[expenseMonth].spent += amount;
      }
    }
  }

  // Calculate running carry-forward balance
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
    expenses: expenses,
    totalContributions: totalContributions,
    totalSpent: totalSpent,
    availableBalance: availableBalance,
  };
}

/**
 * Get unified development fund data combining both branches
 */
function getDevelopmentFundDataUnified() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Initialize monthly totals
  const monthlyData = [];
  for (let m = 0; m < 12; m++) {
    monthlyData.push({
      month: m,
      year: CONFIG.year,
      collected: 0,
      devFund: 0,
      spent: 0,
      carryForward: 0,
    });
  }

  const allExpenses = [];

  // Process both branches
  const branches = ["Herohalli", "MPSC"];
  for (const branch of branches) {
    const config = CONFIG.branches[branch];
    if (!config) continue;

    const feesSheet = ss.getSheetByName(config.fees);
    const devFundSheet = ss.getSheetByName(config.devFund);

    // Calculate collected amount per month from fees sheet
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

    // Get expenses from DevFund sheet
    if (devFundSheet) {
      const devData = devFundSheet.getDataRange().getValues();
      
      // Detect new format (8 columns with Title, Description, Scope, Amount, Date_Added)
      // vs old format (6 columns with Description, Amount, Date_Added)
      const headers = devData[0] || [];
      const isNewFormat = headers.length >= 8 && String(headers[5]).toLowerCase().includes('scope');

      for (let i = 1; i < devData.length; i++) {
        const row = devData[i];
        const expenseId = String(row[0]).trim();
        if (!expenseId) continue;

        const expenseMonth = parseInt(row[1]) || 0;
        const expenseYear = String(row[2]).trim();
        
        // Handle both formats for amount - try new format first, fallback to old
        let amount;
        if (isNewFormat) {
          amount = Number(row[6]) || 0;
        } else {
          amount = Number(row[4]) || 0;
        }
        
        // If amount is still 0, try both columns as fallback
        if (amount === 0) {
          amount = Number(row[6]) || Number(row[4]) || 0;
        }

        allExpenses.push({
          id: expenseId,
          month: expenseMonth,
          year: expenseYear,
          title: isNewFormat ? (row[3] || "") : "",
          description: isNewFormat ? (row[4] || "") : (row[3] || ""),
          scope: isNewFormat ? (row[5] || branch) : branch,
          amount: amount,
          dateAdded: isNewFormat ? (row[7] || "") : (row[5] || ""),
        });

        // Add to monthly spent if same year
        if (
          expenseYear === CONFIG.year &&
          expenseMonth >= 0 &&
          expenseMonth < 12
        ) {
          monthlyData[expenseMonth].spent += amount;
        }
      }
    }
  }

  // Calculate 30% dev fund for each month
  for (let m = 0; m < 12; m++) {
    monthlyData[m].devFund = Math.round(
      monthlyData[m].collected * CONFIG.devFundPercent,
    );
  }

  // Calculate running carry-forward balance
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();

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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
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
