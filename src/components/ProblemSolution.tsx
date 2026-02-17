"use client";

import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

export default function ProblemSolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      img: "/assets/Problem_Flow/guilt_hard.webp",
      alt: "The guilt piles up",
      label: "The guilt piles up with the unread pages.",
      yOffset: "",
      delay: 0
    },
    {
      img: "/assets/Problem_Flow/start_energy.jpg",
      alt: "You start with energy",
      label: "You start with energy",
      yOffset: "md:translate-y-12",
      delay: 0.2
    },
    {
      img: "/assets/Problem_Flow/guilt.jpg",
      alt: "The guilt piles up",
      label: "You stall in a week",
      yOffset: "",
      delay: 0.4
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.1]">
            Your bookshelf is a <br className="hidden md:block" />
            graveyard of <span className="text-text-secondary">good intentions.</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary font-light">
            Bookmarkk turns unread pages into a <span className="text-text-primary font-medium">visible streak of growth.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: item.delay }}
              className={`space-y-6 flex flex-col items-center ${item.yOffset}`}
            >
              <div className="w-full aspect-[4/5] rounded-[2rem] shadow-2xl overflow-hidden group">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <p className="text-white font-bold text-center text-sm uppercase tracking-widest max-w-[250px]">
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
