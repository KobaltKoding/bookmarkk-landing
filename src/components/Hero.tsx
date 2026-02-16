"use client";

import { motion } from "framer-motion";

export default function Hero({ onJoinClick }: { onJoinClick?: () => void }) {
  return (
    <section className="relative min-h-[300vh]" style={{ background: 'transparent' }}>
      {/* Background Animation - Moved to Global Page */}

      {/* Sticky Content Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* Background gradient orbs - Reduced opacity to let book show through */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#1D59BB]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-3/4 w-96 h-96 bg-[#75BAFF]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-16">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-[45%] text-center lg:text-left backdrop-blur-sm bg-white/10 p-8 rounded-3xl border border-white/20 shadow-xl"
            >
              <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter mb-8">
                <span className="text-[#75BAFF] drop-shadow-sm">Stop wanting to read.</span>
                <br />
                <span className="text-[#1D59BB] drop-shadow-sm">Start being a Reader.</span>
              </h1>

              <p className="text-lg md:text-xl text-[#1D59BB]/80 mb-12 leading-relaxed font-medium max-w-xl lg:mx-0 mx-auto">
                <strong className="text-[#1D59BB] font-bold">Bookmarkk</strong> turns every chapter into <span className="text-[#1D59BB] font-bold">proof of progress.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[42%] flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-[400px] aspect-[4/5] rounded-[2rem] bg-white/10 backdrop-blur-sm shadow-xl overflow-hidden border border-[#1D59BB]/10 group relative z-10">
                <img
                  src="/assets/Reader/hero_image_bgmatch.png"
                  alt="Bookmarkk Experience"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
