"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ProblemSolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: The Problem - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-wider text-text-muted mb-6">
              The problem
            </p>
            <div className="space-y-4">
              {[
                { title: "Atomic Habits", date: "Started: Jan 1", opacity: 1, status: "Reading..." },
                {
                  title: "Deep Work",
                  date: "Last opened: Jan 8",
                  opacity: 0.5,
                  status: "Stalled",
                },
                {
                  title: "The Psychology of Money",
                  date: "Abandoned: Jan 15",
                  opacity: 0.2,
                  status: "Forgotten",
                },
              ].map((book, i) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  style={{ opacity: inView ? book.opacity : 0 }}
                  className="glass-card rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-14 rounded bg-navy-600/80 flex items-center justify-center text-xl shrink-0">
                    &#128214;
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium ${
                        book.opacity < 0.5
                          ? "line-through text-text-muted"
                          : "text-white"
                      }`}
                    >
                      {book.title}
                    </p>
                    <p className="text-sm text-text-muted">{book.date}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      book.opacity === 1
                        ? "bg-accent-purple/20 text-accent-purple"
                        : book.opacity === 0.5
                        ? "bg-warning/20 text-warning"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {book.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: The Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm uppercase tracking-wider text-accent-purple mb-6">
              The solution
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              70% of people want to read more.
              <br />
              <span className="text-text-secondary">
                Most fail because progress is invisible.
              </span>
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Reading is the only self-improvement habit with no scoreboard.
                You can&apos;t see momentum. You can&apos;t prove comprehension.
                So the habit dies quietly.
              </p>
              <p className="text-white font-semibold text-lg">
                Bookmarkk fixes this.
              </p>
              <p>
                AI-generated quizzes verify you actually read each chapter.
                Weekly leagues create competition. Streaks build momentum. Your
                progress becomes real, visible, and impossible to fake.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
