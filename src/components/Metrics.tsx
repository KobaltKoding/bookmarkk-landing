"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const calendarWeeks = [
  {
    label: "Week 0",
    days: [false, false, true, false, false, false, false],
    count: "1 day",
  },
  {
    label: "Week 1",
    days: [true, true, false, true, false, true, true],
    count: "5 days",
  },
  {
    label: "Week 2",
    days: [true, true, true, true, true, true, false],
    count: "6 days",
  },
];

export default function Metrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-purple/5 blur-[120px] -z-10 rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-[#75BAFF] mb-3">
            Real Results
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1D59BB]">
            Build a reading habit that sticks
          </h2>
          <p className="text-xl text-[#75BAFF] max-w-2xl mx-auto leading-relaxed font-medium">
            Most reading apps track what you <em>want</em> to read. <br />
            Bookmarkk tracks what you <em>actually</em> read.
          </p>
        </motion.div>

        {/* Reading calendar transformation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-2xl shadow-purple-900/5 border border-black/5"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-[#1D59BB]">
            The Consistency Effect
          </h3>
          <div className="space-y-6">
            {calendarWeeks.map((week, wi) => (
              <motion.div
                key={week.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + wi * 0.15 }}
                className="flex items-center gap-6"
              >
                <span className="text-sm font-medium text-text-muted w-16 shrink-0 uppercase tracking-wider">
                  {week.label}
                </span>
                <div className="flex gap-2 flex-1 justify-between">
                  {week.days.map((active, di) => (
                    <div
                      key={di}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-sm md:text-base border transition-all duration-500 ${active
                        ? "bg-success/10 border-success/40 text-success shadow-[0_0_15px_rgba(74,222,128,0.3)] scale-105"
                        : "bg-black/5 border-black/5 text-text-muted"
                        }`}
                    >
                      {active ? "✓" : ""}
                    </div>
                  ))}
                </div>
                <span
                  className={`text-lg font-bold w-20 text-right ${wi === 2 ? "text-success" : "text-text-secondary ml-4"
                    }`}
                >
                  {week.count}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-[#1D59BB]/10 text-center">
            <p className="text-[#75BAFF] italic font-medium">
              "I went from reading 3 books a year to 3 books a month."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
