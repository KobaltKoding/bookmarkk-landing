import { motion } from 'framer-motion';

const stats = [
  {
    value: '88%',
    label: 'now reading 2+ days/week',
    sub: '(up from 25%)',
    color: 'var(--primary)',
  },
  {
    value: '30%',
    label: 'reading 5+ days/week',
    sub: '(up from 8%)',
    color: 'var(--electric-blue)',
  },
  {
    value: '100%',
    label: 'told someone about it',
    sub: '',
    color: 'var(--accent)',
  },
  {
    value: '91%',
    label: 'would recommend',
    sub: '',
    color: 'var(--primary)',
  },
];

const SocialProof = () => {
  return (
    <section className="social-proof">
      <div className="container">
        <h2 className="section-title">Already working for readers like you</h2>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="stat-number" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
              {stat.sub && <div className="stat-sub">{stat.sub}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
