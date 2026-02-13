import { motion, type Variants } from 'framer-motion';

const HowItWorks = () => {
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
        Read together.<br />
        <motion.span
          className="highlight-purple"
          style={{
            background: 'linear-gradient(to right, #6366F1, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          variants={itemVariants}
        >
          Compete weekly.
        </motion.span>
      </motion.h2>

      <motion.div className="section-body-text" variants={itemVariants}>
        <p>Join leagues that reset every 7 days—fresh competition keeps you showing up.</p>
        <p>Climb the leaderboard with verified XP from real reading.</p>
        <p>Build your reading identity around proof and progress, not just logging.</p>
        <p>See where you rank in real-time. Track streaks, books finished, time read.</p>
      </motion.div>

      <motion.div className="icon-badges icon-badges--right" variants={itemVariants}>
        {['👑', '🔥', '📚'].map((icon, i) => (
          <motion.div
            key={i}
            className="icon-badge"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {icon}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HowItWorks;
