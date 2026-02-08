import { motion } from 'framer-motion';

interface FinalCTAProps {
  onJoinClick: () => void;
}

const FinalCTA = ({ onJoinClick }: FinalCTAProps) => {
  return (
    <section className="final-cta">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Season 1 starts soon</h2>
          <p className="subtitle">
            Join the waitlist for early access + founding member perks.
          </p>

          <div style={{ maxWidth: '440px', margin: '0 auto' }}>
            <button
              className="btn-primary large"
              onClick={onJoinClick}
              style={{ width: '100%' }}
            >
              Join Season 1
            </button>
            <p className="fine-print">
              Limited spots. We're starting with a small cohort to iterate fast.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
