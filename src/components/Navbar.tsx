"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-2xl font-serif font-bold tracking-tight">
          bookmarkk
        </a>
        <a
          href="#join"
          className="gradient-btn px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}
