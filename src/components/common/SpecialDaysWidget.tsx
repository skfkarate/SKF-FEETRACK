"use client";

import { useState, useEffect } from "react";
import { CalendarDays, X, Palette, Megaphone } from "lucide-react";
import { getUpcomingSpecialDays, SpecialDay } from "@/lib/api";

export default function SpecialDaysWidget() {
    const [events, setEvents] = useState<SpecialDay[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getUpcomingSpecialDays();
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch special days", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const todayEvents = events.filter(e => e.daysUntil === 0);
    const hasToday = todayEvents.length > 0;
    const hasEvents = events.length > 0;

    return (
        <>
            {/* Floating Widget Button - Bottom Right */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300 group ${hasToday
                    ? "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 animate-pulse border-2 border-white/30"
                    : hasEvents
                        ? "bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20"
                        : "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 opacity-60 hover:opacity-100"
                    }`}
                title={hasEvents ? "Upcoming Special Days" : "No upcoming events"}
            >
                <div className="relative">
                    {hasToday ? (
                        <Megaphone className="w-6 h-6 text-white group-hover:rotate-12 transition-transform drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    ) : (
                        <CalendarDays className={`w-6 h-6 group-hover:rotate-12 transition-transform ${hasEvents ? "text-amber-400" : "text-white/40"}`} />
                    )}
                </div>

                {hasEvents && (
                    <span className={`absolute -top-2 -right-2 text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border shadow-lg ${hasToday
                        ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-red-300 animate-bounce"
                        : "bg-amber-500 text-black border-amber-300"
                        }`}>
                        {events.length}
                    </span>
                )}
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative bg-[#050505] border border-white/10 rounded-3xl w-full max-w-sm overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.15)] animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Glow */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative p-6 pt-8 pb-4 text-center z-10 border-b border-white/5">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors group backdrop-blur-sm"
                            >
                                <X className="w-4 h-4 text-white/50 group-hover:text-white" />
                            </button>

                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                <Palette className="w-8 h-8 text-amber-400" />
                            </div>

                            <h2 className="font-[family-name:var(--font-space)] text-2xl tracking-[0.15em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-300">
                                POSTER ALERT
                            </h2>
                            <p className="text-amber-500/80 text-[10px] mt-2 uppercase tracking-[0.3em] font-bold">
                                {hasEvents ? "Create Posters!" : "Next 3 Days"}
                            </p>
                        </div>

                        {/* List */}
                        <div className="max-h-[55vh] overflow-y-auto px-4 py-4 scrollbar-hide relative z-10">
                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="spinner mx-auto mb-4" />
                                    <p className="text-white/40 text-sm">Checking events...</p>
                                </div>
                            ) : hasEvents ? (
                                <div className="space-y-3">
                                    {events.map((event, idx) => {
                                        const isToday = event.daysUntil === 0;
                                        const isTomorrow = event.daysUntil === 1;
                                        return (
                                            <div
                                                key={event.name + idx}
                                                className={`relative overflow-hidden p-4 rounded-2xl transition-all duration-300 group ${isToday
                                                    ? "bg-gradient-to-r from-amber-500/15 to-red-500/10 border border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:-translate-y-1"
                                                    : isTomorrow
                                                        ? "bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 hover:-translate-y-0.5"
                                                        : "bg-white/5 border border-white/5 hover:bg-white/10 hover:-translate-y-0.5"
                                                    }`}
                                            >
                                                {isToday && (
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-[40px] pointer-events-none" />
                                                )}

                                                <div className="flex items-center gap-4 relative z-10">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-[family-name:var(--font-space)] font-bold shadow-lg ${isToday
                                                        ? "bg-gradient-to-br from-amber-500 to-red-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                                                        : isTomorrow
                                                            ? "bg-orange-900/50 border border-orange-500/30 text-orange-300"
                                                            : "bg-[#111] border border-white/10 text-white/70"
                                                        }`}>
                                                        {event.day}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <h3 className={`font-[family-name:var(--font-space)] text-base font-semibold truncate ${isToday ? "text-amber-100" : "text-white/90"}`}>
                                                            {event.name}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-xs mt-1">
                                                            <span className="text-white/40 uppercase tracking-wider font-bold text-[9px] bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                                                                {event.category || "Event"}
                                                            </span>
                                                            <span className={`font-bold ${isToday
                                                                ? "text-amber-400 tracking-widest uppercase animate-pulse"
                                                                : isTomorrow
                                                                    ? "text-orange-400"
                                                                    : "text-white/50"
                                                                }`}>
                                                                {isToday ? "TODAY" : isTomorrow ? "Tomorrow" : `${event.month} ${event.day}`}
                                                            </span>
                                                        </div>
                                                        {event.notes && (
                                                            <p className="text-white/30 text-[10px] mt-1 truncate">{event.notes}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/5 mb-4">
                                        <CalendarDays className="w-8 h-8 text-white/20" />
                                    </div>
                                    <p className="text-white/50 text-sm font-medium">No upcoming events</p>
                                    <p className="text-white/25 text-xs mt-1">in the next 3 days</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
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
