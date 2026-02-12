"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LeaderboardScreen from "./hero-screens/LeaderboardScreen";
import QuizScreen from "./hero-screens/QuizScreen";
import ProfileScreen from "./hero-screens/ProfileScreen";

export default function Hero() {
  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] tracking-tight mb-6">
            Turn reading into a
            <br />
            <span className="gradient-text">sport you can win</span>
          </h1>

          {/* Subheadline */}
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Bookmarkk is <span className="text-white font-medium">Strava for books</span>.
            Prove your reading, compete in leagues, and build your literary identity.
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

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-16 relative mx-auto max-w-sm"
        >
          <div className="relative mx-auto w-72 md:w-80">
            {/* Phone frame */}
            <div className="glass-card rounded-[2.5rem] p-3 glow-purple">
              <div className="bg-background rounded-[2rem] overflow-hidden h-[540px] relative">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 py-3 text-xs text-secondary absolute top-0 left-0 right-0 z-10">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 rounded-sm bg-text-secondary/40" />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="h-full pt-8"
                  >
                    {currentScreen === 0 && <LeaderboardScreen />}
                    {currentScreen === 1 && <QuizScreen />}
                    {currentScreen === 2 && <ProfileScreen />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-12 top-20 glass-card px-3 py-2 rounded-xl text-sm"
            >
              <span className="text-success font-semibold">+80 XP</span>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-14 top-44 glass-card px-3 py-2 rounded-xl text-sm"
            >
              <span>&#9989;</span>{" "}
              <span className="text-text-secondary">Quiz passed</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
