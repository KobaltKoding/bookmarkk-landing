import { motion } from 'framer-motion';

const stats = [
    { value: '88%', label: 'now reading 2+ days/week', sub: '(up from 25%)', color: 'var(--primary)' },
    { value: '30%', label: 'reading 5+ days/week', sub: '(up from 8%)', color: 'var(--electric-blue)' },
    { value: '100%', label: 'told someone about it', sub: '', color: 'var(--accent)' },
    { value: '91%', label: 'would recommend', sub: '', color: 'var(--primary)' }
];

const SocialProof = () => {
    return (
        <section className="social-proof-section" style={{ padding: '6rem 0', background: 'var(--bg-page)' }}>
            <div className="container">
                <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h2>Already working for readers like you</h2>
                </div>

                <div className="stats-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '2rem'
                }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="stat-card"
                            style={{
                                background: 'var(--bg-card)',
                                padding: '2rem',
                                borderRadius: '16px',
                                boxShadow: 'var(--shadow-md)',
                                textAlign: 'center',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}
                        >
                            <div style={{
                                fontSize: '3rem',
                                fontWeight: 800,
                                color: stat.color,
                                lineHeight: 1,
                                marginBottom: '0.5rem'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)' }}>
                                {stat.label}
                            </div>
                            {stat.sub && (
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                    {stat.sub}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
