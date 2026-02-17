"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FinalCTA({ onJoinClick }: { onJoinClick?: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#1A2B6B] relative z-20" ref={ref} id="join">
      <div className="absolute inset-0 bg-[#1A2B6B] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(91,155,245,0.1)_0%,_transparent_70%)] opacity-50 -z-10" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black !text-white mb-8 tracking-tighter leading-[1.1]">
              Ready to turn <br />
              <span className="text-[#FEBD17]">reading into a habit?</span>
            </h2>
            <p className="text-lg md:text-xl text-[#B0BEC5] mb-12 max-w-xl mx-auto font-medium">
              Join the waitlist today and be the first to experience the system that turns every page into progress.
            </p>
            <motion.button
              onClick={onJoinClick}
              className="bg-[#FEBD17] hover:bg-[#FFD54F] px-10 py-5 rounded-full text-lg font-black text-[#1A2B6B] shadow-[0_0_30px_rgba(254,189,23,0.3)] hover:shadow-[0_0_40px_rgba(255,213,79,0.5)] transition-all"
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
