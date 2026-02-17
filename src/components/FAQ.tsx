"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How long do quizzes take?",
    a: "About 2 minutes. 5 multiple-choice questions per chapter. No essay questions, no stress.",
  },
  {
    q: "What if I fail a quiz?",
    a: "You can retake it after a short cooldown. Questions are reshuffled each time, so you can't just memorize answers. You need to actually understand what you read.",
  },
  {
    q: "Can I read any book?",
    a: "Yes! Bookmarkk works with whatever book you're reading. Physical, Kindle, audiobook — doesn't matter.",
  },
  {
    q: "What about audiobooks?",
    a: "Absolutely! If you listened, you can pass the quiz. We care about comprehension, not format.",
  },
  {
    q: "How is XP calculated?",
    a: "XP scales with chapter length. Longer chapters = more XP. Fair for everyone, regardless of book type.",
  },
  {
    q: "What happens if I miss a day?",
    a: "Your streak resets, but your XP stays. Leagues are weekly, so you can recover quickly.",
  },
  {
    q: "Is this available on Android/iOS?",
    a: "Currently mobile web, native apps coming soon. Works great in your mobile browser.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6" ref={ref} id="faq">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-accent-purple mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Questions? Answers.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-2"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-sm md:text-base pr-4">
                    {faq.q}
                  </span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-text-muted shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-4 text-sm text-text-secondary leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
