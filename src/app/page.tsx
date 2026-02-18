"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.08) 0%, var(--bg-deep) 60%)" }}>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="glass-card p-8 w-full max-w-sm animate-scale-in relative">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-red-600/20 to-transparent blur-lg" />
            <Image
              src="https://skfkarate.github.io/SKF-FEETRACK/logo.png"
              alt="SKF Logo"
              width={80}
              height={80}
              className="relative rounded-full object-contain border border-white/10 bg-white/5"
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-space)] text-3xl font-bold tracking-[0.2em] gradient-text">
            SKF KARATE
          </h1>
          <p className="text-[var(--text-muted)] text-xs tracking-[0.15em] mt-2 uppercase">
            Fee Management System
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium">
              Access Code
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleLogin()}
              placeholder="Enter your access code"
              className="input-field font-[family-name:var(--font-space)] tracking-wider text-center text-lg"
              autoFocus
            />
          </div>

          {error && (
            <div className="animate-slide-down">
              <p className="text-red-400 text-sm text-center py-2 px-3 rounded-lg bg-red-500/10 border border-red-500/20">
                {error}
              </p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !password.trim()}
            className="btn-primary w-full font-[family-name:var(--font-space)] tracking-[0.15em] text-sm
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
                       flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="spinner !w-4 !h-4 !border-white/30 !border-t-white" />
                AUTHENTICATING...
              </>
            ) : (
              "ENTER"
            )}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[var(--text-muted)] text-[10px] mt-6 tracking-wider uppercase">
          Sports Karate-do Fitness & Self Defence ®
        </p>
      </div>
    </div>
  );
}
