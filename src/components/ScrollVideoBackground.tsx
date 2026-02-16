"use client";

import { useScroll, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function ScrollVideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState(0);
    const [endScrollY, setEndScrollY] = useState(5000); // Default fallback

    // Use raw scroll Y (pixels) instead of 0-1 progress
    const { scrollY } = useScroll();

    // Create a transform that maps scroll pixels [0, endScrollY] -> [0, 1]
    // We clamp it so it stays at 1 after passing the target.
    const progress = useTransform(scrollY, [0, endScrollY], [0, 1], { clamp: true });

    // Smooth out the progress
    const smoothProgress = useSpring(progress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Calculate where the "Quiz" section ends (or starts)
    useEffect(() => {
        const calculateLimit = () => {
            const quizElement = document.getElementById("try-it");
            if (quizElement) {
                // We want the video to finish exactly when the user reaches the Quiz section.
                // Let's use the top of the section + half its height as the "done" point.
                // Or just the top if we want it done *before* they start interacting.
                // Let's go with: Top of Quiz section.
                // Adding a small buffer (e.g. window height / 2) so it finishes *as* it comes into view.
                const targetY = quizElement.offsetTop + (quizElement.offsetHeight / 2) - window.innerHeight;
                setEndScrollY(Math.max(targetY, 1000)); // Ensure it's at least somewhat scrollable
            } else {
                // Fallback to a reasonable percentage of body height if ID not found
                setEndScrollY(document.body.scrollHeight * 0.7);
            }
        };

        calculateLimit();
        window.addEventListener("resize", calculateLimit);
        return () => window.removeEventListener("resize", calculateLimit);
    }, []);

    // Handle video metadata loading
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            if (video.readyState >= 1) {
                setDuration(video.duration);
            } else {
                video.onloadedmetadata = () => {
                    setDuration(video.duration);
                };
            }
        }
    }, []);

    // Sync video time
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (videoRef.current && duration > 0 && !isNaN(duration)) {
            const targetTime = latest * duration;
            const video = videoRef.current;

            // @ts-ignore
            if (typeof video.fastSeek === 'function') {
                video.fastSeek(targetTime);
            } else {
                if (Math.abs(video.currentTime - targetTime) > 0.1) {
                    video.currentTime = targetTime;
                }
            }
        }
    });

    return (
        <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
            <video
                ref={videoRef}
                className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-70"
                muted
                playsInline
                preload="metadata"
                autoPlay={false}
                src="/video.mp4"
            />
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>
    );
}
