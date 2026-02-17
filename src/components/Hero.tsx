"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import BookMarquee from "./BookMarquee";

const BOOKS_LIST = [
  { id: 1, title: "Atomic Habits", author: "James Clear", cover: "/assets/book-covers/AtomicHabits.webp" },
  { id: 2, title: "Sapiens", author: "Yuval Noah Harari", cover: "/assets/book-covers/sapiens.webp" },
  { id: 3, title: "The Alchemist", author: "Paulo Coelho", cover: "/assets/book-covers/alchemist.webp" },
  { id: 4, title: "Dark Matter", author: "Blake Crouch", cover: "/assets/book-covers/darkmatter.webp" },
  { id: 5, title: "Freakonomics", author: "Steven D. Levitt", cover: "/assets/book-covers/freakonomics.webp" },
  { id: 6, title: "The Hitchhiker's Guide", author: "Douglas Adams", cover: "/assets/book-covers/hitchhiker.webp" },
  { id: 7, title: "Harry Potter", author: "J.K. Rowling", cover: "/assets/book-covers/hp.jpeg" },
  { id: 8, title: "The Hunger Games", author: "Suzanne Collins", cover: "/assets/book-covers/hunger.jpeg" },
  { id: 9, title: "Norwegian Wood", author: "Haruki Murakami", cover: "/assets/book-covers/murakami.webp" },
  { id: 10, title: "Percy Jackson", author: "Rick Riordan", cover: "/assets/book-covers/percy.webp" },
  { id: 11, title: "Remarkable", author: "Lizzie Foley", cover: "/assets/book-covers/remarkable.webp" },
  { id: 12, title: "Think Straight", author: "Darius Foroux", cover: "/assets/book-covers/think_straight.webp" },
  { id: 13, title: "Crime and Punishment", author: "Fyodor Dostoevsky", cover: "/assets/book-covers/crime.webp" },
  { id: 14, title: "Amazon Unbound", author: "Brad Stone", cover: "/assets/book-covers/amazon.jpg" },
  { id: 15, title: "Anxious People", author: "Fredrik Backman", cover: "/assets/book-covers/anxious.jpeg" },
  { id: 16, title: "Ikigai", author: "Héctor García", cover: "/assets/book-covers/ikiagi.jpeg" },
  { id: 17, title: "The Palace of Illusions", author: "Chitra Banerjee", cover: "/assets/book-covers/palace.webp" },
];

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Hero({ onJoinClick }: { onJoinClick?: () => void }) {
  // Randomize on client-side only to avoid hydration mismatch
  const [books, setBooks] = useState(BOOKS_LIST);

  useEffect(() => {
    setBooks(shuffleArray(BOOKS_LIST));
  }, []);

  return (
    <section className="relative bg-[#1A2B6B] overflow-hidden">
      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden lg:block min-h-screen relative">
        {/* Desktop: Vertical Marquees — absolute, full section height */}
        <div className="absolute top-0 bottom-0 right-0 w-[45%] flex gap-6 px-12 z-0">
          <BookMarquee items={books} direction="vertical" speed={20} className="w-1/3 h-full" />
          <BookMarquee items={[...books].reverse()} direction="vertical" speed={15} reverse className="w-1/3 pt-24 h-full" />
          <BookMarquee items={books} direction="vertical" speed={25} className="w-1/3 pt-12 h-full" />
        </div>

        {/* Desktop: Text Content */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex items-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left space-y-8 max-w-[50%]"
          >
            <h1 className="text-6xl font-black leading-[1.1] tracking-tighter mb-8 text-white">
              <span className="text-[#FEBD17] drop-shadow-sm">Stop wanting to read.</span>
              <br />
              <span className="text-white drop-shadow-sm">Start being a Reader.</span>
            </h1>
            <p className="text-xl text-white/70 mb-12 leading-relaxed font-medium max-w-xl">
              <strong className="text-white font-bold">Bookmarkk</strong> turns every chapter into <span className="text-[#FEBD17] font-bold">proof of progress.</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Mobile: Text Content */}
        <div className="px-6 pt-32 pb-8 flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter mb-8 text-white">
              <span className="text-[#FEBD17] drop-shadow-sm">Stop wanting to read.</span>
              <br />
              <span className="text-white drop-shadow-sm">Start being a Reader.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-medium max-w-xl mx-auto">
              <strong className="text-white font-bold">Bookmarkk</strong> turns every chapter into <span className="text-[#FEBD17] font-bold">proof of progress.</span>
            </p>
          </motion.div>
        </div>

        {/* Mobile: Horizontal Marquees - 2x faster */}
        <div className="flex flex-col gap-3 pb-6">
          <BookMarquee items={books} direction="horizontal" speed={120} />
          <BookMarquee items={[...books].reverse()} direction="horizontal" speed={105} reverse />
        </div>
      </div>
    </section>
  );
}
