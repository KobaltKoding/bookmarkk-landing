import { motion } from 'framer-motion';

const comparisons = [
    { other: 'Self-reported sessions', us: 'AI-verified comprehension' },
    { other: 'Passive time tracking', us: 'Active proof-of-work' },
    { other: 'Discovery-first', us: 'Habit-first' },
    { other: 'Static profiles', us: 'Dynamic identity' }
];

const Differentiation = () => {
    return (
        <section style={{ padding: '6rem 0', background: 'var(--bg-surface)' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>
                    Why Bookmarkk ≠ Other Apps
                </h2>

                <div className="comparison-table" style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'var(--bg-card)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    {/* Header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '1.5rem', borderBottom: '2px solid rgba(0,0,0,0.05)', background: '#F9FAFB' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>Other Apps</div>
                        <div style={{ fontWeight: 800, color: 'var(--primary)', textAlign: 'center' }}>Bookmarkk</div>
                    </div>

                    {/* Rows */}
                    {comparisons.map((row, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                padding: '1.5rem',
                                borderBottom: index !== comparisons.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none'
                            }}
                        >
                            <div style={{ color: 'var(--text-muted)', textAlign: 'center' }}>{row.other}</div>
                            <div style={{ fontWeight: 700, color: 'var(--text-main)', textAlign: 'center' }}>{row.us}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Differentiation;
