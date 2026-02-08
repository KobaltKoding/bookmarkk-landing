import { motion } from 'framer-motion';

interface FinalCTAProps {
    onJoinClick: () => void;
}

const FinalCTA = ({ onJoinClick }: FinalCTAProps) => {
    return (
        <section style={{
            padding: '8rem 0',
            background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
            color: 'white',
            textAlign: 'center'
        }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                        Season 1 starts soon
                    </h2>
                    <p style={{ fontSize: '1.25rem', color: '#9CA3AF', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Join the waitlist for early access + founding member perks.
                    </p>

                    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <button
                            onClick={onJoinClick}
                            className="btn-primary large"
                            style={{ width: '100%' }}
                        >
                            Join Season 1
                        </button>
                        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6B7280' }}>
                            Limited spots. We're starting with a small cohort to iterate fast.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTA;
