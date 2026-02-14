"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FinalCTA({ onJoinClick }: { onJoinClick?: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6" ref={ref} id="join">
      {/* 
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-md bg-black/80 border border-white/[0.08] rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/ * ... content was here ... * /}
        </motion.div>
      </div>
      */}
    </section>
  );
}
