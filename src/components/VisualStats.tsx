"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from "framer-motion";
import { Trophy, Flame } from 'lucide-react';

const testimonials = [
    { quote: "After years I finally finished a book. The app kept me locked in and made reading so engaging.", author: "Ritvik Prasad", role: "Beta Tester", initials: "RP", color: "bg-[#5B9BF5]" },
    { quote: "I bought this book last year but never finished. Seeing everyone share their progress on the app got me to actually finish it.", author: "Abhishree", role: "Beta Tester", initials: "AB", color: "bg-[#A855F7]" },
    { quote: "It's been 7 years since I read a book just for fun. I'm hyped about my progress — thanks for the constant motivation!", author: "Shanaya", role: "Beta Tester", initials: "SH", color: "bg-emerald-500" },
    { quote: "I finished my book in 2 weeks! So happy and grateful for the motivation to pick it up and actually finish it.", author: "Jayshree Karia", role: "Beta Tester", initials: "JK", color: "bg-[#FEBD17]" },
    { quote: "Finished my first book of 2026! Could not have done it without the XP points and competition keeping me motivated.", author: "Anusha Basu", role: "Beta Tester", initials: "AB", color: "bg-rose-500" },
    { quote: "Can't believe I just completed my third book since joining. I read about 3 all of last year. Already bought my next one!", author: "Colleen Martins", role: "Beta Tester", initials: "CM", color: "bg-sky-500" },
    { quote: "The leaderboard's social competition pushed me to read more than anything. Can't finish outside the top 10!", author: "Krishna Agrawal", role: "Beta Tester", initials: "KA", color: "bg-orange-500" },
    { quote: "Last year I finished one book. It's just the second month and I've read so much already. The momentum is here to stay.", author: "Aarshia Chakraborty", role: "Beta Tester", initials: "AC", color: "bg-teal-500" },
];

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
        <section className="pt-24 pb-20 px-6 relative overflow-hidden bg-[#FFF1C1]" ref={ref} id="rankings">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* Left: Test Image (Scaled to 90%) */}
                {/* <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="order-2 lg:order-1 flex justify-center lg:justify-start overflow-visible"
                >
                    <div className="scale-[0.9] origin-center lg:origin-left min-w-[500px]">
                        <div className="bg-[#1A2B6B] rounded-[3.5rem] p-4 shadow-3xl relative overflow-hidden">
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
                                            className={`flex items-center gap-5 p-5 rounded-3xl transition-all ${entry.active ? 'bg-[#FFF1C1] text-[#1A2B6B] scale-105 shadow-2xl' : 'bg-white/10 text-white hover:bg-white/15'
                                                }`}
                                        >
                                            <div className="w-10 font-black opacity-40 text-lg">#{entry.rank}</div>
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${entry.active ? 'bg-[#1A2B6B] text-white' : (entry.color || 'bg-white/20')
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

                <div className="order-2 lg:order-1 relative lg:min-h-[380px]">
                    <motion.img
                        initial={{ opacity: 0, x: -100 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        src="/assets/Screenshots/leaderboard hand.png"
                        alt="Leaderboard Rankings"
                        className="w-auto h-[280px] object-contain drop-shadow-2xl mx-auto lg:mx-0 lg:absolute lg:left-0 lg:bottom-0 lg:h-[380px] scale-[2] -translate-x-[7.5%] translate-y-[20%]"
                    />
                </div>

                {/* Right: Copy + Original Stats */}
                <div className="order-1 lg:order-2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 no-scrollbar overflow-hidden"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tighter text-[#1A2B6B]">
                            The Proof is in <br />
                            the <span className="text-[#5B9BF5]">Pages.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-[#1A2B6B]/80 leading-relaxed font-medium">
                            Read and grow with the community. Here&apos;s what our readers say.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Stat 1: Retention */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#1A2B6B] p-5 rounded-[2rem] border border-white/10 shadow-xl flex flex-col items-start text-left"
                        >
                            <Trophy className="text-[#FEBD17] mb-2" size={32} strokeWidth={2.5} />
                            <div className="text-white text-2xl font-black tracking-tight mb-1">
                                88%
                            </div>
                            <div className="font-bold text-xs tracking-tight text-white/90">now reading 2+ days a week</div>
                        </motion.div>

                        {/* Stat 2: Growth */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-[#1A2B6B] p-5 rounded-[2rem] border border-white/10 shadow-xl flex flex-col items-start text-left"
                        >
                            <Flame className="text-orange-500 mb-2" size={32} strokeWidth={2.5} />
                            <div className="text-white text-2xl font-black tracking-tight mb-1">
                                30%
                            </div>
                            <div className="font-bold text-xs tracking-tight text-white/90">reading almost daily</div>
                            <p className="text-[10px] font-medium text-white/60 mt-1">No willpower required.</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scrolling Testimonial Marquee — edge to edge */}
            <div className="mt-10 overflow-hidden -mx-6">
                <motion.div
                    className="flex gap-5"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                    }}
                >
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="min-w-[300px] max-w-[340px] bg-white rounded-2xl px-5 py-5 shadow-lg border border-[#1A2B6B]/5 flex-shrink-0"
                        >
                            <p className="text-[#1A2B6B]/70 text-sm font-medium leading-relaxed mb-4">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-black shadow-sm`}>
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-[#1A2B6B] text-xs font-black tracking-wide">
                                        {t.author}
                                    </p>
                                    <p className="text-[#1A2B6B]/40 text-[10px] font-bold uppercase tracking-wider">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
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
