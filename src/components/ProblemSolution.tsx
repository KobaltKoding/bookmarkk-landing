"use client";

import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

export default function ProblemSolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      img: "/assets/Problem_Flow/start_energy.jpg",
      alt: "You start with energy",
      label: "You start with energy",
      yOffset: "",
      delay: 0
    },
    {
      img: "/assets/Problem_Flow/stall.jpg",
      alt: "You stall in a week",
      label: "You stall in a week",
      yOffset: "md:translate-y-12",
      delay: 0.2
    },
    {
      img: "/assets/Problem_Flow/guilt.jpg",
      alt: "The guilt piles up",
      label: "The guilt piles up with the unread pages.",
      yOffset: "md:translate-y-24",
      delay: 0.4
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm -z-10" />
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-md bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20 shadow-xl space-y-6 max-w-3xl no-scrollbar overflow-hidden"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[#1D59BB] leading-[1.1]">
            Your bookshelf is a <br className="hidden md:block" />
            graveyard of <span className="text-[#75BAFF] font-serif italic">intentions.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#1D59BB]/80 leading-relaxed font-medium">
            You don’t need motivation. You need a system. Bookmarkk is the system for reading mastery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: item.delay }}
              className={`space-y-6 flex flex-col items-center ${item.yOffset}`}
            >
              <div className="w-full aspect-[4/5] rounded-[2rem] bg-white shadow-2xl overflow-hidden border border-[#1D59BB]/5 group">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <p className="text-[#1D59BB] font-black text-center text-sm uppercase tracking-widest max-w-[250px]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Dynamic spacing at the bottom based on staggered layout */}
      <div className="h-32 md:h-64" />
    </section>
  );
}
