import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

interface BookCoverProps {
    id: string | number;
    title?: string;
    author?: string;
    cover?: string;
}

export default function BookCover({ id, title, author, cover }: BookCoverProps) {
    const [particles, setParticles] = useState<{ id: number; type: "xp" | "star"; x: number; y: number; val?: string }[]>([]);

    // Randomly trigger particles
    useEffect(() => {
        const interval = setInterval(() => {
            // 30% chance to spawn a particle every 2-4 seconds
            if (Math.random() < 0.3) {
                const type = Math.random() > 0.4 ? "xp" : "star"; // More XP than stars
                const id = Date.now();
                const x = Math.random() * 80 + 10; // 10% to 90%
                const y = Math.random() * 80 + 10;
                const val = type === "xp" ? (Math.random() > 0.5 ? "+10 XP" : "+50 XP") : undefined;

                setParticles(prev => [...prev, { id, type, x, y, val }]);

                // Cleanup after animation
                setTimeout(() => {
                    setParticles(prev => prev.filter(p => p.id !== id));
                }, 2000);
            }
        }, 2000 + Math.random() * 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full aspect-[2/3] rounded-lg shadow-md overflow-hidden group">
            {/* Book Cover Image */}
            {cover ? (
                <img
                    src={cover}
                    alt={title || "Book Cover"}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    <span className="text-white text-xs opacity-50">No Cover</span>
                </div>
            )}

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent transition-opacity duration-300 pointer-events-none" />

            {/* Particles Container */}
            <AnimatePresence>
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 0, scale: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: 1,
                            y: -40
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            duration: 1.5,
                            opacity: { duration: 1.5, ease: "easeOut" },
                            y: { duration: 1.5, ease: "easeOut" },
                            scale: {
                                type: "spring",
                                stiffness: 500,
                                damping: 8,
                                duration: 0.4
                            }
                        }}
                        style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
                        className="absolute pointer-events-none z-20 flex items-center justify-center"
                    >
                        {particle.type === "xp" ? (
                            <span className="text-[10px] font-black text-[#FEBD17] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] whitespace-nowrap">
                                {particle.val}
                            </span>
                        ) : (
                            <Star className="w-4 h-4 text-[#FEBD17] fill-[#FEBD17] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
