"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const loopSteps = [
  { icon: "📚", label: "Read Chapter", color: "text-accent-blue" },
  { icon: "✓", label: "Pass Quiz", color: "text-accent-purple" },
  { icon: "⚡", label: "Earn XP", color: "text-success" },
  { icon: "🔥", label: "Build Streak", color: "text-warning" },
  { icon: "🏆", label: "Climb League", color: "text-yellow-400" },
  { icon: "💪", label: "Feel Progress", color: "text-accent-purple" },
];

const dayProgress = [
  { day: "Day 1", xp: 0, streak: 0, league: "Not ranked", progress: 0 },
  { day: "Day 3", xp: 120, streak: 3, league: "#8", progress: 25 },
  { day: "Day 7", xp: 340, streak: 7, league: "#3", progress: 55 },
  { day: "Day 14", xp: 720, streak: 14, league: "#1", progress: 90 },
];

export default function CompleteLoop() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-accent-purple mb-3">
            The habit loop
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The self-reinforcing loop
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Each step feeds the next. The more you read, the more you earn. The
            more you earn, the more you want to read.
          </p>
        </motion.div>

        {/* Loop visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-20"
        >
          {loopSteps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="glass-card rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{step.icon}</span>
                <span className={`font-semibold text-sm ${step.color}`}>
                  {step.label}
                </span>
              </div>
              {i < loopSteps.length - 1 && (
                <svg
                  className="w-4 h-4 text-text-muted hidden md:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </motion.div>
          ))}
          {/* Loop back arrow */}
          <div className="w-full flex justify-center mt-2">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <svg
                className="w-4 h-4 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Want to read more
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Day-by-day progress */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dayProgress.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="glass-card rounded-xl p-5 text-center"
            >
              <p className="text-sm text-text-muted mb-3">{day.day}</p>

              <div className="space-y-2">
                <div>
                  <span className="text-2xl font-bold gradient-text">
                    {day.xp}
                  </span>
                  <span className="text-xs text-text-muted ml-1">XP</span>
                </div>

                <div className="flex items-center justify-center gap-1">
                  {day.streak > 0 && <span className="text-sm">🔥</span>}
                  <span className="text-sm text-text-secondary">
                    {day.streak > 0
                      ? `${day.streak}-day streak`
                      : "No streak"}
                  </span>
                </div>

                <div className="text-xs text-text-muted">
                  League: {day.league}
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-navy-700 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${day.progress}%` } : {}}
                    transition={{ duration: 1, delay: 0.8 + i * 0.15 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-blue"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
