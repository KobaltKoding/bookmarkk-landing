import { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'privacy' | 'terms';
}

const LegalModal = ({ isOpen, onClose, initialTab = 'privacy' }: LegalModalProps) => {
    const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab, isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
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
                    className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-3xl bg-[var(--bg-surface)] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[var(--bg-deep)]">
                            <div className="flex gap-6">
                                <button
                                    onClick={() => setActiveTab('privacy')}
                                    className={`text-lg font-medium transition-colors ${activeTab === 'privacy'
                                            ? 'text-[var(--primary)]'
                                            : 'text-[var(--text-muted)] hover:text-white'
                                        }`}
                                >
                                    Privacy Policy
                                </button>
                                <button
                                    onClick={() => setActiveTab('terms')}
                                    className={`text-lg font-medium transition-colors ${activeTab === 'terms'
                                            ? 'text-[var(--primary)]'
                                            : 'text-[var(--text-muted)] hover:text-white'
                                        }`}
                                >
                                    Terms of Service
                                </button>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-[var(--text-muted)] hover:text-white hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 overflow-y-auto text-[var(--text-dim)] leading-relaxed space-y-6">
                            {activeTab === 'privacy' ? (
                                <div className="prose prose-invert max-w-none">
                                    <p>Last updated: February 2026</p>

                                    <h3>1. Introduction</h3>
                                    <p>Welcome to <strong>bookmarkk</strong> ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. Using bookmarkk means you trust us with your reading data, and we take that seriously.</p>

                                    <h3>2. Information We Collect</h3>
                                    <p>We collect information that you provide to us directly:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Account Information:</strong> Email address only (for waitlist/login).</li>
                                        <li><strong>Usage Data:</strong> Pages visited, features used (via PostHog).</li>
                                    </ul>

                                    <h3>3. How We Use Your Information</h3>
                                    <p>We use your information to operate and improve bookmarkk, specifically to:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Grant access to the waitlist and beta features.</li>
                                        <li>Analyze usage to improve the app experience.</li>
                                        <li>Send important updates about the service.</li>
                                    </ul>

                                    <h3>4. Data Security</h3>
                                    <p>We implement appropriate technical and organizational security measures to protect your data. However, please remember that no transmission over the internet is 100% secure.</p>

                                    <h3>5. Contact Us</h3>
                                    <p>If you have questions about this policy, please contact us.</p>
                                </div>
                            ) : (
                                <div className="prose prose-invert max-w-none">
                                    <p>Last updated: February 2026</p>

                                    <h3>1. Acceptance of Terms</h3>
                                    <p>By accessing or using <strong>bookmarkk</strong>, you agree to be bound by these Terms of Service.</p>

                                    <h3>2. Description of Service</h3>
                                    <p>bookmarkk is a reading tracking application designed to help users manage their reading habits. The service is currently in a waitlist/beta phase and features may change.</p>

                                    <h3>3. User Accounts</h3>
                                    <p>You are responsible for maintaining the confidentiality of your account information. You agree to notify us immediately of any unauthorized use of your account.</p>

                                    <h3>4. Acceptable Use</h3>
                                    <p>You agree not to misuse the service or help anyone else do so. This includes disrupting the service, violating the privacy of others, or using the service for illegal purposes.</p>

                                    <h3>5. Termination</h3>
                                    <p>We reserve the right to suspend or terminate your access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms.</p>

                                    <h3>6. Disclaimer</h3>
                                    <p>The service is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LegalModal;
