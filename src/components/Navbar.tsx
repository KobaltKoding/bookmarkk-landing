"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar({ onJoinClick }: { onJoinClick?: () => void }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Subtle scale-down on scroll for a premium feel
  const navScale = useTransform(scrollY, [0, 50], [1, 0.9]);
  const navHeight = useTransform(scrollY, [0, 50], ["5rem", "4rem"]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks: { label: string; href: string }[] = [];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#1A2B6B] border-b border-white/10`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{ scale: navScale, height: navHeight }}
        className="w-full px-6 md:px-12 flex items-center justify-between"
      >
        {/* Logo */}
        <a href="#" className="relative h-16 flex items-center overflow-hidden">
          <img
            src="/assets/Logo/bookmarkk text no bg.png"
            alt="Bookmarkk Logo"
            className="h-full w-auto object-contain brightness-0 invert-[.9] sepia saturate-[20] hue-rotate-[15deg] brightness-[1.1]"
          />
        </a>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-sm text-[#1A2B6B]/60 hover:text-[#1A2B6B] transition-colors"
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
          className="bg-[#FEBD17] px-6 py-2.5 rounded-full text-sm font-semibold text-[#1A2B6B] shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Join Waitlist
        </motion.button>
      </motion.div>
    </motion.nav>
  );
}
