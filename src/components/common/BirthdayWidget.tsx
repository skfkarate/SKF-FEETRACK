"use client";

import { useState, useEffect } from "react";
import { Gift, X, PartyPopper, Sparkles } from "lucide-react";
import { getUpcomingBirthdays, BirthdayStudent } from "@/lib/api";

export default function BirthdayWidget() {
    const [birthdays, setBirthdays] = useState<BirthdayStudent[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBirthdays = async () => {
            try {
                const data = await getUpcomingBirthdays();
                setBirthdays(data);
            } catch (error) {
                console.error("Failed to fetch birthdays", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBirthdays();
    }, []);

    if (loading || birthdays.length === 0) return null;

    const todayBirthdays = birthdays.filter(b => b.daysUntil === 0);
    const hasToday = todayBirthdays.length > 0;

    return (
        <>
            {/* Floating Widget Button - Premium Aesthetic */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 left-6 z-40 p-4 rounded-full shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] hover:scale-105 transition-all duration-300 group ${hasToday
                    ? "bg-gradient-to-br from-[#FF007A] via-[#A800FF] to-[#00E5FF] animate-pulse border-2 border-white/30"
                    : "bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20"
                    }`}
                title="Upcoming Birthdays"
            >
                <div className="relative">
                    {hasToday ? (
                        <>
                            <PartyPopper className="w-6 h-6 text-white group-hover:rotate-12 transition-transform drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-4 -right-4 animate-[spin_3s_linear_infinite]" />
                        </>
                    ) : (
                        <Gift className="w-6 h-6 text-[#FF007A] group-hover:rotate-12 transition-transform" />
                    )}
                </div>

                {/* Badge */}
                <span className={`absolute -top-2 -right-2 text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border shadow-lg ${hasToday
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-yellow-200 animate-bounce"
                    : "bg-[#FF007A] text-white border-black/50"
                    }`}>
                    {birthdays.length}
                </span>
            </button>

            {/* Premium Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative bg-[#050505] border border-white/10 rounded-3xl w-full max-w-sm overflow-hidden shadow-[0_0_40px_rgba(255,0,122,0.15)] animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Glowing Background Effect */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#FF007A]/20 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#A800FF]/20 rounded-full blur-[80px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative p-6 pt-8 pb-4 text-center z-10 border-b border-white/5">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors group backdrop-blur-sm"
                            >
                                <X className="w-4 h-4 text-white/50 group-hover:text-white" />
                            </button>

                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF007A]/20 to-[#A800FF]/20 border border-[#FF007A]/30 mb-4 shadow-[0_0_20px_rgba(255,0,122,0.2)]">
                                <Sparkles className="w-8 h-8 text-[#FF007A]" />
                            </div>

                            <h2 className="font-[family-name:var(--font-space)] text-2xl tracking-[0.15em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                                CAKE ALERT
                            </h2>
                            <p className="text-[#A800FF] text-[10px] mt-2 uppercase tracking-[0.3em] font-bold">
                                Upcoming Celebrations
                            </p>
                        </div>

                        {/* List */}
                        <div className="max-h-[55vh] overflow-y-auto px-4 py-4 scrollbar-hide relative z-10">
                            <div className="space-y-3">
                                {birthdays.map((student, idx) => {
                                    const isToday = student.daysUntil === 0;
                                    return (
                                        <div
                                            key={student.id}
                                            className={`relative overflow-hidden p-4 rounded-2xl transition-all duration-300 group ${isToday
                                                ? "bg-gradient-to-r from-[#FF007A]/10 to-[#A800FF]/10 border border-[#FF007A]/30 hover:shadow-[0_0_20px_rgba(255,0,122,0.2)] hover:-translate-y-1"
                                                : "bg-white/5 border border-white/5 hover:bg-white/10 hover:-translate-y-0.5"
                                                }`}
                                            style={{ animationDelay: `${idx * 100}ms` }}
                                        >
                                            {isToday && (
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF007A]/20 rounded-full blur-[40px] pointer-events-none" />
                                            )}

                                            <div className="flex items-center gap-4 relative z-10">
                                                {/* Age Badge */}
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-[family-name:var(--font-space)] font-bold shadow-lg ${isToday
                                                    ? "bg-gradient-to-br from-[#FF007A] to-[#A800FF] text-white shadow-[0_0_15px_rgba(255,0,122,0.4)]"
                                                    : "bg-[#111] border border-white/10 text-white/70"
                                                    }`}>
                                                    {student.turningAge}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className={`font-[family-name:var(--font-space)] text-base font-semibold truncate transition-colors ${isToday ? "text-pink-100" : "text-white/90 group-hover:text-white"
                                                        }`}>
                                                        {student.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-xs mt-1">
                                                        <span className="text-white/40 uppercase tracking-wider font-bold text-[9px] bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                                                            {student.branch === 'MPSC' ? 'MPSC' : 'HERO'}
                                                        </span>
                                                        <span className={`font-bold ${isToday
                                                            ? "text-[#FF007A] tracking-widest uppercase animate-pulse drop-shadow-[0_0_5px_rgba(255,0,122,0.8)]"
                                                            : "text-[#A800FF]/80"
                                                            }`}>
                                                            {isToday ? "TODAY" : student.daysUntil === 1 ? "Tomorrow" : `${student.month} ${student.day}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer styling */}
                        <div className="p-4 bg-[#0a0a0a] relative z-20 border-t border-white/5">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/20 text-white/60 hover:text-white text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-300 border border-white/5 hover:border-white/20"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
