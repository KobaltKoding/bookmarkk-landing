import { motion } from 'framer-motion';

const comparisons = [
  { other: 'Self-reported sessions', us: 'AI-verified comprehension' },
  { other: 'Passive time tracking', us: 'Active proof-of-work' },
  { other: 'Discovery-first', us: 'Habit-first' },
  { other: 'Static profiles', us: 'Dynamic identity' },
];

const Differentiation = () => {
  return (
    <motion.div
      className="diff-card"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <h2 style={{
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
        padding: '2.5rem 1.5rem 1rem',
        marginBottom: '0',
      }}>
        Why Bookmarkk ≠ Other Apps
      </h2>

      <div className="comparison-header">
        <span>Other Apps</span>
        <span>Bookmarkk</span>
      </div>

      {comparisons.map((row, index) => (
        <motion.div
          key={index}
          className="comparison-row"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <div className="other">{row.other}</div>
          <div className="ours">{row.us}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Differentiation;
