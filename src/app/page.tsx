"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Valid credentials (same as original)
const VALID_USERS = ["krish", "usha"];

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (VALID_USERS.includes(password.toLowerCase().trim())) {
        localStorage.setItem("skf_user", password.toLowerCase());
        localStorage.setItem("skf_login_time", Date.now().toString());
        router.push("/dashboard");
      } else {
        setError("Access Denied");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <Image
            src="https://skfkarate.github.io/SKF-FEETRACK/logo.png"
            alt="SKF Karate Logo"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="font-[family-name:var(--font-oswald)] text-5xl font-bold tracking-widest mb-2">
          SKF <span className="text-red-600">KARATE</span>
        </h1>
        <p className="text-gray-600 text-sm tracking-[0.3em] uppercase mb-12">
          Fee Management
        </p>

        {/* Login Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Enter your identity"
          className="w-full bg-[#141414] border-2 border-[#2a2a2a] px-6 py-4 text-lg text-center text-white 
                     focus:border-red-600 focus:outline-none focus:shadow-[0_0_30px_rgba(220,38,38,0.3)] 
                     transition-all duration-300 placeholder:text-gray-600 placeholder:italic"
          autoFocus
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-600 mt-4 font-medium animate-pulse">{error}</p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white 
                     font-[family-name:var(--font-oswald)] text-lg font-semibold tracking-wider uppercase
                     shadow-[0_4px_20px_rgba(220,38,38,0.4)] hover:shadow-[0_6px_25px_rgba(220,38,38,0.6)]
                     hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? "Verifying..." : "Enter"}
        </button>

        <p className="text-gray-700 text-xs mt-8">
          Only authorized senseis may enter
        </p>
      </div>
    </div>
  );
}
