"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from "framer-motion";
import { Trophy, Flame } from 'lucide-react';

export default function VisualStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} id="visual-stats" className="py-24 md:py-40 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left: Phone Leaderboard */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="order-2 lg:order-1 flex justify-center lg:justify-start"
                >
                    <div className="w-64 md:w-80 h-auto">
                        <div className="backdrop-blur-md bg-black/40 border border-white/5 rounded-[3.5rem] p-3 shadow-2xl">
                            <div className="bg-black rounded-[3rem] overflow-hidden h-[600px] relative pointer-events-none select-none border border-white/5">
                                <div className="h-full overflow-hidden">
                                    <img
                                        src="/assets/Screenshots/leaderboard_page.png"
                                        alt="Leaderboard Rankings"
                                        className="w-full h-full object-cover [image-rendering:optimize-contrast] rounded-[3rem] scale-x-110 scale-y-105"
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
                        className="space-y-6"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-text-primary">
                            Reading is a <br />
                            <span className="text-yellow-400 font-serif">Sport.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-medium max-w-xl">
                            Join clubs, earn limited-edition badges, and witness your growth on the global stage. Competition breeds consistency.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        {/* Stat 1: Retention */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left group hover:border-yellow-400/20 transition-colors"
                        >
                            <Trophy className="text-yellow-400 mb-4" size={40} strokeWidth={2.5} />
                            <div className="text-text-primary text-5xl font-black tracking-tighter">
                                <NumberTicker value={88} />%
                            </div>
                            <div className="font-black text-lg tracking-tight text-text-primary uppercase mt-1">Retention Rate</div>
                            <p className="text-[10px] font-bold text-yellow-400/60 mt-2 uppercase tracking-widest leading-none">Monthly active consistency</p>
                        </motion.div>

                        {/* Stat 2: Growth */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left group hover:border-yellow-400/20 transition-colors"
                        >
                            <Flame className="text-orange-500 mb-4" size={40} strokeWidth={2.5} />
                            <div className="text-text-primary text-5xl font-black tracking-tighter">
                                <NumberTicker value={2.4} decimals={1} />x
                            </div>
                            <div className="font-black text-lg tracking-tight text-text-primary uppercase mt-1">Reading Growth</div>
                            <p className="text-[10px] font-bold text-yellow-400/60 mt-2 uppercase tracking-widest leading-none">Average volume multiplier</p>
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
