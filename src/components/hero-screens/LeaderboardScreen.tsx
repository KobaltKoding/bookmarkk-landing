"use client";

export default function LeaderboardScreen() {
    return (
        <div className="h-full flex flex-col">
            {/* Status bar area filler */}
            <div className="h-4" />

            <div className="px-5 pb-6">
                <div className="text-center mb-4">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                        Weekly League
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-warning font-medium">
                            Season in progress
                        </span>
                    </div>
                </div>

                {/* Leaderboard entries */}
                <div className="space-y-2.5">
                    {[
                        {
                            rank: 1,
                            name: "Sarah K.",
                            xp: 840,
                            highlight: false,
                        },
                        {
                            rank: 2,
                            name: "You",
                            xp: 720,
                            highlight: true,
                        },
                        {
                            rank: 3,
                            name: "Mike R.",
                            xp: 680,
                            highlight: false,
                        },
                        {
                            rank: 4,
                            name: "Priya S.",
                            xp: 520,
                            highlight: false,
                        },
                        {
                            rank: 5,
                            name: "Alex T.",
                            xp: 440,
                            highlight: false,
                        },
                    ].map((entry) => (
                        <div
                            key={entry.rank}
                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm ${entry.highlight
                                    ? "bg-accent-purple/15 border border-accent-purple/30"
                                    : "bg-navy-700/50"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className={`w-6 text-center font-bold ${entry.rank === 1
                                            ? "text-warning"
                                            : entry.highlight
                                                ? "text-accent-purple"
                                                : "text-text-muted"
                                        }`}
                                >
                                    {entry.rank === 1 ? "👑" : `#${entry.rank}`}
                                </span>
                                <span
                                    className={
                                        entry.highlight
                                            ? "text-white font-semibold"
                                            : "text-text-secondary"
                                    }
                                >
                                    {entry.name}
                                </span>
                            </div>
                            <span
                                className={`font-mono font-bold ${entry.highlight ? "text-accent-purple" : "text-text-muted"
                                    }`}
                            >
                                {entry.xp} XP
                            </span>
                        </div>
                    ))}
                </div>

                {/* Streak indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                    <span
                        className="text-xl"
                        style={{ animation: "flicker 1.5s ease-in-out infinite" }}
                    >
                        &#128293;
                    </span>
                    <span className="text-warning font-semibold">5-day streak</span>
                </div>
            </div>
        </div>
    );
}
