"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function ProblemSolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [dustyParticles, setDustyParticles] = useState<{ id: number; x: number; y: number; duration: number }[]>([]);

  useEffect(() => {
    setDustyParticles(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 3 + Math.random() * 4,
      }))
    );
  }, []);

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: The Graveyard - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <p className="text-sm uppercase tracking-wider text-text-muted mb-8 font-mono pl-2">
              The Lifecycle of a Book
            </p>
            <div className="space-y-8 relative pl-8">
              {/* Timeline Line */}
              <div className="absolute left-[19px] top-4 bottom-12 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-500 to-red-900/30 opacity-30" />

              {[
                {
                  label: "Week 1: The Spark",
                  title: "Atomic Habits",
                  status: "Read 45 pages",
                  progress: 22,
                  color: "bg-emerald-500/80",
                  textColor: "text-emerald-400/90",
                  borderColor: "border-emerald-500/20",
                  shadow: "shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]",
                  opacity: 1,
                  blur: "none",
                  icon: "🔥",
                  grayscale: "grayscale-0",
                },
                {
                  label: "Week 3: The Slump",
                  title: "Atomic Habits",
                  status: "Read 12 pages",
                  progress: 8,
                  color: "bg-amber-500/80",
                  textColor: "text-amber-400/90",
                  borderColor: "border-amber-500/10",
                  shadow: "shadow-none",
                  opacity: 0.8,
                  blur: "none",
                  icon: "✋",
                  grayscale: "grayscale-[0.3]",
                },
                {
                  label: "Month 2: The Graveyard",
                  title: "Atomic Habits",
                  status: "Touched 0 times",
                  progress: 0,
                  color: "bg-red-900/80",
                  textColor: "text-red-400/70",
                  borderColor: "border-red-900/10",
                  shadow: "shadow-none",
                  opacity: 0.5,
                  blur: "blur(0.5px)",
                  icon: "🕸️",
                  grayscale: "grayscale-[0.8]",
                },
              ].map((book, i) => (
                <div key={i} className="relative">
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.2 }}
                    className={`absolute -left-[21px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background ${book.color} z-10`}
                  />

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.3 }} // Staggered entrance
                    className={`backdrop-blur-md bg-black/40 border border-white/[0.08] rounded-xl p-5 relative overflow-hidden transition-all duration-700 border ${book.borderColor} ${book.shadow}`}
                    style={{
                      opacity: inView ? book.opacity : 0,
                      filter: inView ? `${book.blur} ${book.grayscale}` : "none",
                    }}
                  >
                    <div className="absolute top-2 right-3 text-[10px] uppercase tracking-widest font-bold opacity-40">
                      {book.label}
                    </div>

                    <div className="flex items-center gap-4 relative z-10 mt-2">
                      <div
                        className={`w-12 h-16 rounded shadow-sm flex items-center justify-center text-2xl shrink-0 ${book.color} bg-opacity-10`}
                      >
                        <span className="opacity-100 drop-shadow-md">{book.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className={`font-bold text-lg text-text-primary`}>
                            {book.title}
                          </p>
                        </div>

                        {/* Progress Bar or Status */}

                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${book.progress}%` } : {}}
                            transition={{ duration: 1.5, delay: 0.5 + i * 0.3, ease: "easeOut" }}
                            className={`h-full ${book.color}`}
                          />
                        </div>

                        <p className={`text-xs font-medium ${book.textColor}`}>{book.status}</p>
                      </div>
                    </div>

                    {/* Dust particles for the forgotten card */}
                    {i === 2 && (
                      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay">
                        {dustyParticles.map((p) => (
                          <motion.div
                            key={p.id}
                            className="absolute w-1 h-1 bg-white/30 rounded-full blur-[0.5px]"
                            style={{ left: `${p.x}%`, top: `${p.y}%` }}
                            animate={{
                              y: [0, -20, 0],
                              x: [0, 10, -10, 0],
                              opacity: [0, 0.6, 0],
                            }}
                            transition={{
                              duration: p.duration,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: The Solution - Copy */}
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
                You start with energy. You stall in a week. The guilt piles up with the unread pages.
              </p>
              <div className="pt-4 space-y-4">
                <p className="font-semibold text-text-primary text-xl">
                  You don't need more motivation. <br />You need a system.
                </p>
                <div className="inline-block relative">
                  <p className="relative text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-200">
                    Bookmarkk makes sure you finish.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
