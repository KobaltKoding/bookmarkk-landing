import { motion } from "framer-motion";
import { ReactNode } from "react";

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
    const alignClasses: Record<string, string> = {
        left: "overlay-section--left",
        right: "overlay-section--right",
        center: "overlay-section--center",
    };

    const textAlignClasses: Record<string, string> = {
        left: "overlay-content--left",
        right: "overlay-content--right",
        center: "overlay-content--center",
    };

    return (
        <section
            id={id}
            className={`overlay-section ${alignClasses[align]} ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`overlay-content ${textAlignClasses[align]}`}
            >
                {children}
            </motion.div>
        </section>
    );
};

export default OverlaySection;
