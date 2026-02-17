"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const screenshots = [
    {
        label: "Track Your Stats",
        image: "/assets/Screenshots/stats.png",
    },
    {
        label: "Your Book Collection",
        image: "/assets/Screenshots/book .png",
    },
    {
        label: "Test Your Knowledge",
        image: "/assets/Screenshots/quiz.png",
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [focusedIndex, setFocusedIndex] = useState(1); // Start with middle image focused

    // Auto-rotate every 2 seconds
    useEffect(() => {
        if (!inView) return;
        const interval = setInterval(() => {
            setFocusedIndex((prev) => (prev + 1) % screenshots.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [inView]);

    return (
        <section className="py-24 px-6 overflow-hidden relative bg-[#F2F4F7]" ref={ref} id="how-it-works">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left: Screenshot Carousel */}
                    <div className="order-2 lg:order-1 flex flex-col items-center gap-6 w-full">
                        <div className="relative w-full h-[600px] flex items-center justify-center gap-4 px-4">
                            {screenshots.map((screen, index) => {
                                const relativePosition = index - focusedIndex;
                                const isFocused = index === focusedIndex;

                                let xOffset = 0;
                                let scale = 0.75;
                                let opacity = 0.4;
                                let zIndex = 0;

                                if (isFocused) {
                                    xOffset = 0;
                                    scale = 1;
                                    opacity = 1;
                                    zIndex = 10;
                                } else if (relativePosition === -1 || relativePosition === 2) {
                                    // Left
                                    xOffset = -180;
                                    scale = 0.75;
                                    opacity = 0.4;
                                    zIndex = 5;
                                } else if (relativePosition === 1 || relativePosition === -2) {
                                    // Right
                                    xOffset = 180;
                                    scale = 0.75;
                                    opacity = 0.4;
                                    zIndex = 5;
                                }

                                return (
                                    <motion.div
                                        key={index}
                                        initial={false}
                                        animate={{
                                            x: xOffset,
                                            scale: scale,
                                            opacity: opacity,
                                            zIndex: zIndex
                                        }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="absolute cursor-pointer"
                                        onClick={() => setFocusedIndex(index)}
                                    >
                                        <img
                                            src={screen.image}
                                            alt={screen.label}
                                            className="w-full max-w-[280px] h-auto object-contain drop-shadow-2xl"
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Indicator Dots */}
                        <div className="flex gap-2 justify-center">
                            {screenshots.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setFocusedIndex(index)}
                                    className={`h-2 rounded-full transition-all ${index === focusedIndex ? 'bg-[#5B9BF5] w-8' : 'bg-[#1A2B6B]/20 w-2'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="order-1 lg:order-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 no-scrollbar overflow-hidden"
                        >
                            <p className="text-sm uppercase tracking-wider text-[#5B9BF5] mb-4 font-mono font-bold">
                                How It Works
                            </p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-[#1A2B6B] leading-[1.1] tracking-tighter">
                                Read it. <br />
                                Prove it. <br />
                                <span className="text-[#5B9BF5]">Level up.</span>
                            </h2>
                            <p className="text-[#1A2B6B]/80 text-lg md:text-xl font-medium leading-relaxed">
                                Three steps. One loop. A reading habit that builds itself. Bookmarkk turns every chapter into proof of progress.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
