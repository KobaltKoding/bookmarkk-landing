"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface OverlaySectionProps {
    children: ReactNode;
    align?: "left" | "right" | "center";
    className?: string;
    id?: string;
}

const OverlaySection = ({
    children,
    align = "center",
    className = "",
    id,
}: OverlaySectionProps) => {
    const justifyMap: Record<string, string> = {
        left: "justify-start",
        right: "justify-end",
        center: "justify-center",
    };

    const textAlignMap: Record<string, string> = {
        left: "text-left",
        right: "text-right",
        center: "text-center mx-auto",
    };

    return (
        <section
            id={id}
            className={`relative flex items-center px-6 md:px-20 ${justifyMap[align]} ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`max-w-[42rem] w-full ${textAlignMap[align]}`}
            >
                {children}
            </motion.div>
        </section>
    );
};

export default OverlaySection;
