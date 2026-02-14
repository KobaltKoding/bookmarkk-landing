"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LeaderboardScreen from "./hero-screens/LeaderboardScreen";
import QuizScreen from "./hero-screens/QuizScreen";
import ProfileScreen from "./hero-screens/ProfileScreen";

export default function Hero({ onJoinClick }: { onJoinClick?: () => void }) {
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

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-[45%] text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-8">
              <span className="text-text-muted">Stop wanting to read.</span>
              <br />
              <span className="gradient-text">Start being a Reader.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary mb-12 leading-relaxed font-light max-w-xl lg:mx-0 mx-auto">
              <strong className="text-text-primary font-semibold">Bookmarkk</strong> turns every chapter into <span className="text-text-primary font-medium">proof of progress.</span>
            </p>
          </motion.div>

          {/* Bookmark Flow - Feature List (Scaled & Moved Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-[42%] max-w-lg mx-auto lg:ml-auto"
          >
            <p className="text-xs uppercase tracking-wider text-text-muted mb-6 font-mono pl-2">
              Bookmark Flow
            </p>
            <div className="space-y-6 relative pl-12">
              {/* Timeline Line */}
              <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-accent-purple via-accent-blue to-success opacity-30" />

              {[
                {
                  title: "Read and increase your streaks",
                  icon: "🔥",
                  color: "bg-orange-500/10",
                  iconColor: "text-orange-400",
                  borderColor: "border-orange-500/20"
                },
                {
                  title: "Test yourself with AI Quizzes",
                  icon: "🧠",
                  color: "bg-accent-purple/10",
                  iconColor: "text-accent-purple",
                  borderColor: "border-accent-purple/20"
                },
                {
                  title: "Place yourself in the Leagues",
                  icon: "🏆",
                  color: "bg-yellow-500/10",
                  iconColor: "text-yellow-400",
                  borderColor: "border-yellow-500/20"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className="relative origin-left"
                >
                  <div className={`absolute -left-[30px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background ${item.color.replace('/10', '/80')} z-10`} />
                  <div className={`backdrop-blur-md bg-black/40 border ${item.borderColor} rounded-2xl p-5 flex items-center gap-5`}>
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-2xl`}>
                      {item.icon}
                    </div>
                    <p className="font-semibold text-text-primary text-base md:text-lg">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
