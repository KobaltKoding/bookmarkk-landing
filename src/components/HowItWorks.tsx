"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const growthStages = [
    {
        day: "Step 1",
        label: "The Quiz Flow",
        borderColor: "border-primary/30",
        image: "/assets/Screenshots/home_page.png",
    },
    {
        day: "Step 2",
        label: "Climbing the Ranks",
        borderColor: "border-success/30",
        image: "/assets/Screenshots/quiz_page.png",
    },
    {
        day: "Step 3",
        label: "A Reader's Profile",
        borderColor: "border-primary/30",
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
        }, 2500);
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
        <section className="py-24 px-6 overflow-hidden relative" ref={ref} id="how-it-works">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 lg:items-center">

                    {/* Left: Phone Carousel */}
                    <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                        <div className="relative h-[650px] w-full max-w-[500px] flex items-center justify-center">
                            {growthStages.map((stage, index) => {
                                const position = (index - currentScreen + growthStages.length) % growthStages.length;
                                let variants = {};

                                if (position === 0) {
                                    variants = { x: 0, scale: 1, opacity: 1, zIndex: 20, rotate: 0 };
                                } else if (position === 1) {
                                    variants = { x: 120, scale: 0.85, opacity: 0.4, zIndex: 10, rotate: 0 };
                                } else {
                                    variants = { x: -120, scale: 0.85, opacity: 0.4, zIndex: 10, rotate: 0 };
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
                                        className="absolute bottom-0 w-56 md:w-72 origin-bottom cursor-grab active:cursor-grabbing"
                                    >
                                        <div className={`backdrop-blur-md bg-black/80 border ${stage.borderColor} rounded-[2.5rem] p-2 shadow-2xl`}>
                                            <div className="bg-background rounded-[2.2rem] overflow-hidden h-[500px] relative pointer-events-none select-none">
                                                <div className="h-full overflow-hidden">
                                                    <img
                                                        src={stage.image}
                                                        alt={stage.label}
                                                        className="w-full h-full object-cover [image-rendering:optimize-contrast] rounded-[2.2rem] scale-x-110"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Content Section (Minimalist, No Glass Card) */}
                    <div className="order-1 lg:order-2 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <p className="text-sm uppercase tracking-wider text-yellow-400 mb-4 font-mono font-bold">
                                How It Works
                            </p>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-text-primary leading-[1.1] tracking-tight">
                                Read it. <br />
                                Prove it. <br />
                                <span className="text-yellow-400 font-serif">Level up.</span>
                            </h2>
                            <p className="text-text-secondary text-lg md:text-xl font-light leading-relaxed max-w-xl">
                                Three steps. One loop. A reading habit that builds itself. <strong className="text-text-primary font-semibold">Bookmarkk</strong> turns every chapter into proof of progress.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
