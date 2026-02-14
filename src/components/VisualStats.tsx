"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function VisualStats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section ref={ref} className="py-24 px-6 relative z-10">
            {/* 
            <div className="max-w-4xl mx-auto flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-[340px] h-[500px] backdrop-blur-3xl bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-10 flex flex-col items-center justify-around text-center shadow-2xl relative overflow-hidden group"
                >
                    {/ * ... content was here ... * /}
                </motion.div>
            </div>
            */}
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
