"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LeaderboardScreen from "./hero-screens/LeaderboardScreen";
import QuizScreen from "./hero-screens/QuizScreen";
import ProfileScreen from "./hero-screens/ProfileScreen";

export default function Hero() {
  const [currentScreen, setCurrentScreen] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 3);
    }, 3000); // Speed up loop
    return () => clearInterval(interval);
  }, []);

  // Drag handler
  const onDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      // Swiped Right -> Previous
      setCurrentScreen((prev) => (prev - 1 + 3) % 3);
    } else if (info.offset.x < -swipeThreshold) {
      // Swiped Left -> Next
      setCurrentScreen((prev) => (prev + 1) % 3);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-secondary font-medium tracking-wide">
              Early access open
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            <span className="text-text-muted">Stop wanting to read.</span>
            <br />
            <span className="gradient-text">Start being a Reader.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            <strong className="text-text-primary font-semibold">Bookmarkk</strong> turns every chapter into <span className="text-text-primary font-medium">proof of progress</span> — with AI quizzes, streaks, and leagues that make your reading habit stick.
          </p>

          {/* CTA */}
          <a
            href="#join"
            className="gradient-btn inline-flex items-center gap-2 px-10 py-5 rounded-full text-xl font-bold text-white transition-all hover:scale-105 shadow-2xl hover:shadow-primary/50"
          >
            Join Waitlist
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>

        {/* Phone carousel */}
        <div className="mt-20 relative h-[600px] w-full max-w-[1000px] mx-auto flex items-center justify-center perspective-[1000px]">
          {[0, 1, 2].map((index) => {
            // Calculate position: 0=Center, 1=Right, 2=Left (relative to current)
            const position = (index - currentScreen + 3) % 3;

            let variants = {};

            // Center
            if (position === 0) {
              variants = {
                x: 0,
                scale: 1,
                opacity: 1,
                zIndex: 20,
                rotate: 0,
              };
            }
            // Right
            else if (position === 1) {
              variants = {
                x: '50%', // Percentages work well for responsive spacing
                scale: 0.8,
                opacity: 0.4,
                zIndex: 10,
                rotate: 15,
              };
            }
            // Left
            else {
              variants = {
                x: '-50%',
                scale: 0.8,
                opacity: 0.4,
                zIndex: 10,
                rotate: -15,
              };
            }

            // Override for tighter visual: 180px vs 220px
            if (position === 1) variants = { ...variants, x: 180 };
            if (position === 2) variants = { ...variants, x: -180 };

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
                className="absolute top-0 w-64 md:w-80 origin-bottom cursor-grab active:cursor-grabbing"
              >
                <div className="backdrop-blur-md bg-black/40 border border-white/[0.08] rounded-[2.5rem] p-3 glow-purple">
                  <div className="bg-background rounded-[2rem] overflow-hidden h-[540px] relative pointer-events-none select-none">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-6 py-3 text-xs text-secondary absolute top-0 left-0 right-0 z-10">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 rounded-sm bg-text-secondary/40" />
                      </div>
                    </div>
                    <div className="h-full pt-8">
                      {index === 0 && <LeaderboardScreen />}
                      {index === 1 && <QuizScreen />}
                      {index === 2 && <ProfileScreen />}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
