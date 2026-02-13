import { motion } from 'framer-motion';

const stats = [
  {
    value: '88%',
    label: 'more active',
    description: 'Reading at least 2 days a week, up from just 25% in beta.',
    color: 'var(--primary)',
    span: 2
  },
  {
    value: '30%',
    label: 'super readers',
    description: 'Crushing 5+ days/week.',
    color: 'var(--accent)',
    span: 1
  },
  {
    value: '100%',
    label: 'referral rate',
    description: 'Every beta user shared bookmarkk with a friend.',
    color: 'rgba(255,255,255,0.9)',
    span: 1
  },
  {
    value: '9.4',
    label: 'CSAT',
    description: 'Verified comprehension builds deep user trust.',
    color: 'rgba(255,255,255,0.9)',
    span: 2
  },
];

const SocialProof = () => {
  return (
    <div className="retention-card">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        The retention loop that works.
      </motion.h2>

      <div className="retention-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="retention-item glass-card"
            style={{
              marginTop: 0,
              gridColumn: window.innerWidth > 768 ? `span ${stat.span}` : 'span 1'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            <h3 style={{ color: stat.color, fontSize: '2.5rem', marginBottom: '0.25rem' }}>
              {stat.value}
            </h3>
            <div style={{
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              fontWeight: 700,
              color: 'var(--text-muted)',
              marginBottom: '1rem'
            }}>
              {stat.label}
            </div>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}>
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SocialProof;
