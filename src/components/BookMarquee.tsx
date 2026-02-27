"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useAnimationFrame } from "framer-motion";
import BookCover from "./BookCover";

interface BookData {
    id: string | number;
    title: string;
    author: string;
    cover?: string;
}

interface BookMarqueeProps {
    items: BookData[];
    direction?: "vertical" | "horizontal";
    speed?: number; // pixels per second roughly
    className?: string;
    reverse?: boolean;
}

export default function BookMarquee({
    items,
    direction = "vertical",
    speed = 20,
    className = "",
    reverse = false
}: BookMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    // Quadruple items for seamless looping — scroll through 25% then reset
    const duplicatedItems = [...items, ...items, ...items, ...items];

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className} ${direction === "vertical" ? "h-full" : "w-full"}`}
        >
            {/* Moving Content */}
            <motion.div
                ref={scrollerRef}
                className={`flex ${direction === "vertical" ? "flex-col" : "flex-row"} gap-4`}
                animate={{
                    [direction === "vertical" ? "y" : "x"]: reverse
                        ? ["-25%", "0%"]
                        : ["0%", "-25%"]
                }}
                transition={{
                    duration: (items.length * 150) / speed, // Dynamic duration based on content length
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
            >
                {duplicatedItems.map((item, idx) => (
                    <div
                        key={`${item.id}-${idx}`}
                        className={`${direction === "vertical" ? "w-full" : "h-full flex-shrink-0 w-[120px]"}`}
                    >
                        <BookCover {...item} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
