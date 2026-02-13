import { motion, type Variants } from 'framer-motion';

const ProblemSection = () => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
    >
      <motion.h2 className="section-heading-large" variants={itemVariants}>
        Progress you can{' '}
        <span className="highlight-amber">prove.</span>
      </motion.h2>

      <motion.div className="section-body-text" variants={itemVariants}>
        <p>
          70% of people want to read more. Most fail because progress is invisible.
        </p>
        <p>
          No fake streaks. No vanity metrics. Just real, verified reading progress
          powered by AI-generated quizzes.
        </p>
        <p>
          Your XP is earned by passing chapter quizzes, not self-reported logging.
          Reading is the only self-improvement habit with no scoreboard—
          <strong style={{ color: 'rgba(255,255,255,0.9)' }}>bookmarkk fixes this.</strong>
        </p>
      </motion.div>

      <motion.div className="glass-card" variants={itemVariants}>
        <div className="indicator">
          <div className="pulse-dot" />
          <span className="indicator-text">AI Quiz · Chapter 3</span>
        </div>
        <p className="quote">
          "What was the core argument the author made about habit formation?"
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProblemSection;
