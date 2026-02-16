"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const comparisons = [
  {
    other: "Self-reported sessions",
    bookmarkk: "AI-verified comprehension",
    icon: "🛡️",
  },
  {
    other: "Passive time tracking",
    bookmarkk: "Active proof-of-work",
    icon: "⚡",
  },
  {
    other: "Discovery-first",
    bookmarkk: "Habit-first",
    icon: "🔥",
  },
  {
    other: "Static profiles",
    bookmarkk: "Dynamic identity",
    icon: "🚀",
  },
  {
    other: "No accountability",
    bookmarkk: "Weekly league competition",
    icon: "🏆",
  },
];

export default function ComparisonTable() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-accent-purple mb-3">
            Why switch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Not another reading app
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-white/5">
            <div className="px-6 py-4 text-sm font-medium text-text-muted">
              Other Apps
            </div>
            <div className="px-6 py-4 text-sm font-medium text-accent-purple bg-accent-purple/5">
              Bookmarkk
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <motion.div
              key={row.other}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
              className="grid grid-cols-2 border-b border-white/5 last:border-0"
            >
              <div className="px-6 py-4 flex items-center gap-3 text-sm text-text-secondary">
                <span className="text-red-400 text-xs">✗</span>
                {row.other}
              </div>
              <div className="px-6 py-4 flex items-center gap-3 text-sm font-medium bg-accent-purple/5">
                <span>{row.icon}</span>
                {row.bookmarkk}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
