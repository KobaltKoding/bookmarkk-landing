"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FinalCTA({ onJoinClick }: { onJoinClick?: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#FEF3B3] relative z-20" ref={ref} id="join">
      <div className="absolute inset-0 bg-[#FEF3B3] -z-10" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-[#1D59BB] mb-8 tracking-tighter leading-[1.1]">
              Ready to turn <br />
              <span className="text-[#75BAFF]">reading into a habit?</span>
            </h2>
            <p className="text-lg md:text-xl text-[#1D59BB]/70 mb-12 max-w-xl mx-auto font-medium">
              Join the waitlist today and be the first to experience the system that turns every page into progress.
            </p>
            <motion.button
              onClick={onJoinClick}
              className="bg-[#1D59BB] px-10 py-5 rounded-full text-lg font-black text-white shadow-xl hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Early Access
            </motion.button>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
