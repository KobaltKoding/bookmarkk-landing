"use client";

import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

export default function ProblemSolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      img: "/assets/Problem_Flow/start_energy.jpg",
      alt: "Week 1: You start with energy",
      label: "Week 1: You start with energy",
      delay: 0
    },
    {
      img: "/assets/Problem_Flow/guilt_hard.webp",
      alt: "Week 2: You slowly slip",
      label: "Week 2: You slowly slip",
      delay: 0.2
    },
    {
      img: "/assets/Problem_Flow/guilt.jpg",
      alt: "Week 3: You reset to zero",
      label: "Week 3: You reset to zero",
      delay: 0.4
    }
  ];

  return (
    <section className="py-12 md:py-16 px-6 relative overflow-hidden bg-[#FFF1C1]" ref={ref}>
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-3xl no-scrollbar overflow-hidden"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A2B6B] leading-[1.1]">
            Everyone wants to read more
          </h2>
          <p className="text-base md:text-lg text-[#1A2B6B]/80 leading-relaxed font-medium">
            Starting is easy. Sticking with it is the hard part.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: item.delay }}
              className="space-y-3 flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-2xl shadow-xl overflow-hidden border border-[#1A2B6B]/5 group">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-[1.15]"
                />
              </div>
              <p className="text-[#1A2B6B] font-black text-center text-sm uppercase tracking-widest">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
