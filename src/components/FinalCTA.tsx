"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6" ref={ref} id="join">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <p className="text-sm uppercase tracking-wider text-accent-purple mb-4">
              Be early
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-text-primary">
              Ready to be a Reader?
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-xl mx-auto">
              Join the waitlist to secure your spot in the next cohort.
            </p>

            <a
              href="#"
              className="gradient-btn px-8 py-4 rounded-full text-lg font-bold text-white transition-all hover:scale-105 shadow-xl hover:shadow-primary/25"
            >
              Join Waitlist
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
