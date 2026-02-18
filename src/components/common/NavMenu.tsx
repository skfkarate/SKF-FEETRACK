"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function NavMenu() {
    const router = useRouter();
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("skf_user");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("skf_user");
        localStorage.removeItem("skf_login_time");
        router.push("/");
    };

    if (!user) return null;

    return (
        <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Sensei</span>
                <span className="text-sm font-bold text-white capitalize leading-none">{user}</span>
            </div>
            <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-[var(--text-muted)] transition-all duration-300 group"
                aria-label="Logout"
            >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
        </div>
    );
}
