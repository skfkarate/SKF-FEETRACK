"use client";

import { Student } from "@/lib/api";
import { useRef } from "react";
import NextImage from "next/image";
const BASE_PATH = "https://skfkarate.github.io/SKF-FEETRACK"; // Hardcoded absolute URL

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

interface MonthlyFeeReceiptProps {
  student: Student;
  month: number;
  branch: string;
  onClose: () => void;
}

export default function MonthlyFeeReceipt({
  student,
  month,
  branch,
  onClose,
}: MonthlyFeeReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const branchName =
    branch === "MPSC" ? "MP Sports Club" : branch?.toUpperCase();
  const receiptNo = `SKF-${branch.substring(0, 1).toUpperCase()}-${Date.now()
    .toString()
    .slice(-4)}`;
  const date = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const purpose = `${new Date(2026, month, 1).toLocaleDateString("en-IN", {
    month: "long",
  })} Monthly Training Fee`;
  const amountWords = `Rupees ${student.fee.toLocaleString()} Only`;

  // Use browser's native print for PERFECT visual match
  const downloadReceipt = () => {
    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) {
      alert("Please allow popups to download the receipt.");
      return;
    }

    const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${student.id}_${MONTHS[month]}2026_Fee</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    @page {
      size: A4 portrait;
      margin: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      height: 100vh;
      display: flex;
      align-items: center; /* Center vertically */
      justify-content: center; /* Center horizontally */
    }
    
    .receipt {
      width: 100%;
      max-width: 210mm;
      height: 297mm; /* Force full height */
      margin: 0 auto;
      background: white;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between; /* Distribute vertical space */
    }
    
    .header {
      background: linear-gradient(135deg, #1a1f2e, #0f1419);
      padding: 40px;
      text-align: center;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: contain;
      border: 2px solid rgba(212, 175, 55, 0.5);
      background: rgba(255, 255, 255, 0.05);
      margin-bottom: 20px;
    }
    
    .header h1 {
      color: white;
      font-size: 42px;
      font-weight: 900;
      letter-spacing: 0.25em;
    }
    
    .header p {
      color: #d4af37;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.15em;
      margin-top: 12px;
    }
    
    .section {
      padding: 32px 48px;
      border-bottom: 1px solid #e5e7eb;
      flex: 1; /* Allow sections to grow */
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .section:last-of-type {
      border-bottom: none;
    }
    
    .title {
      text-align: center;
      margin-bottom: 16px;
    }
    
    .title h2 {
      color: #1a1f2e;
      font-size: 20px;
      font-weight: 900;
    }
    
    .title p {
      color: #6b7280;
      font-size: 14px;
      margin-top: 4px;
    }
    
    .row {
      display: table;
      width: 100%;
      margin-bottom: 12px;
    }
    
    .row:last-child {
      margin-bottom: 0;
    }
    
    .label {
      display: table-cell;
      color: #4b5563;
      font-weight: 700;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      width: 40%;
      vertical-align: middle;
      padding-right: 20px;
    }
    
    .value {
      display: table-cell;
      color: #1a1f2e;
      font-weight: 700;
      font-size: 20px;
      text-align: right;
      width: 60%;
      vertical-align: middle;
    }
    
    .id-badge {
      background: #b8860b;
      color: white;
      font-size: 9px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 700;
      display: inline-block;
      margin-top: 4px;
    }
    
    .amount-box {
      margin-top: 20px;
      padding: 16px;
      border-radius: 12px;
      border: 2px solid #d4af37;
      background: linear-gradient(135deg, #fafbfc, #f3f4f6);
      text-align: center;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .amount-box .amount {
      font-size: 40px;
      font-weight: 900;
      color: #1a1f2e;
    }
    
    .amount-box .words {
      font-size: 16px;
      font-style: italic;
      color: #6b7280;
      margin-top: 12px;
    }
    
    .status {
      margin-top: 24px;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      color: #16a34a;
    }
    
    .stamp {
      text-align: center;
      margin-top: 8px;
    }
    
    .stamp img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      transform: rotate(-12deg);
    }
    
    .footer {
      background: linear-gradient(135deg, #1a1f2e, #0f1419);
      padding: 12px;
      text-align: center;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .footer p {
      color: #d1d5db;
      font-size: 8px;
    }
    
    @media print {
      body { background: white; }
      .receipt { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <img src="${BASE_PATH}/logo.png" alt="SKF" class="logo">
      <h1>S K F</h1>
      <p>Sports Karate-do Fitness & Self Defence Association ®</p>
    </div>
    
    <div class="section">
      <div class="title">
        <h2>Monthly Fee Receipt</h2>
        <p>Payment confirmation</p>
      </div>
      
      <div class="row">
        <span class="label">Branch</span>
        <span class="value">${branchName}</span>
      </div>
      <div class="row">
        <span class="label">Receipt No</span>
        <span class="value">${receiptNo}</span>
      </div>
      <div class="row">
        <span class="label">Date</span>
        <span class="value">${date}</span>
      </div>
    </div>
    
    <div class="section">
      <div class="row">
        <span class="label">Parent / Guardian</span>
        <span class="value">${student.parentName || "N/A"}</span>
      </div>
      <div class="row">
        <span class="label">Student Name</span>
        <span class="value">
          ${student.name}<br>
          <span class="id-badge">${student.id}</span>
        </span>
      </div>
      <div class="row">
        <span class="label">Purpose</span>
        <span class="value">${purpose}</span>
      </div>
      
      <div class="amount-box">
        <div class="amount">₹ ${student.fee.toLocaleString()}</div>
        <div class="words">${amountWords}</div>
      </div>
      
      <div class="status">✔ Payment Received with Thanks</div>
      
      <div class="stamp">
        <img src="${BASE_PATH}/stamp.png" alt="PAID">
      </div>
    </div>
    
    <div class="footer">
      <p>This receipt is issued for confirmation and record purposes only.</p>
    </div>
  </div>
  
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
        window.onafterprint = function() { window.close(); };
      }, 500);
    };
  </script>
</body>
</html>
    `;

    printWindow.document.write(receiptHTML);
    printWindow.document.close();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "16px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Receipt Card (Preview) */}
        <div
          ref={receiptRef}
          style={{
            backgroundColor: "#ffffff",
            color: "#1a1f2e",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a1f2e, #0f1419)",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <NextImage
                src="https://skfkarate.github.io/SKF-FEETRACK/logo.png"
                alt="SKF"
                width={70}
                height={70}
                className="rounded-full object-contain border border-[#d4af37]/50 bg-white/5"
              />
            </div>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: 900,
                letterSpacing: "0.2em",
                margin: 0,
              }}
            >
              SKF
            </h1>
            <p
              style={{
                color: "#d4af37",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                marginTop: "4px",
              }}
            >
              Sports Karate-do Fitness & Self Defence Association ®
            </p>
          </div>

          {/* INFO SECTION */}
          <div style={{ padding: "24px", borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <h2
                style={{
                  color: "#1a1f2e",
                  fontSize: "18px",
                  fontWeight: 900,
                  margin: 0,
                }}
              >
                Monthly Fee Receipt
              </h2>
              <p
                style={{ color: "#6b7280", fontSize: "11px", marginTop: "4px" }}
              >
                Payment confirmation
              </p>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      color: "#4b5563",
                      fontWeight: 700,
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "4px 0",
                    }}
                  >
                    Branch
                  </td>
                  <td
                    style={{
                      color: "#1a1f2e",
                      fontWeight: 700,
                      fontSize: "14px",
                      textAlign: "right",
                      padding: "4px 0",
                    }}
                  >
                    {branchName}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      color: "#4b5563",
                      fontWeight: 700,
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "4px 0",
                    }}
                  >
                    Receipt No
                  </td>
                  <td
                    style={{
                      color: "#1a1f2e",
                      fontWeight: 700,
                      fontSize: "14px",
                      textAlign: "right",
                      padding: "4px 0",
                    }}
                  >
                    {receiptNo}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      color: "#4b5563",
                      fontWeight: 700,
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "4px 0",
                    }}
                  >
                    Date
                  </td>
                  <td
                    style={{
                      color: "#1a1f2e",
                      fontWeight: 700,
                      fontSize: "14px",
                      textAlign: "right",
                      padding: "4px 0",
                    }}
                  >
                    {date}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* DETAILS SECTION */}
          <div style={{ padding: "24px", position: "relative" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      color: "#4b5563",
                      fontWeight: 700,
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "4px 0",
                      verticalAlign: "middle",
                    }}
                  >
                    Parent / Guardian
                  </td>
                  <td
                    style={{
                      color: "#1a1f2e",
                      fontWeight: 700,
                      fontSize: "14px",
                      textAlign: "right",
                      padding: "4px 0",
                      verticalAlign: "middle",
                    }}
                  >
                    {student.parentName || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      color: "#4b5563",
                      fontWeight: 700,
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "4px 0",
                      verticalAlign: "top",
                    }}
                  >
                    Student Name
                  </td>
                  <td
                    style={{
                      color: "#1a1f2e",
                      fontWeight: 700,
                      fontSize: "14px",
                      textAlign: "right",
                      padding: "4px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {student.name}
                    <br />
                    <span
                      style={{
                        backgroundColor: "#b8860b",
                        color: "#ffffff",
                        fontSize: "10px",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontWeight: 700,
                        display: "inline-block",
                        marginTop: "4px",
                      }}
                    >
                      {student.id}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      color: "#4b5563",
                      fontWeight: 700,
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "4px 0",
                      verticalAlign: "middle",
                    }}
                  >
                    Purpose
                  </td>
                  <td
                    style={{
                      color: "#1a1f2e",
                      fontWeight: 700,
                      fontSize: "14px",
                      textAlign: "right",
                      padding: "4px 0",
                      verticalAlign: "middle",
                    }}
                  >
                    {purpose}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Amount Box */}
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                borderRadius: "12px",
                border: "2px solid #d4af37",
                background: "linear-gradient(135deg, #fafbfc, #f3f4f6)",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: "28px", fontWeight: 900, color: "#1a1f2e" }}
              >
                ₹ {student.fee.toLocaleString()}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontStyle: "italic",
                  color: "#6b7280",
                  marginTop: "4px",
                }}
              >
                {amountWords}
              </div>
            </div>

            {/* Status */}
            <div
              style={{
                marginTop: "16px",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "13px",
                color: "#16a34a",
              }}
            >
              ✔ Payment Received with Thanks
            </div>

            {/* Stamp Overlay */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8px",
                opacity: 0.9,
              }}
            >
              <NextImage
                src="https://skfkarate.github.io/SKF-FEETRACK/stamp.png"
                alt="PAID"
                width={96}
                height={96}
                className="object-contain -rotate-12"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a1f2e, #0f1419)",
              padding: "12px",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#d1d5db", fontSize: "10px", margin: 0 }}>
              This receipt is issued for confirmation and record purposes only.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#333",
              color: "white",
              fontWeight: 600,
              letterSpacing: "0.05em",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            CLOSE
          </button>
          <button
            onClick={downloadReceipt}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#16a34a",
              color: "white",
              fontWeight: 600,
              letterSpacing: "0.05em",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ⬇ DOWNLOAD
          </button>
        </div>
      </div>
    </div>
  );
}
