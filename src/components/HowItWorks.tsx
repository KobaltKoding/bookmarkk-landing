"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import LeaderboardScreen from "./hero-screens/LeaderboardScreen";
import QuizScreen from "./hero-screens/QuizScreen";
import ProfileScreen from "./hero-screens/ProfileScreen";

const growthStages = [
    {
        day: "Step 1",
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
        image: "/assets/Screenshots/home_page.png",
    },
    {
        day: "Step 2",
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
        image: "/assets/Screenshots/quiz_page.png",
    },
    {
        day: "Step 3",
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
        image: "/assets/Screenshots/streak_page.png",
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [currentScreen, setCurrentScreen] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-rotate screens
    useEffect(() => {
        if (!inView || isPaused) return;
        const interval = setInterval(() => {
            setCurrentScreen((prev) => (prev + 1) % growthStages.length);
        }, 1500);
        return () => clearInterval(interval);
    }, [inView, isPaused]);

    const onDragEnd = (event: any, info: any) => {
        const swipeThreshold = 50;
        if (info.offset.x > swipeThreshold) {
            setCurrentScreen((prev) => (prev - 1 + growthStages.length) % growthStages.length);
        } else if (info.offset.x < -swipeThreshold) {
            setCurrentScreen((prev) => (prev + 1) % growthStages.length);
        }
    };

    return (
        <section className="py-24 px-6 overflow-hidden relative bg-[#FEF3B3]" ref={ref} id="how-it-works">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left: Phone Carousel */}
                    <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                        <div className="relative h-[600px] w-full max-w-[500px] flex items-center justify-center">
                            {growthStages.map((stage, index) => {
                                const position = (index - currentScreen + growthStages.length) % growthStages.length;
                                let variants = {};

                                if (position === 0) {
                                    variants = { x: 0, scale: 1, opacity: 1, zIndex: 20, rotate: 0 };
                                } else if (position === 1) {
                                    variants = { x: 140, scale: 0.85, opacity: 0.4, zIndex: 10, rotate: 0 };
                                } else {
                                    variants = { x: -140, scale: 0.85, opacity: 0.4, zIndex: 10, rotate: 0 };
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
                                        onClick={() => setIsPaused(!isPaused)}
                                        className="absolute w-64 md:w-80 cursor-grab active:cursor-grabbing"
                                    >
                                        <div className={`backdrop-blur-md bg-black rounded-[3.5rem] p-3 shadow-2xl border ${stage.borderColor}`}>
                                            <div className="bg-background rounded-[3rem] overflow-hidden h-[600px] relative pointer-events-none select-none">
                                                <div className="h-full overflow-hidden">
                                                    <img
                                                        src={stage.image}
                                                        alt={stage.label}
                                                        className="w-full h-full object-cover [image-rendering:optimize-contrast] rounded-[3rem] scale-x-110"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Content Glass Card */}
                    <div className="order-1 lg:order-2 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 no-scrollbar overflow-hidden"
                        >
                            <p className="text-sm uppercase tracking-wider text-[#75BAFF] mb-4 font-mono font-bold">
                                How It Works
                            </p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-[#1D59BB] leading-[1.1] tracking-tighter">
                                Read it. <br />
                                Prove it. <br />
                                <span className="text-[#75BAFF]">Level up.</span>
                            </h2>
                            <p className="text-[#1D59BB]/80 text-lg md:text-xl font-medium leading-relaxed">
                                Three steps. One loop. A reading habit that builds itself. Bookmarkk turns every chapter into proof of progress.
                            </p>

                        </motion.div>
                    </div>
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
