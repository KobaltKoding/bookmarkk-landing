"use client";

import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: "privacy" | "terms";
}

export default function LegalModal({
    isOpen,
    onClose,
    initialTab = "privacy",
}: LegalModalProps) {
    const [activeTab, setActiveTab] = useState<"privacy" | "terms">(initialTab);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab, isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-start justify-center p-8 overflow-y-auto"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        ref={modalRef}
                        className="w-full max-w-2xl rounded-3xl bg-[#0A0A0C] border border-white/[0.08] shadow-xl my-auto overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveTab("privacy")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "privacy"
                                            ? "bg-white/10 text-white"
                                            : "text-white/50 hover:text-white/80"
                                        }`}
                                >
                                    Privacy Policy
                                </button>
                                <button
                                    onClick={() => setActiveTab("terms")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "terms"
                                            ? "bg-white/10 text-white"
                                            : "text-white/50 hover:text-white/80"
                                        }`}
                                >
                                    Terms of Service
                                </button>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/40 hover:text-white/80 transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 max-h-[70vh] overflow-y-auto text-white/80 text-sm leading-relaxed [&_h3]:text-white [&_h3]:font-semibold [&_h3]:text-base [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1">
                            {activeTab === "privacy" ? (
                                <div>
                                    <p className="text-white/50">Last updated: February 2026</p>

                                    <h3>1. Introduction</h3>
                                    <p>
                                        Welcome to <strong>bookmarkk</strong> (&ldquo;we,&rdquo;
                                        &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed
                                        to protecting your personal information and your right to
                                        privacy. Using bookmarkk means you trust us with your reading
                                        data, and we take that seriously.
                                    </p>

                                    <h3>2. Information We Collect</h3>
                                    <p>
                                        We collect information that you provide to us directly:
                                    </p>
                                    <ul>
                                        <li>
                                            <strong>Account Information:</strong> Email address only
                                            (for waitlist/login).
                                        </li>
                                        <li>
                                            <strong>Usage Data:</strong> Pages visited, features used
                                            (via PostHog).
                                        </li>
                                    </ul>

                                    <h3>3. How We Use Your Information</h3>
                                    <p>
                                        We use your information to operate and improve bookmarkk,
                                        specifically to:
                                    </p>
                                    <ul>
                                        <li>
                                            Grant access to the waitlist and beta features.
                                        </li>
                                        <li>
                                            Analyze usage to improve the app experience.
                                        </li>
                                        <li>Send important updates about the service.</li>
                                    </ul>

                                    <h3>4. Data Security</h3>
                                    <p>
                                        We implement appropriate technical and organizational
                                        security measures to protect your data. However, please
                                        remember that no transmission over the internet is 100%
                                        secure.
                                    </p>

                                    <h3>5. Contact Us</h3>
                                    <p>
                                        If you have questions about this policy, please contact us.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-white/50">Last updated: February 2026</p>

                                    <h3>1. Acceptance of Terms</h3>
                                    <p>
                                        By accessing or using <strong>bookmarkk</strong>, you agree
                                        to be bound by these Terms of Service.
                                    </p>

                                    <h3>2. Description of Service</h3>
                                    <p>
                                        bookmarkk is a reading tracking application designed to help
                                        users manage their reading habits. The service is currently
                                        in a waitlist/beta phase and features may change.
                                    </p>

                                    <h3>3. User Accounts</h3>
                                    <p>
                                        You are responsible for maintaining the confidentiality of
                                        your account information. You agree to notify us immediately
                                        of any unauthorized use of your account.
                                    </p>

                                    <h3>4. Acceptable Use</h3>
                                    <p>
                                        You agree not to misuse the service or help anyone else do
                                        so. This includes disrupting the service, violating the
                                        privacy of others, or using the service for illegal purposes.
                                    </p>

                                    <h3>5. Termination</h3>
                                    <p>
                                        We reserve the right to suspend or terminate your access to
                                        the service at our sole discretion, without notice, for
                                        conduct that we believe violates these Terms.
                                    </p>

                                    <h3>6. Disclaimer</h3>
                                    <p>
                                        The service is provided &ldquo;as is&rdquo; without
                                        warranties of any kind. We do not guarantee that the service
                                        will be uninterrupted or error-free.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
