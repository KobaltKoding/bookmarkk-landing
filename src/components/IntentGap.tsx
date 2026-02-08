import { motion } from 'framer-motion';

const IntentGap = () => {
  const stats = [
    { label: 'Intend to read more', value: 70, color: 'var(--primary)' },
    { label: 'Read 0 books in 2024', value: 40, color: 'var(--accent)' },
  ];

  return (
    <section className="intent-gap">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Reading Paradox</h2>
          <p className="section-subtitle">
            Reading progress is currently invisible. That’s why your habit dies by February.
            <span style={{ color: 'white' }}> We’re building the scoreboard.</span>
          </p>
        </div>

        <div className="stats-container glass">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="stat-value" style={{ color: stat.color }}>{stat.value}%</div>
              <div className="stat-label" style={{ color: 'var(--text-dim)', fontWeight: 500 }}>{stat.label}</div>
              <div className="stat-bar-bg">
                <motion.div
                  className="stat-bar-fill"
                  style={{ background: stat.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntentGap;
