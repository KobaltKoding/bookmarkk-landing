"use client";

import { motion } from "framer-motion";

export default function Hero({ onJoinClick }: { onJoinClick?: () => void }) {
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
            className="lg:w-[48%] text-center lg:text-left"
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

          {/* Hero Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[42%] flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[400px] aspect-[4/5] rounded-[2.5rem] overflow-hidden group relative z-10">
              <img
                src="/assets/Reader/hero_dark_bg.png"
                alt="Bookmarkk Experience"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Subtle Overlay Gradient for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
