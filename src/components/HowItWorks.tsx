"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import LeaderboardScreen from "./hero-screens/LeaderboardScreen";
import QuizScreen from "./hero-screens/QuizScreen";
import ProfileScreen from "./hero-screens/ProfileScreen";

const growthStages = [
    {
        day: "Week 1",
        label: "The Quiz Flow",
        xp: 120,
        streak: 3,
        level: 1,
        ringProgress: 25,
        color: "bg-primary/5",
        textColor: "text-primary",
        ringColor: "stroke-primary",
        glowColor: "shadow-[0_0_30px_-10px_rgba(192,87,70,0.2)]",
        borderColor: "border-primary/30",
        Component: QuizScreen,
        image: "/assets/Screenshots/Screenshot_20260214-142630.png",
    },
    {
        day: "Week 2",
        label: "Climbing the Ranks",
        xp: 340,
        streak: 7,
        level: 2,
        ringProgress: 60,
        color: "bg-success/5",
        textColor: "text-success",
        ringColor: "stroke-success",
        glowColor: "shadow-[0_0_30px_-10px_rgba(46,125,50,0.2)]",
        borderColor: "border-success/30",
        Component: LeaderboardScreen,
        image: "/assets/Screenshots/Screenshot_20260214-142643.png",
    },
    {
        day: "Month 1",
        label: "A Reader's Profile",
        xp: 720,
        streak: 14,
        level: 3,
        ringProgress: 84,
        color: "bg-primary/10",
        textColor: "text-primary",
        ringColor: "stroke-primary",
        glowColor: "shadow-[0_0_50px_-10px_rgba(192,87,70,0.3)]",
        borderColor: "border-primary/30",
        Component: ProfileScreen,
        image: "/assets/Screenshots/Screenshot_20260214-142657.png",
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [currentScreen, setCurrentScreen] = useState(0);

    // Auto-rotate screens
    useEffect(() => {
        if (!inView) return;
        const interval = setInterval(() => {
            setCurrentScreen((prev) => (prev + 1) % growthStages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [inView]);

    const onDragEnd = (event: any, info: any) => {
        const swipeThreshold = 50;
        if (info.offset.x > swipeThreshold) {
            setCurrentScreen((prev) => (prev - 1 + growthStages.length) % growthStages.length);
        } else if (info.offset.x < -swipeThreshold) {
            setCurrentScreen((prev) => (prev + 1) % growthStages.length);
        }
    };

    return (
        <section className="py-24 px-6 overflow-hidden relative" ref={ref} id="how-it-works">
            <div className="absolute inset-0 bg-transparent -z-10" />
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-24"
                >
                    <p className="text-sm uppercase tracking-wider text-[#75BAFF] mb-4 font-mono font-bold">
                        How It Works
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#1D59BB]">
                        Built Like a Game. <span className="text-[#75BAFF] font-serif italic pr-1">Powered by Habit</span>
                    </h2>
                    <p className="text-[#75BAFF] text-lg max-w-xl mx-auto font-medium">
                        Three steps. One loop. A reading habit that builds itself.
                    </p>
                </motion.div>

                {/* Split Layout Container */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-8">
                    {/* Left Column: Phone Carousel */}
                    <div className="relative h-[500px] w-full lg:w-[45%] max-w-[500px] flex items-center justify-center">
                        {growthStages.map((stage, index) => {
                            const position = (index - currentScreen + growthStages.length) % growthStages.length;
                            let variants = {};

                            if (position === 0) {
                                variants = { x: 0, scale: 1, opacity: 1, zIndex: 20, rotate: 0 };
                            } else if (position === 1) {
                                variants = { x: 160, scale: 0.85, opacity: 0.4, zIndex: 10, rotate: 0 };
                            } else {
                                variants = { x: -160, scale: 0.85, opacity: 0.4, zIndex: 10, rotate: 0 };
                            }

                            return (
                                <motion.div
                                    key={index}
                                    initial={false}
                                    animate={variants}
                                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.05}
                                    onDragEnd={onDragEnd}
                                    className="absolute bottom-0 w-48 md:w-60 origin-bottom cursor-grab active:cursor-grabbing"
                                >
                                    <div className={`backdrop-blur-md bg-black/80 border ${stage.borderColor} rounded-2xl p-2 shadow-2xl`}>
                                        <div className="bg-background rounded-xl overflow-hidden h-[400px] relative pointer-events-none select-none">
                                            <div className="flex items-center justify-between px-5 py-3 text-[10px] text-text-muted/50 absolute top-0 left-0 right-0 z-10">
                                                <span>9:41</span>
                                                <div className="w-12 h-4 rounded-full bg-black/40 border border-white/5" />
                                            </div>
                                            <div className="h-full overflow-hidden">
                                                <img
                                                    src={stage.image}
                                                    alt={stage.label}
                                                    className="w-full h-full object-cover [image-rendering:optimize-contrast] rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Column: Growth Stage UI (Slim iPhone-width) */}
                    <div className="w-full lg:w-[40%] max-w-[340px] p-8 md:p-10 backdrop-blur-xl bg-black/40 border border-white/[0.08] rounded-2xl relative overflow-hidden group lg:ml-auto">
                        <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentScreen}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4 relative w-full"
                                >
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold opacity-60">
                                        {growthStages[currentScreen].day}
                                    </p>

                                    {/* Circular Progress Ring around XP */}
                                    <div className="relative flex items-center justify-center py-2">
                                        <svg className="w-40 h-40 -rotate-90">
                                            <circle
                                                cx="80"
                                                cy="80"
                                                r="70"
                                                fill="transparent"
                                                stroke="currentColor"
                                                strokeWidth="6"
                                                className="text-white/5"
                                            />
                                            <motion.circle
                                                cx="80"
                                                cy="80"
                                                r="70"
                                                fill="transparent"
                                                stroke="#C05746"
                                                strokeWidth="6"
                                                strokeDasharray={2 * Math.PI * 70}
                                                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                                                animate={{ strokeDashoffset: (2 * Math.PI * 70) - (growthStages[currentScreen].ringProgress / 100) * (2 * Math.PI * 70) }}
                                                transition={{ duration: 1.5, ease: "circOut" }}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute flex flex-col items-center">
                                            <div className="text-5xl font-black tabular-nums tracking-tighter text-[#3E2723] drop-shadow-2xl">
                                                <NumberTicker value={growthStages[currentScreen].xp} />
                                                <span className="text-lg ml-1 opacity-40 font-bold">XP</span>
                                            </div>
                                        </div>

                                        {/* Level Up Badge */}
                                        <AnimatePresence>
                                            {growthStages[currentScreen].level > 1 && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0, rotate: -20 }}
                                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                                    exit={{ scale: 0, opacity: 0, rotate: 20 }}
                                                    className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[9px] font-bold px-2.5 py-1 rounded-full shadow-lg border-2 border-black/10 z-20"
                                                >
                                                    LEVEL UP!
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <h3 className="text-xl font-bold text-text-primary tracking-tight px-4 leading-tight">
                                        {growthStages[currentScreen].label}
                                    </h3>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex flex-col gap-4 w-full px-2 md:px-4">
                                <div className="flex items-center justify-between px-5 md:px-6 py-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl filter drop-shadow-md">🔥</span>
                                        <div className="text-left">
                                            <p className="text-[9px] text-text-muted font-bold leading-none uppercase tracking-wider">Streak</p>
                                            <p className="text-sm font-black text-text-primary leading-tight mt-1">{growthStages[currentScreen].streak} Days</p>
                                        </div>
                                    </div>
                                    <div className="w-[1px] h-6 bg-white/10" />
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl filter drop-shadow-md">🏆</span>
                                        <div className="text-left">
                                            <p className="text-[9px] text-text-muted font-bold leading-none uppercase tracking-wider">Rank</p>
                                            <p className="text-sm font-black text-text-primary leading-tight mt-1">Lvl {growthStages[currentScreen].level}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Glow Effect */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentScreen}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.1 }}
                                exit={{ opacity: 0 }}
                                className={`absolute inset-0 bg-gradient-radial from-current to-transparent opacity-10 pointer-events-none ${growthStages[currentScreen].textColor.replace('text-', 'bg-')}`}
                            />
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-16 lg:mt-24">
                    {growthStages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentScreen(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === currentScreen ? 'w-10 bg-yellow-400' : 'w-2 bg-text-muted/30 hover:bg-text-muted/60'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function NumberTicker({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const duration = 1500;
        const startValue = displayValue;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * (value - startValue) + startValue);

            setDisplayValue(current);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [value]);

    return (
        <motion.span
            initial={false}
            animate={{ opacity: 1 }}
            className="font-black"
        >
            {displayValue}
        </motion.span>
    );
}
