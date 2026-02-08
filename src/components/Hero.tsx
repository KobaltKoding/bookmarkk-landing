import { motion } from 'framer-motion';
import featureLeaderboard from '../assets/feature-leaderboard.png';

interface HeroProps {
  onJoinClick: () => void;
}

const Hero = ({ onJoinClick }: HeroProps) => {
  return (
    <section className="hero" id="hero" style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-page)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: 'var(--text-main)'
          }}>
            Turn reading into a <span style={{ color: 'var(--primary)' }}>sport you can win</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            Bookmarkk is Strava for books—prove your progress, compete weekly, build a reading identity.
          </p>

          <div style={{ marginBottom: '4rem' }}>
            <button className="btn-primary large" onClick={onJoinClick}>Join Season 1</button>
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          <div style={{
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-glow)',
            border: '8px solid white'
          }}>
            <img
              src={featureLeaderboard}
              alt="Bookmarkk Leaderboard"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
