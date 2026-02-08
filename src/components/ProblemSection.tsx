import { motion } from 'framer-motion';

const ProblemSection = () => {
  return (
    <section className="problem-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="problem-content"
        >
          <h2>
            70% of people want to read more.{' '}
            <span style={{ color: 'var(--text-secondary)' }}>
              Most fail because progress is invisible.
            </span>
          </h2>
          <p>
            Reading is the only self-improvement habit with no scoreboard. You
            can't see your momentum. You can't prove comprehension. So the habit
            quietly dies. <strong style={{ color: 'var(--text-main)' }}>Bookmarkk fixes this.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
