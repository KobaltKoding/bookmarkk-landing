"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, Fragment } from "react";

const systemSteps = [
    { icon: "📖", label: "Read a chapter", description: "Any book, any pace." },
    { icon: "✓", label: "Prove you read it", description: "Take a 2-min AI quiz." },
    { icon: "🏆", label: "Earn XP & rise", description: "Compete in leagues." },
];

const growthStages = [
    {
        day: "Day 1",
        label: "Just getting started",
        xp: 0,
        streak: 0,
        level: 1,
        ringProgress: 0,
        color: "bg-white/5",
        textColor: "text-text-muted",
        ringColor: "stroke-white/10",
        glowColor: "shadow-none",
        icon: "👤",
        borderColor: "border-white/5",
        insight: { text: "Complete your first quiz to unlock insights.", label: "AI Insight" },
    },
    {
        day: "Day 3",
        label: "Building momentum",
        xp: 120,
        streak: 3,
        level: 1,
        ringProgress: 25,
        color: "bg-blue-500/5",
        textColor: "text-blue-500",
        ringColor: "stroke-blue-500",
        glowColor: "shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]",
        icon: "📘",
        borderColor: "border-blue-500/30",
        insight: { text: "You read best in the morning (3 of 3 sessions before 9am).", label: "AI Insight" },
    },
    {
        day: "Day 7",
        label: "Habit forming",
        xp: 340,
        streak: 7,
        level: 2,
        ringProgress: 60,
        color: "bg-success/5",
        textColor: "text-success",
        ringColor: "stroke-success",
        glowColor: "shadow-[0_0_30px_-10px_rgba(34,197,94,0.2)]",
        icon: "📗",
        borderColor: "border-success/30",
        insight: { text: "Drawn to psychology & systems thinking. Comprehension peaks in longer sessions.", label: "AI Insight" },
    },
    {
        day: "Day 14",
        label: "This is who you are now",
        xp: 720,
        streak: 14,
        level: 3,
        ringProgress: 84, // Visual match for 84% retention
        color: "bg-yellow-500/10",
        textColor: "text-yellow-400",
        ringColor: "stroke-yellow-400",
        glowColor: "shadow-[0_0_50px_-10px_rgba(250,204,21,0.3)]",
        icon: "👑",
        borderColor: "border-yellow-500/30",
        insight: { text: "2 books finished. You retain 84% of key concepts. Top pattern: evening deep dives.", label: "AI Insight", highlight: true },
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [currentStage, setCurrentStage] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [timerProgress, setTimerProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-cycle logic
    useEffect(() => {
        if (isPaused || !inView) {
            setTimerProgress(0);
            return;
        }

        const CYCLE_DURATION = 2000; // 2 seconds per slide (faster)
        const UPDATE_FREQ = 50;
        let elapsed = 0;

        progressIntervalRef.current = setInterval(() => {
            elapsed += UPDATE_FREQ;
            setTimerProgress((elapsed / CYCLE_DURATION) * 100);
        }, UPDATE_FREQ);

        intervalRef.current = setInterval(() => {
            setCurrentStage((prev) => (prev + 1) % growthStages.length);
            elapsed = 0;
            setTimerProgress(0);
        }, CYCLE_DURATION);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, [isPaused, inView]);

    const stage = growthStages[currentStage];
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (stage.ringProgress / 100) * circumference;

    // Removed: activeStep state and its useEffect  // 0: Card 1, 1: Arrow 1, 2: Card 2, 3: Arrow 2, 4: Card 3, 5: Reset/Pause

    return (
        <section className="py-24 px-6 overflow-hidden" ref={ref} id="how-it-works">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-24"
                >
                    <p className="text-sm uppercase tracking-wider text-yellow-400 mb-4 font-mono">
                        How It Works
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-text-primary">
                        Read it. Prove it. <span className="text-yellow-400 font-serif italic pr-1">Level up.</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-xl mx-auto">
                        Three steps. One loop. A reading habit that builds itself.
                    </p>
                </motion.div>

                {/* 1. The Loop (Horizontal Flow) */}
                <div className="relative mb-32">

                    {/* Desktop Flex Layout (Perfect Alignment) */}
                    <div className="relative z-10 hidden md:flex items-center justify-between max-w-5xl mx-auto">
                        {systemSteps.map((step, i) => {
                            // Static styles based on index
                            const styles = [
                                {
                                    border: "rgba(34, 197, 94, 0.2)", // Green
                                    bg: "rgba(34, 197, 94, 0.05)",
                                    shadow: "0 0 30px -5px rgba(34, 197, 94, 0.1)",
                                    iconBg: "bg-green-500/10",
                                    iconColor: "text-green-400",
                                    titleColor: "text-green-100"
                                },
                                {
                                    border: "rgba(59, 130, 246, 0.2)", // Blue
                                    bg: "rgba(59, 130, 246, 0.05)",
                                    shadow: "0 0 30px -5px rgba(59, 130, 246, 0.1)",
                                    iconBg: "bg-blue-500/10",
                                    iconColor: "text-blue-400",
                                    titleColor: "text-blue-100"
                                },
                                {
                                    border: "rgba(234, 179, 8, 0.2)", // Yellow
                                    bg: "rgba(234, 179, 8, 0.05)",
                                    shadow: "0 0 30px -5px rgba(234, 179, 8, 0.1)",
                                    iconBg: "bg-yellow-500/10",
                                    iconColor: "text-yellow-400",
                                    titleColor: "text-yellow-100"
                                }
                            ][i];

                            return <Fragment key={i}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        borderColor: styles.border,
                                        backgroundColor: styles.bg,
                                        boxShadow: styles.shadow
                                    }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="w-[300px] h-[320px] backdrop-blur-md bg-black/80 border border-white/[0.08] p-6 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group hover:scale-105 transition-transform duration-300"
                                >
                                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 transition-all duration-500 z-10 ${styles.iconBg} ${styles.iconColor} shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
                                        {step.icon}
                                    </div>
                                    <h3 className={`text-xl font-bold mb-2 transition-colors z-10 ${styles.titleColor}`}>{step.label}</h3>
                                    <p className="text-sm text-white/70 leading-relaxed z-10">{step.description}</p>
                                </motion.div>

                                {i < systemSteps.length - 1 && (
                                    <div className="flex-1 flex justify-center relative">
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                            className="text-5xl font-light text-text-muted/40 pb-4"
                                        >
                                            →
                                        </motion.span>
                                    </div>
                                )}
                            </Fragment>
                                ;
                        })}
                    </div>

                    {/* Mobile Stack Layout */}
                    <div className="md:hidden grid gap-8 relative z-10">
                        {systemSteps.map((step, i) => {
                            const styles = [
                                {
                                    border: "rgba(34, 197, 94, 0.2)", // Green
                                    titleColor: "text-green-100",
                                    iconBg: "bg-green-500/10",
                                    iconColor: "text-green-400"
                                },
                                {
                                    border: "rgba(59, 130, 246, 0.2)", // Blue
                                    titleColor: "text-blue-100",
                                    iconBg: "bg-blue-500/10",
                                    iconColor: "text-blue-400"
                                },
                                {
                                    border: "rgba(234, 179, 8, 0.2)", // Yellow
                                    titleColor: "text-yellow-100",
                                    iconBg: "bg-yellow-500/10",
                                    iconColor: "text-yellow-400"
                                }
                            ][i];

                            return (
                                <div key={i} className="flex flex-col items-center gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            borderColor: styles.border,
                                        }}
                                        className="w-full backdrop-blur-md bg-black/80 border border-white/[0.08] p-6 rounded-2xl flex flex-col items-center text-center"
                                    >
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 ${styles.iconBg} ${styles.iconColor}`}>
                                            {step.icon}
                                        </div>
                                        <h3 className={`text-lg font-bold mb-1 ${styles.titleColor}`}>{step.label}</h3>
                                        <p className="text-sm text-white/70">{step.description}</p>
                                    </motion.div>
                                    {i < systemSteps.length - 1 && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-3xl text-text-muted/40"
                                        >
                                            ↓
                                        </motion.span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>


                {/* 2. Watch Your Profile Grow (Single Transforming Card) */}
                <div className="mt-32">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        className="text-center mb-12"
                    >
                        <p className="text-sm uppercase tracking-widest text-white/80 font-bold">
                            Watch Your Profile Grow
                        </p>
                    </motion.div>

                    <div className="flex justify-center">
                        {/* The Single Transforming Card */}
                        <motion.div
                            className={`relative w-full max-w-sm aspect-[4/5] md:aspect-[3/4] backdrop-blur-xl bg-black/80 border border-white/[0.08] rounded-3xl p-8 transition-all duration-700 flex flex-col items-center justify-between ${stage.borderColor} ${stage.color} ${stage.glowColor} cursor-pointer`}
                            layout
                            onClick={() => {
                                if (isPaused) setIsPaused(false);
                            }}
                        >
                            {/* Top Section: Avatar Ring */}
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                {/* SVG Ring Background */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle cx="64" cy="64" r="50" className="stroke-white/5 fill-none" strokeWidth="4" />
                                    <motion.circle
                                        cx="64" cy="64" r="50"
                                        className={`fill-none ${stage.ringColor}`}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        animate={{ strokeDashoffset }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </svg>

                                {/* Avatar Emoji */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={stage.icon}
                                        initial={{ scale: 0, rotate: -20, opacity: 0 }}
                                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                        exit={{ scale: 0, rotate: 20, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                        className="text-5xl"
                                    >
                                        {stage.icon}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Middle Section: Stats */}
                            <div className="text-center w-full space-y-2 relative z-10">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={stage.day}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-xs uppercase tracking-widest text-text-muted font-bold"
                                    >
                                        {stage.day}
                                    </motion.p>
                                </AnimatePresence>

                                <div className={`text-6xl font-black tabular-nums tracking-tight ${stage.textColor}`}>
                                    <NumberTicker value={stage.xp} />
                                    <span className="text-lg ml-1 opacity-50 font-medium">XP</span>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={stage.label}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-sm text-text-secondary font-medium"
                                    >
                                        {stage.label}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            {/* Stats Row */}
                            <div className="flex gap-6 text-sm font-mono text-text-muted opacity-80 border-t border-white/5 pt-4 w-full justify-center">
                                <div className="flex items-center gap-2">
                                    <span>🔥</span> {stage.streak} day
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>🏆</span> Lvl {stage.level}
                                </div>
                            </div>

                            {/* Bottom: Insight */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={stage.insight?.text} // Key by text so it animates slightly
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className={`w-full mt-6 p-4 rounded-xl border text-left relative overflow-hidden backdrop-blur-md ${stage.insight?.highlight ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-white/5 border-white/5'}`}
                                >
                                    <div className="flex items-center gap-2 mb-2 opacity-60">
                                        <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                        <span className="text-[10px] uppercase font-bold tracking-widest">{stage.insight?.label}</span>
                                    </div>
                                    <p className="text-xs text-text-secondary leading-relaxed">
                                        {stage.insight?.text}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Badge Pop (Day 7 & 14) */}
                            <AnimatePresence>
                                {stage.level > 1 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-3 -right-3 badgeBadge bg-accent-purple text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border border-white/20"
                                    >
                                        LEVEL UP!
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-3 mt-12">
                        {growthStages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setCurrentStage(i);
                                    setIsPaused(true);
                                }}
                                className={`group relative h-2 rounded-full transition-all duration-300 ${i === currentStage ? 'w-8 bg-zinc-600' : 'w-2 bg-text-muted/30 hover:bg-text-muted/60'}`}
                            >
                                {/* Timer Progress Bar for active dot */}
                                {i === currentStage && !isPaused && (
                                    <motion.div
                                        className="absolute inset-0 bg-white/30 rounded-full origin-left"
                                        style={{ width: `${timerProgress}%` }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-xs text-text-muted mt-4 opacity-50">
                        {isPaused ? "Tap card to resume auto-play" : "Tap a dot to pause"}
                    </p>

                </div>
            </div>
        </section>
    );
}

function NumberTicker({ value }: { value: number }) {
    return (
        <motion.span
            initial={false}
            animate={{ opacity: 1 }}
        >
            {value}
        </motion.span>
    );
}
