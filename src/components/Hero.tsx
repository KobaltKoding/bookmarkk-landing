import { motion } from 'framer-motion';
import featureLeaderboard from '../assets/feature-leaderboard.png';

interface HeroProps {
  onJoinClick: () => void;
}

const Hero = ({ onJoinClick }: HeroProps) => {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <h1 className="hero-title">
            Turn reading into a{' '}
            <span className="highlight">sport you can win</span>
          </h1>

          <p className="hero-subtitle">
            Bookmarkk is Strava for books—prove your progress, compete weekly,
            build a reading identity.
          </p>

          <div style={{ marginBottom: '3.5rem' }}>
            <button className="btn-primary large" onClick={onJoinClick}>
              Join Season 1
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          <img
            src={featureLeaderboard}
            alt="Bookmarkk weekly league leaderboard showing usernames, XP scores, and rankings"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
