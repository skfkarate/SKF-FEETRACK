"use client";

import { useState, useEffect } from "react";
import { Gift, X, PartyPopper } from "lucide-react";
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

    return (
        <>
            {/* Floating Widget Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-40 bg-gradient-to-tr from-pink-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce group border border-white/20"
                title="Upcoming Birthdays"
            >
                <Gift className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-black shadow">
                    {birthdays.length}
                </span>
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 p-6 border-b border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <PartyPopper className="w-24 h-24 text-pink-400" />
                            </div>
                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <h2 className="font-[family-name:var(--font-space)] text-xl tracking-wider text-white flex items-center gap-2">
                                        <PartyPopper className="w-5 h-5 text-pink-400" />
                                        Birthdays
                                    </h2>
                                    <p className="text-[var(--text-muted)] text-xs mt-1">
                                        Upcoming celebrations this week
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-[var(--text-muted)]" />
                                </button>
                            </div>
                        </div>

                        {/* List */}
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            <div className="space-y-2">
                                {birthdays.map((student) => {
                                    const isToday = student.daysUntil === 0;
                                    return (
                                        <div
                                            key={student.id}
                                            className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${isToday
                                                ? "bg-pink-500/10 border-pink-500/30"
                                                : "bg-white/5 border-white/5 hover:bg-white/10"
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${isToday ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20" : "bg-white/10 text-white/40"
                                                }`}>
                                                {student.turningAge}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-[family-name:var(--font-space)] text-sm text-white truncate">
                                                    {student.name}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                                                    <span className={student.branch === 'Herohalli' ? 'text-blue-300' : 'text-purple-300'}>
                                                        {student.branch}
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        {isToday ? (
                                                            <span className="text-pink-400 font-bold animate-pulse">TODAY</span>
                                                        ) : student.daysUntil === 1 ? (
                                                            "Tomorrow"
                                                        ) : (
                                                            `${student.month} ${student.day}`
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-4 border-t border-white/5 bg-white/2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
