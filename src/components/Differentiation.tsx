import { motion } from 'framer-motion';

const comparisons = [
  { other: 'Self-reported sessions', us: 'AI-verified comprehension' },
  { other: 'Passive time tracking', us: 'Active proof-of-work' },
  { other: 'Discovery-first', us: 'Habit-first' },
  { other: 'Static profiles', us: 'Dynamic identity' },
];

const Differentiation = () => {
  return (
    <div className="diff-card">
      <h2 style={{
        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
        padding: '1.5rem 1.5rem 0',
        marginBottom: '0.5rem',
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
          transition={{ delay: index * 0.1 }}
        >
          <div className="other">{row.other}</div>
          <div className="ours">{row.us}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default Differentiation;
