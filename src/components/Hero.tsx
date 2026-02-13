import { motion, type Variants } from 'framer-motion';

interface HeroProps {
  onJoinClick: () => void;
}

const Hero = ({ onJoinClick }: HeroProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="hero-title"
        variants={itemVariants}
      >
        bookmarkk
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        variants={itemVariants}
      >
        Turn reading into a{' '}
        <span className="highlight" style={{ fontWeight: 800 }}>sport you can win</span>.
      </motion.p>

      <motion.p
        className="hero-tagline"
        variants={itemVariants}
      >
        Proof-based progress • Social accountability • Real transformation
      </motion.p>

      <motion.div
        style={{ marginTop: '1rem', pointerEvents: 'auto' }}
        variants={itemVariants}
      >
        <button className="btn-cta-primary" onClick={onJoinClick}>
          Join Season 1
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
