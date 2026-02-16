"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TALLY_FORM_URL =
    "https://tally.so/embed/A7v0NW?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-start justify-center p-8 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="w-full max-w-[500px] rounded-3xl p-6 relative bg-[#0A0A0C] border border-white/[0.08] shadow-xl my-auto"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 z-20"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>

                    <div className="w-full h-[650px] overflow-hidden">
                        <iframe
                            src={TALLY_FORM_URL}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Join Bookmarkk Waitlist"
                            style={{ background: "transparent", minHeight: "100%" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
