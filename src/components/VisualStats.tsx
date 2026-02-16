"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from "framer-motion";
import { Trophy, Flame } from 'lucide-react';

export default function VisualStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const leaders = [
        { name: 'Sarah J.', xp: '12,450', rank: 1, avatar: 'SJ', color: 'bg-[#FEF3B3]' },
        { name: 'Marcus W.', xp: '11,200', rank: 2, avatar: 'MW', color: 'bg-slate-300' },
        { name: 'Elena R.', xp: '10,950', rank: 3, avatar: 'ER', color: 'bg-orange-300' },
        { name: 'You', xp: '8,400', rank: 12, avatar: 'ME', active: true },
    ];

    return (
        <section ref={ref} id="visual-stats" className="py-24 md:py-40 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-transparent -z-10" />
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left: Test Image (Scaled to 90%) */}
                {/* <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="order-2 lg:order-1 flex justify-center lg:justify-start overflow-visible"
                >
                    <div className="scale-[0.9] origin-center lg:origin-left min-w-[500px]">
                        <div className="bg-[#1D59BB] rounded-[3.5rem] p-4 shadow-3xl relative overflow-hidden">
                            <div className="bg-white/5 absolute -top-40 -right-40 w-[30rem] h-[30rem] rounded-full blur-[100px]" />
                            <div className="relative z-10 p-10">
                                <div className="flex justify-between items-center gap-6 mb-12">
                                    <h4 className="text-3xl font-black tracking-tight !text-white whitespace-nowrap" style={{ color: 'white' }}>Global Top Readers</h4>
                                    <span className="text-[10px] font-black tracking-[0.3em] text-white opacity-60 uppercase whitespace-nowrap">Live Update</span>
                                </div>
                                <div className="space-y-5">
                                    {leaders.map((entry, i) => (
                                        <div
                                            key={i}
                                            className={`flex items-center gap-5 p-5 rounded-3xl transition-all ${entry.active ? 'bg-[#FEF3B3] text-[#1D59BB] scale-105 shadow-2xl' : 'bg-white/10 text-white hover:bg-white/15'
                                                }`}
                                        >
                                            <div className="w-10 font-black opacity-40 text-lg">#{entry.rank}</div>
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${entry.active ? 'bg-[#1D59BB] text-white' : (entry.color || 'bg-white/20')
                                                }`}>
                                                {entry.avatar}
                                            </div>
                                            <div className="flex-1 font-black text-lg tracking-tight">{entry.name}</div>
                                            <div className="font-black text-right">
                                                <div className="text-xl tabular-nums">{entry.xp}</div>
                                                <div className="text-[10px] opacity-40 uppercase tracking-widest">XP</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div> */}

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="order-2 lg:order-1 flex justify-center lg:justify-start"
                >
                    <div className="w-64 md:w-80 h-auto">
                        <div className="backdrop-blur-md bg-black/80 border border-[#1D59BB]/10 rounded-[3.5rem] p-3 shadow-2xl">
                            <div className="bg-background rounded-[3rem] overflow-hidden h-[600px] relative pointer-events-none select-none">
                                <div className="h-full overflow-hidden">
                                    <img
                                        src="/assets/Screenshots/leaderboard_page.png"
                                        alt="Leaderboard Rankings"
                                        className="w-full h-full object-cover [image-rendering:optimize-contrast] rounded-[3rem] scale-x-110"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Copy + Original Stats */}
                <div className="order-1 lg:order-2 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="backdrop-blur-md bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20 shadow-xl space-y-6 no-scrollbar overflow-hidden"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter text-[#1D59BB]">
                            Reading is a <br />
                            <span className="text-[#75BAFF] font-serif italic">Sport.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-[#1D59BB]/80 leading-relaxed font-medium">
                            Join clubs, earn limited-edition badges, and witness your growth on the global stage. Competition breeds consistency.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        {/* Stat 1: Retention */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-[#1D59BB]/5 shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left"
                        >
                            <Trophy className="text-[#FEF3B3] mb-4" size={40} strokeWidth={2.5} />
                            <div className="text-[#1D59BB] text-4xl font-black tracking-tighter">
                                <NumberTicker value={88} />%
                            </div>
                            <div className="font-black text-lg tracking-tight text-[#1D59BB] uppercase mt-1">Retention Rate</div>
                            <p className="text-[10px] font-bold text-[#75BAFF] mt-2 uppercase tracking-widest leading-none">Monthly active consistency</p>
                        </motion.div>

                        {/* Stat 2: Growth */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-[#1D59BB]/5 shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left"
                        >
                            <Flame className="text-orange-500 mb-4" size={40} strokeWidth={2.5} />
                            <div className="text-[#1D59BB] text-4xl font-black tracking-tighter">
                                <NumberTicker value={2.4} decimals={1} />x
                            </div>
                            <div className="font-black text-lg tracking-tight text-[#1D59BB] uppercase mt-1">Reading Growth</div>
                            <p className="text-[10px] font-bold text-[#75BAFF] mt-2 uppercase tracking-widest leading-none">Average volume multiplier</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function NumberTicker({ value, decimals = 0 }: { value: number; decimals?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const interval = duration / steps;
            let current = 0;

            const increment = value / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(current);
                }
            }, interval);

            return () => clearInterval(timer);
        }
    }, [value, isInView]);

    return (
        <span ref={ref}>
            {count.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            })}
        </span>
    );
}
