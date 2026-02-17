"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        id: 1,
        quote: "This app completely changed how I read non-fiction. I actually remember what I read now.",
        author: "Early User",
        role: "Product Manager",
        initials: "EU"
    },
    {
        id: 2,
        quote: "The gamification makes me want to pick up a book instead of scrolling social media.",
        author: "Beta Tester",
        role: "Software Engineer",
        initials: "BT"
    },
    {
        id: 3,
        quote: "Finally, a way to track reading that feels meaningful and fun. Love the competitive aspect.",
        author: "Avid Reader",
        role: "Student",
        initials: "AR"
    },
    {
        id: 4,
        quote: "I've doubled my reading speed and retention since I started using Bookmarkk.",
        author: "Book Club Lead",
        role: "The Avid Readers",
        initials: "BC"
    },
    {
        id: 5,
        quote: "The quizzes are challenging but fair. It really proves if you've done the reading.",
        author: "Waitlist Member",
        role: "Designer",
        initials: "WM"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-primary/5 blur-[100px] -z-10 rounded-full" />

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-bold uppercase tracking-widest text-accent-purple mb-3">
                        Community
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        What readers are saying
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`bg-zinc-900/90 border border-white/[0.08] p-8 rounded-2xl flex flex-col justify-between ${i === 3 || i === 4 ? "md:col-span-1 lg:col-span-1" : ""}`}
                        >
                            <div className="mb-6">
                                <div className="flex gap-1 mb-4 text-warning">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star}>★</span>
                                    ))}
                                </div>
                                <p className="text-lg leading-relaxed text-text-secondary">
                                    &quot;{t.quote}&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm text-primary">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-semibold text-text-primary">{t.author}</p>
                                    <p className="text-xs text-text-muted">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
