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
              The reality
            </p>
            <div className="space-y-4 relative">
              {/* Fade gradient overlay to emphasize "forgotten" state */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

              {[
                { title: "Atomic Habits", status: "Started: Jan 1", opacity: 1 },
                {
                  title: "Deep Work",
                  status: "Stalled: Jan 8",
                  opacity: 0.5,
                },
                {
                  title: "Psychology of Money",
                  status: "Forgotten: Jan 15",
                  opacity: 0.2, // Very faint
                },
              ].map((book, i) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className={`glass-card rounded-xl p-5 flex items-center gap-4 transition-all duration-500`}
                  style={{
                    opacity: inView ? book.opacity : 0,
                    filter: i === 2 ? "blur(1px)" : "none", // Blur the forgotten one
                  }}
                >
                  <div className={`w-12 h-16 rounded shadow-sm flex items-center justify-center text-2xl shrink-0 ${i === 0 ? "bg-accent-blue/20 text-accent-blue" : "bg-black/5 text-text-muted"}`}>
                    &#128214;
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-lg ${i === 0 ? "text-text-primary" : "text-text-secondary"}`}>
                      {book.title}
                    </p>
                    <p className="text-sm text-text-muted">{book.status}</p>
                  </div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-text-primary">
              Your bookshelf is a <br />
              <span className="text-text-secondary">graveyard of good intentions.</span>
            </h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>
                Buying books feels like progress. But without a system, they just collect dust.
              </p>
              <p>
                You start them with energy. You get distracted. You forget them in a week. The guilt piles up with the unread pages.
              </p>
              <div className="pt-4">
                <p className="text-accent-purple font-bold text-xl">
                  Turn intent into action.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
