"use client";

export default function QuizScreen() {
    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-5 pt-6 pb-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl">&#128218;</span>
                    <div>
                        <p className="text-xs font-semibold">Atomic Habits</p>
                        <p className="text-[10px] text-text-muted">Chapter 1 Quiz</p>
                    </div>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-accent-purple/10 text-[10px] font-bold text-accent-purple border border-accent-purple/20">
                    +20 XP
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-center">
                <p className="text-sm font-semibold mb-4 leading-relaxed">
                    What does James Clear argue is more important than setting goals?
                </p>

                <div className="space-y-2">
                    {[
                        { text: "Detailed plans", status: "default" },
                        { text: "Better systems", status: "correct" },
                        { text: "More willpower", status: "default" },
                        { text: "Motivation", status: "default" },
                    ].map((opt, i) => (
                        <div
                            key={i}
                            className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs transition-all ${opt.status === "correct"
                                    ? "bg-success/10 border-success/50 text-success"
                                    : "border-white/5 bg-navy-700/30 text-text-secondary"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${opt.status === "correct"
                                            ? "border-success bg-success text-navy-900"
                                            : "border-white/20"
                                        }`}
                                >
                                    {opt.status === "correct" ? "✓" : String.fromCharCode(65 + i)}
                                </span>
                                <span>{opt.text}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-success/5 border border-success/20">
                    <p className="text-[10px] text-success font-medium">
                        Correct! Systems determine your success, not goals.
                    </p>
                </div>
            </div>
        </div>
    );
}
