"use client";

export default function ProfileScreen() {
    return (
        <div className="h-full flex flex-col">
            <div className="h-4" /> {/* Status bar spacer */}

            <div className="px-5 pt-4 pb-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent-purple p-[2px] mb-3">
                    <div className="w-full h-full rounded-full bg-navy-900 flex items-center justify-center overflow-hidden">
                        <span className="text-2xl">😎</span>
                    </div>
                </div>
                <h3 className="text-lg font-bold">Alex Reader</h3>
                <p className="text-xs text-accent-purple font-medium">Level 5 Bookworm</p>
            </div>

            <div className="px-5 grid grid-cols-2 gap-3 mb-6">
                <div className="bg-navy-700/50 rounded-xl p-3 text-center border border-white/5">
                    <p className="text-xl font-bold text-white">12</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Books</p>
                </div>
                <div className="bg-navy-700/50 rounded-xl p-3 text-center border border-white/5">
                    <p className="text-xl font-bold text-warning">4.8k</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Pages</p>
                </div>
            </div>

            <div className="px-5 flex-1">
                <p className="text-xs text-text-secondary font-semibold mb-3 uppercase tracking-wider">Current Read</p>
                <div className="flex gap-3 items-start bg-navy-700/30 p-3 rounded-xl border border-white/5">
                    <div className="w-10 h-14 bg-navy-800 rounded shadow-sm border border-white/10 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">Thinking, Fast and Slow</p>
                        <p className="text-xs text-text-muted truncate">Daniel Kahneman</p>

                        <div className="mt-2 h-1.5 w-full bg-navy-900 rounded-full overflow-hidden">
                            <div className="h-full bg-success w-[45%]" />
                        </div>
                        <p className="text-[10px] text-text-muted mt-1 text-right">45%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
