"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Season 1 launch: Feb 20, 2026
  const countdown = useCountdown(new Date("2026-02-20T00:00:00"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: integrate with email service
    setSubmitted(true);
  };

  const perks = [
    "Discounted lifetime access",
    "Exclusive founding member badge",
    "Input on feature roadmap",
    "Direct access to founders",
  ];

  const season1Details = [
    "8-week competitive season",
    "Weekly leagues with prizes",
    "Build your reading habit with the founding cohort",
    "Shape the product as it grows",
  ];

  return (
    <section className="py-24 px-6" ref={ref} id="join">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10">
            <p className="text-sm uppercase tracking-wider text-accent-purple mb-4">
              Be early
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to start reading?
            </h2>

            <p className="text-xl text-text-secondary mb-8 max-w-xl mx-auto">
              Join the waitlist to secure your spot in the next cohort.
            </p>

            {/* Email form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    className="flex-1 px-4 py-3 rounded-full bg-navy-700/50 border border-white/10 text-white placeholder:text-text-muted text-sm focus:outline-none focus:border-accent-purple/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="gradient-btn px-6 py-3 rounded-full text-sm font-semibold text-white whitespace-nowrap"
                  >
                    Join Waitlist
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-success/10 border border-success/30"
              >
                <svg
                  className="w-5 h-5 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-success font-medium">
                  You&apos;re on the list! Check your email.
                </span>
              </motion.div>
            )}

            <p className="text-sm text-text-muted mb-8">
              24 readers already in. Join the founding cohort.
            </p>

            {/* Two-column perks */}
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-sm font-semibold text-text-secondary mb-3">
                  Founding member perks
                </h3>
                <ul className="space-y-2">
                  {perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <span className="text-success text-xs">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-secondary mb-3">
                  What happens in Season 1
                </h3>
                <ul className="space-y-2">
                  {season1Details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="text-accent-purple text-xs mt-0.5">
                        ●
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
