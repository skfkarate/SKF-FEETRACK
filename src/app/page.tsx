"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Shield, Loader2 } from "lucide-react";

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
      const lowerPass = password.trim().toLowerCase();
      if (VALID_USERS.includes(lowerPass)) {
        localStorage.setItem("skf_user", lowerPass);
        localStorage.setItem("skf_login_time", Date.now().toString());
        router.push("/dashboard");
      } else {
        setError("Invalid access code");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.12) 0%, var(--bg-deep) 60%)",
      }}
    >
      {/* Ambient glow - visible on mobile */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[100vw] h-[60vh] opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(220,38,38,0.20) 0%, transparent 70%)",
        }}
      />

      {/* Logo + Brand */}
      <div className="relative z-10 flex flex-col items-center mb-10 animate-fade-in">
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-full bg-red-600/10 blur-2xl" />
          <Image
            src="https://skfkarate.github.io/SKF-FEETRACK/logo.png"
            alt="SKF Logo"
            width={88}
            height={88}
            className="relative rounded-full object-contain border-2 border-white/10 shadow-2xl shadow-red-900/30"
          />
        </div>
        <h1 className="font-[family-name:var(--font-space)] text-4xl font-bold tracking-[0.25em] text-white">
          SKF
        </h1>
        <p className="text-[var(--text-muted)] text-[11px] tracking-[0.3em] uppercase mt-1.5 font-medium">
          Karate • Fee Management
        </p>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-xs animate-scale-in">
        <div
          className="rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-2xl"
          style={{ background: "rgba(10,10,10,0.8)" }}
        >
          {/* Input */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <label className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold">
                  Access Code
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleLogin()}
                placeholder="• • • • • •"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-center text-lg font-[family-name:var(--font-space)] tracking-[0.3em] placeholder:text-white/15 focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition-all"
                autoFocus
              />
            </div>

            {error && (
              <div className="animate-slide-down">
                <p className="text-red-400 text-xs text-center py-2 px-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  {error}
                </p>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !password.trim()}
              className="w-full py-3.5 rounded-xl font-[family-name:var(--font-space)] tracking-[0.2em] text-sm font-bold
                         bg-gradient-to-r from-red-600 to-red-700 text-white
                         hover:from-red-500 hover:to-red-600 hover:shadow-lg hover:shadow-red-900/30
                         disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none
                         active:scale-[0.98] transition-all duration-200
                         flex items-center justify-center gap-2.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  VERIFYING
                </>
              ) : (
                "ENTER"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-center text-[var(--text-muted)] text-[9px] mt-8 tracking-[0.2em] uppercase opacity-50">
        Sports Karate-do Fitness & Self Defence ®
      </p>
    </div>
  );
}
