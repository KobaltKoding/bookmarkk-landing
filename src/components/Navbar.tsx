"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar({ onJoinClick }: { onJoinClick?: () => void }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Subtle scale-down on scroll for a premium feel
  const navScale = useTransform(scrollY, [0, 50], [1, 0.98]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks: { label: string; href: string }[] = [];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ scale: navScale }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="relative h-16 flex items-center overflow-hidden">
          <img
            src="/assets/Logo/bookmarkk text no bg.png"
            alt="Bookmarkk Logo"
            className="h-full w-auto object-contain mix-blend-multiply scale-100"
          />
        </a>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          onClick={onJoinClick}
          className="gradient-btn px-6 py-2.5 rounded-full text-sm font-semibold text-white relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Join Waitlist
        </motion.button>
      </div>
    </motion.nav>
  );
}
