import type { Metadata } from "next";
import { Outfit, Oswald } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "SKF KARATE",
  description: "Fee Management System",
  manifest: "/SKF-FEETRACK/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SKF Fees",
  },
  icons: {
    icon: "/SKF-FEETRACK/icon.png",
    shortcut: "/SKF-FEETRACK/icon.png",
    apple: "/SKF-FEETRACK/icon.png",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevent zooming for "app-like" feel
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${oswald.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
