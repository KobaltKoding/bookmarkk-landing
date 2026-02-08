import { motion } from 'framer-motion';

const ProblemSection = () => {
    return (
        <section className="problem-section" style={{ background: 'var(--bg-surface)', padding: '6rem 0' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="problem-content"
                    style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}
                >
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1.5rem' }}>
                        70% of people want to read more. <br />
                        <span style={{ color: 'var(--text-secondary)' }}>Most fail because progress is invisible.</span>
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6
                    }}>
                        Reading is the only self-improvement habit with no scoreboard. You can't see your momentum. You can't prove comprehension. So the habit quietly dies. <strong>Bookmarkk fixes this.</strong>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ProblemSection;
