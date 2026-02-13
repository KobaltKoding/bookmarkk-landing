"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function VisualStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section ref={ref} className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Stat 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="bg-zinc-900/90 border border-white/[0.08] p-10 rounded-3xl text-center flex flex-col items-center justify-center min-h-[240px]"
                    >
                        <div className="text-7xl md:text-8xl font-black mb-4 tracking-tighter text-purple-400">
                            <NumberTicker value={88} />%
                        </div>
                        <p className="text-lg md:text-xl font-bold text-white mb-2">
                            now reading 2+ days/week
                        </p>
                        <p className="text-sm text-text-muted opacity-60">
                            (up from 25%)
                        </p>
                    </motion.div>

                    {/* Stat 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-zinc-900/90 border border-white/[0.08] p-10 rounded-3xl text-center flex flex-col items-center justify-center min-h-[240px]"
                    >
                        <div className="text-7xl md:text-8xl font-black mb-4 tracking-tighter text-blue-400">
                            <NumberTicker value={30} />%
                        </div>
                        <p className="text-lg md:text-xl font-bold text-white mb-2">
                            reading 5+ days/week
                        </p>
                        <p className="text-sm text-text-muted opacity-60">
                            (up from 8%)
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function NumberTicker({ value }: { value: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 1500; // ms
            const steps = 60;
            const interval = duration / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += value / steps;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, interval);

            return () => clearInterval(timer);
        }
    }, [value, isInView]);

    return <span ref={ref}>{count}</span>;
}
