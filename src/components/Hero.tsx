import { motion } from 'framer-motion';
import heroPhone from '../assets/hero-phone.png';

interface HeroProps {
  onJoinClick: () => void;
}

const Hero = ({ onJoinClick }: HeroProps) => {
  return (
    <section className="hero" id="hero">
      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge removed as requested */}
          <h1 className="hero-title">
            Stop collecting books. <br />
            <span className="gradient-text">Start conquering them.</span>
          </h1>
          <p className="hero-subtitle">
            The habit engine that turns your reading list into a quest.
            Build identity through verified progress and long-form learning.
          </p>

          <div className="cta-group">
            <div className="cta-wrapper">
              <button className="btn-primary large" onClick={onJoinClick}>Join Waitlist</button>
            </div>
            <p className="cta-subtext">Join 500+ High-Intent Readers</p>
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="phone-wrapper">
            <div className="phone-glow"></div>
            <img src={heroPhone} alt="Bookmarkk App Mockup" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
