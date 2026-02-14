"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const itemData = [
  {
    img: '/assets/Reader/dust_book.jpg',
    title: 'dust_book.jpg',
    id: 1,
  },
  {
    img: '/assets/Reader/hopeful_reader.jpg',
    title: 'hopeful_reader.jpg',
    id: 2,
  },
  {
    img: '/assets/Reader/active_reader.jpg',
    title: 'active_reader.jpg',
    id: 3,
  },
  {
    img: '/assets/Reader/finish_reader.jpg',
    title: 'finish_reader.jpg',
    id: 4,
  },
];

export default function ProblemSolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 overflow-hidden relative" ref={ref}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8">

          {/* Left: Structured Visual Story (60% width, shifted left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[40%]"
          >
            <div className="relative">
              <ImageList
                variant="quilted"
                cols={2}
                gap={24}
                sx={{
                  width: '100%',
                  height: 'auto',
                  overflow: 'visible',
                  '& .MuiImageListItem-root': {
                    borderRadius: '12px', // Subtle rounding as per previous feedback
                    overflow: 'hidden',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    aspectRatio: '4/3', // Ensuring consistent sizing
                  }
                }}
              >
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?auto=format&fit=crop&w=800`}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-[40%]"
          >
            <div className="text-center lg:text-right">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight text-text-primary">
                Your bookshelf is a <br />
                <span className="text-text-secondary opacity-80">graveyard of good intentions.</span>
              </h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1, duration: 1 }}
                className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center lg:items-end"
              >
                <p className="text-sm text-text-muted font-mono uppercase tracking-[0.2em]">
                  The Solution
                </p>
                <p className="mt-4 text-lg text-text-secondary font-light">
                  Bookmarkk turns unread pages into a <span className="text-text-primary font-medium">visible streak of growth.</span>
                </p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
